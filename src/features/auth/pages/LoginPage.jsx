import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthLayout from "../../../app/layouts/AuthLayout";
import AuthBanner from "../components/AuthBanner";
import LoginForm from "../components/LoginForm";
import SocialAuthButton from "../components/SocialAuthButton";
import { toast } from "../../../shared/utils/toast";
import ROUTES from "../../../app/routes/routePaths";
const DASHBOARD_PAGE = ROUTES.DASHBOARD;
export default function LoginPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuth();

  // State riêng của màn hình login để điều khiển loading và lỗi form.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Nếu người dùng bị redirect tới login từ một trang khác, đăng nhập xong quay lại trang đó.
  const from = location.state?.from
    ? `${location.state.from.pathname}${location.state.from.search || ""}`
    : DASHBOARD_PAGE;

  /**
   * Xử lý submit form đăng nhập bằng email/password.
   * Thành công thì điều hướng tới trang trước đó hoặc dashboard.
   */
  const handleLoginSubmit = async (payload) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(payload.email, payload.password, payload.remember_login);
      navigate(from, {
        replace: true,
      });
    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message,
      );
      setError(
        err.response?.data?.message ||
          err.message ||
          t("auth.dangNhapKhongThanhCongVuiLongK"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Khởi chạy luồng đăng nhập Google OAuth.
   * Sau khi thành công, hook `useAuth` sẽ tự điều hướng về dashboard.
   */
  const handleLoginWithGoogle = () => {
    setIsLoading(true);
    setError(null);
    try {
      loginWithGoogle(from);
    } catch {
      toast.error(t("auth.dangNhapThatBai"));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout banner={<AuthBanner />}>
      <div className="mb-4">
        <h2 className="auth-title">{t("signIn")}</h2>
        <p className="auth-subtitle">
          {t("auth.chaoMungTroLaiVuiLongNhapThong")}
        </p>
      </div>

      <div className="mb-4">
        <SocialAuthButton
          onClick={handleLoginWithGoogle}
          disabled={isLoading}
        />
      </div>

      <div className="auth-divider">{t("auth.hoac")}</div>

      <LoginForm
        onSubmit={handleLoginSubmit}
        isLoading={isLoading}
        apiError={error}
      />

      <div className="text-center mt-4 text-sm font-medium">
        <span className="auth-section-meta">{t("auth.chuaCoTaiKhoan")}</span>{" "}
        <Link to={ROUTES.REGISTER} className="auth-link">
          {t("signUp")}
        </Link>
      </div>
    </AuthLayout>
  );
}
