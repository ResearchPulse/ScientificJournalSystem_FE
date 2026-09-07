/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\landing\components\Header.jsx
 */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Icon from "../../../shared/components/Icon";
import useAuth from "../../auth/hooks/useAuth";
import { useUserStore } from "../../../app/store/userStore";
import ROUTES from "../../../app/routes/routePaths";
import CoinBalanceBadge from "../../wallet/components/CoinBalanceBadge";
import "./Header.css";

const LANG_OPTIONS = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
];

export default function Header() {
  const {
    t,
    i18n
  } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const cleanPathname = pathname.replace(/^\/(vi|en|ja|ko)/, '') || '/';
  const auth = useAuth?.() ?? {
    logout: () => {}
  };
  const {
    logout
  } = auth;
  const email = useUserStore(state => state.email);
  const userRole = auth.user?.role;
  const accountManagementRoute = userRole === 'ADMINISTRATOR' ? ROUTES.ADMIN_USERS : ROUTES.PROFILE;
  const language = i18n.language || "vi";
  const currentLangName =
    LANG_OPTIONS.find(opt => language.startsWith(opt.code))?.label || "English";
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navigateWithLang = path => {
    if (path.startsWith('/')) {
      const segments = path.split('/').filter(Boolean);
      if (segments.length === 0 || !['vi', 'en', 'ja', 'ko'].includes(segments[0])) {
        navigate(`/${language}${path}`);
        return;
      }
    }
    navigate(path);
  };
  const changeLanguage = lang => {
    i18n.changeLanguage(lang);
    localStorage.setItem("researchpulse_lang", lang);
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && ['vi', 'en', 'ja', 'ko'].includes(segments[0])) {
      segments[0] = lang;
    } else {
      segments.unshift(lang);
    }
    const newPath = '/' + segments.join('/') + location.search + location.hash;
    navigate(newPath);
  };
  const handleAuthLogin = () => {
    navigateWithLang(ROUTES.LOGIN);
  };
  const handleAuthRegister = () => {
    navigateWithLang(ROUTES.REGISTER);
  };
  const navItems = [{
    label: t("author.tongQuan"),
    icon: "lucide:layout-dashboard",
    path: ROUTES.DASHBOARD
  }, {
    label: t("landing.duAn"),
    icon: "lucide:folder",
    path: ROUTES.PROJECTS
  }, {
    label: t("search"),
    icon: "lucide:search",
    path: ROUTES.CATALOG
  }, {
    label: t("articles"),
    icon: "lucide:file-text",
    path: ROUTES.ARTICLES
  }, {
    label: t("landing.tacGia"),
    icon: "lucide:users",
    path: ROUTES.AUTHORS
  }];
  const navLinkStyle = {
    borderBottom: "2px solid transparent",
    color: "var(--text-muted)",
    transition: "color 0.18s ease, border-color 0.18s ease",
    fontWeight: 600
  };
  const dropdownMenuStyle = {
    minWidth: "190px",
    "--bs-dropdown-link-active-bg": "rgba(0, 0, 0, 0.06)",
    "--bs-dropdown-link-active-color": "var(--text-main)",
    "--bs-dropdown-link-hover-bg": "rgba(0, 0, 0, 0.04)",
    "--bs-dropdown-link-hover-color": "var(--text-main)"
  };
  return <>
      <Navbar expand="md" fixed="top" className="transition-all duration-300 py-3 sticky-scrolled" style={{
      borderBottom: "1px solid var(--border)",
      background: "var(--bg-card)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)"
    }}>
        <Container>
          {/* Logo Brand */}
          <Navbar.Brand onClick={() => navigateWithLang(ROUTES.HOME)} className="d-flex align-items-center text-main font-weight-bold" style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          cursor: "pointer"
        }}>
            <div className="d-flex align-items-center justify-content-center me-2" style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: "var(--btn-dark)",
            boxShadow: "0 0 10px rgba(7, 26, 28, 0.15)"
          }}>
              <Icon icon="lucide:activity" className="text-white text-sm" />
            </div>
            ResearchPulse
          </Navbar.Brand>

          {/* Hamburger toggle for mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setShowMobileMenu(true)} className="border-0 bg-transparent text-main p-0">
            <Icon icon="lucide:menu" className="fs-3 text-main" />
          </Navbar.Toggle>

          {/* Desktop Navigation Link Items */}
          <Navbar.Collapse id="basic-navbar-nav" className="d-none d-md-flex justify-content-between align-items-center w-full">
            <Nav className="mx-auto align-items-center" style={{
            gap: "10px"
          }}>
              {navItems.map(item => {
                const isPrivate = item.path === ROUTES.DASHBOARD || item.path === ROUTES.PROJECTS;
                if (isPrivate && !email) return null;
                return (
                  <Nav.Link key={item.path} onClick={() => navigateWithLang(item.path)} className="px-2 py-1 text-sm d-flex align-items-center gap-1 bg-transparent" style={navLinkStyle} onMouseEnter={e => {
                  e.currentTarget.style.color = "var(--primary)";
                  e.currentTarget.style.borderBottomColor = "var(--primary)";
                }} onMouseLeave={e => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.borderBottomColor = "transparent";
                }}>
                      <Icon icon={item.icon} width="14" />
                      {item.label}
                    </Nav.Link>
                );
              })}
            </Nav>

            <div className="d-flex align-items-center gap-3">
              <Dropdown align="end">
                <Dropdown.Toggle as="button" type="button" className="border-0 bg-transparent d-inline-flex align-items-center justify-content-center p-0 text-muted-custom" style={{
                width: "32px",
                height: "32px",
                cursor: "pointer"
              }} aria-label="Mở cài đặt giao diện">
                  <Icon icon="lucide:settings" width="18" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="border-0 shadow-sm mt-2" style={dropdownMenuStyle}>
                  <div className="px-3 py-2 text-xs font-bold text-main border-bottom pb-2 mb-1">{t("landing.caiDat")}</div>
                  <Dropdown.Item onClick={() => changeLanguage("vi")} className={`d-flex align-items-center justify-content-between text-xs py-2 ${language.startsWith("vi") ? "text-primary" : "text-dark"}`}>
                    <span>Tiếng Việt</span>
                    {language.startsWith("vi") && <Icon icon="lucide:check" className="text-primary text-xs ms-2" />}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage("en")} className={`d-flex align-items-center justify-content-between text-xs py-2 ${language.startsWith("en") ? "text-primary" : "text-dark"}`}>
                    <span>English</span>
                    {language.startsWith("en") && <Icon icon="lucide:check" className="text-primary text-xs ms-2" />}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage("ja")} className={`d-flex align-items-center justify-content-between text-xs py-2 ${language.startsWith("ja") ? "text-primary" : "text-dark"}`}>
                    <span>日本語</span>
                    {language.startsWith("ja") && <Icon icon="lucide:check" className="text-primary text-xs ms-2" />}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage("ko")} className={`d-flex align-items-center justify-content-between text-xs py-2 ${language.startsWith("ko") ? "text-primary" : "text-dark"}`}>
                    <span>한국어</span>
                    {language.startsWith("ko") && <Icon icon="lucide:check" className="text-primary text-xs ms-2" />}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* User Authentication Display/Buttons */}
              {email ? <>
                  <CoinBalanceBadge />
                  <Dropdown align="end">
                    <Dropdown.Toggle as="button" type="button" className="border-0 bg-transparent d-inline-flex align-items-center justify-content-center p-0 text-muted-custom hover:text-primary" style={{
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  transition: "color 0.15s ease"
                }} aria-label="Tài khoản người dùng">
                    <Icon icon="lucide:user" width="18" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="border-0 shadow-sm mt-2" style={dropdownMenuStyle}>
                    <div className="px-3 py-2 text-xs font-bold text-main border-bottom pb-2 mb-1">
                      <span>{t("landing.nguoiDung")}</span>
                      <div className="text-muted-custom font-normal mt-0.5 text-truncate" style={{
                      fontSize: "10px",
                      color: "var(--text-muted)"
                    }}>
                        {email}
                      </div>
                    </div>
                    <Dropdown.Item onClick={() => navigateWithLang(ROUTES.WALLET)} className="d-flex align-items-center gap-2 text-xs py-2 text-main">
                      <Icon icon="solar:wallet-bold" width="14" style={{
                      color: '#ff7a33'
                    }} />
                      <span className="font-weight-bold" style={{
                      color: 'var(--text-main)'
                    }}>{t("landing.viCuaToi")}</span>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigateWithLang(ROUTES.DASHBOARD)} className="d-flex align-items-center gap-2 text-xs py-2 text-main">
                      <Icon icon="lucide:layout-dashboard" width="14" className="text-muted-custom" />
                      <span>{t("landing.bangDieuKhien")}</span>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigateWithLang(accountManagementRoute)} className="d-flex align-items-center gap-2 text-xs py-2 text-main">
                      <Icon icon="lucide:users" width="14" className="text-muted-custom" />
                      <span>{t("landing.quanTriTaiKhoan")}</span>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={logout} className="d-flex align-items-center gap-2 text-xs py-2 text-danger">
                      <Icon icon="lucide:log-out" width="14" />
                      <span>{t("landing.dangXuat")}</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </> : <>
                  <Button variant="outline-secondary" className="text-xs rounded-pill px-3" onClick={handleAuthLogin}>
                    {t("signIn")}
                  </Button>
                  <Button className="btn-primary-glow border-0 text-white text-xs rounded-pill px-3" onClick={handleAuthRegister}>
                    {t("signUp")}
                  </Button>
                </>}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Menu Drawer (Offcanvas) — modern compact hierarchy:
          Header → User card + Sign out → Main nav → Dashboard → Language */}
      <Offcanvas
        show={showMobileMenu}
        onHide={() => setShowMobileMenu(false)}
        placement="end"
        className="mobile-drawer"
      >
        <Offcanvas.Header className="mnav-header" closeButton={false}>
          <Offcanvas.Title className="mnav-brand">
            <div className="mnav-brand-mark">
              <Icon icon="lucide:activity" width="14" />
            </div>
            ResearchPulse
          </Offcanvas.Title>
          <button
            type="button"
            className="mnav-close"
            aria-label="Close menu"
            onClick={() => setShowMobileMenu(false)}
          >
            <Icon icon="lucide:x" width="18" />
          </button>
        </Offcanvas.Header>

        <Offcanvas.Body className="mnav-body">
          {/* User section — compact card near top */}
          {email && (
            <>
              <div className="mnav-user-card mnav-stagger">
                <div className="mnav-avatar">
                  <Icon icon="lucide:user" width="16" />
                </div>
                <div className="mnav-user-meta">
                  <span className="mnav-user-name">{t("landing.nguoiDung")}</span>
                  <span className="mnav-user-email">{email}</span>
                </div>
                <CoinBalanceBadge className="mnav-coin-badge" />
              </div>
              <button
                type="button"
                className="mnav-signout mnav-stagger"
                onClick={() => {
                  logout();
                  setShowMobileMenu(false);
                }}
              >
                <Icon icon="lucide:log-out" width="14" />
                {language.startsWith("vi") ? t("landing.dangXuat") : "Sign Out"}
              </button>
            </>
          )}

          {/* Main navigation */}
          <nav className="mnav-nav">
            {navItems.map((item, index) => {
              const isPrivate = item.path === ROUTES.DASHBOARD || item.path === ROUTES.PROJECTS;
              if (isPrivate && !email) return null;
              const isActive =
                item.path === "/"
                  ? cleanPathname === "/"
                  : cleanPathname.startsWith(item.path);
              return (
                <button
                  key={item.path}
                  type="button"
                  className={`mnav-item mnav-stagger ${isActive ? "is-active" : ""}`}
                  style={{ animationDelay: `${80 + index * 40}ms` }}
                  onClick={() => {
                    setShowMobileMenu(false);
                    navigateWithLang(item.path);
                  }}
                >
                  <Icon icon={item.icon} width="16" className="mnav-item-icon" />
                  <span>{item.label}</span>
                  <Icon icon="lucide:chevron-right" width="14" className="mnav-item-caret" />
                </button>
              );
            })}
          </nav>

          {/* Go to Dashboard */}
          {email && (
            <button
              type="button"
              className="mnav-dash-btn mnav-stagger"
              onClick={() => {
                setShowMobileMenu(false);
                navigateWithLang(ROUTES.DASHBOARD);
              }}
            >
              <Icon icon="lucide:layout-dashboard" width="15" />
              {language.startsWith("vi") ? t("landing.bangDieuKhien") : "Go to Dashboard"}
            </button>
          )}

          {/* Guest auth actions */}
          {!email && (
            <div className="mnav-auth mnav-stagger">
              <button
                type="button"
                className="mnav-auth-btn is-outline"
                onClick={() => {
                  setShowMobileMenu(false);
                  handleAuthLogin();
                }}
              >
                {t("signIn")}
              </button>
              <button
                type="button"
                className="mnav-auth-btn is-solid"
                onClick={() => {
                  setShowMobileMenu(false);
                  handleAuthRegister();
                }}
              >
                {t("signUp")}
              </button>
            </div>
          )}

          {/* Language — single compact row with dropdown */}
          <div className="mnav-lang mnav-stagger">
            <button
              type="button"
              className="mnav-lang-row"
              aria-expanded={langOpen}
              onClick={() => setLangOpen(open => !open)}
            >
              <span className="mnav-lang-label">
                <Icon icon="lucide:globe" width="15" />
                Language
              </span>
              <span className="mnav-lang-value">
                {currentLangName}
                <Icon
                  icon="lucide:chevron-down"
                  width="14"
                  className={`mnav-lang-caret ${langOpen ? "is-open" : ""}`}
                />
              </span>
            </button>
            <div
              className={`mnav-lang-collapse ${langOpen ? "is-open" : ""}`}
              aria-hidden={!langOpen}
            >
              <div className="mnav-lang-clip">
                <div className="mnav-lang-list">
                  {LANG_OPTIONS.map(opt => (
                    <button
                      key={opt.code}
                      type="button"
                      className={`mnav-lang-option ${language.startsWith(opt.code) ? "is-active" : ""}`}
                      onClick={() => {
                        changeLanguage(opt.code);
                        setLangOpen(false);
                      }}
                    >
                      <span>{opt.label}</span>
                      {language.startsWith(opt.code) && <Icon icon="lucide:check" width="14" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer — small, unobtrusive */}
          <div className="mnav-footer mnav-stagger">
            © {new Date().getFullYear()} ResearchPulse
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>;
}