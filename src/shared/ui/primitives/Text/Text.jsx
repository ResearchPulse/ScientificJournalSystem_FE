/**
 * Text - Typography primitive respecting design tokens
 */
export default function Text({
  as: Component = 'span',
  variant = 'body', // 'body' | 'heading' | 'muted' | 'accent'
  size = '',
  weight = '',
  className = '',
  children,
  style,
  ...props
}) {
  const variantClass = {
    body: 'text-main',
    heading: 'text-main fw-bold font-display',
    muted: 'text-muted-custom',
    accent: 'text-primary',
  }[variant] || '';

  const classes = [
    variantClass,
    size ? `fs-${size}` : '',
    weight ? `fw-${weight}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} style={style} {...props}>
      {children}
    </Component>
  );
}
