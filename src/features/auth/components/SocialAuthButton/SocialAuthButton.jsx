import { useTranslation } from "react-i18next";
import { PrimaryButton, Icon } from '@ui';

export default function SocialAuthButton({
  onClick,
  disabled = false,
  label,
  className = ''
}) {
  const { t } = useTranslation();
  const resolvedLabel = label || t("auth.tiepTucVoiGoogle");

  return (
    <PrimaryButton
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={`w-100 ${className}`}
    >
      <Icon icon="flat-color-icons:google" width="18" />
      <span>{resolvedLabel}</span>
    </PrimaryButton>
  );
}