/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: app\layouts\AuthLayout.jsx
 */
export default function AuthLayout({ banner, children }) {
  return (
    <div className="auth-shell">
      <div className="auth-frame">
        <aside className="auth-brand-panel">{banner}</aside>
        <main className="auth-form-panel">
          <div className="auth-form-inner">{children}</div>
        </main>
      </div>
    </div>
  );
}
