import React, { createContext, useContext, useState } from 'react';
import Icon from '../../primitives/Icon';
import Badge from '../Badge';
import './Accordion.css';

const AccordionContext = createContext(null);

/**
 * Accordion Component (Hộp nội dung mở rộng / thu gọn chuẩn hóa)
 *
 * @param {string|number|Array<string|number>} [activeKey] - Key của item đang mở (Controlled)
 * @param {string|number|Array<string|number>} [defaultActiveKey] - Key mặc định mở khi mount (Uncontrolled)
 * @param {Function} [onToggle] - Callback (key) => void khi trạng thái đóng/mở thay đổi
 * @param {boolean} [alwaysOpen=false] - Cho phép mở nhiều item cùng một lúc hay chỉ 1 item
 * @param {string} [className=''] - Class bổ sung
 * @param {React.ReactNode} children - Các AccordionItem
 */
export default function Accordion({
  activeKey: controlledKey,
  defaultActiveKey,
  onToggle,
  alwaysOpen = false,
  className = '',
  children,
  ...props
}) {
  const [internalKey, setInternalKey] = useState(() => {
    if (defaultActiveKey !== undefined) return defaultActiveKey;
    return alwaysOpen ? [] : null;
  });

  const isControlled = controlledKey !== undefined;
  const currentKey = isControlled ? controlledKey : internalKey;

  const handleItemToggle = (itemKey) => {
    let nextKey;
    if (alwaysOpen) {
      const activeList = Array.isArray(currentKey) ? [...currentKey] : currentKey ? [currentKey] : [];
      const idx = activeList.indexOf(itemKey);
      if (idx > -1) {
        activeList.splice(idx, 1);
      } else {
        activeList.push(itemKey);
      }
      nextKey = activeList;
    } else {
      nextKey = currentKey === itemKey ? null : itemKey;
    }

    if (!isControlled) {
      setInternalKey(nextKey);
    }
    if (onToggle) {
      onToggle(nextKey);
    }
  };

  const isItemExpanded = (itemKey) => {
    if (alwaysOpen && Array.isArray(currentKey)) {
      return currentKey.includes(itemKey);
    }
    return currentKey === itemKey;
  };

  return (
    <AccordionContext.Provider value={{ handleItemToggle, isItemExpanded, alwaysOpen }}>
      <div className={`ui-accordion ${className}`.trim()} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

/**
 * AccordionItem
 *
 * @param {string|number} eventKey - Khóa định danh của item trong Accordion
 * @param {boolean} [isExpanded] - Trực tiếp điều khiển trạng thái mở nếu dùng độc lập
 * @param {Function} [onToggle] - Callback khi bấm toggle item
 * @param {string} [className='']
 */
export function AccordionItem({
  eventKey,
  isExpanded: directExpanded,
  onToggle,
  className = '',
  children,
  ...props
}) {
  const context = useContext(AccordionContext);
  const isExpanded = directExpanded !== undefined
    ? directExpanded
    : context && eventKey !== undefined
      ? context.isItemExpanded(eventKey)
      : false;

  const handleToggle = () => {
    if (onToggle) {
      onToggle(!isExpanded);
    }
    if (context && eventKey !== undefined) {
      context.handleItemToggle(eventKey);
    }
  };

  return (
    <div
      className={`ui-accordion-item ${isExpanded ? 'is-expanded' : ''} ${className}`.trim()}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          isExpanded,
          onToggle: handleToggle,
        });
      })}
    </div>
  );
}

/**
 * AccordionHeader
 *
 * @param {string|React.ReactNode} title - Tiêu đề chính
 * @param {string} [icon] - Tên Iconify icon bên trái (khi đóng)
 * @param {string} [expandedIcon] - Tên Iconify icon bên trái khi mở rộng
 * @param {string|number} [badge] - Nhãn badge hiển thị kế bên tiêu đề (ví dụ: năm 2025)
 * @param {string} [badgeVariant='secondary'] - Biến thể của Badge
 * @param {string|React.ReactNode} [meta] - Thông tin phụ trợ (ví dụ: '• 2 issues')
 * @param {boolean} [isExpanded] - Kế thừa từ AccordionItem
 * @param {Function} [onToggle] - Kế thừa từ AccordionItem
 * @param {React.ReactNode} [actions] - Khu vực nút hoặc link phụ ở header nếu có
 */
export function AccordionHeader({
  title,
  icon,
  expandedIcon,
  badge,
  badgeVariant = 'secondary',
  meta,
  actions,
  isExpanded,
  onToggle,
  className = '',
  children,
  ...props
}) {
  const activeIcon = isExpanded && expandedIcon ? expandedIcon : icon;

  return (
    <button
      type="button"
      className={`ui-accordion-header ${className}`.trim()}
      onClick={onToggle}
      aria-expanded={isExpanded}
      {...props}
    >
      <div className="ui-accordion-header-main">
        {activeIcon && (
          <div className="ui-accordion-icon-box">
            <Icon icon={activeIcon} width="20" />
          </div>
        )}
        <div className="ui-accordion-title-wrap">
          {title && <span className="ui-accordion-title">{title}</span>}
          {badge !== undefined && badge !== null && (
            <Badge pill variant={badgeVariant}>
              {badge}
            </Badge>
          )}
          {meta && <span className="ui-accordion-meta">{meta}</span>}
          {children}
        </div>
      </div>

      <div className="d-flex align-items-center gap-2">
        {actions && (
          <div onClick={(e) => e.stopPropagation()}>
            {actions}
          </div>
        )}
        <span className="ui-accordion-caret">
          <Icon icon={isExpanded ? 'lucide:chevron-up' : 'lucide:chevron-down'} width="18" />
        </span>
      </div>
    </button>
  );
}

/**
 * AccordionBody
 */
export function AccordionBody({
  isExpanded,
  className = '',
  children,
  ...props
}) {
  if (!isExpanded) return null;

  return (
    <div className={`ui-accordion-body ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
