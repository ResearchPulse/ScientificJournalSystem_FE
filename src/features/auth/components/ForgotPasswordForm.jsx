import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { InputField } from '@ui';
import { Icon } from '@ui';
import ROUTES from '../../../app/routes/routePaths';
import SubmitButton from './SubmitButton';
import FormErrorMessage from './FormErrorMessage';
export default function ForgotPasswordForm({
  onSubmit,
  isLoading,
  apiError
}) {
  const { t: _t } = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const validateEmail = val => {
    if (!val.trim()) {
      return t("auth.emailKhongDuocDeTrong");
    } else if (!/\S+@\S+\.\S+/.test(val)) {
      return t("auth.emailKhongDungDinhDang");
    }
    return '';
  };
  const handleChange = e => {
    setEmail(e.target.value);
    setError('');
  };
  const handleBlur = () => {
    setError(validateEmail(email));
  };
  const handleSubmit = e => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }
    onSubmit(email.trim());
  };
  return <Form onSubmit={handleSubmit} noValidate>
      {/* Server API Error Banner */}
      <FormErrorMessage message={apiError} />

      {/* Email Input */}
      <InputField label={t("auth.diaChiEmail")} name="email" type="email" value={email} onChange={handleChange} onBlur={handleBlur} placeholder={t("auth.nameemailcom")} error={error} icon="lucide:mail" required disabled={isLoading} />

      {/* Submit Button */}
      <div className="mt-4">
        <SubmitButton isLoading={isLoading} loadingText={t("auth.dangGuiYeuCau")} label={t("auth.guiLienKetDatLaiMatKhau")} />
      </div>

      {/* Link back to Login */}
      <div className="text-center mt-4 text-sm font-medium d-flex align-items-center justify-content-center gap-1 flex-wrap">
        <Link to={ROUTES.LOGIN} className="text-decoration-none d-inline-flex align-items-center gap-1.5 transition-all" style={{
        color: 'var(--primary)',
        fontWeight: 600
      }}>
          <Icon icon="lucide:arrow-left" width="16" />
          <span>{t("auth.quayLaiDangNhap")}</span>
        </Link>
      </div>
    </Form>;
}