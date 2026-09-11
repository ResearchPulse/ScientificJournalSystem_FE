import { useTranslation } from "react-i18next";
/**
 * @file AuthorNavigationTabs.jsx
 * @description Component thanh điều hướng phụ cho trang tác giả.
 */

import { useNavigate } from 'react-router-dom';
import { Tabs, Tab, TabList } from '@ui';
export default function AuthorNavigationTabs({
  activeTab,
  onTabChange
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();

  const handleTabChange = key => {
    if (onTabChange) {
      onTabChange(key);
      return;
    }
    if (key === 'list') {
      navigate('/authors');
    } else if (key === 'leaderboard') {
      navigate('/authors/leaderboard');
    }
  };

  return (
    <Tabs
      activeTab={activeTab}
      onTabChange={handleTabChange}
      variant="pills"
      className="author-tabs mb-4"
    >
      <TabList>
        <Tab eventKey="list" icon="lucide:users">
          {t("author.danhSachTacGia")}
        </Tab>
        <Tab eventKey="leaderboard" icon="lucide:trophy">
          {t("author.bangXepHang")}
        </Tab>
      </TabList>
    </Tabs>
  );
}