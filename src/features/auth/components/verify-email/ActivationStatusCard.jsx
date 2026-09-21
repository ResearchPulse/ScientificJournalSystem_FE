// ActivationStatusCard.jsx
// Card wrapper chứa 3 trạng thái: loading / success / error.
// Nhận status từ hook và render đúng state tương ứng.

import LoadingState from "./LoadingState";
import SuccessState from "./SuccessState";
import ErrorState from "./ErrorState";

const ActivationStatusCard = ({
  status,
  errorMessage,
  countdown,
  totalSeconds,
  onLogin,
  onHome,
  onRegister,
}) => {
  return (
    <div
      className="auth-status-card"
      style={{ width: "100%", maxWidth: "480px" }}
    >
      {/* Trạng thái đang xác thực */}
      {status === "loading" && <LoadingState />}

      {/* Trạng thái kích hoạt thành công */}
      {status === "success" && (
        <SuccessState
          countdown={countdown}
          totalSeconds={totalSeconds}
          onLogin={onLogin}
          onHome={onHome}
        />
      )}

      {/* Trạng thái kích hoạt thất bại */}
      {status === "error" && (
        <ErrorState
          message={errorMessage}
          onLogin={onLogin}
          onRegister={onRegister}
        />
      )}
    </div>
  );
};

export default ActivationStatusCard;
