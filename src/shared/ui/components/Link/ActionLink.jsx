import { Link } from 'react-router-dom';
import Icon from '../../primitives/Icon';
import './ActionLink.css';

/**
 * ActionLink - Component liên kết chuẩn hóa của hệ thống UI
 *
 * Tự động chuyển đổi:
 * - Khi có `to`: render `<Link>` của React Router (SPA navigation)
 * - Khi có `href`: render `<a>` (External URL)
 * - Khi chỉ có `onClick`: render `<button type="button">` (Interactive action)
 *
 * @param {React.ReactNode} children - Nội dung text hiển thị
 * @param {string} [to] - Đường dẫn router nội bộ
 * @param {string} [href] - Đường dẫn web bên ngoài
 * @param {Function} [onClick] - Hàm xử lý sự kiện click
 * @param {string} [icon] - Tên icon từ Iconify (vd: 'lucide:arrow-right', 'lucide:external-link')
 * @param {'left'|'right'} [iconPosition='right'] - Vị trí đặt icon
 * @param {'primary'|'secondary'|'muted'|'danger'} [variant='primary'] - Tông màu link
 * @param {'always'|'hover'|'none'} [underline='always'] - Chế độ gạch chân
 * @param {'sm'|'md'|'lg'} [size='sm'] - Kích thước chữ
 * @param {boolean} [disabled=false] - Trạng thái vô hiệu hóa
 * @param {string} [className=''] - Class tùy biến bổ sung
 */
export default function ActionLink({
  children,
  to,
  href,
  onClick,
  icon,
  iconPosition = 'right',
  variant = 'primary',
  underline = 'always',
  size = 'sm',
  disabled = false,
  className = '',
  target,
  rel,
  ...props
}) {
  const baseClasses = [
    'ui-action-link',
    `ui-action-link--${size}`,
    `ui-action-link--${variant}`,
    `ui-action-link--underline-${underline}`,
    disabled ? 'is-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconElement = icon ? (
    <span
      className={`ui-action-link__icon ui-action-link__icon--${iconPosition}`}
      aria-hidden="true"
    >
      <Icon icon={icon} width={size === 'lg' ? 16 : size === 'md' ? 14 : 13} />
    </span>
  ) : null;

  const content = (
    <>
      {iconPosition === 'left' && iconElement}
      <span>{children}</span>
      {iconPosition === 'right' && iconElement}
    </>
  );

  // Trường hợp 1: SPA Router Link
  if (to && !disabled) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick} target={target} rel={rel} {...props}>
        {content}
      </Link>
    );
  }

  // Trường hợp 2: Native Anchor Link
  if (href && !disabled) {
    const isExternal = target === '_blank' || href.startsWith('http');
    const resolvedRel = rel || (isExternal ? 'noopener noreferrer' : undefined);
    return (
      <a
        href={href}
        className={baseClasses}
        onClick={onClick}
        target={target}
        rel={resolvedRel}
        {...props}
      >
        {content}
      </a>
    );
  }

  // Trường hợp 3: Interactive Button Link
  return (
    <button
      type="button"
      className={baseClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}
