import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useState } from "react";
import AuthLayout from "../../../app/layouts/AuthLayout";
import AuthBanner from "../components/AuthBanner";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import ForgotPasswordSuccess from "../components/ForgotPasswordSuccess";
import { forgotPasswordApi } from "../api/auth.api";
export default function ForgotPasswordPage() {
  const { t: _t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const handleForgotPasswordSubmit = async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      setSubmittedEmail(email);
      await forgotPasswordApi(email);
      setIsSubmitted(true);
    } catch (err) {
      console.error(
        "Forgot password API failed:",
        err.response?.data?.message || err.message,
      );
      setError(
        err.response?.data?.message ||
          err.message ||
          t("auth.guiYeuCauKhoiPhucMatKhauThatBa"),
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendEmail = async () => {
    if (!submittedEmail) return;
    setIsLoading(true);
    setError(null);
    try {
      await forgotPasswordApi(submittedEmail);
    } catch (err) {
      console.error(
        "Resending forgot password failed:",
        err.response?.data?.message || err.message,
      );
      setError(
        err.response?.data?.message || t("auth.guiLaiYeuCauKhoiPhucThatBai"),
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout banner={<AuthBanner />}>
      {!isSubmitted ? (
        <>
          <div className="auth-mobile-brand">
            <span className="auth-mobile-brand-mark" aria-hidden="true">
              RP
            </span>
            <span className="fs-5 fw-bold">HyperData Lab</span>
          </div>

          <div className="mb-4">
            <h2 className="auth-title">{t("auth.quenMatKhau")}</h2>
            <p className="auth-subtitle">
              {t("auth.nhapEmailTaiKhoanCuaBanNeuEmai")}
            </p>
          </div>

          <ForgotPasswordForm
            onSubmit={handleForgotPasswordSubmit}
            isLoading={isLoading}
            apiError={error}
          />
        </>
      ) : (
        <ForgotPasswordSuccess
          onResend={handleResendEmail}
          isLoading={isLoading}
        />
      )}
    </AuthLayout>
  );
}
