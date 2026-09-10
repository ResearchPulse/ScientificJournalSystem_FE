import { Icon as IconifyIcon } from '@iconify/react';

/**
 * Icon - Core icon primitive using Iconify
 */
export default function Icon({
  icon,
  width = '16',
  height,
  className = '',
  ...props
}) {
  return (
    <IconifyIcon
      icon={icon}
      width={width}
      height={height || width}
      className={className}
      {...props}
    />
  );
}
