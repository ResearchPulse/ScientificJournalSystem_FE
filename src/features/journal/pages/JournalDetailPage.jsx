import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\journal\pages\JournalDetailPage.jsx
 */
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { PrimaryButton, Breadcrumb, AuthRequiredModal } from '@ui';

// Shared Layout Header
import Header from '../../landing/components/Header';

// Auth Hook
import useAuth from '../../auth/hooks/useAuth';

// Feature Components & Hooks
import { useJournalDetail } from '../hooks/useJournalDetail';
import JournalHero from '../components/JournalHero';
import JournalMetadataGrid from '../components/JournalMetadataGrid';
import JournalTabs from '../components/JournalTabs';
import RankingTabContent from '../components/RankingTabContent';
import VolumesTabContent from '../components/VolumesTabContent';
import ArticlesTabContent from '../components/ArticlesTabContent';
import AddToProjectModal from '../components/AddToProjectModal';
import '../components/JournalDetail.css';
export default function JournalDetailPage() {
  const {
    t
  } = useTranslation();
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const currentUser = auth?.user;
  const {
    journal,
    rankingHistory,
    volumes,
    issuesByVolume,
    issueErrors,
    volumePagination,
    issuePaginationByVolume,
    recentArticles,
    activeTab,
    setActiveTab,
    loadingJournal,
    loadingRanking,
    loadingVolumes,
    loadingArticles,
    volumesError,
    notFound,
    showAuthModal,
    setShowAuthModal,
    showProjectModal,
    setShowProjectModal,
    isFollowing,
    isAddingToProject,
    handleFollow,
    handleAddToProject,
    fetchIssuesForVolume,
    handleVolumePageChange,
    handleIssuePageChange
  } = useJournalDetail(id, currentUser);

  // Fallback for not found or empty ID
  if (notFound) {
    return <div className="min-vh-100 d-flex flex-column text-main journal-detail-page">
        <Header />
        <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center py-5">
          <div className="journal-dark-card p-5 text-center" style={{
          maxWidth: '500px'
        }}>
            <Icon icon="lucide:alert-circle" className="text-danger mb-4" width="64" />
            <h2 className="font-display fw-bold text-main mb-3">{t("journal.khongTimThayTapChi")}</h2>
            <p className="text-muted-custom mb-4">{t("journal.tapChiBanDangTimKiemKhongTonTa")}</p>
            <PrimaryButton className="px-4 py-2" onClick={() => navigate('/')}>{t("journal.quayLaiTrangChu")}</PrimaryButton>
          </div>
        </Container>
      </div>;
  }
  return <div className="min-vh-100 text-main pb-5 journal-detail-page">
      {/* Top Navbar */}
      <Header />

      {/* Main Container */}
      <Container className="journal-detail-shell">
        
        {/* Standardized Breadcrumb */}
        <div className="reveal-on-scroll">
          <Breadcrumb
            items={[
              { label: t("home", "Home"), href: '/' },
              { label: t("search", "Search"), href: '/search' },
              {
                label: loadingJournal ? t("common.dangTai", "Loading...") : journal?.display_name,
                active: true
              }
            ]}
          />
        </div>

        {/* Hero Section */}
        <div className="reveal-on-scroll">
          <JournalHero journal={journal} isFollowing={isFollowing} isAddingToProject={isAddingToProject} onFollow={handleFollow} onAddToProject={() => handleAddToProject()} loading={loadingJournal} />
        </div>

        {/* Grid Metadata metrics */}
        <div className="reveal-on-scroll delay-100">
          <JournalMetadataGrid journal={journal} loading={loadingJournal} />
        </div>

        {/* Tab Controls */}
        <div className="reveal-on-scroll">
          <JournalTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Tab Contents */}
        <div className="journal-tab-panel reveal-on-scroll">
          {activeTab === 'ranking' && <RankingTabContent rankingHistory={rankingHistory} metricName={journal?.metric_name || 'Impact Factor'} loading={loadingRanking} />}

          {activeTab === 'volumes' && <VolumesTabContent volumes={volumes} issuesByVolume={issuesByVolume} issueErrors={issueErrors} journalId={id} onVolumeExpand={fetchIssuesForVolume} loading={loadingVolumes} error={volumesError} volumePagination={volumePagination} issuePaginationByVolume={issuePaginationByVolume} onVolumePageChange={handleVolumePageChange} onIssuePageChange={handleIssuePageChange} />}

          {activeTab === 'articles' && <ArticlesTabContent recentArticles={recentArticles} loading={loadingArticles} onArticleClick={artId => navigate(`/articles/${artId}/visual`)} />}
        </div>
      </Container>

      {/* Guest warning auth modal */}
      <AuthRequiredModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />

      {/* Project selection modal */}
      <AddToProjectModal show={showProjectModal} onHide={() => setShowProjectModal(false)} journalId={id} onConfirm={handleAddToProject} />
    </div>;
}