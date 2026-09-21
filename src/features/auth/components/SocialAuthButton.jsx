import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import Icon from "../../../shared/components/Icon";

export default function SocialAuthButton({ onClick, disabled = false, label }) {
  const { t } = useTranslation();
  const resolvedLabel = label || t("auth.tiepTucVoiGoogle");

  return (
    <Button
      variant="light"
      onClick={onClick}
      disabled={disabled}
      className="auth-social-button w-100 d-flex align-items-center justify-content-center gap-2"
      type="button"
    >
      <Icon icon="flat-color-icons:google" width="18" />
      <span>{resolvedLabel}</span>
    </Button>
  );
}
