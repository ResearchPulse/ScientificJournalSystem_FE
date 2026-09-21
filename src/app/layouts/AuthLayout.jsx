/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: app\layouts\AuthLayout.jsx
 */
export default function AuthLayout({ banner, children }) {
  return (
    <div
      className="auth-shell"
      style={{ color: "var(--text-main)", fontFamily: "var(--font-display)" }}
    >
      <div className="auth-frame">
        <aside className="auth-brand-panel">{banner}</aside>
        <main className="auth-form-panel">
          <div
            className="auth-form-inner"
            style={{ animation: "slide-up 0.4s ease-out" }}
          >
            {children}
          </div>
        </main>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
