import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\journal\components\ArticlesTabContent.jsx
 */
import { LoadingSkeleton, Icon, Badge, LatexText, EmptyState } from '@ui';

export default function ArticlesTabContent({
  recentArticles = [],
  loading,
  onArticleClick
}) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="d-flex flex-column gap-3">
        {[1, 2, 3].map(i => (
          <section key={i} className="journal-surface p-4">
            <div className="d-flex gap-2 mb-3">
              <LoadingSkeleton width="60px" height="22px" borderRadius="12px" />
              <LoadingSkeleton width="90px" height="22px" borderRadius="12px" />
            </div>
            <LoadingSkeleton width="75%" height="24px" className="mb-2" />
            <LoadingSkeleton width="40%" height="16px" className="mb-3" />
            <LoadingSkeleton width="100%" height="48px" />
          </section>
        ))}
      </div>
    );
  }

  if (!recentArticles || recentArticles.length === 0) {
    return (
      <EmptyState
        icon="lucide:file-x"
        title={t("journal.journalNayChuaCoBaiBaoGanDay", "This journal has no recent articles.")}
        description=""
      />
    );
  }

  return (
    <div className="d-flex flex-column gap-3 text-start">
      {recentArticles.map((article, index) => {
        const articleId = article.article_id || article.id || article.articleId;
        const hasArticleId = articleId !== undefined && articleId !== null && String(articleId).trim() !== '';
        const year = article.publication_year || article.year;
        const topicName = article.primary_topic?.display_name || article.primary_topic_name || article.topic;
        const citationCount = article.citation_count ?? article.cited_by_count;

        const handleArticleOpen = () => {
          if (hasArticleId && onArticleClick) onArticleClick(articleId);
        };

        const authorText = Array.isArray(article.authors)
          ? article.authors.map(author => author.display_name || author.name || author.author_name).filter(Boolean).join(', ')
          : article.authors;

        return (
          <article key={articleId || `${article.title || 'article'}-${index}`} className="journal-article-card">
            <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
              {year && (
                <Badge pill variant="secondary">
                  {year}
                </Badge>
              )}
              {article.is_open_access && (
                <Badge pill variant="success" className="d-inline-flex align-items-center gap-1">
                  <Icon icon="lucide:unlock" width="11" />
                  {t("article.truyCapMo", "Open Access")}
                </Badge>
              )}
              {topicName && (
                <Badge pill variant="primary">
                  {topicName}
                </Badge>
              )}
              {article.doi && (
                <a
                  href={article.doi.startsWith('http') ? article.doi : `https://doi.org/${article.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-custom d-flex align-items-center gap-1 small text-decoration-none journal-doi-link ms-auto"
                  onClick={e => e.stopPropagation()}
                >
                  <Icon icon="lucide:link-2" width="13" />
                  DOI: {article.doi}
                </a>
              )}
            </div>

            <h3
              className={`journal-article-title ${hasArticleId ? '' : 'text-muted-custom'}`}
              onClick={handleArticleOpen}
              role={hasArticleId ? 'button' : undefined}
              title={hasArticleId ? t("article.xemChiTietBaiBao") : t("journal.baiBaoNayChuaCoMaDinhDanh")}
            >
              <LatexText text={article.title || 'Untitled Article'} />
            </h3>

            {authorText && (
              <div className="text-muted-custom mb-3 d-flex align-items-center gap-2 small">
                <Icon icon="lucide:users" width="15" className="text-muted-custom flex-shrink-0" />
                <span className="text-truncate">{authorText}</span>
              </div>
            )}

            {article.abstract && (
              <p className="journal-article-abstract">
                <LatexText text={article.abstract} />
              </p>
            )}

            <div className="mt-auto pt-2 border-top d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div className="text-muted-custom small">
                {citationCount !== undefined && citationCount !== null && (
                  <span className="d-inline-flex align-items-center gap-1">
                    <Icon icon="lucide:quote" width="13" />
                    <span>{citationCount} {t("article.citations", "citations")}</span>
                  </span>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}