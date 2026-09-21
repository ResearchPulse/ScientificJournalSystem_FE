/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\auth\components\PasswordInput.jsx
 */
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Icon from "../../../shared/components/Icon";

export default function PasswordInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    if (disabled) return;
    setShowPassword((prev) => !prev);
  };

  return (
    <Form.Group className="mb-3">
      {label && (
        <Form.Label className="auth-field-label">
          {label}
          {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}

      <InputGroup
        className={`auth-field-shell ${error ? "is-error" : ""}`}
        style={{
          borderColor: error
            ? "var(--ds-error-text)"
            : isFocused
              ? "var(--ds-blue-600)"
              : "var(--border)",
          background: disabled ? "var(--ds-gray-50)" : "#fff",
          opacity: disabled ? 0.7 : 1,
        }}
      >
        <InputGroup.Text className="auth-field-icon" aria-hidden="true">
          <Icon icon="lucide:lock" width="18" />
        </InputGroup.Text>

        <Form.Control
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={(e) => {
            setIsFocused(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className="auth-field-control"
          aria-invalid={Boolean(error)}
          {...props}
        />

        <button
          type="button"
          className="auth-password-toggle"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
          tabIndex={0}
          disabled={disabled}
        >
          <Icon
            icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
            width="18"
          />
        </button>
      </InputGroup>

      {error && (
        <div className="auth-error" role="alert">
          <Icon icon="lucide:alert-circle" width="12" />
          <span>{error}</span>
        </div>
      )}
    </Form.Group>
  );
}
