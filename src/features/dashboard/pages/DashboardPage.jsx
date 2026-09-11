import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\dashboard\pages\DashboardPage.jsx
 */
import { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useUserStore } from "../../../app/store/userStore";
import useDashboard from "../hooks/useDashboard";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardStatCards from "../components/DashboardStatCards";
import PublicationTrendChart from "../components/PublicationTrendChart";
import RecentProjectsCard from "../components/RecentProjectsCard";
import TrendingKeywordsCard from "../components/TrendingKeywordsCard";
import QuickAccessGrid from "../components/QuickAccessGrid";
import TopAuthorsTable from "../components/TopAuthorsTable";
import ProjectListPage from "../../project/pages/ProjectListPage";
import CreateProjectPage from "../../project/pages/CreateProjectPage";
import MyWalletPage from "../../wallet/pages/MyWalletPage";
import TopUpPage from "../../wallet/pages/TopUpPage";
import TransactionHistoryPage from "../../wallet/pages/TransactionHistoryPage";
import useScrollReveal from "../../../shared/hooks/useScrollReveal";
import { Icon, AuthRequiredModal, PrimaryButton, Chip } from '@ui';

/**
 * DashboardPage — Trang Tổng quan / Dashboard
 * Route: /dashboard
 *
 * Layout:
 *  Header → Sidebar Layout:
 *    Sidebar [General, The trend of publication, Trending Keywords, Top Authors This Week]
 *    Content:
 *      1. General: Hero + 4 StatCards + Quickly Accessed (QuickAccessGrid)
 *      2. The trend of publication: PublicationTrendChart + RecentProjectsCard
 *      3. Trending Keywords: TrendingKeywordsCard
 *      4. Top Authors This Week: TopAuthorsTable
 */
export default function DashboardPage() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const email = useUserStore(state => state.email);

  // Sidebar collapse state
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem("rp_dashboard_sidebar_collapsed") === "true";
  });
  const handleToggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("rp_dashboard_sidebar_collapsed", String(next));
      return next;
    });
  }, []);

  // Tab state synced with URL search params: 'general' | 'trends' | 'keywords' | 'authors'
  const activeTab = searchParams.get("tab") || "general";
  const handleSelectTab = useCallback((tabId) => {
    setSearchParams({ tab: tabId });
  }, [setSearchParams]);

  // Year range select state for publication trends ('5', '10', 'all')
  const [trendRange, setTrendRange] = useState("5");
  const {
    projects,
    analytics,
    trendingKeywords,
    topAuthors,
    summaryStats,
    loadingProjects,
    loadingAnalytics,
    loadingKeywords,
    loadingAuthors,
    errorProjects,
    errorAnalytics,
    errorKeywords,
    errorAuthors,
    refetchAnalytics
  } = useDashboard(email, trendRange);

  // Quick search state
  const [quickSearch] = useState("");

  // Auth modal (for "Tạo Project mới" when guest)
  const [showAuthModal, setShowAuthModal] = useState(false);
  const handleCreateProject = () => {
    if (!email) {
      setShowAuthModal(true);
    } else {
      handleSelectTab("create-project");
    }
  };
  const handleProjectClick = project => {
    const id = project.project_id ?? project.id;
    if (id) navigate(`/projects/${id}`);
  };
  const handleAuthorClick = author => {
    const id = author.author_id ?? author.id;
    if (id) navigate(`/authors/${id}`);
  };
  const handleKeywordClick = keyword => {
    navigate(`/catalog?search=${encodeURIComponent(keyword)}`);
  };

  // Scroll reveal animation for all cards
  useScrollReveal('.reveal-on-scroll', [projects, analytics, trendingKeywords, topAuthors, activeTab]);

  return (
    <div className="dashboard-layout-page">
      <div className={`dashboard-body ${isCollapsed ? 'is-sidebar-collapsed' : ''}`}>
        {/* ── Left Sidebar ────────────────────────────────────────── */}
        <DashboardSidebar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />

        {/* ── Main Tab Content ────────────────────────────────────── */}
        <main className="dashboard-content">
          {/* Tab 1: General (Hero + 4 Stat Cards + Quick Access) */}
          {activeTab === "general" && (
            <div key="general" className="dashboard-tab-panel">
              {/* Welcome Hero Banner */}
              <div
                className="p-4 p-md-5 mb-4 position-relative overflow-hidden reveal-on-scroll"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)"
                }}
              >
                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-4 position-relative" style={{ zIndex: 1 }}>
                  <div>
                    <Chip
                      icon="lucide:sparkles"
                      label="ResearchPulse Analytics"
                      variant="minimal"
                      size="sm"
                      className="mb-3"
                    />
                    <h1
                      className="font-display fw-bold text-main mb-2"
                      style={{
                        fontSize: "calc(1.5rem + 0.8vw)",
                        letterSpacing: "-0.02em"
                      }}
                    >
                      {t("dashboard.chaoMungBanDenVoiResearchpulse")}
                    </h1>
                    <p
                      className="text-muted-custom mb-0 font-display"
                      style={{
                        fontSize: "0.95rem",
                        maxWidth: "640px"
                      }}
                    >
                      {t("dashboard.khamPhaXuHuongXepHangTapChiVaC")}
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-3 flex-shrink-0">
                    <PrimaryButton
                      className="px-4 py-2.5 d-inline-flex align-items-center gap-2"
                      onClick={handleCreateProject}
                    >
                      <Icon icon="lucide:plus" width={18} />
                      <span>{t("dashboard.taoProject")}</span>
                    </PrimaryButton>
                  </div>
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="reveal-on-scroll mb-4">
                <DashboardStatCards stats={summaryStats} loading={loadingProjects} />
              </div>

              {/* Quickly accessed */}
              <div className="reveal-on-scroll">
                <QuickAccessGrid />
              </div>
            </div>
          )}

          {/* Tab: Projects */}
          {activeTab === "projects" && (
            <div key="projects" className="dashboard-tab-panel">
              <ProjectListPage embedded={true} />
            </div>
          )}

          {/* Tab: Create Project (stays in Dashboard with sidebar) */}
          {activeTab === "create-project" && (
            <div key="create-project" className="dashboard-tab-panel">
              <CreateProjectPage embedded={true} onCancel={() => handleSelectTab("projects")} />
            </div>
          )}

          {/* Tab: The trend of publication */}
          {activeTab === "trends" && (
            <div key="trends" className="dashboard-tab-panel">
              <Row className="g-3">
                <Col xs={12} lg={8} className="reveal-on-scroll">
                  <PublicationTrendChart
                    analytics={analytics}
                    loading={loadingAnalytics}
                    error={errorAnalytics}
                    onRetry={() => refetchAnalytics()}
                    selectedRange={trendRange}
                    onRangeChange={setTrendRange}
                  />
                </Col>
                <Col xs={12} lg={4} className="reveal-on-scroll delay-100">
                  <RecentProjectsCard
                    projects={projects}
                    loading={loadingProjects}
                    error={errorProjects}
                    onViewAll={() => handleSelectTab("projects")}
                    onProjectClick={handleProjectClick}
                  />
                </Col>
              </Row>
            </div>
          )}

          {/* Tab: Trending Keywords */}
          {activeTab === "keywords" && (
            <div key="keywords" className="dashboard-tab-panel reveal-on-scroll">
              <TrendingKeywordsCard
                keywords={trendingKeywords}
                loading={loadingKeywords}
                error={errorKeywords}
                onKeywordClick={handleKeywordClick}
                onViewMore={() => navigate("/catalog")}
              />
            </div>
          )}

          {/* Tab: Top Authors This Week */}
          {activeTab === "authors" && (
            <div key="authors" className="dashboard-tab-panel reveal-on-scroll">
              <TopAuthorsTable
                authors={topAuthors}
                loading={loadingAuthors}
                error={errorAuthors}
                onAuthorClick={handleAuthorClick}
                onViewAll={() => navigate("/authors")}
              />
            </div>
          )}

          {/* ── Section 2: Wallet Tabs ── */}
          {activeTab === "wallet" && (
            <div key="wallet" className="dashboard-tab-panel">
              <MyWalletPage />
            </div>
          )}

          {activeTab === "topup" && (
            <div key="topup" className="dashboard-tab-panel">
              <TopUpPage />
            </div>
          )}

          {activeTab === "transactions" && (
            <div key="transactions" className="dashboard-tab-panel">
              <TransactionHistoryPage />
            </div>
          )}
        </main>
      </div>

      {/* Auth modal for guests clicking "Tạo Project mới" */}
      <AuthRequiredModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />
    </div>
  );
}