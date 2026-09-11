import Spinner from '../../components/Spinner';
import './LoadingState.css';

/**
 * Reusable LoadingState Component
 *
 * @param {string} [message='Đang tải dữ liệu...'] - Loading text
 * @param {'sm'|'md'|'lg'} [size='lg'] - Spinner size
 * @param {boolean} [fullPage=false] - Occupies full container height
 * @param {string} [className=''] - Extra classes
 */
export default function LoadingState({
  message = 'Đang tải dữ liệu...',
  size = 'lg',
  fullPage = false,
  className = '',
  ...props
}) {
  return (
    <div
      role="status"
      className={`ui-loading-state ${
        fullPage ? 'ui-loading-state-fullpage' : ''
      } ${className}`.trim()}
      {...props}
    >
      <Spinner size={size} variant="primary" />
      {message && <p className="ui-loading-state-text">{message}</p>}
    </div>
  );
}
