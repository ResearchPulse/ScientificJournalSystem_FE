import Icon from "../../../shared/components/Icon";

/**
 * @file AuthorResearchInterests.jsx
 * @description Academic research taxonomy categorized into Primary Research Areas and Related Topics.
 */
export default function AuthorResearchInterests({ interests = [] }) {
  if (!interests || interests.length === 0) return null;

  const primary = interests.filter((i) => i.primary);
  const secondary = interests.filter((i) => !i.primary);

  return (
    <div className="ap-section">
      <div className="ap-section-header">
        <div className="ap-section-header-left">
          <Icon icon="lucide:tags" width="16" className="ap-section-icon" />
          <h2 className="ap-section-title">Research Interests</h2>
        </div>
        <span className="ap-section-badge">{interests.length} topics</span>
      </div>

      <div className="ap-interests-container">
        {/* Primary areas */}
        {primary.length > 0 && (
          <div className="ap-interests-group">
            <div className="ap-interests-group-title">
              <span className="ap-interests-dot primary" />
              <span>Primary Research Areas</span>
            </div>
            <div className="ap-interests-chips">
              {primary.map((item, idx) => (
                <span key={idx} className="ap-interest-chip primary">
                  <Icon icon="lucide:sparkle" width="11" />
                  <span>{item.name}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related topics */}
        {secondary.length > 0 && (
          <div className="ap-interests-group">
            <div className="ap-interests-group-title">
              <span className="ap-interests-dot secondary" />
              <span>Related Research Fields & Applications</span>
            </div>
            <div className="ap-interests-chips">
              {secondary.map((item, idx) => (
                <span key={idx} className="ap-interest-chip secondary">
                  <span>{item.name}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
