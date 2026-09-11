import FormError from '../FormError';

/**
 * Reusable FormField container wrapping label, control, helper text, and error
 */
export default function FormField({
  label,
  htmlFor,
  required = false,
  helperText,
  error,
  className = '',
  children,
  ...props
}) {
  return (
    <div className={`mb-3 ${className}`.trim()} {...props}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-xs font-bold mb-1.5 d-flex align-items-center gap-1"
          style={{
            letterSpacing: '0.05em',
            color: 'var(--text-main)',
            textTransform: 'uppercase',
          }}
        >
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}

      {children}

      {helperText && !error && (
        <div className="text-muted-custom text-xs mt-1">
          {helperText}
        </div>
      )}

      {error && <FormError>{error}</FormError>}
    </div>
  );
}
