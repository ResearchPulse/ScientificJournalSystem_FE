import Icon from "../../../shared/components/Icon";

/**
 * @file AuthorResearchCenters.jsx
 * @description Associated research centers, laboratories, and institutes.
 */
export default function AuthorResearchCenters({ centers }) {
  if (!centers || centers.length === 0) return null;

  return (
    <div className="ap-section">
      <div className="ap-section-header">
        <div className="ap-section-header-left">
          <Icon icon="lucide:flask-conical" width="16" className="ap-section-icon" />
          <h2 className="ap-section-title">Research Centers & Laboratories</h2>
        </div>
        <span className="ap-section-badge">{centers.length} facilities</span>
      </div>

      <div className="ap-centers-grid">
        {centers.map((center) => (
          <div key={center.id} className="ap-center-card">
            <div className="ap-center-card-header">
              <div className="ap-center-icon-box">
                <Icon icon={center.icon || "lucide:microscope"} width="16" />
              </div>
              <div className="ap-center-headings">
                <h3 className="ap-center-name">{center.name}</h3>
                <div className="ap-center-org">{center.organization}</div>
              </div>
            </div>

            <div className="ap-center-focus">
              <span className="ap-center-focus-label">Focus:</span> {center.focus}
            </div>

            <div className="ap-center-footer">
              <span className="ap-center-role-tag">
                <Icon icon="lucide:shield-check" width="12" />
                {center.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
