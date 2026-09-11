import PropTypes from 'prop-types';
import Icon from '../../primitives/Icon';
import './Chip.css';

/**
 * Component Chip / Metric Indicator dùng chung cho toàn bộ hệ thống.
 * Dùng để hiển thị các mẩu thông tin nhỏ gọn như:
 * - Số dư ví (Wallet Coin Balance)
 * - Thống kê chỉ số (Metrics, Rating, Citation counts)
 * - Nhãn tag tương tác, bộ lọc (Filter tag, Category chip)
 *
 * Khi cần thay đổi kiểu dáng, màu hover, cỡ chữ, viền:
 * chỉ cần chỉnh tại `Chip.css` trong bộ UI là toàn bộ hệ thống tự động cập nhật!
 *
 * @param {string|React.ReactNode} [icon] - Tên icon Iconify (ví dụ: 'solar:wallet-bold', 'lucide:star')
 * @param {React.ReactNode} [label] - Nội dung nhãn hoặc số đo (ví dụ: '5', '124 bài')
 * @param {React.ReactNode} [children] - Nội dung con tuỳ biến (nếu không dùng prop label)
 * @param {'minimal'|'pill'|'outline'|'subtle'} [variant='minimal'] - Kiểu dáng hiển thị
 * @param {'sm'|'md'|'lg'} [size='md'] - Kích thước của Chip
 * @param {function} [onClick] - Hàm xử lý sự kiện click (khi có onClick, chip sẽ tự động kích hoạt hover)
 * @param {boolean} [disabled=false] - Trạng thái vô hiệu hoá
 * @param {string} [className=''] - Class CSS bổ sung
 * @param {object} [style] - Style nội tuyến tuỳ biến
 */
export default function Chip({
  icon = '',
  label,
  children,
  variant = 'minimal',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  style,
  ...props
}) {
  const isInteractive = Boolean(onClick) && !disabled;
  const content = label !== undefined ? label : children;

  const iconSizeMap = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  return (
    <div
      className={`ui-chip ui-chip--${variant} ui-chip--${size} ${isInteractive ? 'ui-chip--interactive' : ''} ${disabled ? 'ui-chip--disabled' : ''} ${className}`.trim()}
      onClick={isInteractive ? onClick : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      style={style}
      {...props}
    >
      {icon && (
        <span className="ui-chip__icon">
          {typeof icon === 'string' ? (
            <Icon icon={icon} width={iconSizeMap[size] || 16} />
          ) : (
            icon
          )}
        </span>
      )}
      {content !== null && content !== undefined && (
        <span className="ui-chip__label">{content}</span>
      )}
    </div>
  );
}

Chip.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
  children: PropTypes.node,
  variant: PropTypes.oneOf(['minimal', 'pill', 'outline', 'subtle']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};
