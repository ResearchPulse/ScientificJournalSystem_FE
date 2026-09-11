import { useState } from 'react';
import './Avatar.css';

/**
 * Helper to get initials from a person's or entity's name
 */
function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Reusable Avatar Component
 *
 * @param {string} [src] - Image source URL
 * @param {string} [name=''] - Name of user/entity (used for alt & fallback initials)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [size='md'] - Avatar size
 * @param {'circle'|'square'} [shape='circle'] - Avatar shape
 * @param {'online'|'offline'|'busy'} [status] - Optional status indicator
 * @param {string} [bgColor] - Custom background color for initials
 * @param {string} [className=''] - Extra classes
 */
export default function Avatar({
  src,
  name = '',
  size = 'md',
  shape = 'circle',
  status,
  bgColor,
  className = '',
  ...props
}) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;
  const initials = getInitials(name);

  const style = bgColor ? { backgroundColor: bgColor } : undefined;

  return (
    <div
      className={`ui-avatar ui-avatar-${size} ui-avatar-${shape} ${className}`.trim()}
      style={style}
      title={name}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgError(true)}
          className="ui-avatar-img"
        />
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
 * AvatarGroup Component for rendering stacked avatars with limit
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
