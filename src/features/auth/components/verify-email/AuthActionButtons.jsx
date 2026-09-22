import { useTranslation } from "react-i18next";
// AuthActionButtons.jsx
// Nhóm các button hành động — tách riêng để dễ thay đổi layout button.
// Nhận props để biết đang ở state success hay error.

const AuthActionButtons = ({ status, onLogin, onHome, onRegister }) => {
  const { t } = useTranslation();
  // ─── Buttons cho trạng thái SUCCESS ───────────────────────────────────────
  if (status === "success") {
    return (
      <div className="d-grid gap-2">
        {/* Button chính — đi thẳng đến login không chờ countdown */}
        <button
          onClick={onLogin}
          className="auth-primary-button w-100"
          type="button"
        >
          {t("article.dangNhapNgay")}
        </button>

        {/* Link phụ — về trang chủ */}
        <button
          onClick={onHome}
          className="auth-secondary-button w-100"
          type="button"
        >
          {t("auth.veTrangChu")}
        </button>
      </div>
    );
  }

  // ─── Buttons cho trạng thái ERROR ─────────────────────────────────────────
  if (status === "error") {
    return (
      <div className="d-grid gap-2">
        {/* Button chính — đăng ký lại */}
        <button
          onClick={onRegister}
          className="auth-primary-button w-100"
          type="button"
        >
          {t("auth.dangKyLai")}
        </button>

        {/* Link phụ — về trang đăng nhập */}
        <button
          onClick={onLogin}
          className="auth-secondary-button w-100"
          type="button"
        >
          {t("auth.veTrangDangNhap")}
        </button>
      </div>
    );
  }

  // Loading state — không hiển thị button
  return null;
};
export default AuthActionButtons;
