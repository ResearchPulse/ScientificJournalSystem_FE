import { Badge as BsBadge } from 'react-bootstrap';

/**
 * Thẻ huy hiệu trạng thái & siêu dữ liệu (Badge)
 * Dùng cho phân loại tạp chí (Q1-Q4), trạng thái bài viết (Open Access, Subscription), v.v.
 *
 * @param {React.ReactNode} children - Nội dung chữ trong huy hiệu
 * @param {string} [variant='secondary'] - Loại huy hiệu: 'primary', 'secondary', 'q1', 'success', 'warning', 'danger'
 * @param {boolean} [pill=false] - Bo tròn tối đa hình viên thuốc (Pill shape)
 * @param {string} [className=''] - Các lớp CSS bổ sung
 * @param {object} [style] - Inline style tuỳ biến
 */
export default function Badge({
  children,
  variant = 'secondary',
  pill = false,
  className = '',
  style,
  ...props
}) {
  const isQ1 = variant === 'q1';
  const customStyle = isQ1
    ? { backgroundColor: 'var(--q1-color)', color: '#fff', ...style }
    : style;

  return (
    <BsBadge
      bg={isQ1 ? undefined : variant}
      pill={pill}
      className={`font-display ${className}`}
      style={customStyle}
      {...props}
    >
      {children}
    </BsBadge>
  );
}
