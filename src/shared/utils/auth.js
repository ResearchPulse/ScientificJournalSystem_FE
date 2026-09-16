/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: shared\utils\auth.js
 */
import { useAuthStore } from '../../app/store/authStore';
import { useUserStore } from '../../app/store/userStore';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';



/**
 * Xóa các token cũ đang lưu ở phía client.
 *
 * Luồng auth hiện tại ưu tiên HTTP-only cookie, nhưng một số phần code cũ
 * vẫn có thể lưu token vào localStorage/sessionStorage. Xóa cả hai nhóm key
 * giúp logout hoặc xử lý phiên hết hạn sạch hơn.
 */
export const removeToken = () => {
  // Trống, vì Zustand xử lý việc xóa RAM và cookie do BE xử lý
};

/**
 * Kiểm tra người dùng hiện tại còn phiên đăng nhập hợp lệ hay không.
 *
 * Trường hợp nhanh: Zustand đã có user nên không cần gọi API.
 * Trường hợp F5/reload: Zustand mất dữ liệu, gọi `/auth/check-auth` để BE xác thực
 * bằng cookie HTTP-only và trả lại thông tin user.
 */
export const isAuthenticated = async () => {
  try {
    const authStore = useAuthStore.getState();

    // Nếu có token, kiểm tra hạn dùng thực tế của token
    if (authStore.token) {
      try {
        const decoded = jwtDecode(authStore.token);
        const isExpired = decoded.exp && decoded.exp * 1000 <= Date.now();

        if (isExpired) {
          // Token đã hết hạn!
          if (!authStore.remember) {
            // Không tick Remember-me -> kích hoạt modal thông báo hết hạn phiên
            authStore.setSessionExpiredModalVisible(true);
            return false;
          }
          // Có tick Remember-me -> tiếp tục xuống dưới gọi api.get('/users/me')
          // để Axios interceptor kích hoạt luồng tự động refresh token ngầm
        } else if (authStore.isAuthenticated && useUserStore.getState().email) {
          return true;
        }
      } catch {
        // Token sai định dạng
      }
    } else if (!authStore.isAuthenticated) {
      return false;
    }

    // Gọi BE xác thực profile / kích hoạt interceptor refresh nếu token hết hạn
    let meResponse;
    try {
      meResponse = await api.get('/users/me');
    } catch (error) {
      if (error.response?.status === 404) {
        meResponse = await api.get('/users/profile');
      } else {
        throw error;
      }
    }

    const meData = meResponse?.data?.data ?? meResponse?.data;
    if (meData) {
      useUserStore.getState().setUser?.(meData);
      useUserStore.getState().setEmail?.(meData?.email);
      authStore.loginSuccess(null, meData);
      return true;
    }

    return false;
  } catch (error) {
    // Nếu lỗi 401: Interceptor của api.js đã xử lý phân nhánh refresh hoặc hiển thị modal
    return false;
  }
};