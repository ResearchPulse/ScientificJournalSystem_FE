import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\catalog\pages\CatalogSearchPage.jsx
 */
import { Container, Dropdown } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useCatalogSearch } from '../hooks/useCatalogSearch';
import FilterPanel from '../components/FilterPanel';
import JournalTable from '../components/JournalTable';
import { LoadingSkeleton, AuthRequiredModal, Pagination as AdminPagination, PrimaryButton, Breadcrumb } from '@ui';
import Header from '../../landing/components/Header';
import useAuth from '../../auth/hooks/useAuth';
import '../components/CatalogSearch.css';
export default function CatalogSearchPage() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const {
    user
  } = auth;
  const {
    searchInput,
    setSearchInput,
    subjectAreas,
    subjectCategories,
    loadingFilters,
    journals,
    total,
    loadingJournals,
    error,
    page,
    sort,
    selectedAreas,
    selectedCategories,
    selectedAccess,
    selectedQuartiles,
    selectedYear,
    selectedZone,
    zones,
    isOaDiamond,
    followedJournals,
    showAuthModal,
    setShowAuthModal,
    handleSearchSubmit,
    onAreaSelect,
    onCategorySelect,
    onAccessSelect,
    onQuartileSelect,
    onYearSelect,
    onZoneSelect,
    handleOaDiamondToggle,
    handleClearAll,
    handleSortChange,
    handlePageChange,
    handleFollowJournal,
    fetchJournals
  } = useCatalogSearch(user);
  const pageLimit = 10;
  const totalPages = Math.ceil(total / pageLimit) || 1;
  return <div className="min-vh-100 text-main catalog-search-page">
      {/* Navbar Header */}
      <Header />

      <Container className="catalog-shell">
        {/* Breadcrumb */}
        <Breadcrumb
          className="catalog-breadcrumb mb-4"
          items={[
            { label: t("home", "Home"), to: '/' },
            { label: t("catalog.danhMucTimKiem", "Catalog"), active: true },
          ]}
        />

        {/* Page Title & Subtitle */}
        <section className="catalog-hero text-start reveal-on-scroll">
          <div className="catalog-eyebrow">
            <Icon icon="lucide:library" width="15" height="15" />
            <span>ResearchPulse Journals</span>
          </div>
          <h1 className="catalog-title">{t("catalog.danhMucTimKiem")}</h1>
          <p className="catalog-subtitle">{t("catalog.timKiemJournalLocTheoLinhVucXe")}</p>
        </section>

        {/* Catalog Main Layout */}
        <div className="w-100">
          {/* Toolbar Filter Panel */}
          <div className="catalog-filter-section">
            <FilterPanel
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              onSearchSubmit={handleSearchSubmit}
              subjectAreas={subjectAreas}
              subjectCategories={subjectCategories}
              selectedAreas={selectedAreas}
              selectedCategories={selectedCategories}
              selectedAccess={selectedAccess}
              selectedQuartiles={selectedQuartiles}
              onAreaSelect={onAreaSelect}
              onCategorySelect={onCategorySelect}
              onAccessSelect={onAccessSelect}
              onQuartileSelect={onQuartileSelect}
              selectedYear={selectedYear}
              selectedZone={selectedZone}
              zones={zones}
              onYearSelect={onYearSelect}
              onZoneSelect={onZoneSelect}
              isOaDiamond={isOaDiamond}
              onOaDiamondToggle={handleOaDiamondToggle}
              onClearAll={handleClearAll}
              loading={loadingFilters}
              sort={sort}
              onSortChange={handleSortChange}
            />
          </div>

          {/* Kết quả đếm (chuẩn hóa theo Article) */}
          <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2 text-start">
            <div className="text-muted-custom text-xs">
              {loadingJournals ? (
                <span>{t("catalog.dangTimKiemTapChi")}</span>
              ) : (
                <span>
                  {t("pagination.showing", "Showing")}{" "}
                  <span className="text-main font-weight-bold">{journals.length}</span>{" "}
                  {t("pagination.of", "of")}{" "}
                  <span className="text-main font-weight-bold">{total ? total.toLocaleString() : 0}</span>{" "}
                  {t("catalog.tapChiCount", "journals")}
                </span>
              )}
            </div>
          </div>

          {/* Main Result Area */}
          <div className="reveal-on-scroll">
            {loadingJournals ?
          // 3 Skeleton list cards loading placeholder
          <div>
                {[1, 2, 3].map(s => <section key={s} className="catalog-surface p-4 mb-3 text-start">
                    <LoadingSkeleton width="60%" height="1.4rem" className="mb-3" />
                    <LoadingSkeleton width="45%" height="0.8rem" className="mb-3" />
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <LoadingSkeleton width="50px" height="1.2rem" />
                      <LoadingSkeleton width="100px" height="1.2rem" />
                      <LoadingSkeleton width="120px" height="1.2rem" />
                    </div>
                  </section>)}
              </div> : error && journals.length === 0 ? <section className="catalog-surface catalog-state-card">
                <Icon icon={error?.includes(t("catalog.dangNhap")) ? 'lucide:lock' : 'lucide:alert-triangle'} className="catalog-state-icon" width="44" />
                <h2 className="catalog-state-title">
                  {error?.includes(t("catalog.dangNhap")) ? t("catalog.canDangNhapDeTimKiem") : t("catalog.khongTheTaiDuLieuTimKiem")}
                </h2>
                <p className="text-muted-custom mb-4">{error}</p>
                {error?.includes(t("catalog.dangNhap")) ? <PrimaryButton onClick={() => window.location.href = '/login'} variant="outline">{t("signIn")}</PrimaryButton> : <PrimaryButton onClick={() => fetchJournals()} variant="outline">{t("article.thuLai")}</PrimaryButton>}
              </section> : journals.length === 0 ?
          // Empty State Card
          <section className="catalog-surface catalog-state-card">
                <Icon icon="lucide:folder-search" className="catalog-state-icon" width="44" />
                <h2 className="catalog-state-title">{t("catalog.khongTimThayJournalPhuHop")}</h2>
                <p className="text-muted-custom mb-4">{t("catalog.hayThuThayDoiTuKhoaTimKiemHoac")}</p>
                <PrimaryButton onClick={handleClearAll} variant="outline">{t("article.xoaBoLoc")}</PrimaryButton>
              </section> : (
                <JournalTable
                  journals={journals}
                  followedJournals={followedJournals}
                  onFollow={handleFollowJournal}
                  page={page}
                  limit={pageLimit}
                />
              )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && !loadingJournals && <div className="mt-5 reveal-on-scroll">
              <AdminPagination totalItems={total} currentPage={page} limit={pageLimit} onPageChange={handlePageChange} entityName="journals" />
            </div>}
        </div>
      </Container>

      {/* Guest Authentication Interception Modal */}
      <AuthRequiredModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />
    </div>;
}