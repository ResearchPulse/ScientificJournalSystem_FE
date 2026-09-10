/**
 * Box - Core layout primitive
 */
export default function Box({
  as: Component = 'div',
  className = '',
  children,
  style,
  ...props
}) {
  return (
    <Component className={className} style={style} {...props}>
      {children}
    </Component>
  );
}
