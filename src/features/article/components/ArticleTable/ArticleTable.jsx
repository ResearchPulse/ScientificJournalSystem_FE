import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\article\components\ArticleTable.jsx
 */
import ArticleTableRow from '../ArticleTableRow';
import { LatexText, Icon, Button, EmptyState, Table, Badge } from '@ui';
import { Card } from 'react-bootstrap';
export default function ArticleTable({
  articles,
  isLoading,
  onDetailClick,
  onClearFilters,
  currentPage = 1,
  limit = 10
}) {
  const {
    t
  } = useTranslation();
  // Renders a loader with multiple shimmer rows
  const renderSkeletons = () => <tbody>
      {[1, 2, 3, 4, 5].map(i => <tr key={i} style={{
      borderBottom: '1px solid var(--border)'
    }}>
          <td className="ps-4 pe-2 py-3" style={{
        width: '56px'
      }}>
            <div className="skeleton-shimmer rounded" style={{
          width: '18px',
          height: '14px'
        }} />
          </td>
          <td className="py-3">
            <div className="skeleton-shimmer rounded mb-2" style={{
          width: '80%',
          height: '18px'
        }} />
            <div className="skeleton-shimmer rounded" style={{
          width: '45%',
          height: '12px'
        }} />
          </td>
          <td className="py-3">
            <div className="skeleton-shimmer rounded" style={{
          width: '100px',
          height: '14px'
        }} />
          </td>
          <td className="py-3 text-center">
            <div className="skeleton-shimmer rounded mx-auto" style={{
          width: '40px',
          height: '14px'
        }} />
          </td>
          <td className="py-3">
            <div className="skeleton-shimmer rounded" style={{
          width: '120px',
          height: '12px'
        }} />
          </td>
          <td className="py-3">
            <div className="skeleton-shimmer rounded" style={{
          width: '80px',
          height: '20px'
        }} />
          </td>
          <td className="py-3 text-center">
            <div className="skeleton-shimmer rounded mx-auto" style={{
          width: '30px',
          height: '20px'
        }} />
          </td>
        </tr>)}
    </tbody>;

  // Helper for topic colors
  const getTopicClassName = topic => {
    if (!topic) return '';
    const name = String(topic).toLowerCase();
    if (name.includes('machine learning') || name.includes('ml')) {
      return 'article-topic-badge--ml';
    }
    if (name.includes('computer science') || name.includes('cs')) {
      return 'article-topic-badge--cs';
    }
    if (name.includes('medicine') || name.includes('bio')) {
      return 'article-topic-badge--medicine';
    }
    if (name.includes('physic')) {
      return 'article-topic-badge--physics';
    }
    return 'article-topic-badge--other';
  };

  // If loading and there are no items
  if (isLoading && articles.length === 0) {
    return <div className="article-table-card w-100">
        <Table responsive hover className="article-table m-0 border-0">
          <thead>
            <tr>
              <th className="ps-4 pe-2 py-3 text-muted-custom font-display" style={{
              width: '56px'
            }}>{t("catalog.stt", "No.")}</th>
              <th className="px-3 py-3">{t("article.tenBaiBao")}</th>
              <th className="px-3 py-3">JOURNAL</th>
              <th className="px-3 py-3 text-center">{t("article.nam1")}</th>
              <th className="px-3 py-3">DOI</th>
              <th className="px-3 py-3">TOPIC</th>
              <th className="px-3 py-3 text-center">OA</th>
            </tr>
          </thead>
          {renderSkeletons()}
        </Table>
      </div>;
  }

  // If search matches nothing
  if (articles.length === 0) {
    return (
      <EmptyState
        icon="lucide:search-x"
        title={t("article.khongTimThayBaiBaoPhuHop")}
        description={t("article.hayThuThayDoiTuKhoaHoacXoaCacB")}
        actionLabel={onClearFilters ? t("article.xoaBoLoc") : undefined}
        onAction={onClearFilters}
      />
    );
  }
  return <>
      {/* 1. TABLE LAYOUT (Desktop & Tablet) */}
      <div className="article-table-card w-100 d-none d-md-block">
        <Table responsive hover className="article-table m-0 border-0">
          <thead>
            <tr>
              <th className="ps-4 pe-2 py-3 text-muted-custom font-display" style={{
              width: '56px'
            }}>{t("catalog.stt", "No.")}</th>
              <th className="px-3 py-3">{t("article.tenBaiBao")}</th>
              <th className="px-3 py-3">JOURNAL</th>
              <th className="px-3 py-3 text-center">{t("article.nam1")}</th>
              <th className="px-3 py-3">DOI</th>
              <th className="px-3 py-3">TOPIC</th>
              <th className="px-3 py-3 text-center">OA</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => {
              const itemIndex = (currentPage - 1) * limit + index + 1;
              return (
                <ArticleTableRow
                  key={article.article_id}
                  article={article}
                  index={index}
                  itemIndex={itemIndex}
                  onDetailClick={onDetailClick}
                />
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* 2. CARD LAYOUT (Mobile) */}
      <div className="d-block d-md-none">
        <div className="d-flex flex-column gap-3">
          {articles.map((article, index) => {
          const topicClassName = getTopicClassName(article.primary_topic);
          const itemIndex = (currentPage - 1) * limit + index + 1;
          return <Card key={article.article_id} onClick={() => onDetailClick(article.article_id)} className="article-mobile-card">
                <Card.Body className="p-3">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-muted-custom text-xs font-display fw-semibold">
                      {t("catalog.stt", "No.")} {itemIndex}
                    </span>
                    <div className="d-flex gap-1.5 align-items-center">
                      <Badge
                        pill
                        variant={null}
                        className={`article-topic-badge ${topicClassName}`}
                      >
                        {article.primary_topic || t("article.chuaPhanLoai")}
                      </Badge>
                      {article.is_open_access && (
                        <Badge
                          pill
                          variant="success"
                          className="text-xs px-2 py-0.5"
                        >
                          OA
                        </Badge>
                      )}
                    </div>
                  </div>

                  <h6 className="text-main font-weight-semibold mb-2" style={{
                lineHeight: '1.4',
                fontSize: '0.9rem'
              }}>
                    <LatexText text={article.title} />
                  </h6>

                  {article.abstract && <p className="text-muted-custom text-xs mb-3 text-truncate-2" style={{
                fontSize: '0.75rem',
                lineHeight: '1.4'
              }}>
                      <LatexText text={article.abstract} />
                    </p>}

                  <div className="pt-2 border-top border-light d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div>
                      {article.journal && <div className="text-primary text-xs font-weight-semibold" style={{
                    fontSize: '0.75rem'
                  }}>
                          {article.journal.display_name}
                        </div>}
                      <div className="text-muted-custom text-xs font-display mt-0.5" style={{
                    fontSize: '0.7rem'
                  }}>{t("article.nam2")}{article.publication_year} {article.doi ? `· DOI: ${article.doi}` : ''}
                      </div>
                    </div>
                    <span className="article-action-link d-flex align-items-center gap-0.5">{t("article.chiTiet1")}<Icon icon="lucide:arrow-right" width="12" />
                    </span>
                  </div>
                </Card.Body>
              </Card>;
        })}
        </div>
      </div>
    </>;
}