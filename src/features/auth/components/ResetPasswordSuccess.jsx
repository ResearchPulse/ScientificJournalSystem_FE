import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../shared/components/Icon";
import SubmitButton from "./SubmitButton";
export default function ResetPasswordSuccess() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    if (countdown <= 0) {
      navigate("/login", {
        replace: true,
      });
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);
  const handleRedirect = () => {
    navigate("/login", {
      replace: true,
    });
  };
  return (
    <div
      className="text-center py-4 animate-fade-in"
      role="status"
      aria-live="polite"
    >
      <div
        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
        style={{
          width: "4.5rem",
          height: "4.5rem",
          backgroundColor: "var(--primary-light)",
          color: "var(--primary)",
        }}
      >
        <Icon icon="lucide:check-circle" width="40" height="40" />
      </div>

      <h3 className="auth-status-heading mb-3" style={{ fontSize: "1.75rem" }}>
        {t("auth.datLaiMatKhauThanhCong")}
      </h3>

      <p className="auth-subtitle mb-4" style={{ fontSize: "14px" }}>
        {t("auth.matKhauCuaBanDaDuocCapNhatThan")}
        <strong>{countdown}</strong>
        {t("auth.giay")}
      </p>

      <SubmitButton
        isLoading={false}
        onClick={handleRedirect}
        label={t("article.dangNhapNgay")}
      />
    </div>
  );
}
