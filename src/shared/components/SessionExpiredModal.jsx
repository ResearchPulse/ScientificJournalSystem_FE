/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: shared/components/SessionExpiredModal.jsx
 * Modal thông báo đẹp mắt khi phiên đăng nhập hết hạn (do không tick Remember-me hoặc token hết hiệu lực).
 */
import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../../app/store/authStore';
import { useUserStore } from '../../app/store/userStore';
import { useWalletStore } from '../../app/store/walletStore';
import { logoutSession } from '../../features/auth/services/authService';
import PrimaryButton from './Button/PrimaryButton';

export default function SessionExpiredModal() {
  const navigate = useNavigate();
  const show = useAuthStore((state) => state.sessionExpiredModalVisible);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const remember = useAuthStore((state) => state.remember);
  const setSessionExpiredModalVisible = useAuthStore((state) => state.setSessionExpiredModalVisible);
  const logout = useAuthStore((state) => state.logout);
  const clearEmail = useUserStore((state) => state.clearEmail);
  const clearWallet = useWalletStore((state) => state.clearWallet);

  // Giám sát thời hạn thực tế của Token theo thời gian thực (kể cả khi user đứng yên không thao tác)
  useEffect(() => {
    if (!isAuthenticated || !token) return;

    let timeoutId = null;
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp) {
        const expiresInMs = decoded.exp * 1000 - Date.now();
        if (expiresInMs <= 0) {
          // Token đã hết hạn ngay lúc này
          if (!remember) {
            setSessionExpiredModalVisible(true);
          }
        } else {
          // Đặt timer kích hoạt modal đúng lúc token hết hạn
          timeoutId = setTimeout(() => {
            const currentRemember = useAuthStore.getState().remember;
            if (!currentRemember) {
              setSessionExpiredModalVisible(true);
            }
          }, expiresInMs);
        }
      }
    } catch {
      // Bỏ qua lỗi decode nếu token không phải jwt hợp lệ
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [token, isAuthenticated, remember, setSessionExpiredModalVisible]);

  const handleConfirm = async () => {
    // Đóng modal trước
    setSessionExpiredModalVisible(false);

    // Xóa session ở BE (nếu cookie còn) và dọn sạch state ở client
    try {
      await logoutSession();
    } catch {
      // Bỏ qua lỗi mạng nếu có khi gọi logout
    }

    logout();
    clearEmail?.();
    clearWallet?.();

    // Điều hướng người dùng về trang đăng nhập
    navigate('/login', { replace: true });
  };

  return (
    <Modal
      show={show}
      onHide={() => {}} // Chặn tắt modal khi bấm ESC hoặc ra ngoài
      centered
      backdrop="static"
      keyboard={false}
      contentClassName="border-0 shadow-lg text-center"
      style={{
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
      }}
    >
      <div
        className="p-4 p-md-5 rounded-4"
        style={{
          backgroundColor: 'var(--bg-card, #ffffff)',
          color: 'var(--text-main, #0f172a)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
        }}
      >
        {/* Glowing Icon Wrapper */}
        <div className="d-flex justify-content-center mb-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: '72px',
              height: '72px',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              boxShadow: '0 0 25px rgba(245, 158, 11, 0.25)',
              border: '2px solid rgba(245, 158, 11, 0.2)',
            }}
          >
            <Icon
              icon="lucide:clock-alert"
              width="36"
              height="36"
              style={{ color: '#d97706' }}
            />
          </div>
        </div>

        {/* Title */}
        <h4
          className="font-display fw-bold mb-2"
          style={{
            fontSize: '1.35rem',
            letterSpacing: '-0.02em',
            color: 'var(--text-main, #0f172a)',
          }}
        >
          Phiên đăng nhập đã hết hạn
        </h4>

        {/* Message */}
        <p
          className="mb-4 text-muted"
          style={{
            fontSize: '0.925rem',
            lineHeight: '1.6',
            maxWidth: '360px',
            margin: '0 auto',
            color: 'var(--text-muted, #64748b)',
          }}
        >
          Phiên làm việc của bạn đã kết thúc vì bạn không chọn ghi nhớ đăng nhập (hoặc phiên làm việc đã quá hạn bảo mật). Vui lòng đăng nhập lại để tiếp tục làm việc.
        </p>

        {/* Action Button */}
        <div className="d-flex justify-content-center">
          <PrimaryButton
            onClick={handleConfirm}
            icon="lucide:log-in"
            className="w-100 py-2 px-4 fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2"
            style={{
              fontSize: '1rem',
              borderRadius: '10px',
              maxWidth: '280px',
            }}
          >
            Đăng nhập lại (OK)
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
