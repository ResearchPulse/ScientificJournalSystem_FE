import { useState } from 'react';
import './Tooltip.css';

/**
 * Hộp chú thích nhanh khi rê chuột (Tooltip)
 * Bọc quanh bất kỳ phần tử nào để hiển thị giải thích phụ mà không chiếm diện tích giao diện.
 *
 * @param {React.ReactNode} content - Nội dung văn bản chú thích hiển thị trong bong bóng
 * @param {'top'|'bottom'|'left'|'right'} [placement='top'] - Vị trí hiển thị: 'top' (trên), 'bottom' (dưới), 'left' (trái), 'right' (phải)
 * @param {React.ReactNode} children - Phần tử đích để người dùng rê chuột vào kích hoạt tooltip
 * @param {string} [className=''] - Các lớp CSS bổ sung
 */
export default function Tooltip({
  content,
  placement = 'top',
  className = '',
  children,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);

  if (!content) return children;

  return (
    <span
      className={`ui-tooltip-wrapper ${className}`.trim()}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      {...props}
    >
      {children}
      <span
        role="tooltip"
        className={`ui-tooltip-bubble ui-tooltip-${placement} ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        {content}
      </span>
    </span>
  );
}
