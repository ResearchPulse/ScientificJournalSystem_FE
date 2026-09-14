import Icon from "../../../shared/components/Icon";

/**
 * @file AuthorMostCited.jsx
 * @description Top 5 most cited landmark publications.
 */
export default function AuthorMostCited({ mostCited = [] }) {
  if (!mostCited || mostCited.length === 0) return null;

  return (
    <div className="ap-section" id="venues">
      <div className="ap-section-header">
        <div className="ap-section-header-left">
          <Icon icon="lucide:flame" width="16" className="ap-section-icon" />
          <h2 className="ap-section-title">Most Cited Publications</h2>
        </div>
        <span className="ap-section-badge">Top 5 Landmark Works</span>
      </div>

      <div className="ap-cited-items">
        {mostCited.map((item, idx) => (
          <div key={item.id} className="ap-cited-card">
            <div className={`ap-cited-rank-box rank-${idx + 1}`}>
              <span className="ap-cited-rank-num">#{idx + 1}</span>
            </div>

            <div className="ap-cited-content">
              <h3 className="ap-cited-title">{item.title}</h3>

              <div className="ap-cited-meta">
                <span className="ap-cited-journal">{item.journal}</span>
                <span className="ap-cited-dot">·</span>
                <span className="ap-cited-year">{item.year}</span>
                {item.doi && (
                  <>
                    <span className="ap-cited-dot">·</span>
                    <span className="ap-cited-doi">DOI: {item.doi}</span>
                  </>
                )}
              </div>
            </div>

            <div className="ap-cited-metric-side">
              <div className="ap-cited-citations-num">
                {item.citations?.toLocaleString()}
              </div>
              <div className="ap-cited-citations-label">citations</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
