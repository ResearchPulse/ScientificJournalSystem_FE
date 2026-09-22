import { useTranslation } from "react-i18next";
// LoadingState.jsx
// Hiển thị khi đang gọi API verify token.
// Không có button — user chỉ cần chờ.

const LoadingState = () => {
  const { t } = useTranslation();
  return (
    <div
      className="text-center py-3 auth-state-enter"
      role="status"
      aria-live="polite"
    >
      {/* Spinner Bootstrap */}
      <div
        className="spinner-border mb-4"
        role="status"
        className="auth-loading-spinner"
      >
        <span className="visually-hidden">{t("common.dangTai")}</span>
      </div>

      {/* Heading */}
      <h2 className="auth-status-heading mb-2">
        {t("auth.dangXacThucTaiKhoan")}
      </h2>

      {/* Mô tả */}
      <p className="auth-status-copy mb-0">
        {t("auth.vuiLongChoTrongGiayLat")}
      </p>
    </div>
  );
};
export default LoadingState;
