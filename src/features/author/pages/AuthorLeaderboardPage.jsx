import { useTranslation } from "react-i18next";
/**
 * @file AuthorLeaderboardPage.jsx
 * @description Trang hiển thị Bảng xếp hạng Tác giả.
 */

import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../shared/components/Icon';
import Header from '../../landing/components/Header';
import useAuthors from '../hooks/useAuthors';
import AuthorLeaderboardTable from '../components/AuthorLeaderboardTable';
import AuthorNavigationTabs from '../components/AuthorNavigationTabs';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';
import { FilterCard } from '../../../shared/components/Card';
import { FilterSelect } from '../../../shared/components/Input';
import AdminPagination from '../../../shared/components/Pagination';
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
    leaderboardTotalPages,
    subjectAreas,
    fetchSubjectAreas,
  } = useAuthors();
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    if (!subjectAreas || subjectAreas.length === 0) {
      fetchSubjectAreas();
    }
  }, [subjectAreas, fetchSubjectAreas]);

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
        <nav className="author-leaderboard-breadcrumb mb-4" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <span className="author-leaderboard-breadcrumb__link" onClick={() => navigate('/')}>{t("author.tongQuan")}</span>
            </li>
            <li className="breadcrumb-item">
              <span className="author-leaderboard-breadcrumb__link" onClick={() => navigate('/authors')}>{t("author.tacGiaNoiBat")}</span>
            </li>
            <li className="breadcrumb-item active text-primary" aria-current="page">{t("author.bangXepHang")}</li>
          </ol>
        </nav>

        <section className="author-leaderboard-hero">
          <div className="author-leaderboard-hero__content d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
            <div>
              <div className="author-leaderboard-eyebrow">
                <Icon icon="lucide:trophy" width="17" />
                <span>Author leaderboard</span>
              </div>
              <h1 className="author-leaderboard-title">{t("author.bangXepHangTacGia")}</h1>
              <p className="author-leaderboard-description">{t("author.cacTacGiaNoiBatNhatHeThongDuoc")}</p>
            </div>
            <PrimaryButton variant="outline" onClick={() => navigate('/authors')} className="px-3 py-2" icon="lucide:arrow-left">
              <span>{t("author.quayLaiDanhSachTacGia")}</span>
            </PrimaryButton>
          </div>
        </section>

        <AuthorNavigationTabs activeTab="leaderboard" />

        <FilterCard className="author-leaderboard-filter-card">
          <Row className="g-3 align-items-center">
            <Col xs={12} sm={6} md={4}>
              <div className="author-leaderboard-filter-control">
                <span className="author-leaderboard-label">{t("author.linhVuc1")}</span>
                <FilterSelect value={selectedArea} onChange={handleAreaChange} options={[{
                value: '',
                label: t("author.tatCaLinhVuc")
              }, ...(subjectAreas || []).map(area => ({
                value: area.display_name || area.name || '',
                label: area.display_name || area.name || ''
              }))]} />
              </div>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <div className="author-leaderboard-filter-control">
                <span className="author-leaderboard-label">{t("author.thoiGian")}</span>
                <FilterSelect value={selectedPeriod} onChange={handlePeriodChange} options={[{
                value: 'all',
                label: t("author.tatCaThoiGian")
              }, {
                value: 'month',
                label: t("author.thangNay")
              }, {
                value: 'year',
                label: t("author.namNay")
              }]} />
              </div>
            </Col>
          </Row>
        </FilterCard>

        <AuthorLeaderboardTable authors={leaderboard} loading={loadingLeaderboard} error={errorLeaderboard} onRetry={() => fetchLeaderboard({
        subject_area: selectedArea,
        period: selectedPeriod,
        page: currentPage,
        limit: limit
      })} />

        {leaderboard.length > 0 && leaderboardTotalPages > 1 && <AdminPagination totalItems={totalLeaderboard} currentPage={currentPage} limit={limit} onPageChange={setCurrentPage} entityName={t("author.tacGia")} />}
      </Container>
    </div>;
}