import { useTranslation } from "react-i18next";
// ErrorState.jsx
// Hiển thị khi token không hợp lệ, hết hạn, hoặc không có token trên URL.
// Không tự redirect — user tự chọn hành động tiếp theo.

import ErrorIcon from "./ErrorIcon";
import AuthActionButtons from "./AuthActionButtons";
const ErrorState = ({ message, onLogin, onRegister }) => {
  const { t } = useTranslation();
  return (
    <div className="auth-state-enter">
      {/* Icon cảnh báo màu cam */}
      <ErrorIcon />

      {/* Heading */}
      <h2 className="auth-status-heading text-center mb-2">
        {t("auth.kichHoatTaiKhoanThatBai")}
      </h2>

      {/* Message lỗi — từ BE hoặc default */}
      <p className="auth-status-copy text-center mb-4">
        {message || t("auth.lienKetKichHoatKhongHopLeHoacD")}
      </p>

      {/* Buttons */}
      <AuthActionButtons
        status="error"
        onLogin={onLogin}
        onRegister={onRegister}
      />
    </div>
  );
};
export default ErrorState;
