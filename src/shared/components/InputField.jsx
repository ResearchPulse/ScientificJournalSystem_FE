/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: shared\components\InputField.jsx
 */
import { Form, InputGroup } from "react-bootstrap";
import Icon from "./Icon";
import { useState } from "react";

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  icon,
  required = false,
  disabled = false,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

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
        {icon && (
          <InputGroup.Text className="auth-field-icon" aria-hidden="true">
            <Icon icon={icon} width="18" />
          </InputGroup.Text>
        )}

        <Form.Control
          type={type}
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
