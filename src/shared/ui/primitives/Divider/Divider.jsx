/**
 * Divider - Border separator primitive
 */
export default function Divider({
  orientation = 'horizontal', // 'horizontal' | 'vertical'
  className = '',
  style,
  ...props
}) {
  const isVertical = orientation === 'vertical';

  if (isVertical) {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`d-inline-block border-start ${className}`}
        style={{
          borderColor: 'var(--border)',
          minHeight: '1em',
          verticalAlign: 'middle',
          ...style,
        }}
        {...props}
      />
    );
  }

  return (
    <hr
      role="separator"
      className={`my-3 border-top ${className}`}
      style={{
        borderColor: 'var(--border)',
        opacity: 1,
        ...style,
      }}
      {...props}
    />
  );
}
