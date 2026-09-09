import { useTranslation } from "react-i18next";
import { Navbar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Icon from '../../../shared/components/Icon';

export default function AuthBanner() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const features = [
    t("auth.mienPhiHoanToanKhongCanThe"),
    t("auth.truyCap200mBaiBaoKhoaHoc"),
    t("auth.theoDoiKeywordVaNhanThongBao"),
    t("auth.taoProjectVaQuanLyJournal")
  ];
  return <div className="h-100 w-100 d-flex flex-column justify-content-between p-5 position-relative overflow-hidden auth-banner-container" style={{
    backgroundColor: 'var(--bg-section)',
    color: 'var(--text-main)',
    minHeight: '100vh',
    borderRight: '1px solid var(--border)'
  }}>
      {/* Animated ambient background glow spheres */}
      <div className="position-absolute" style={{
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 122, 51, 0.15) 0%, rgba(255, 122, 51, 0) 70%)',
        top: '-50px',
        right: '-50px',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        animation: 'banner-pulse-glow 8s ease-in-out infinite alternate'
      }} />
      <div className="position-absolute" style={{
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(7, 26, 28, 0.08) 0%, rgba(7, 26, 28, 0) 70%)',
        bottom: '80px',
        left: '-40px',
        filter: 'blur(35px)',
        pointerEvents: 'none',
        animation: 'banner-pulse-glow 10s ease-in-out infinite alternate-reverse'
      }} />

      {/* Grid Overlay with light line opacity */}
      <div className="position-absolute inset-0" style={{
      backgroundImage: 'linear-gradient(rgba(13, 27, 28, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 27, 28, 0.03) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
      backgroundPosition: 'center',
      opacity: 0.85,
      zIndex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }} />

      {/* Logo Brand */}
      <div className="d-flex align-items-center justify-content-between" style={{
      zIndex: 2
    }}>
        <Navbar.Brand onClick={() => navigate("/")} className="d-flex align-items-center text-main font-weight-bold transition-all hover-lift" style={{
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        cursor: "pointer"
      }}>
            <div className="d-flex align-items-center justify-content-center me-2.5 shadow-sm" style={{
          width: "42px",
          height: "42px",
          borderRadius: "10px",
          background: "var(--btn-dark)",
          boxShadow: "0 4px 14px rgba(7, 26, 28, 0.2)"
        }}>
              <Icon icon="lucide:activity" className="text-white text-base animate-pulse" />
            </div>
            <span className="fs-4 font-display fw-bold" style={{ letterSpacing: '-0.02em' }}>ResearchPulse</span>
          </Navbar.Brand>

        {/* Live Academic Pulse Tag */}
        <div className="d-none d-lg-flex align-items-center gap-2 px-3 py-1.5 rounded-full border bg-white bg-opacity-75 backdrop-blur shadow-xs" style={{ fontSize: '0.78rem', borderColor: 'var(--border)' }}>
          <span className="position-relative d-flex" style={{ width: '8px', height: '8px' }}>
            <span className="position-absolute w-100 h-100 rounded-circle bg-success opacity-75 animate-ping" />
            <span className="position-relative w-100 h-100 rounded-circle bg-success" />
          </span>
          <span className="fw-semibold text-muted-custom">200M+ Articles Tracked</span>
        </div>
      </div>

      {/* Main Banner Content */}
      <div className="my-auto position-relative" style={{
      zIndex: 2,
      maxWidth: '480px'
    }}>
        <div className="mb-3 d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill" style={{ background: 'var(--primary-light)', border: '1px solid rgba(255, 122, 51, 0.2)' }}>
          <Icon icon="lucide:sparkles" className="text-sm" style={{ color: 'var(--primary)' }} />
          <span className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>Academic Intelligence Platform</span>
        </div>

        <h1 className="font-display fw-bold mb-3 tracking-tight" style={{
        fontSize: '2.5rem',
        lineHeight: '1.2',
        color: 'var(--text-main)'
      }}>{t("auth.thamGiaCongDongNghienCuu")}</h1>
        
        <p className="fs-6 mb-4 text-muted-custom" style={{
        color: 'var(--text-muted)',
        lineHeight: '1.65'
      }}>{t("auth.cungHangNghinNhaNghienCuuSuDun")}</p>

        {/* Feature List with interactive micro-animations */}
        <div className="d-flex flex-column mb-4" style={{
        gap: '1.1rem'
      }}>
          {features.map((feat, index) => <div key={index} className="d-flex align-items-center gap-3 p-2 rounded-3 transition-all banner-feature-item" style={{
            transition: 'all 0.25s ease'
          }}>
              <div className="d-flex align-items-center justify-content-center flex-shrink-0 transition-transform feature-icon-box" style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'var(--primary-light)',
            border: '1.5px solid var(--primary)',
            boxShadow: '0 2px 8px rgba(255, 122, 51, 0.15)'
          }}>
                <Icon icon="lucide:check" className="text-xs" style={{
              color: 'var(--primary)',
              strokeWidth: '3'
            }} />
              </div>
              <span className="text-sm font-semibold" style={{
            color: 'var(--text-main)',
            letterSpacing: '0.01em'
          }}>{feat}</span>
            </div>)}
        </div>
      </div>

      {/* Footer Text and Icons */}
      <div className="d-flex align-items-center justify-content-between text-xs pt-3 border-top" style={{
      zIndex: 2,
      borderColor: 'rgba(0, 0, 0, 0.06)',
      color: 'var(--text-muted)'
    }}>
        <span>© {new Date().getFullYear()} ResearchPulse. All rights reserved.</span>
        <div className="d-flex gap-3">
          <Icon icon="lucide:globe" width="16" className="hover-lift" style={{
          cursor: 'pointer',
          opacity: 0.8
        }} />
          <Icon icon="lucide:help-circle" width="16" className="hover-lift" style={{
          cursor: 'pointer',
          opacity: 0.8
        }} />
        </div>
      </div>

      <style>{`
        @keyframes banner-pulse-glow {
          0% { transform: scale(1) translate(0, 0); opacity: 0.7; }
          50% { transform: scale(1.15) translate(-10px, 15px); opacity: 1; }
          100% { transform: scale(0.95) translate(10px, -10px); opacity: 0.8; }
        }
        .banner-feature-item:hover {
          background: rgba(255, 255, 255, 0.6);
          transform: translateX(4px);
        }
        .banner-feature-item:hover .feature-icon-box {
          transform: scale(1.12);
          background: var(--primary) !important;
        }
        .banner-feature-item:hover .feature-icon-box svg {
          color: #ffffff !important;
        }
      `}</style>
    </div>;
}