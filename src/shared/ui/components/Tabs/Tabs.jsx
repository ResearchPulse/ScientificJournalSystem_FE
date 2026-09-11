import { createContext, useContext, useState } from 'react';
import Icon from '../../primitives/Icon';
import './Tabs.css';

const TabsContext = createContext(null);

/**
 * Reusable Tabs Root Component
 */
export default function Tabs({
  activeTab: controlledTab,
  defaultTab,
  onTabChange,
  variant = 'underline', // 'underline' | 'pills' | 'enclosed'
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

export function TabList({ className = '', children, ...props }) {
  return (
    <div role="tablist" className={`ui-tab-list ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

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
