/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: app\store\authStore.js
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Store quản lý trạng thái xác thực toàn cục.
 *
 * Hiện dự án đang chuyển từ lưu token ở browser storage sang luồng
 * access/refresh token bằng HTTP-only cookie. Vì vậy store vẫn giữ:
 * - `token`: token nhận từ login/refresh nếu BE trả về.
 * - `user`: thông tin user khôi phục từ `/users/me` khi cookie còn hợp lệ.
 */
export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      remember: false,
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
      sessionExpiredModalVisible: false,

      /**
       * Đánh dấu phiên đăng nhập là hợp lệ.
       *
       * Hỗ trợ các trường hợp:
       * - Login/refresh token: `loginSuccess(token, user, remember, refreshToken)`
       * - Khôi phục session bằng cookie: `loginSuccess(null, user)`
       */
      loginSuccess: (token = null, user = null, remember = null, refreshToken = null) => set((state) => {
        const targetToken = token ?? state.token;
        const targetUser = user ?? state.user;
        const targetRemember = remember !== null ? Boolean(remember) : state.remember;
        const targetRefreshToken = refreshToken ?? state.refreshToken;

        return {
          token: targetToken,
          refreshToken: targetRefreshToken,
          remember: targetRemember,
          user: targetUser,
          isAuthenticated: Boolean(targetToken ?? targetUser),
          error: null,
          sessionExpiredModalVisible: false,
        };
      }),

      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setSessionExpiredModalVisible: (sessionExpiredModalVisible) => set({ sessionExpiredModalVisible }),

      /**
       * Xóa trạng thái auth trong memory và storage.
       */
      logout: () => {
        return set({
          token: null,
          refreshToken: null,
          remember: false,
          isAuthenticated: false,
          user: null,
          error: null,
          isLoading: false,
          sessionExpiredModalVisible: false,
        });
      },
    }),
    {
      name: 'researchpulse-auth-storage',
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        remember: state.remember,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);