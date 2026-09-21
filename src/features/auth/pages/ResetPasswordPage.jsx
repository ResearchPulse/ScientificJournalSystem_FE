import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import AuthLayout from "../../../app/layouts/AuthLayout";
import AuthBanner from "../components/AuthBanner";
import ResetPasswordForm from "../components/ResetPasswordForm";
import ResetPasswordSuccess from "../components/ResetPasswordSuccess";
import { resetPasswordApi } from "../api/auth.api";
import Icon from "../../../shared/components/Icon";
import ROUTES from "../../../app/routes/routePaths";
export default function ResetPasswordPage() {
  const { t: _t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleResetPasswordSubmit = async (password) => {
    if (!token) {
      setError(t("auth.thieuMaXacThucKhoiPhucMatKhauV"));
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // API call with token and new_password (backend format is new_password)
      await resetPasswordApi({
        token: token,
        new_password: password,
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(
        "Reset password API failed:",
        err.response?.data?.message || err.message,
      );
      setError(
        err.response?.data?.message ||
          err.message ||
          t("auth.thayDoiMatKhauThatBaiVuiLongTh"),
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout banner={<AuthBanner />}>
      {isSubmitted ? (
        <ResetPasswordSuccess />
      ) : (
        <>
          <div className="d-flex d-md-none align-items-center gap-2 mb-4">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background:
                  "linear-gradient(180deg, var(--ds-blue-600) 0%, var(--ds-blue-700) 100%)",
                boxShadow: "0 8px 18px rgba(0, 113, 188, 0.18)",
              }}
            >
              <Icon icon="lucide:activity" className="text-white text-sm" />
            </div>
            <span
              className="fs-5 fw-bold"
              style={{ letterSpacing: "-0.03em", color: "var(--text-main)" }}
            >
              ResearchPulse
            </span>
          </div>

          <div className="mb-4">
            <h2 className="auth-title">{t("auth.datLaiMatKhau")}</h2>
            <p className="auth-subtitle">
              {t("auth.vuiLongNhapMatKhauMoiCuaBanBen")}
            </p>
          </div>

          {!token ? (
            <div
              className="alert alert-danger d-flex align-items-center gap-3 py-3 px-3 border-0 rounded-3 mb-4"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                background: "var(--ds-error-bg)",
                color: "var(--ds-error-text)",
                border: "1px solid rgba(177, 44, 64, 0.1)",
              }}
            >
              <Icon
                icon="lucide:alert-triangle"
                width="18"
                className="flex-shrink-0"
              />
              <div>
                {t("auth.lienKetKhoiPhucMatKhauKhongHop")}
                <div className="mt-2">
                  <Link to={ROUTES.FORGOT_PASSWORD} className="auth-link">
                    {t("auth.yeuCauLienKetMoi")}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <ResetPasswordForm
              onSubmit={handleResetPasswordSubmit}
              isLoading={isLoading}
              apiError={error}
            />
          )}

          {!isSubmitted && (
            <div className="text-center mt-4 text-sm font-medium">
              <span className="auth-section-meta">{t("auth.quayLai")}</span>{" "}
              <Link to={ROUTES.LOGIN} className="auth-link">
                {t("signIn")}
              </Link>
            </div>
          )}
        </>
      )}
    </AuthLayout>
  );
}
