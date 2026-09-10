import { useTranslation } from 'react-i18next';
import { Modal as BsModal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Icon from '../../primitives/Icon';
import PrimaryButton from '../Button/PrimaryButton';

export default function AuthRequiredModal({ show, onHide }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    onHide();
    navigate('/login');
  };

  const handleRegisterClick = () => {
    onHide();
    navigate('/register');
  };

  return (
    <BsModal
      show={show}
      onHide={onHide}
      centered
      contentClassName="border-0 text-start bg-white rounded-3 shadow"
      style={{ backdropFilter: 'blur(4px)' }}
    >
      <BsModal.Header
        closeButton
        className="border-0 pb-0"
        style={{ backgroundColor: 'var(--bg-card)' }}
      >
        <BsModal.Title
          className="font-display fw-bold text-main d-flex align-items-center gap-2"
          style={{ fontSize: '1.25rem' }}
        >
          <Icon icon="lucide:shield-alert" className="text-warning" width="22" />
          {t('common.yeuCauDangNhap')}
        </BsModal.Title>
      </BsModal.Header>

      <BsModal.Body
        className="py-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          color: 'var(--text-main)',
        }}
      >
        <p className="mb-0" style={{ fontSize: '1rem', lineHeight: '1.5' }}>
          {t('common.banCanDangNhapDeSuDungTinhNang')}
        </p>
      </BsModal.Body>

      <BsModal.Footer
        className="border-0 pt-0"
        style={{ backgroundColor: 'var(--bg-card)', gap: '8px' }}
      >
        <PrimaryButton variant="outline" onClick={handleRegisterClick}>
          {t('common.dangKy')}
        </PrimaryButton>
        <PrimaryButton onClick={handleLoginClick}>
          {t('signIn')}
        </PrimaryButton>
      </BsModal.Footer>
    </BsModal>
  );
}
