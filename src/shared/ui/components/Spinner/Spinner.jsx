import './Spinner.css';

/**
 * Reusable Spinner (Loading indicator) Component
 *
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [size='md'] - Spinner size
 * @param {'primary'|'white'|'dark'|'success'|'danger'} [variant='primary'] - Color variant
 * @param {string} [label='Loading...'] - Accessible label for screen readers
 * @param {string} [className=''] - Extra classes
 */
export default function Spinner({
  size = 'md',
  variant = 'primary',
  label = 'Loading...',
  className = '',
  ...props
}) {
  return (
    <span
      role="status"
      className={`ui-spinner ui-spinner-${size} ui-spinner-${variant} ${className}`.trim()}
      {...props}
    >
      <span className="ui-visually-hidden">{label}</span>
    </span>
  );
}
