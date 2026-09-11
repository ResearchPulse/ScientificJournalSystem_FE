import Icon from '../../primitives/Icon';

/**
 * Reusable FormError message component
 */
export default function FormError({ children, className = '', ...props }) {
  if (!children) return null;

  return (
    <div
      role="alert"
      className={`text-danger text-xs mt-1.5 d-flex align-items-center gap-1.5 ${className}`.trim()}
      style={{ fontWeight: 500 }}
      {...props}
    >
      <Icon icon="lucide:alert-circle" width="13" height="13" className="flex-shrink-0" />
      <span>{children}</span>
    </div>
  );
}
