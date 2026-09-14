import Icon from "../../../shared/components/Icon";

/**
 * @file AuthorJournals.jsx
 * @description Top Publication Venues (Journals) with metrics (Q1 badge, Impact Factor, CiteScore).
 * 
 * ⚠️ NOTE FOR BACKEND INTEGRATION:
 * Quartile (Q1), Impact Factor (IF), and CiteScore are currently frontend mock values.
 * When backend endpoint /author/:id/venues provides these fields, map them directly.
 */
export default function AuthorJournals({ journals = [] }) {
  if (!journals || journals.length === 0) return null;

  const maxPubs = journals[0]?.publications || 1;

  // Mock metadata mapping for high-impact journals
  const journalMetrics = {
    "Nano Energy": { quartile: "Q1", if: "17.6", citescore: "27.4" },
    "Advanced Materials": { quartile: "Q1", if: "29.4", citescore: "45.1" },
    "Nature Communications": { quartile: "Q1", if: "16.6", citescore: "24.8" },
    "Advanced Energy Materials": { quartile: "Q1", if: "24.4", citescore: "38.2" },
    "Nano Letters": { quartile: "Q1", if: "10.8", citescore: "18.3" },
    "ACS Nano": { quartile: "Q1", if: "17.1", citescore: "26.9" },
    "Advanced Functional Materials": { quartile: "Q1", if: "18.5", citescore: "28.1" },
    "Science": { quartile: "Q1", if: "44.7", citescore: "65.4" },
  };

  return (
    <div className="ap-section">
      <div className="ap-section-header">
        <div className="ap-section-header-left">
          <Icon icon="lucide:newspaper" width="16" className="ap-section-icon" />
          <h2 className="ap-section-title">Top Publication Venues</h2>
        </div>
        <span className="ap-section-badge">{journals.length} primary journals</span>
      </div>

      <div className="ap-journals-table">
        {journals.map((j, idx) => {
          const metrics = journalMetrics[j.name] || { quartile: "Q1", if: "12.5", citescore: "20.1" };
          const pct = Math.round((j.publications / maxPubs) * 100);

          return (
            <div key={j.id || idx} className="ap-journal-card">
              <div className="ap-journal-top">
                <div className="ap-journal-name-block">
                  <span className="ap-journal-rank-bullet">{idx + 1}</span>
                  <span className="ap-journal-name">{j.name}</span>
                  <span className="ap-journal-q-badge">{metrics.quartile}</span>
                </div>

                <div className="ap-journal-stat-block">
                  <span className="ap-journal-pub-count">
                    <strong>{j.publications}</strong> publications
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="ap-journal-bar-track">
                <div className="ap-journal-bar-fill" style={{ width: `${pct}%` }} />
              </div>

              {/* Footer info: latest year + journal metrics */}
              <div className="ap-journal-sub-row">
                <span className="ap-journal-latest">Latest paper: {j.latestYear}</span>
                <div className="ap-journal-scores">
                  <span className="ap-journal-score-pill">IF: {metrics.if}</span>
                  <span className="ap-journal-score-pill">CiteScore: {metrics.citescore}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
