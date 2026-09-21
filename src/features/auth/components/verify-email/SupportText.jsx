import { useTranslation } from "react-i18next";
const SupportText = () => {
  const { t } = useTranslation();
  return (
    <p
      className="text-center mt-4"
      style={{
        fontSize: "0.85rem",
        color: "var(--ds-text-soft, #52637a)",
      }}
    >
      <span>{t("auth.canHoTro")}</span>{" "}
      <a
        href="mailto:support@researchpulse.io"
        className="auth-link"
        style={{
          color: "var(--primary)",
          fontWeight: 600,
        }}
      >
        {t("auth.lienHeChungToi")}
      </a>
    </p>
  );
};
export default SupportText;
