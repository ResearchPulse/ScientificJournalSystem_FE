import { useTranslation } from "react-i18next";
import { t } from "i18next";
/**
 * Trang đăng ký tài khoản mới.
 *
 * File: features/auth/pages/RegisterPage.jsx
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthLayout from "../../../app/layouts/AuthLayout";
import AuthBanner from "../components/AuthBanner";
import RegisterForm from "../components/RegisterForm";
import Icon from "../../../shared/components/Icon";
export default function RegisterPage() {
  const { t: _t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth();

  // State phục vụ UI đăng ký: loading, lỗi API, màn hình thành công.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  /**
   * Gửi form đăng ký lên backend.
   * Nếu API không ném lỗi, hiển thị màn hình thông báo xác thực email.
   */
  const handleRegisterSubmit = async (payload) => {
    setIsLoading(true);
    setError(null);
    try {
      setRegisteredEmail(payload.email);
      await register(payload);
      setIsSuccess(true);
    } catch (err) {
      console.error(
        "Registration failed:",
        err.response?.data?.message || err.message,
      );
      setError(
        err.response?.data?.message ||
          err.message ||
          t("auth.dangKyKhongThanhCongVuiLongThu"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Placeholder cho Google OAuth ở trang đăng ký.
   * Hiện chức năng này chưa bật trực tiếp tại màn hình register.
   */
  const handleGoogleAuth = () => {
    alert(t("auth.dangNhapdangKyBangGoogleOauthD"));
  };
  return (
    <AuthLayout banner={<AuthBanner />}>
      {isSuccess ? (
        <div className="text-center py-4 animate-fade-in">
          <div
            className="d-inline-flex align-items-center justify-content-center mb-4"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "var(--ds-success-bg)",
              border: "2px solid var(--ds-success-text)",
              boxShadow: "0 0 20px rgba(15, 122, 82, 0.12)",
            }}
          >
            <Icon
              icon="lucide:check-circle"
              style={{ fontSize: "40px", color: "var(--ds-success-text)" }}
            />
          </div>

          <h2 className="auth-title mb-3" style={{ fontSize: "1.75rem" }}>
            {t("auth.dangKyThanhCong")}
          </h2>

          <p className="auth-subtitle mb-4" style={{ fontSize: "14px" }}>
            {t("auth.motEmailXacThucDaDuocGuiToiDia")}{" "}
            <strong style={{ color: "var(--text-main)" }}>
              {registeredEmail}
            </strong>{" "}
            {t("auth.vuiLongKiemTraHopThuHoacThuRac")}
          </p>

          <button
            onClick={() => navigate("/login")}
            className="auth-primary-button w-100"
          >
            {t("auth.diDenDangNhap")}
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <h2 className="auth-title">{t("auth.taoTaiKhoan")}</h2>
            <p className="auth-subtitle">
              {t("auth.dangKyMienPhiKhongCanTheTinDun")}
            </p>
          </div>

          <RegisterForm
            onSubmit={handleRegisterSubmit}
            isLoading={isLoading}
            apiError={error}
            onGoogleAuth={handleGoogleAuth}
          />
        </>
      )}
    </AuthLayout>
  );
}
