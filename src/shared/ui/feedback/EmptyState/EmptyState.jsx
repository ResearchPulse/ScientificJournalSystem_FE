import { useTranslation } from 'react-i18next';
import Icon from '../../primitives/Icon';
import PrimaryButton from '../../components/Button/PrimaryButton';

/**
 * EmptyState - Notification interface when a list or query returns no data.
 */
export default function EmptyState({
  title,
  description,
  icon = 'lucide:folder-open',
  actionLabel = '',
  onAction = null,
  className = '',
}) {
  const { t } = useTranslation();
  const resolvedTitle = title || t('topic.khongCoDuLieu');
  const resolvedDescription = description || t('common.khongTimThayKetQuaPhuHop');

  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center text-center py-5 px-4 rounded-3 border ${className}`}
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
        minHeight: '260px',
      }}
    >
      <div
        className="d-flex align-items-center justify-content-center mb-3 text-muted-custom"
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-section)',
        }}
      >
        <Icon icon={icon} width="32" className="opacity-75" />
      </div>

      <h3
        className="text-main fw-bold mb-2"
        style={{
          fontSize: '1.1rem',
          fontFamily: 'var(--font-display)',
        }}
      >
        {resolvedTitle}
      </h3>

      <p
        className="text-muted-custom mb-0 mx-auto"
        style={{
          maxWidth: '380px',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
      >
        {resolvedDescription}
      </p>

      {actionLabel && (
        <div className="mt-3">
          <PrimaryButton onClick={onAction}>
            {actionLabel}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
