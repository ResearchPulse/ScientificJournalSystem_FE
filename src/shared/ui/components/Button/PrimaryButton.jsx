import { Button } from 'react-bootstrap';
import Icon from '../../primitives/Icon';
import './PrimaryButton.css';

/**
 * Reusable Primary Button component with a unified styling system.
 *
 * @param {React.ReactNode} children - Button text or inner elements
 * @param {string} [icon] - Optional Iconify icon name (e.g. 'lucide:search')
 * @param {string} [className] - Optional extra CSS classes
 * @param {string} [type='button'] - Button type (button, submit, reset)
 * @param {string} [variant='primary'] - 'primary' | 'outline' | 'destructive'
 * @returns {JSX.Element}
 */
export default function PrimaryButton({
  children,
  icon = '',
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}) {
  return (
    <Button
      type={type}
      className={`btn-unified btn-variant-${variant} ${className}`}
      {...props}
    >
      {icon && <Icon icon={icon} width="15" className="btn-icon-unified" />}
      {children}
    </Button>
  );
}
