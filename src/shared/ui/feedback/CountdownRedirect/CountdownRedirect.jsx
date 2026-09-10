import { useTranslation } from 'react-i18next';
import ProgressBar from '../../components/Progress/ProgressBar';

const CountdownRedirect = ({ countdown, total }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <p
        className="text-center mb-2"
        style={{
          fontSize: '0.875rem',
          color: 'var(--text-muted, #6B6B6B)',
        }}
      >
        {t('common.tuDongChuyenDenTrangDangNhapSa')}
        <span
          style={{
            fontWeight: 600,
            color: 'var(--primary)',
          }}
        >
          {countdown}{t('common.giay')}
        </span>
        {'...'}
      </p>
      <ProgressBar current={countdown} total={total} />
    </div>
  );
};

export default CountdownRedirect;
