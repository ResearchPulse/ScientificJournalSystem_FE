/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: shared\services\api.js
 */
import axios from 'axios';
import { useAuthStore } from '../../app/store/authStore';

/**
 * Axios instance dùng chung cho toàn bộ FE.
 *
 * Luồng auth hiện tại sau khi merge nhánh Duy:
 * - BE lưu access token/refresh token trong HTTP-only cookie.
 * - `withCredentials: true` giúp browser gửi cookie kèm request.
 * - Nếu API trả 401, interceptor sẽ thử gọi `/auth/refresh` đúng 1 lần
 * để lấy access token mới rồi gọi lại request ban đầu.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Interceptor gửi token kèm request
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios instance for public endpoints (does not send cookies or tokens)
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Biến điều khiển hàng đợi refresh token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor xử lý response và tự động refresh token khi gặp lỗi 401
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Bỏ qua nếu không có response hoặc request không tồn tại
    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    const url = originalRequest.url || '';
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/refresh') || url.includes('/auth/logout');

    if (error.response.status === 401 && !isAuthEndpoint) {
      const { remember, refreshToken, isAuthenticated, setSessionExpiredModalVisible } = useAuthStore.getState();

      // Nếu người dùng KHÔNG tick chọn ghi nhớ đăng nhập (remember === false)
      // Khi access token hết hạn -> coi như phiên đăng nhập kết thúc -> hiện thông báo yêu cầu đăng nhập lại
      if (!remember) {
        if (isAuthenticated) {
          setSessionExpiredModalVisible(true);
        }
        return Promise.reject(error);
      }

      // Nếu người dùng CÓ tick ghi nhớ đăng nhập (remember === true)
      // Tiến hành refresh token tự động
      if (originalRequest._retry) {
        setSessionExpiredModalVisible(true);
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshHeaders = {};
        if (refreshToken) {
          refreshHeaders['x-refresh-token'] = refreshToken;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {
            withCredentials: true,
            headers: refreshHeaders,
          }
        );

        if (res.status === 200 && res.data?.success !== false) {
          const newToken = res.data?.data?.token || res.data?.token;
          const newRefreshToken = res.data?.data?.refresh_token || res.data?.refresh_token || refreshToken;

          if (newToken) {
            const { loginSuccess } = useAuthStore.getState();
            loginSuccess(newToken, null, true, newRefreshToken);

            processQueue(null, newToken);
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        }

        throw new Error(res.data?.message || 'Không thể làm mới token');
      } catch (refreshError) {
        processQueue(refreshError, null);
        setSessionExpiredModalVisible(true);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;