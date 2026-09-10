/**
 * Stack - Flex container primitive for consistent spacing & direction
 */
export default function Stack({
  as: Component = 'div',
  direction = 'vertical', // 'vertical' | 'horizontal'
  gap = 2,
  align = 'stretch',
  justify = 'flex-start',
  className = '',
  children,
  style,
  ...props
}) {
  const isHorizontal = direction === 'horizontal';
  const flexClasses = [
    'd-flex',
    isHorizontal ? 'flex-row' : 'flex-column',
    gap != null ? `gap-${gap}` : '',
    align ? `align-items-${align}` : '',
    justify ? `justify-content-${justify}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={flexClasses} style={style} {...props}>
      {children}
    </Component>
  );
}
