import { useTranslation } from "react-i18next";
/**
 * @file AuthorArticleRow.jsx
 * @description Single publication row in the academic author profile.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../shared/components/Icon";
import LatexText from "../../../shared/components/LatexText/LatexText";

export default function AuthorArticleRow({ article, isLast = false }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const id = article.article_id ?? article.id;
  const title = article.title ?? t("author.baiBaoNghienCuu");
  const journal = article.journal_name ?? article.journal ?? t("author.tapChiKhoaHoc");
  const year = article.publication_year ?? article.year ?? "—";
  const citations = article.citation_count ?? article.cited_by_count ?? article.citations ?? 0;
  const doi = article.doi ?? "";

  const handleTitleClick = () => {
    if (id) navigate(`/articles/${id}/visual`);
  };

  const handleCopyDoi = (e) => {
    e.stopPropagation();
    if (!doi) return;
    navigator.clipboard.writeText(doi);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="adp-article-row">
      {/* Journal + Year */}
      <div className="adp-article-meta">
        <span className="adp-article-journal">{journal}</span>
        <span className="adp-article-year">{year}</span>
      </div>

      {/* Title */}
      <h4 className="adp-article-title" onClick={handleTitleClick}>
        <LatexText text={title} />
      </h4>

      {/* Footer */}
      <div className="adp-article-footer">
        <div className="adp-article-badges">
          <span className="adp-article-citations">
            {t("author.duocTrichDan")}<strong>{citations}{t("author.lan")}</strong>
          </span>
          {doi && (
            <span className="adp-article-doi-badge" onClick={handleCopyDoi} title={t("author.clickDeSaoChepMaDoi")}>
              <Icon icon={copied ? "lucide:check" : "lucide:copy"} width="9" style={{ color: copied ? "var(--primary)" : undefined }} />
              DOI
            </span>
          )}
        </div>
        <span className="adp-article-link" onClick={handleTitleClick}>
          {t("article.chiTiet1")}<Icon icon="lucide:chevron-right" width="11" />
        </span>
      </div>
    </div>
  );
}
