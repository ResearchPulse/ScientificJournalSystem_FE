import { useTranslation } from "react-i18next";
/**
 * @file AuthorDetailPage.jsx
 * @description Trang chi tiết hiển thị toàn bộ hồ sơ học thuật của một tác giả cụ thể.
 */

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Icon, Breadcrumb, Chip, PrimaryButton } from '@ui';
import Header from '../../landing/components/Header';
import useAuthors from '../hooks/useAuthors';
import AuthorProfileHeader from '../components/AuthorProfileHeader';
import AuthorAreasBreakdown from '../components/AuthorAreasBreakdown';
import AuthorArticlesSection from '../components/AuthorArticlesSection';
import './AuthorDetailPage.css';
export default function AuthorDetailPage() {
  const {
    t
  } = useTranslation();
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    currentAuthor,
    authorArticles,
    authorBreakdown,
    loadingAuthorDetail,
    loadingArticles,
    loadingAreas,
    errorAuthorDetail,
    errorArticles,
    errorAreas,
    fetchAuthorDetailsFull,
    fetchAuthorDetail,
    fetchAuthorArticles,
    fetchAuthorAreasBreakdown
  } = useAuthors();
  useEffect(() => {
    if (id) {
      fetchAuthorDetailsFull(id);
    }
  }, [id, fetchAuthorDetailsFull]);
  const authorName = currentAuthor?.full_name ?? currentAuthor?.display_name ?? currentAuthor?.name ?? t("typeAuthor");
  return <div className="author-detail-page">
      <Header />

      <Container>
        <Breadcrumb
          className="mb-4"
          items={[
            { label: t("home", "Home"), to: '/' },
            { label: t("author.tacGiaNoiBat", "Authors"), to: '/authors' },
            { label: loadingAuthorDetail ? t("common.dangTai", "Đang tải...") : authorName, active: true }
          ]}
        />

        <section className="author-detail-hero reveal-on-scroll">
          <div className="author-detail-hero__content d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
            <div>
              <Chip
                icon="lucide:user-round-search"
                label="Author profile"
                variant="minimal"
                className="mb-2"
              />
              <h1 className="author-detail-title">{loadingAuthorDetail ? t("author.hoSoTacGia") : authorName}</h1>
              <p className="author-detail-description">{t("author.hoSoHocThuatPhanBoLinhVucNghie")}</p>
            </div>
            <PrimaryButton variant="outline" onClick={() => navigate('/authors')} className="px-3 py-2" icon="lucide:arrow-left">{t("author.quayLaiDanhSachTacGia")}</PrimaryButton>
          </div>
        </section>

        <Row className="g-4">
          <Col xs={12} lg={4} className="reveal-on-scroll">
            <AuthorProfileHeader author={currentAuthor} loading={loadingAuthorDetail} error={errorAuthorDetail} onRetry={() => id && fetchAuthorDetail(id)} />
          </Col>

          <Col xs={12} lg={8} className="reveal-on-scroll delay-100">
            <div className="d-flex flex-column gap-4">
              <AuthorAreasBreakdown breakdown={authorBreakdown} loading={loadingAreas} error={errorAreas} onRetry={() => id && fetchAuthorAreasBreakdown(id)} />

              <AuthorArticlesSection articles={authorArticles} loading={loadingArticles} error={errorArticles} onRetry={() => id && fetchAuthorArticles(id)} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>;
}