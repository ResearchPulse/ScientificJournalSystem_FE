import { useState } from 'react';
import Icon from '../../primitives/Icon';
import './Alert.css';

const DEFAULT_ICONS = {
  info: 'lucide:info',
  success: 'lucide:check-circle',
  warning: 'lucide:alert-triangle',
  danger: 'lucide:alert-octagon',
};

/**
 * Reusable Alert Callout Component
 *
 * @param {'info'|'success'|'warning'|'danger'} [variant='info'] - Alert variant
 * @param {string} [title] - Optional alert title
 * @param {string} [icon] - Custom icon
 * @param {boolean} [dismissible=false] - Can be dismissed
 * @param {Function} [onClose] - Close handler
 * @param {string} [className=''] - Extra classes
 */
export default function Alert({
  variant = 'info',
  title,
  icon,
  dismissible = false,
  onClose,
  className = '',
  children,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  const resolvedIcon = icon || DEFAULT_ICONS[variant];

  const handleDismiss = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <div
      role="alert"
      className={`ui-alert ui-alert-${variant} ${className}`.trim()}
      {...props}
    >
      {resolvedIcon && (
        <span className="ui-alert-icon">
          <Icon icon={resolvedIcon} width="20" />
        </span>
      )}
      <div className="ui-alert-content">
        {title && <div className="ui-alert-title">{title}</div>}
        <div>{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss alert"
          className="ui-alert-close"
          onClick={handleDismiss}
        >
          <Icon icon="lucide:x" width="16" />
        </button>
      )}
    </div>
  );
}
