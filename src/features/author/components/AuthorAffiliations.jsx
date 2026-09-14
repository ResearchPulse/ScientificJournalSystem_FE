import Icon from "../../../shared/components/Icon";

/**
 * @file AuthorAffiliations.jsx
 * @description Academic affiliations list.
 */
export default function AuthorAffiliations({ affiliations }) {
  if (!affiliations || affiliations.length === 0) return null;

  return (
    <div className="ap-section" id="affiliations">
      <div className="ap-section-header">
        <div className="ap-section-header-left">
          <Icon icon="lucide:building-2" width="16" className="ap-section-icon" />
          <h2 className="ap-section-title">Current Affiliations</h2>
        </div>
        <span className="ap-section-badge">{affiliations.length} institutions</span>
      </div>

      <div className="ap-affiliations-list">
        {affiliations.map((item) => (
          <div key={item.id} className="ap-affiliation-item">
            <div
              className="ap-affiliation-badge-logo"
              style={{
                backgroundColor: item.logoColor ? `${item.logoColor}15` : "var(--bg-chip)",
                borderColor: item.logoColor ? `${item.logoColor}40` : "var(--border)",
                color: item.logoColor || "var(--text-main)",
              }}
            >
              {item.logoInitials || "GT"}
            </div>

            <div className="ap-affiliation-content">
              <div className="ap-affiliation-main-row">
                <h3 className="ap-affiliation-name">{item.institution}</h3>
                {item.since && <span className="ap-affiliation-since">Since {item.since}</span>}
              </div>

              <div className="ap-affiliation-dept">{item.department}</div>

              <div className="ap-affiliation-meta-footer">
                <span className="ap-affiliation-role">
                  <Icon icon="lucide:user-check" width="12" />
                  {item.role}
                </span>
                <span className="ap-affiliation-dot">·</span>
                <span className="ap-affiliation-loc">
                  <Icon icon="lucide:map-pin" width="11" />
                  {item.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
