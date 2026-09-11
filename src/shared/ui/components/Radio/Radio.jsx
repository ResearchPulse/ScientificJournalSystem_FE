import { useId } from 'react';
import './Radio.css';

/**
 * Reusable Radio Button Component
 *
 * @param {boolean} checked - Checked state
 * @param {Function} onChange - Change handler
 * @param {string} value - Radio input value
 * @param {string} [label] - Main label
 * @param {string} [description] - Subtext
 * @param {boolean} [disabled=false] - Disabled state
 * @param {string} [className=''] - Extra classes
 */
export default function Radio({
  checked = false,
  onChange,
  value,
  label,
  description,
  disabled = false,
  id,
  name,
  className = '',
  ...props
}) {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <label
      htmlFor={inputId}
      className={`ui-radio-container ${checked ? 'is-checked' : ''} ${
        disabled ? 'is-disabled' : ''
      } ${className}`.trim()}
    >
      <input
        type="radio"
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="ui-radio-input"
        {...props}
      />
      <span className="ui-radio-circle" aria-hidden="true">
        <span className="ui-radio-dot" />
      </span>
      {(label || description) && (
        <div className="ui-radio-label-group">
          {label && <span className="ui-radio-label">{label}</span>}
          {description && <span className="ui-radio-desc">{description}</span>}
        </div>
      )}
    </label>
  );
}
