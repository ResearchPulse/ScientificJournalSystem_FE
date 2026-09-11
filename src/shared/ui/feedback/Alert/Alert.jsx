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
 * Hộp cảnh báo / thông báo nổi bật trong trang (Alert Callout)
 * Dùng để thông báo kết quả thao tác, cảnh báo sắp hết hạn phiên hoặc lỗi máy chủ.
 *
 * @param {'info'|'success'|'warning'|'danger'} [variant='info'] - Kiểu cảnh báo: info (xanh dương), success (xanh lá), warning (vàng), danger (đỏ)
 * @param {string} [title] - Tiêu đề in đậm của thông báo
 * @param {string} [icon] - Tên icon Iconify tùy biến (nếu để trống sẽ tự động lấy icon theo variant)
 * @param {boolean} [dismissible=false] - Cho phép người dùng bấm nút [x] để đóng hộp thông báo
 * @param {Function} [onClose] - Hàm callback thực thi khi thông báo bị đóng
 * @param {string} [className=''] - Các lớp CSS bổ sung
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
