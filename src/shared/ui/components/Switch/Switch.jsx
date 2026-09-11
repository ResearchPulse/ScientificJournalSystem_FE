import { useId } from 'react';
import './Switch.css';

/**
 * Reusable Switch (Toggle) Component
 *
 * @param {boolean} checked - Checked state
 * @param {Function} onChange - Change handler (event)
 * @param {boolean} [disabled=false] - Disabled state
 * @param {'sm'|'md'|'lg'} [size='md'] - Switch size
 * @param {string} [label] - Optional label text
 * @param {string} [className=''] - Extra classes
 */
export default function Switch({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  label,
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
      className={`ui-switch ui-switch-${size} ${checked ? 'is-checked' : ''} ${
        disabled ? 'is-disabled' : ''
      } ${className}`.trim()}
    >
      <input
        type="checkbox"
        role="switch"
        id={inputId}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="ui-switch-input"
        aria-checked={checked}
        {...props}
      />
      <span className="ui-switch-track" aria-hidden="true">
        <span className="ui-switch-thumb" />
      </span>
      {label && <span className="ui-switch-label">{label}</span>}
    </label>
  );
}
