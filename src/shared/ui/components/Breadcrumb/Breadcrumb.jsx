import PropTypes from 'prop-types';
import BreadcrumbItem from './BreadcrumbItem';
import './Breadcrumb.css';

/**
 * Component Breadcrumb điều hướng phân cấp chuẩn hóa trong bộ Design System (@ui).
 * Hỗ trợ 2 cách dùng:
 * 1. Dùng qua prop `items`:
 *    <Breadcrumb items={[
 *      { label: 'Home', to: '/' },
 *      { label: 'Catalog', active: true }
 *    ]} />
 * 
 * 2. Dùng dạng Compound component:
 *    <Breadcrumb>
 *      <Breadcrumb.Item to="/">Home</Breadcrumb.Item>
 *      <Breadcrumb.Item active>Catalog</Breadcrumb.Item>
 *    </Breadcrumb>
 *
 * @param {Array<object>} [items] - Danh sách các mục breadcrumb
 * @param {string} [separator] - Ký tự phân cách (mặc định là "/")
 * @param {string} [ariaLabel='Breadcrumb'] - Nhãn trợ năng
 * @param {string} [className=''] - Class CSS bổ sung
 * @param {object} [style] - Inline style
 * @param {React.ReactNode} [children] - Các Breadcrumb.Item con
 */
export default function Breadcrumb({
  items,
  separator,
  ariaLabel = 'Breadcrumb',
  className = '',
  style = {},
  children,
  ...props
}) {
  const customStyle = separator
    ? { '--ui-breadcrumb-separator': `"${separator}"`, ...style }
    : style;

  return (
    <nav
      aria-label={ariaLabel}
      className={`ui-breadcrumb-nav ${className}`.trim()}
      style={customStyle}
      {...props}
    >
      <ol className="ui-breadcrumb">
        {Array.isArray(items) && items.length > 0
          ? items.map((item, index) => {
              const isLast = index === items.length - 1;
              const isActive = item.active !== undefined ? item.active : isLast;
              return (
                <BreadcrumbItem
                  key={item.key || index}
                  to={item.to}
                  href={item.href}
                  onClick={item.onClick}
                  active={isActive}
                  icon={item.icon}
                  className={item.className}
                >
                  {item.label}
                </BreadcrumbItem>
              );
            })
          : children}
      </ol>
    </nav>
  );
}

// Gắn Subcomponent để hỗ trợ dạng Compound Component
Breadcrumb.Item = BreadcrumbItem;

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      to: PropTypes.string,
      href: PropTypes.string,
      onClick: PropTypes.func,
      active: PropTypes.bool,
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      className: PropTypes.string,
    })
  ),
  separator: PropTypes.string,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};
