import { useTranslation } from "react-i18next";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Icon from "../../../shared/components/Icon";

export default function AuthBanner() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const features = [
    t("auth.mienPhiHoanToanKhongCanThe"),
    t("auth.truyCap200mBaiBaoKhoaHoc"),
    t("auth.theoDoiKeywordVaNhanThongBao"),
    t("auth.taoProjectVaQuanLyJournal"),
  ];

  return (
    <div
      className="h-100 w-100 d-flex flex-column justify-content-between p-5 position-relative overflow-hidden auth-banner-container"
      style={{
        background: "linear-gradient(180deg, #edf4ff 0%, #f9fbfe 100%)",
        color: "var(--text-main)",
        minHeight: "100%",
        borderRight: "1px solid var(--border)",
      }}
    >
      <div
        className="position-absolute"
        style={{
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 113, 188, 0.14) 0%, rgba(0, 113, 188, 0) 70%)",
          top: "-60px",
          right: "-80px",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="position-absolute"
        style={{
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(17, 32, 51, 0.06) 0%, rgba(17, 32, 51, 0) 70%)",
          bottom: "80px",
          left: "-30px",
          filter: "blur(35px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="position-absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17, 32, 51, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(17, 32, 51, 0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.7,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        className="d-flex align-items-center justify-content-between"
        style={{ zIndex: 2 }}
      >
        <Navbar.Brand
          onClick={() => navigate("/")}
          className="d-flex align-items-center text-main font-weight-bold"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center me-2.5"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background:
                "linear-gradient(180deg, var(--ds-blue-600) 0%, var(--ds-blue-700) 100%)",
              boxShadow: "0 10px 20px rgba(0, 113, 188, 0.18)",
            }}
          >
            <Icon icon="lucide:activity" className="text-white" />
          </div>
          <span
            className="fs-4 fw-bold"
            style={{ letterSpacing: "-0.03em", color: "var(--ds-text-strong)" }}
          >
            ResearchPulse
          </span>
        </Navbar.Brand>

        <div
          className="d-none d-lg-flex align-items-center gap-2 px-3 py-1.5 rounded-pill border"
          style={{
            fontSize: "0.78rem",
            borderColor: "var(--border)",
            background: "rgba(255,255,255,0.7)",
            color: "var(--ds-text-soft)",
          }}
        >
          <span
            className="position-relative d-flex"
            style={{ width: "8px", height: "8px" }}
          >
            <span
              className="position-absolute w-100 h-100 rounded-circle bg-success opacity-75"
              style={{ animation: "ping 1.8s ease-in-out infinite" }}
            />
            <span className="position-relative w-100 h-100 rounded-circle bg-success" />
          </span>
          <span className="fw-semibold">200M+ Articles Tracked</span>
        </div>
      </div>

      <div
        className="my-auto position-relative"
        style={{ zIndex: 2, maxWidth: "480px" }}
      >
        <div
          className="mb-3 d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill"
          style={{
            background: "var(--primary-light)",
            border: "1px solid rgba(0, 113, 188, 0.1)",
          }}
        >
          <Icon
            icon="lucide:sparkles"
            className="text-sm"
            style={{ color: "var(--primary)" }}
          />
          <span className="text-xs fw-bold" style={{ color: "var(--primary)" }}>
            Academic Intelligence Platform
          </span>
        </div>

        <h1
          className="fw-bold mb-3"
          style={{
            fontSize: "2.5rem",
            lineHeight: "1.14",
            letterSpacing: "-0.05em",
            color: "var(--ds-text-strong)",
          }}
        >
          {t("auth.thamGiaCongDongNghienCuu")}
        </h1>

        <p
          className="fs-6 mb-4"
          style={{ color: "var(--ds-text-soft)", lineHeight: "1.7" }}
        >
          {t("auth.cungHangNghinNhaNghienCuuSuDun")}
        </p>

        <div className="d-flex flex-column mb-4" style={{ gap: "1rem" }}>
          {features.map((feat, index) => (
            <div
              key={index}
              className="d-flex align-items-center gap-3 p-2 rounded-3 banner-feature-item"
              style={{
                transition: "transform 0.2s ease, background-color 0.2s ease",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center flex-shrink-0 feature-icon-box"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "var(--primary-light)",
                  border: "1.5px solid rgba(0, 113, 188, 0.2)",
                  boxShadow: "0 4px 10px rgba(0, 113, 188, 0.08)",
                }}
              >
                <Icon
                  icon="lucide:check"
                  className="text-xs"
                  style={{ color: "var(--primary)", strokeWidth: "3" }}
                />
              </div>
              <span
                className="text-sm fw-semibold"
                style={{
                  color: "var(--ds-text-strong)",
                  letterSpacing: "0.01em",
                }}
              >
                {feat}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="d-flex align-items-center justify-content-between text-xs pt-3 border-top"
        style={{
          zIndex: 2,
          borderColor: "var(--border)",
          color: "var(--ds-text-soft)",
        }}
      >
        <span>
          © {new Date().getFullYear()} ResearchPulse. All rights reserved.
        </span>
        <div className="d-flex gap-3">
          <Icon
            icon="lucide:globe"
            width="16"
            style={{ cursor: "pointer", opacity: 0.8 }}
          />
          <Icon
            icon="lucide:help-circle"
            width="16"
            style={{ cursor: "pointer", opacity: 0.8 }}
          />
        </div>
      </div>

      <style>{`
        .banner-feature-item:hover {
          background: rgba(255, 255, 255, 0.7);
          transform: translateX(4px);
        }
        .banner-feature-item:hover .feature-icon-box {
          background: var(--primary) !important;
          border-color: var(--primary) !important;
        }
        .banner-feature-item:hover .feature-icon-box svg {
          color: #ffffff !important;
        }
      `}</style>
    </div>
  );
}
