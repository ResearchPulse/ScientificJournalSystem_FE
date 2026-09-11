import { Button as BsButton } from 'react-bootstrap';
import Icon from '../../primitives/Icon';
import './PrimaryButton.css';

/**
 * Nút bấm chuẩn hệ thống (PrimaryButton / Button)
 * Hỗ trợ các biến thể thiết kế thống nhất lẫn tương thích ngược với React-Bootstrap.
 *
 * @param {React.ReactNode} children - Nội dung hiển thị bên trong nút (chữ hoặc phần tử con)
 * @param {string} [icon=''] - Tên icon từ Iconify (ví dụ: 'lucide:search', 'lucide:plus')
 * @param {string} [className=''] - Các lớp CSS bổ sung
 * @param {string} [type='button'] - Loại nút HTML ('button', 'submit', 'reset')
 * @param {string} [variant='primary'] - Kiểu dáng: 'primary' (chính), 'outline' (viền), 'destructive' (xoá), 'link' (liên kết) hoặc các variant của Bootstrap
 * @param {'sm'|'lg'} [size] - Kích thước nút ('sm' cho nút nhỏ gọn, 'lg' cho nút lớn)
 * @returns {JSX.Element}
 */
export default function PrimaryButton({
  children,
  icon = '',
  className = '',
  type = 'button',
  variant = 'primary',
  size,
  ...props
}) {
  const isLink = variant === 'link';
  const isCustomUnified = variant === 'primary' || variant === 'outline' || variant === 'destructive';
  const bsVariant = isCustomUnified ? undefined : variant;
  const variantClass = isCustomUnified ? `btn-variant-${variant}` : '';
  const unifiedClass = !isLink ? 'btn-unified' : '';

  return (
    <BsButton
      type={type}
      size={size}
      variant={bsVariant}
      className={`${unifiedClass} ${variantClass} ${className}`.trim()}
      {...props}
    >
      {icon && <Icon icon={icon} width={size === 'sm' ? '14' : '15'} className="btn-icon-unified" />}
      {children}
    </BsButton>
  );
}
