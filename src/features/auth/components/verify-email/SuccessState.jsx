import { useTranslation } from "react-i18next";
// SuccessState.jsx
// Hiển thị khi API verify trả về thành công.
// Gồm: icon, heading, mô tả, countdown, buttons.

import SuccessIcon from "./SuccessIcon";
import CountdownRedirect from "../../../../shared/components/CountdownRedirect";
import AuthActionButtons from "./AuthActionButtons";
const SuccessState = ({ countdown, totalSeconds, onLogin, onHome }) => {
  const { t } = useTranslation();
  return (
    <div className="auth-state-enter">
      {/* Icon checkmark xanh lá */}
      <SuccessIcon />

      {/* Heading */}
      <h2 className="auth-status-heading text-center mb-2">
        {t("auth.kichHoatTaiKhoanThanhCong")}
      </h2>

      {/* Mô tả */}
      <p className="auth-status-copy text-center mb-4">
        {t("auth.taiKhoanCuaBanDaDuocKichHoatTh")}{" "}
        <span
          style={{
            color: "var(--primary)",
            fontWeight: 600,
          }}
        >
          HyperData Lab
        </span>
        .
      </p>

      {/* Countdown + Progress bar */}
      <CountdownRedirect countdown={countdown} total={totalSeconds} />

      {/* Buttons */}
      <AuthActionButtons status="success" onLogin={onLogin} onHome={onHome} />
    </div>
  );
};
export default SuccessState;
