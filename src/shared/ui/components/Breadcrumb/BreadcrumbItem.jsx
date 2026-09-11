import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '../../primitives/Icon';

/**
 * Phần tử đơn lẻ trong Breadcrumb
 *
 * @param {React.ReactNode} children - Nội dung hiển thị
 * @param {string} [to] - Đường dẫn router nội bộ (dùng react-router-dom Link)
 * @param {string} [href] - Đường dẫn trang web ngoài
 * @param {function} [onClick] - Hàm xử lý click
 * @param {boolean} [active=false] - Đánh dấu đây là trang hiện tại
 * @param {string|React.ReactNode} [icon] - Icon tiền tố
 * @param {string} [className=''] - Class bổ sung
 */
export default function BreadcrumbItem({
  children,
  to,
  href,
  onClick,
  active = false,
  icon,
  className = '',
  ...props
}) {
  const renderContent = () => {
    const iconElement = icon && (
      <span className="ui-breadcrumb-icon">
        {typeof icon === 'string' ? <Icon icon={icon} width={15} /> : icon}
      </span>
    );

    if (active) {
      return (
        <span className="ui-breadcrumb-current" aria-current="page">
          {iconElement}
          {children}
        </span>
      );
    }

    if (to) {
      return (
        <Link to={to} className="ui-breadcrumb-link" onClick={onClick}>
          {iconElement}
          {children}
        </Link>
      );
    }

    if (href) {
      return (
        <a href={href} className="ui-breadcrumb-link" onClick={onClick}>
          {iconElement}
          {children}
        </a>
      );
    }

    if (onClick) {
      return (
        <span
          role="button"
          tabIndex={0}
          className="ui-breadcrumb-link"
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick(e);
            }
          }}
        >
          {iconElement}
          {children}
        </span>
      );
    }

    return (
      <span className="ui-breadcrumb-link">
        {iconElement}
        {children}
      </span>
    );
  };

  return (
    <li
      className={`ui-breadcrumb-item ${active ? 'is-active' : ''} ${className}`.trim()}
      {...props}
    >
      {renderContent()}
    </li>
  );
}

BreadcrumbItem.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
};
