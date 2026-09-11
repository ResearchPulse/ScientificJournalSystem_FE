import { useState } from 'react';
import Icon from '../../primitives/Icon';
import './Avatar.css';

/**
 * Trợ thủ trích xuất 1-2 chữ cái đầu của tên (Initials fallback)
 */
function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const iconSizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 26,
  xl: 34,
};

/**
 * Ảnh đại diện người dùng hoặc khối biểu tượng hình (Avatar / IconBox)
 * Tự động chuyển sang hiển thị icon hoặc chữ cái đầu khi ảnh chưa tải / không có ảnh.
 *
 * @param {string} [src] - Đường dẫn URL của ảnh đại diện
 * @param {string} [name=''] - Họ tên người dùng / tên đơn vị (dùng để sinh chữ cái đầu hoặc title)
 * @param {string|React.ReactNode} [icon] - Tên icon Iconify hoặc node icon (ví dụ: 'solar:wallet-bold', 'lucide:user')
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [size='md'] - Kích thước avatar/icon box (24px đến 68px)
 * @param {'circle'|'square'} [shape='circle'] - Hình dáng: 'circle' (tròn) hoặc 'square' (bo vuông)
 * @param {'online'|'offline'|'busy'} [status] - Chấm đèn tín hiệu trạng thái
 * @param {string} [bgColor] - Màu nền tuỳ biến
 * @param {string} [color] - Màu chữ hoặc icon tuỳ biến
 * @param {string} [className=''] - Các lớp CSS bổ sung
 */
export default function Avatar({
  src,
  name = '',
  icon,
  size = 'md',
  shape = 'circle',
  status,
  bgColor,
  color,
  className = '',
  ...props
}) {
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(src && !imgError);
  const initials = getInitials(name);

  const style = {
    ...(bgColor ? { backgroundColor: bgColor } : {}),
    ...(color ? { color } : {}),
  };

  return (
    <div
      className={`ui-avatar ui-avatar-${size} ui-avatar-${shape} ${className}`.trim()}
      style={Object.keys(style).length > 0 ? style : undefined}
      title={name || undefined}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          onError={() => setImgError(true)}
          className="ui-avatar-img"
        />
      ) : icon ? (
        typeof icon === 'string' ? (
          <Icon
            icon={icon}
            width={iconSizeMap[size] || 20}
            className="ui-avatar-icon"
          />
        ) : (
          <span className="ui-avatar-icon">{icon}</span>
        )
      ) : (
        <span className="ui-avatar-initials">{initials}</span>
      )}

      {status && (
        <span
          className={`ui-avatar-status ui-avatar-status-${status}`}
          aria-label={status}
        />
      )}
    </div>
  );
}

/**
 * Nhóm avatar xếp chồng lên nhau (AvatarGroup)
 * Tự động gộp và hiển thị số lượng vượt quá (ví dụ: +3 tác giả khác).
 *
 * @param {number} [max=4] - Số lượng avatar tối đa hiển thị trước khi gộp
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [size='md'] - Kích thước đồng bộ cho toàn nhóm
 */
export function AvatarGroup({
  children,
  max = 4,
  size = 'md',
  className = '',
  ...props
}) {
  const avatars = Array.isArray(children) ? children : [children];
  const visible = avatars.slice(0, max);
  const excess = avatars.length - max;

  return (
    <div className={`ui-avatar-group ${className}`.trim()} {...props}>
      {visible}
      {excess > 0 && (
        <div
          className={`ui-avatar ui-avatar-${size} ui-avatar-circle ui-avatar-group-excess`}
          title={`+${excess} more`}
        >
          +{excess}
        </div>
      )}
    </div>
  );
}

Avatar.Group = AvatarGroup;
