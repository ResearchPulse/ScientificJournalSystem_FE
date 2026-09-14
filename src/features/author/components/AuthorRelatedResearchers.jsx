import Icon from "../../../shared/components/Icon";
import AuthorAvatar from "./AuthorAvatar";

/**
 * @file AuthorRelatedResearchers.jsx
 * @description Researchers working in related scientific domains with shared research overlap.
 */
export default function AuthorRelatedResearchers({ researchers = [] }) {
  if (!researchers || researchers.length === 0) return null;

  return (
    <div className="ap-section" id="related">
      <div className="ap-section-header">
        <div className="ap-section-header-left">
          <Icon icon="lucide:sparkles" width="16" className="ap-section-icon" />
          <h2 className="ap-section-title">Related Researchers</h2>
        </div>
        <span className="ap-section-badge">High topic affinity</span>
      </div>

      <div className="ap-related-grid">
        {researchers.map((r) => (
          <div key={r.id} className="ap-related-card">
            <div className="ap-related-avatar-box">
              <AuthorAvatar name={r.name} size="md" bgColor={r.avatarColor} />
            </div>

            <div className="ap-related-body">
              <h3 className="ap-related-name">{r.name}</h3>
              <div className="ap-related-inst">{r.institution}</div>
              <div className="ap-related-role">{r.role}</div>

              <div className="ap-related-topics">
                {r.areas?.map((area, idx) => (
                  <span key={idx} className="ap-related-topic-pill">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="ap-related-action-footer">
              <span className="ap-related-link">
                <span>View Profile</span>
                <Icon icon="lucide:arrow-right" width="12" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
