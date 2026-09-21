/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\auth\components\FormErrorMessage.jsx
 */
import { Alert } from "react-bootstrap";
import Icon from "../../../shared/components/Icon";

export default function FormErrorMessage({ message }) {
  if (!message) return null;

  return (
    <Alert
      variant="danger"
      role="alert"
      className="d-flex align-items-center gap-3 py-2.5 px-3 border-0 rounded-3 mb-4 animate-fade-in"
      style={{
        background: "var(--ds-error-bg)",
        color: "var(--ds-error-text)",
        fontSize: "13px",
        fontWeight: 600,
        border: "1px solid rgba(177, 44, 64, 0.12)",
      }}
    >
      <Icon
        icon="lucide:alert-triangle"
        width="18"
        className="flex-shrink-0"
        style={{ color: "var(--ds-error-text)" }}
      />
      <div>{message}</div>
    </Alert>
  );
}
