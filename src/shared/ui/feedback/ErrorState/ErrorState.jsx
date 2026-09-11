import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import Icon from '../../primitives/Icon';

/**
 * ErrorState - Error notification interface with optional retry trigger.
 */
export default function ErrorState({
  title,
  message,
  icon = 'lucide:alert-triangle',
  onRetry = null,
  retryLabel,
  className = '',
}) {
  const { t } = useTranslation();
  const resolvedTitle = title || t('common.khongTheTaiDuLieu');
  const resolvedMessage = message || t('common.vuiLongKiemTraLaiKetNoiMangHoa');
  const resolvedRetryLabel = retryLabel || t('article.thuLai');

  const handleRetryClick = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    ripple.classList.add('ripple-effect');

    const existingRipple = button.querySelector('.ripple-effect');
    if (existingRipple) existingRipple.remove();
    button.appendChild(ripple);
    if (onRetry) onRetry(event);
  };

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
        className="d-flex align-items-center justify-content-center mb-3 text-danger"
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.08)',
        }}
      >
        <Icon icon={icon} width="30" />
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
        className="text-muted-custom mb-4 mx-auto"
        style={{
          fontSize: '0.85rem',
          maxWidth: '380px',
          lineHeight: '1.5',
        }}
      >
        {resolvedMessage}
      </p>

      {onRetry && (
        <Button
          variant="primary"
          size="sm"
          icon="lucide:rotate-cw"
          className="rounded-pill px-4 py-2"
          onClick={handleRetryClick}
        >
          {resolvedRetryLabel}
        </Button>
      )}
    </div>
  );
}
