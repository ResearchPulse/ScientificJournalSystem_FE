import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Icon from '../../primitives/Icon';

/**
 * Reusable Textarea component with character counter and error handling
 */
export default function Textarea({
  label,
  name,
  value = '',
  onChange,
  onBlur,
  placeholder,
  error,
  rows = 4,
  maxLength,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <Form.Group className="mb-3">
      {label && (
        <div className="d-flex justify-content-between align-items-center mb-1.5">
          <Form.Label
            className="text-xs font-bold d-flex align-items-center gap-1 mb-0"
            style={{
              letterSpacing: '0.05em',
              color: 'var(--text-main)',
              textTransform: 'uppercase',
            }}
          >
            {label}
            {required && <span className="text-danger">*</span>}
          </Form.Label>
          {maxLength && (
            <span className="text-muted-custom text-xs">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      )}

      <Form.Control
        as="textarea"
        rows={rows}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={(e) => {
          setIsFocused(true);
          if (props.onFocus) props.onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
        className={`rounded-3 p-3 text-sm ${className}`.trim()}
        style={{
          borderColor: error ? '#ef4444' : isFocused ? 'var(--primary)' : 'var(--border)',
          background: '#ffffff',
          color: 'var(--text-main)',
          transition: 'all 0.2s ease-in-out',
          boxShadow: error
            ? '0 0 0 3px rgba(239, 68, 68, 0.12)'
            : isFocused
            ? '0 0 0 3px rgba(255, 122, 51, 0.15)'
            : '0 1px 2px rgba(0, 0, 0, 0.02)',
          resize: 'vertical',
        }}
        {...props}
      />

      {error && (
        <div
          className="text-danger text-xs mt-1.5 d-flex align-items-center gap-1"
          style={{ fontWeight: 500 }}
        >
          <Icon icon="lucide:alert-circle" width="12" />
          <span>{error}</span>
        </div>
      )}
    </Form.Group>
  );
}
