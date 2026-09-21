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
    <div>
      {/* Icon checkmark xanh lá */}
      <SuccessIcon />

      {/* Heading */}
      <h4
        className="text-center mb-2"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          color: "var(--ds-text-strong, #112033)",
        }}
      >
        {t("auth.kichHoatTaiKhoanThanhCong")}
      </h4>

      {/* Mô tả */}
      <p
        className="text-center mb-4"
        style={{
          fontSize: "0.93rem",
          color: "var(--ds-text-soft, #52637a)",
          lineHeight: 1.6,
        }}
      >
        {t("auth.taiKhoanCuaBanDaDuocKichHoatTh")}{" "}
        <span
          style={{
            color: "var(--primary)",
            fontWeight: 600,
          }}
        >
          ResearchPulse
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
