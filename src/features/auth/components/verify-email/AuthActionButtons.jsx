import { useTranslation } from "react-i18next";
import { Button } from '@ui';

/**
 * AuthActionButtons.jsx
 * Nhóm các button hành động cho quy trình xác thực email.
 * Sử dụng component Button thống nhất từ @ui.
 */
const AuthActionButtons = ({
  status,
  onLogin,
  onHome,
  onRegister
}) => {
  const { t } = useTranslation();

  // ─── Buttons cho trạng thái SUCCESS ───────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="d-grid gap-2">
        {/* Button chính — đi thẳng đến login */}
        <Button variant="primary" onClick={onLogin} className="py-2 fw-semibold">
          {t("article.dangNhapNgay")}
        </Button>

        {/* Link phụ — về trang chủ */}
        <Button variant="link" onClick={onHome} className="text-muted-custom text-decoration-none">
          {t("auth.veTrangChu")}
        </Button>
      </div>
    );
  }

  // ─── Buttons cho trạng thái ERROR ─────────────────────────────────────────
  if (status === 'error') {
    return (
      <div className="d-grid gap-2">
        {/* Button chính — đăng ký lại */}
        <Button variant="primary" onClick={onRegister} className="py-2 fw-semibold">
          {t("auth.dangKyLai")}
        </Button>

        {/* Link phụ — về trang đăng nhập */}
        <Button variant="link" onClick={onLogin} className="text-muted-custom text-decoration-none">
          {t("auth.veTrangDangNhap")}
        </Button>
      </div>
    );
  }

  // Loading state — không hiển thị button
  return null;
};

export default AuthActionButtons;