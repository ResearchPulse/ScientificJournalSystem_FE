import { useTranslation } from "react-i18next";
import { Spinner } from 'react-bootstrap';
import { PrimaryButton } from '@ui';

export default function SubmitButton({
  type = 'submit',
  disabled = false,
  isLoading = false,
  loadingText,
  label,
  onClick,
  className = ''
}) {
  const { t } = useTranslation();
  const resolvedLabel = label || t("auth.xacNhan");
  const resolvedLoadingText = loadingText || t("admin.dangXuLy");

  return (
    <PrimaryButton
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`w-100 ${className}`}
    >
      {isLoading ? (
        <>
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-1" />
          <span>{resolvedLoadingText}</span>
        </>
      ) : (
        <span>{resolvedLabel}</span>
      )}
    </PrimaryButton>
  );
}