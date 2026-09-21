import { useTranslation } from "react-i18next";
import { Button, Spinner } from "react-bootstrap";

export default function SubmitButton({
  type = "submit",
  disabled = false,
  isLoading = false,
  loadingText,
  label,
  onClick,
}) {
  const { t } = useTranslation();
  const resolvedLabel = label || t("auth.xacNhan");
  const resolvedLoadingText = loadingText || t("admin.dangXuLy");

  return (
    <Button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className="auth-primary-button w-100 d-flex align-items-center justify-content-center gap-2"
    >
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-1"
          />
          <span>{resolvedLoadingText}</span>
        </>
      ) : (
        <span>{resolvedLabel}</span>
      )}
    </Button>
  );
}
