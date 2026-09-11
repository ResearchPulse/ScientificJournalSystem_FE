import { useState } from 'react';
import './Tooltip.css';

/**
 * Reusable Tooltip Component
 *
 * @param {React.ReactNode} content - Tooltip text or content
 * @param {'top'|'bottom'|'left'|'right'} [placement='top'] - Position
 * @param {React.ReactNode} children - Target element to trigger tooltip
 * @param {string} [className=''] - Extra classes
 */
export default function Tooltip({
  content,
  placement = 'top',
  className = '',
  children,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);

  if (!content) return children;

  return (
    <span
      className={`ui-tooltip-wrapper ${className}`.trim()}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      {...props}
    >
      {children}
      <span
        role="tooltip"
        className={`ui-tooltip-bubble ui-tooltip-${placement} ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        {content}
      </span>
    </span>
  );
}
