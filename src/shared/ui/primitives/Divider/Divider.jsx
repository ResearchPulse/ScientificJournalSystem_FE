/**
 * Divider - Border separator primitive with optional center label support
 */
export default function Divider({
  orientation = 'horizontal', // 'horizontal' | 'vertical'
  className = '',
  children,
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

  if (children) {
    return (
      <div
        role="separator"
        className={`d-flex align-items-center my-3 ${className}`}
        style={style}
        {...props}
      >
        <div className="flex-grow-1 border-top" style={{ borderColor: 'var(--border)' }} />
        <span
          className="px-3 text-muted-custom small text-uppercase fw-semibold"
          style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}
        >
          {children}
        </span>
        <div className="flex-grow-1 border-top" style={{ borderColor: 'var(--border)' }} />
      </div>
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
