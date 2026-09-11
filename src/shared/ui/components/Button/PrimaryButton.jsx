import { Button as BsButton } from 'react-bootstrap';
import Icon from '../../primitives/Icon';
import './PrimaryButton.css';

/**
 * Reusable Button component with a unified styling system.
 *
 * @param {React.ReactNode} children - Button text or inner elements
 * @param {string} [icon] - Optional Iconify icon name (e.g. 'lucide:search')
 * @param {string} [className] - Optional extra CSS classes
 * @param {string} [type='button'] - Button type (button, submit, reset)
 * @param {string} [variant='primary'] - 'primary' | 'outline' | 'destructive' | 'link' | React-Bootstrap variants
 * @param {string} [size] - Button size ('sm' | 'lg')
 * @returns {JSX.Element}
 */
export default function PrimaryButton({
  children,
  icon = '',
  className = '',
  type = 'button',
  variant = 'primary',
  size,
  ...props
}) {
  const isLink = variant === 'link';
  const isCustomUnified = variant === 'primary' || variant === 'outline' || variant === 'destructive';
  const bsVariant = isCustomUnified ? undefined : variant;
  const variantClass = isCustomUnified ? `btn-variant-${variant}` : '';
  const unifiedClass = !isLink ? 'btn-unified' : '';

  return (
    <BsButton
      type={type}
      size={size}
      variant={bsVariant}
      className={`${unifiedClass} ${variantClass} ${className}`.trim()}
      {...props}
    >
      {icon && <Icon icon={icon} width={size === 'sm' ? '14' : '15'} className="btn-icon-unified" />}
      {children}
    </BsButton>
  );
}
