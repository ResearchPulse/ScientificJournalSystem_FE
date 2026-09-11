import { useTranslation } from "react-i18next";
/**
 * @file AuthorLeaderboardPage.jsx
 * @description Trang hiển thị Bảng xếp hạng Tác giả.
 */

import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Icon, Breadcrumb, Chip, PrimaryButton, FilterCard, FilterSelect, Pagination as AdminPagination } from '@ui';
import Header from '../../landing/components/Header';
import useAuthors from '../hooks/useAuthors';
import AuthorLeaderboardTable from '../components/AuthorLeaderboardTable';
import AuthorNavigationTabs from '../components/AuthorNavigationTabs';
import './AuthorLeaderboardPage.css';
export default function AuthorLeaderboardPage() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const {
    leaderboard,
    loadingLeaderboard,
    errorLeaderboard,
    fetchLeaderboard,
    totalLeaderboard,
    leaderboardTotalPages
  } = useAuthors();
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  useEffect(() => {
    fetchLeaderboard({
      subject_area: selectedArea,
      period: selectedPeriod,
      page: currentPage,
      limit: limit
    });
  }, [selectedArea, selectedPeriod, currentPage, fetchLeaderboard]);
  const handleAreaChange = e => {
    setSelectedArea(e.target.value);
    setCurrentPage(1);
  };
  const handlePeriodChange = e => {
    setSelectedPeriod(e.target.value);
    setCurrentPage(1);
  };
  return <div className="author-leaderboard-page">
      <Header />

      <Container>
        <Breadcrumb
          className="mb-4"
          items={[
            { label: t("home", "Home"), to: '/' },
            { label: t("author.tacGiaNoiBat", "Authors"), to: '/authors' },
            { label: t("author.bangXepHang", "Bảng xếp hạng"), active: true }
          ]}
        />

        <section className="author-leaderboard-hero reveal-on-scroll">
          <div className="author-leaderboard-hero__content d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
            <div>
              <Chip
                icon="lucide:trophy"
                label="Author leaderboard"
                variant="minimal"
                className="mb-2"
              />
              <h1 className="author-leaderboard-title">{t("author.bangXepHangTacGia")}</h1>
              <p className="author-leaderboard-description">{t("author.cacTacGiaNoiBatNhatHeThongDuoc")}</p>
            </div>
            <PrimaryButton variant="outline" onClick={() => navigate('/authors')} className="px-3 py-2" icon="lucide:arrow-left">
              <span>{t("author.quayLaiDanhSachTacGia")}</span>
            </PrimaryButton>
          </div>
        </section>

        <AuthorNavigationTabs activeTab="leaderboard" />

        <FilterCard className="author-leaderboard-filter-card reveal-on-scroll">
          <div className="d-flex flex-wrap align-items-center gap-4 py-1">
            <div className="author-leaderboard-filter-control">
              <span className="author-leaderboard-label">{t("author.linhVuc1")}</span>
              <FilterSelect
                value={selectedArea}
                onChange={e => setSelectedArea(e.target.value)}
                header={t("author.linhVuc1", "Field")}
                variant="compact"
                options={[{
                  value: '',
                  label: t("author.tatCaLinhVuc")
                }, {
                  value: 'Machine Learning',
                  label: 'Machine Learning'
                }, {
                  value: 'Computer Vision',
                  label: 'Computer Vision'
                }, {
                  value: 'Deep Learning',
                  label: 'Deep Learning'
                }, {
                  value: 'Quantum Optics',
                  label: 'Quantum Optics'
                }]}
              />
            </div>

            <div className="author-leaderboard-filter-control">
              <span className="author-leaderboard-label">{t("author.thoiGian")}</span>
              <FilterSelect
                value={selectedPeriod}
                onChange={e => setSelectedPeriod(e.target.value)}
                header={t("author.thoiGian", "Time range")}
                variant="compact"
                options={[{
                  value: 'all',
                  label: t("author.tatCaThoiGian")
                }, {
                  value: 'week',
                  label: t("author.tuanNay")
                }, {
                  value: 'month',
                  label: t("author.thangNay")
                }]}
              />
            </div>
          </div>
        </FilterCard>

        <div className="reveal-on-scroll">
          <AuthorLeaderboardTable authors={leaderboard} loading={loadingLeaderboard} error={errorLeaderboard} onRetry={() => fetchLeaderboard({
          subject_area: selectedArea,
          period: selectedPeriod,
          page: currentPage,
          limit: limit
        })} />
        </div>

        {leaderboard.length > 0 && leaderboardTotalPages > 1 && <AdminPagination totalItems={totalLeaderboard} currentPage={currentPage} limit={limit} onPageChange={setCurrentPage} entityName={t("author.tacGia")} />}
      </Container>
    </div>;
}