import { createContext, useContext, useState } from 'react';
import Icon from '../../primitives/Icon';
import './Tabs.css';

const TabsContext = createContext(null);

/**
 * Hệ thống Tabs điều hướng nội dung (Tabs System)
 * Hỗ trợ các biến thể thiết kế: 'underline' (gạch chân), 'pills' (viên thuốc bo tròn), 'enclosed' (thẻ đóng).
 *
 * @param {string} [activeTab] - Tab đang kích hoạt (dùng khi bạn muốn quản lý state bên ngoài - Controlled)
 * @param {string} [defaultTab] - Tab mặc định kích hoạt khi mở trang (Uncontrolled)
 * @param {Function} [onTabChange] - Hàm callback nhận vào tabKey khi người dùng bấm chuyển tab
 * @param {'underline'|'pills'|'enclosed'} [variant='underline'] - Phong cách giao diện tab
 * @param {string} [className=''] - Các lớp CSS bổ sung
 */
export default function Tabs({
  activeTab: controlledTab,
  defaultTab,
  onTabChange,
  variant = 'underline',
  className = '',
  children,
  ...props
}) {
  const [internalTab, setInternalTab] = useState(defaultTab);
  const isControlled = controlledTab !== undefined;
  const currentTab = isControlled ? controlledTab : internalTab;

  const handleTabSelect = (tabKey) => {
    if (!isControlled) {
      setInternalTab(tabKey);
    }
    if (onTabChange) {
      onTabChange(tabKey);
    }
  };

  return (
    <TabsContext.Provider value={{ currentTab, handleTabSelect, variant }}>
      <div className={`ui-tabs ui-tabs-${variant} ${className}`.trim()} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/**
 * Thanh chứa danh sách các nút bấm tab
 */
export function TabList({ className = '', children, ...props }) {
  return (
    <div role="tablist" className={`ui-tab-list ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

/**
 * Từng nút bấm tab đơn lẻ
 *
 * @param {string} eventKey - Khóa định danh duy nhất của tab
 * @param {boolean} [disabled=false] - Khóa tab không cho bấm
 * @param {string} [icon] - Tên icon Iconify hiển thị trước tiêu đề tab
 */
export function Tab({
  eventKey,
  disabled = false,
  icon,
  className = '',
  children,
  ...props
}) {
  const { currentTab, handleTabSelect } = useContext(TabsContext);
  const isActive = currentTab === eventKey;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => handleTabSelect(eventKey)}
      className={`ui-tab-button ${isActive ? 'is-active' : ''} ${className}`.trim()}
      {...props}
    >
      {icon && <Icon icon={icon} width="16" />}
      <span>{children}</span>
    </button>
  );
}

/**
 * Khung nội dung tương ứng hiển thị khi tab được chọn
 *
 * @param {string} eventKey - Khóa định danh khớp với eventKey của thẻ Tab
 */
export function TabPanel({ eventKey, className = '', children, ...props }) {
  const { currentTab } = useContext(TabsContext);
  if (currentTab !== eventKey) return null;

  return (
    <div role="tabpanel" className={`ui-tab-panel ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
