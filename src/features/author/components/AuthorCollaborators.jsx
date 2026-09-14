import Icon from "../../../shared/components/Icon";
import AuthorAvatar from "./AuthorAvatar";

/**
 * @file AuthorCollaborators.jsx
 * @description Frequent academic collaborators list.
 */
export default function AuthorCollaborators({ collaborators = [] }) {
  if (!collaborators || collaborators.length === 0) return null;

  return (
    <div className="ap-section" id="collaborators">
      <div className="ap-section-header">
        <div className="ap-section-header-left">
          <Icon icon="lucide:users" width="16" className="ap-section-icon" />
          <h2 className="ap-section-title">Frequent Collaborators</h2>
        </div>
        <span className="ap-section-badge">{collaborators.length} primary co-authors</span>
      </div>

      <div className="ap-collab-grid">
        {collaborators.map((c) => (
          <div key={c.id} className="ap-collab-card">
            <div className="ap-collab-avatar">
              <AuthorAvatar name={c.name} size="md" bgColor={c.avatarColor} />
            </div>

            <div className="ap-collab-info">
              <h3 className="ap-collab-name">{c.name}</h3>
              <div className="ap-collab-inst">{c.institution}</div>
              <div className="ap-collab-role">{c.role}</div>

              {c.researchArea && (
                <div className="ap-collab-area-tag">
                  <span>{c.researchArea}</span>
                </div>
              )}

              <div className="ap-collab-shared-row">
                <Icon icon="lucide:file-text" width="11" />
                <span className="ap-collab-num">{c.sharedPublications}</span>
                <span>joint publications</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
