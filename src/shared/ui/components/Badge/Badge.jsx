import { Badge as BsBadge } from 'react-bootstrap';

/**
 * Badge - Semantic status and metadata indicator
 */
export default function Badge({
  children,
  variant = 'secondary', // 'primary' | 'secondary' | 'q1' | 'success' | 'warning' | 'danger'
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
