import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\keywords\components\KeywordList.jsx
 */
import { Row, Col } from 'react-bootstrap';
import { LoadingSkeleton, Pagination as AdminPagination, EmptyState, ErrorState } from '@ui';
import KeywordListItem from '../KeywordListItem';

/**
 * Danh sách keyword kèm loading, empty, error và pagination.
 */
export default function KeywordList({
  keywords,
  loading,
  error,
  pagination,
  onPageChange,
  onViewArticles,
  onRetry
}) {
  const {
    t
  } = useTranslation();
  const totalItems = pagination?.total || pagination?.total_items || pagination?.totalItems || 0;
  const currentPage = pagination?.page || 1;
  const limit = pagination?.limit || pagination?.page_size || 10;
  if (loading) {
    return <Row className="g-3">
        {[1, 2, 3, 4, 5, 6].map(item => <Col md={6} xl={4} key={item}>
            <div className="keyword-skeleton-card">
               <LoadingSkeleton width="120px" height="14px" className="mb-3" />
               <LoadingSkeleton width="80%" height="28px" className="mb-3" />
               <LoadingSkeleton width="140px" height="22px" className="mb-4" />
               <LoadingSkeleton width="180px" height="40px" />
             </div>
           </Col>)}
       </Row>;
   }
  if (error) {
    return (
      <ErrorState
        title={t("keywords.khongTheTaiDanhSachKeywords")}
        message={error}
        onRetry={onRetry}
        retryLabel={t("article.thuLai")}
      />
    );
  }
  if (!keywords || keywords.length === 0) {
    return (
      <EmptyState
        icon="lucide:inbox"
        title={t("keywords.khongTimThayKeywordPhuHop")}
        description={t("keywords.thuDoiTuKhoaTimKiemHoacResetBo")}
      />
    );
  }
  return <>
      <Row className="g-3">
        {keywords.map(keyword => <Col md={6} xl={4} key={keyword.keyword_id}>
            <KeywordListItem keyword={keyword} onViewArticles={onViewArticles} />
          </Col>)}
      </Row>
      {totalItems > limit && <AdminPagination totalItems={totalItems} currentPage={currentPage} limit={limit} onPageChange={onPageChange} entityName="keywords" />}
    </>;
}