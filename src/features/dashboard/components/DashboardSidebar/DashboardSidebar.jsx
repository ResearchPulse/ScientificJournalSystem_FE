import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { Icon, Chip } from '@ui';
import { useTranslation } from 'react-i18next';
import ROUTES from '@/app/routes/routePaths';
import { useUserStore } from '@/app/store/userStore';
import useAuth from '@features/auth/hooks/useAuth';
import CoinBalanceBadge from '@features/wallet/components/CoinBalanceBadge';

/**
 * Danh sách các nhóm tab chính của Dashboard được chia thành các phần lớn ngăn cách bởi vách ngăn
 */
export const DASHBOARD_SECTIONS = [
  {
    id: 'overview',
    items: [
      {
        id: 'general',
        labelKey: 'dashboard.general',
        fallbackLabel: 'General',
        icon: 'lucide:layout-grid',
      },
      {
        id: 'projects',
        labelKey: 'landing.duAn',
        fallbackLabel: 'Projects',
        icon: 'lucide:folder',
      },
      {
        id: 'trends',
        labelKey: 'dashboard.trendOfPublication',
        fallbackLabel: 'The trend of publication',
        icon: 'lucide:trending-up',
      },
      {
        id: 'keywords',
        labelKey: 'dashboard.trendingKeywords',
        fallbackLabel: 'Trending Keywords',
        icon: 'lucide:hash',
      },
      {
        id: 'authors',
        labelKey: 'dashboard.topAuthorsThisWeek',
        fallbackLabel: 'Top Authors This Week',
        icon: 'lucide:trophy',
      },
    ],
  },
  {
    id: 'wallet',
    items: [
      {
        id: 'wallet',
        labelKey: 'landing.viCuaToi',
        fallbackLabel: 'My Wallet',
        icon: 'lucide:wallet',
      },
      {
        id: 'topup',
        labelKey: 'wallet.napCoin',
        fallbackLabel: 'Top Up Coins',
        icon: 'lucide:badge-plus',
      },
      {
        id: 'transactions',
        labelKey: 'wallet.lichSuGiaoDich',
        fallbackLabel: 'Transaction History',
        icon: 'lucide:history',
      },
    ],
  },
];

export const DASHBOARD_TABS = DASHBOARD_SECTIONS.flatMap((s) => s.items);

/**
 * DashboardSidebar — Thanh điều hướng phân chia tab tính năng cho trang Dashboard
 *
 * @param {Object} props
 * @param {string} props.activeTab - Tab ID hiện tại đang được chọn
 * @param {Function} props.onSelectTab - Callback khi người dùng chuyển tab
 * @param {boolean} [props.isCollapsed=false] - Trạng thái thu nhỏ sidebar
 * @param {Function} props.onToggleCollapse - Hàm chuyển đổi thu nhỏ / mở rộng sidebar
 */
export default function DashboardSidebar({
  activeTab = 'general',
  onSelectTab,
  isCollapsed = false,
  onToggleCollapse
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const email = useUserStore((state) => state.email);
  const clearEmail = useUserStore((state) => state.clearEmail);
  const auth = useAuth?.() ?? { logout: () => {} };
  const userRole = auth.user?.role;
  const accountManagementRoute = userRole === 'ADMINISTRATOR' ? ROUTES.ADMIN_USERS : ROUTES.PROFILE;

  const handleLogout = () => {
    if (auth?.logout) {
      auth.logout();
    } else {
      clearEmail();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    navigate(ROUTES.HOME);
  };

  return (
    <aside className={`dashboard-sidebar ${isCollapsed ? 'is-collapsed' : ''}`} aria-label="Dashboard Sidebar">
      <div className="dashboard-sidebar__top">
        {/* Brand Header Row with Collapse Toggle */}
        <div className="dashboard-sidebar__brand-row">
          <div
            className="dashboard-sidebar__brand"
            onClick={() => navigate(ROUTES.HOME)}
            title="ResearchPulse - Về trang chủ"
          >
            <div className="dashboard-sidebar__brand-icon">
              <Icon icon="lucide:activity" width={18} />
            </div>
            {!isCollapsed && (
              <div className="dashboard-sidebar__brand-text">
                <span className="dashboard-sidebar__brand-title">ResearchPulse</span>
                <span className="dashboard-sidebar__brand-sub">Analytics Hub</span>
              </div>
            )}
          </div>

          <Chip
            icon={isCollapsed ? "lucide:panel-left-open" : "lucide:panel-left-close"}
            variant="minimal"
            onClick={onToggleCollapse}
            className="dashboard-sidebar__toggle-chip"
            title={isCollapsed ? "Mở rộng sidebar" : "Thu nhỏ sidebar"}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          />
        </div>

        {/* Tab Navigation Items divided into sections */}
        <nav className="dashboard-sidebar__nav" role="tablist">
          {DASHBOARD_SECTIONS.map((section, sIdx) => (
            <React.Fragment key={section.id}>
              {sIdx > 0 && <div className="dashboard-sidebar__divider" role="separator" />}
              <div className="dashboard-sidebar__section">
                {section.items.map((tab) => {
                  const isActive = activeTab === tab.id || (tab.id === 'projects' && activeTab === 'create-project');
                  const label = t(tab.labelKey, tab.fallbackLabel);

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={isActive ? 0 : -1}
                      className={`dashboard-sidebar__item ${isActive ? 'active' : ''}`}
                      onClick={() => onSelectTab && onSelectTab(tab.id)}
                      title={label}
                    >
                      <div className="dashboard-sidebar__item-icon-box">
                        <Icon icon={tab.icon} width={18} />
                      </div>
                      {!isCollapsed && <span className="dashboard-sidebar__item-label">{label}</span>}
                      {!isCollapsed && isActive && <span className="dashboard-sidebar__active-pill" />}
                    </button>
                  );
                })}
              </div>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Sidebar Bottom: Ví tiền & Icon User góc dưới */}
      <div className="dashboard-sidebar__bottom">
        {email ? (
          <div className="dashboard-sidebar__user-group">
            {/* Coin / Wallet badge */}
            <div className="dashboard-sidebar__wallet-slot" title={t("landing.viCuaToi", "Ví của tôi")}>
              <CoinBalanceBadge onClick={() => (onSelectTab ? onSelectTab('wallet') : navigate(ROUTES.WALLET))} />
            </div>

            {/* User Dropdown */}
            <Dropdown drop="up" align="start" className="w-100">
              <Dropdown.Toggle as="button" type="button" className="dashboard-sidebar__user-toggle" aria-label="User menu">
                <div className="dashboard-sidebar__user-avatar">
                  <Icon icon="lucide:user" width={17} />
                </div>
                {!isCollapsed && (
                  <div className="dashboard-sidebar__user-meta">
                    <span className="dashboard-sidebar__user-email">{email}</span>
                  </div>
                )}
                {!isCollapsed && (
                  <Icon icon="lucide:chevron-up" width={14} className="dashboard-sidebar__user-chevron" />
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu className="border-0 shadow-lg mb-2 dashboard-sidebar__dropdown-menu">
                <div className="px-3 py-2 text-xs font-bold text-main border-bottom pb-2 mb-1">
                  <span>{t("landing.nguoiDung", "Người dùng")}</span>
                  <div className="text-muted text-truncate font-normal" style={{ fontSize: "11px" }}>
                    {email}
                  </div>
                </div>
                <Dropdown.Item onClick={() => (onSelectTab ? onSelectTab('wallet') : navigate(ROUTES.WALLET))} className="d-flex align-items-center gap-2 text-xs py-2">
                  <Icon icon="solar:wallet-bold" width={15} style={{ color: 'var(--primary)' }} />
                  <span className="fw-semibold">{t("landing.viCuaToi", "Ví của tôi")}</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(accountManagementRoute)} className="d-flex align-items-center gap-2 text-xs py-2">
                  <Icon icon="lucide:users" width={15} className="text-muted" />
                  <span>{t("landing.quanTriTaiKhoan", "Quản trị tài khoản")}</span>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="d-flex align-items-center gap-2 text-xs py-2 text-danger">
                  <Icon icon="lucide:log-out" width={15} />
                  <span>{t("landing.dangXuat", "Đăng xuất")}</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <button
            type="button"
            className="dashboard-sidebar__login-btn"
            onClick={() => navigate(ROUTES.LOGIN)}
            title={t("signIn", "Đăng nhập")}
          >
            <Icon icon="lucide:log-in" width={17} />
            {!isCollapsed && <span>{t("signIn", "Đăng nhập")}</span>}
          </button>
        )}
      </div>
    </aside>
  );
}
