/**
 * @file AuthorTopPublications.jsx
 * @description Shows top 5 most-cited publications derived from existing article data.
 *              Does NOT call any additional API endpoints.
 */
import { useNavigate } from "react-router-dom";
import LatexText from "../../../shared/components/LatexText/LatexText";

function fmt(num) {
  if (!num || num === 0) return "0";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(num);
}

export default function AuthorTopPublications({ articles = [] }) {
  const navigate = useNavigate();

  if (!Array.isArray(articles) || articles.length === 0) return null;

  // Only show if at least one article has citations
  const hasCitations = articles.some(
    (a) => (a.citation_count ?? a.cited_by_count ?? a.citations ?? 0) > 0
  );
  if (!hasCitations) return null;

  const top = [...articles]
    .sort(
      (a, b) =>
        (b.citation_count ?? b.cited_by_count ?? b.citations ?? 0) -
        (a.citation_count ?? a.cited_by_count ?? a.citations ?? 0)
    )
    .slice(0, 5);

  return (
    <div className="adp-card adp-top-pubs">
      <div className="adp-section-label">Most Cited</div>

      {top.map((article, idx) => {
        const id = article.article_id ?? article.id;
        const title = article.title ?? "Untitled";
        const journal = article.journal_name ?? article.journal ?? "";
        const year = article.publication_year ?? article.year ?? "";
        const citations =
          article.citation_count ??
          article.cited_by_count ??
          article.citations ??
          0;

        return (
          <div key={id ?? idx} className="adp-top-pub-row">
            <div className={`adp-top-pub-rank${idx < 3 ? " adp-top-pub-rank--top" : ""}`}>
              {idx + 1}
            </div>
            <div className="adp-top-pub-info">
              <div
                className="adp-top-pub-title"
                onClick={() => id && navigate(`/articles/${id}/visual`)}
              >
                <LatexText text={title} />
              </div>
              {(journal || year) && (
                <div className="adp-top-pub-meta">
                  {journal}
                  {journal && year ? " · " : ""}
                  {year}
                </div>
              )}
            </div>
            <div className="adp-top-pub-citations">
              <span className="adp-top-pub-cite-num">{fmt(citations)}</span>
              <span className="adp-top-pub-cite-label">cited</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
