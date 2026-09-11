import { useId, useRef, useEffect } from 'react';
import Icon from '../../primitives/Icon';
import './Checkbox.css';

/**
 * Reusable Checkbox Component
 *
 * @param {boolean} checked - Checked state
 * @param {boolean} [indeterminate=false] - Indeterminate (dash) state
 * @param {Function} onChange - Change handler
 * @param {string} [label] - Main label
 * @param {string} [description] - Optional subtext
 * @param {boolean} [disabled=false] - Disabled state
 * @param {string} [className=''] - Extra classes
 */
export default function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
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
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      htmlFor={inputId}
      className={`ui-checkbox-container ${checked ? 'is-checked' : ''} ${
        indeterminate ? 'is-indeterminate' : ''
      } ${disabled ? 'is-disabled' : ''} ${className}`.trim()}
    >
      <input
        ref={inputRef}
        type="checkbox"
        id={inputId}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="ui-checkbox-input"
        {...props}
      />
      <span className="ui-checkbox-box" aria-hidden="true">
        {checked && !indeterminate && (
          <Icon icon="lucide:check" width="13" height="13" />
        )}
        {indeterminate && (
          <Icon icon="lucide:minus" width="13" height="13" />
        )}
      </span>
      {(label || description) && (
        <div className="ui-checkbox-label-group">
          {label && <span className="ui-checkbox-label">{label}</span>}
          {description && <span className="ui-checkbox-desc">{description}</span>}
        </div>
      )}
    </label>
  );
}
