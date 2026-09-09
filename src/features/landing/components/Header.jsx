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
// Single source of truth for supported languages — shared by desktop & mobile switchers.
const LANGUAGES = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const cleanPathname = pathname.replace(/^\/(vi|en|ja|ko)/, "") || "/";
  const auth = useAuth?.() ?? {
    logout: () => {},
  };
  const { logout } = auth;
  const email = useUserStore((state) => state.email);
  const userRole = auth.user?.role;
  const accountManagementRoute =
    userRole === "ADMINISTRATOR" ? ROUTES.ADMIN_USERS : ROUTES.PROFILE;
  const language = i18n.language || "vi";
  const currentLanguage =
    LANGUAGES.find((lang) => language.startsWith(lang.code)) || LANGUAGES[0];
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
  const navigateWithLang = (path) => {
    if (path.startsWith("/")) {
      const segments = path.split("/").filter(Boolean);
      if (
        segments.length === 0 ||
        !["vi", "en", "ja", "ko"].includes(segments[0])
      ) {
        navigate(`/${language}${path}`);
        return;
      }
    }
    navigate(path);
  };
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("researchpulse_lang", lang);
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && ["vi", "en", "ja", "ko"].includes(segments[0])) {
      segments[0] = lang;
    } else {
      segments.unshift(lang);
    }
    const newPath = "/" + segments.join("/") + location.search + location.hash;
    navigate(newPath);
  };
  const handleAuthLogin = () => {
    navigateWithLang(ROUTES.LOGIN);
  };
  const handleAuthRegister = () => {
    navigateWithLang(ROUTES.REGISTER);
  };
  const navItems = [
    {
      label: t("author.tongQuan"),
      icon: "lucide:layout-dashboard",
      path: ROUTES.DASHBOARD,
    },
    {
      label: t("landing.duAn"),
      icon: "lucide:folder",
      path: ROUTES.PROJECTS,
    },
    {
      label: t("search"),
      icon: "lucide:search",
      path: ROUTES.CATALOG,
    },
    {
      label: t("articles"),
      icon: "lucide:file-text",
      path: ROUTES.ARTICLES,
    },
    {
      label: t("landing.tacGia"),
      icon: "lucide:users",
      path: ROUTES.AUTHORS,
    },
  ];
  const navLinkStyle = {
    borderBottom: "2px solid transparent",
    color: "var(--text-muted)",
    transition: "color 0.18s ease, border-color 0.18s ease",
    fontWeight: 600,
  };
  const dropdownMenuStyle = {
    minWidth: "190px",
    "--bs-dropdown-link-active-bg": "rgba(0, 0, 0, 0.06)",
    "--bs-dropdown-link-active-color": "var(--text-main)",
    "--bs-dropdown-link-hover-bg": "rgba(0, 0, 0, 0.04)",
    "--bs-dropdown-link-hover-color": "var(--text-main)",
  };
  return (
    <>
      <Navbar
        expand="md"
        fixed="top"
        className="transition-all duration-300 py-3 sticky-scrolled"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-card)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Container>
          {/* Logo Brand */}
          <Navbar.Brand
            onClick={() => navigateWithLang(ROUTES.HOME)}
            className="d-flex align-items-center text-main font-weight-bold"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-center me-2"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "var(--btn-dark)",
                boxShadow: "0 0 10px rgba(7, 26, 28, 0.15)",
              }}
            >
              <Icon icon="lucide:activity" className="text-white text-sm" />
            </div>
            ResearchPulse
          </Navbar.Brand>

          {/* Hamburger toggle for mobile */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setShowMobileMenu(true)}
            className="border-0 bg-transparent text-main p-0"
          >
            <Icon icon="lucide:menu" className="fs-3 text-main" />
          </Navbar.Toggle>

          {/* Desktop Navigation Link Items */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="d-none d-md-flex justify-content-between align-items-center w-100"
          >
            <Nav
              className="mx-auto align-items-center"
              style={{
                gap: "10px",
              }}
            >
              {navItems.map((item) => {
                const isPrivate =
                  item.path === ROUTES.DASHBOARD ||
                  item.path === ROUTES.PROJECTS;
                if (isPrivate && !email) return null;
                return (
                  <Nav.Link
                    key={item.path}
                    onClick={() => navigateWithLang(item.path)}
                    className="px-2 py-1 text-sm d-flex align-items-center gap-1 bg-transparent"
                    style={navLinkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--primary)";
                      e.currentTarget.style.borderBottomColor =
                        "var(--primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.borderBottomColor = "transparent";
                    }}
                  >
                    {item.label}
                  </Nav.Link>
                );
              })}
            </Nav>

            <div className="d-flex align-items-center gap-3">
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  type="button"
                  className="border-0 bg-transparent d-inline-flex align-items-center justify-content-center p-0 text-muted-custom"
                  style={{
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                  }}
                  aria-label="Mở cài đặt giao diện"
                >
                  <Icon icon="lucide:settings" width="18" />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="border-0 shadow-sm mt-2"
                  style={dropdownMenuStyle}
                >
                  <div className="px-3 py-2 text-xs font-bold text-main border-bottom pb-2 mb-1">
                    {t("landing.caiDat")}
                  </div>
                  {LANGUAGES.map((lang) => (
                    <Dropdown.Item
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`d-flex align-items-center justify-content-between text-xs py-2 ${language.startsWith(lang.code) ? "text-primary" : "text-dark"}`}
                    >
                      <span>{lang.label}</span>
                      {language.startsWith(lang.code) && (
                        <Icon
                          icon="lucide:check"
                          className="text-primary text-xs ms-2"
                        />
                      )}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              {/* User Authentication Display/Buttons */}
              {email ? (
                <>
                  <CoinBalanceBadge />
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as="button"
                      type="button"
                      className="border-0 bg-transparent d-inline-flex align-items-center justify-content-center p-0 text-muted-custom hover:text-primary"
                      style={{
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                        transition: "color 0.15s ease",
                      }}
                      aria-label="Tài khoản người dùng"
                    >
                      <Icon icon="lucide:user" width="18" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      className="border-0 shadow-sm mt-2"
                      style={dropdownMenuStyle}
                    >
                      <div className="px-3 py-2 text-xs font-bold text-main border-bottom pb-2 mb-1">
                        <span>{t("landing.nguoiDung")}</span>
                        <div
                          className="text-muted-custom font-normal mt-0.5 text-truncate"
                          style={{
                            fontSize: "10px",
                            color: "var(--text-muted)",
                          }}
                        >
                          {email}
                        </div>
                      </div>
                      <Dropdown.Item
                        onClick={() => navigateWithLang(ROUTES.WALLET)}
                        className="d-flex align-items-center gap-2 text-xs py-2 text-main"
                      >
                        <Icon
                          icon="solar:wallet-bold"
                          width="14"
                          style={{
                            color: "#ff7a33",
                          }}
                        />
                        <span
                          className="font-weight-bold"
                          style={{
                            color: "var(--text-main)",
                          }}
                        >
                          {t("landing.viCuaToi")}
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => navigateWithLang(ROUTES.DASHBOARD)}
                        className="d-flex align-items-center gap-2 text-xs py-2 text-main"
                      >
                        <Icon
                          icon="lucide:layout-dashboard"
                          width="14"
                          className="text-muted-custom"
                        />
                        <span>{t("landing.bangDieuKhien")}</span>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => navigateWithLang(accountManagementRoute)}
                        className="d-flex align-items-center gap-2 text-xs py-2 text-main"
                      >
                        <Icon
                          icon="lucide:users"
                          width="14"
                          className="text-muted-custom"
                        />
                        <span>{t("landing.quanTriTaiKhoan")}</span>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={logout}
                        className="d-flex align-items-center gap-2 text-xs py-2 text-danger"
                      >
                        <Icon icon="lucide:log-out" width="14" />
                        <span>{t("landing.dangXuat")}</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-secondary"
                    className="text-xs rounded-pill px-3"
                    onClick={handleAuthLogin}
                  >
                    {t("signIn")}
                  </Button>
                  <Button
                    className="btn-primary-glow border-0 text-white text-xs rounded-pill px-3"
                    onClick={handleAuthRegister}
                  >
                    {t("signUp")}
                  </Button>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Menu Drawer (Offcanvas) — width scales down on very narrow screens */}
      <Offcanvas
        show={showMobileMenu}
        onHide={() => setShowMobileMenu(false)}
        placement="end"
        className="bg-white text-dark border-start border-light"
        style={{
          width: "min(280px, 85vw)",
          maxWidth: "100vw",
          backgroundColor: "var(--bg-card)",
          color: "var(--text-main)",
        }}
      >
        <Offcanvas.Header
          closeButton
          closeVariant="dark"
          className="border-bottom border-light py-3"
        >
          <Offcanvas.Title
            className="d-flex align-items-center text-main"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
            }}
          >
            <div
              className="d-flex align-items-center justify-content-center me-2"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                background: "var(--btn-dark)",
              }}
            >
              <Icon icon="lucide:activity" className="text-white text-xs" />
            </div>
            ResearchPulse
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="d-flex flex-column py-3">
          {/* User profile — moved to top, responsive across drawer widths */}
          {email && (
            <div
              className="d-flex align-items-center gap-2 gap-sm-3 p-2 rounded-3 user-profile-card"
              style={{
                background: "#f8fafc",
                border: "1px solid var(--border)",
                cursor: "pointer",
                transition: "background 0.15s ease",
              }}
              role="button"
              tabIndex={0}
              onClick={() => {
                setShowMobileMenu(false);
                navigateWithLang(accountManagementRoute);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setShowMobileMenu(false);
                  navigateWithLang(accountManagementRoute);
                }
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f1f5f9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#f8fafc")
              }
            >
              <div
                className="d-flex align-items-center justify-content-center text-white flex-shrink-0"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "var(--primary)",
                  boxShadow: "0 0 6px rgba(255, 122, 51, 0.15)",
                }}
              >
                <Icon icon="lucide:user" width="16" />
              </div>
              <div
                className="d-flex flex-column flex-grow-1"
                style={{ minWidth: 0 }}
              >
                <span className="text-xs text-main font-bold text-truncate">
                  {t("landing.nguoiDung")}
                </span>
                <span
                  className="text-muted text-truncate"
                  style={{ fontSize: "10px", marginTop: "1px" }}
                >
                  {email}
                </span>
              </div>
              <div className="flex-shrink-0">
                <CoinBalanceBadge />
              </div>
            </div>
          )}

          <div className="d-flex flex-column gap-3 justify-content-between flex-grow-1 mt-3">
            <Nav className="flex-column gap-3">
              {!!email && (
                <>
                  <Nav.Link
                    onClick={() => {
                      setShowMobileMenu(false);
                      navigateWithLang(ROUTES.DASHBOARD);
                    }}
                    className="text-muted-custom hover:text-main py-2 text-sm font-semibold border-bottom border-light"
                  >
                    {t("author.tongQuan")}
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setShowMobileMenu(false);
                      navigateWithLang(ROUTES.PROJECTS);
                    }}
                    className="text-muted-custom hover:text-main py-2 text-sm font-semibold border-bottom border-light"
                    style={{
                      color: cleanPathname.startsWith(ROUTES.PROJECTS)
                        ? "var(--primary)"
                        : "var(--text-muted)",
                      fontWeight: cleanPathname.startsWith(ROUTES.PROJECTS)
                        ? 700
                        : 600,
                    }}
                  >
                    {t("landing.duAn")}
                  </Nav.Link>
                </>
              )}
              <Nav.Link
                onClick={() => {
                  setShowMobileMenu(false);
                  navigateWithLang(ROUTES.CATALOG);
                }}
                className="text-muted-custom hover:text-main py-2 text-sm font-semibold border-bottom border-light"
              >
                {t("search")}
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  setShowMobileMenu(false);
                  navigateWithLang(ROUTES.ARTICLES);
                }}
                className="text-muted-custom hover:text-main py-2 text-sm font-semibold border-bottom border-light"
                style={{
                  color: cleanPathname.startsWith(ROUTES.ARTICLES)
                    ? "var(--primary)"
                    : "var(--text-muted)",
                  fontWeight: cleanPathname.startsWith(ROUTES.ARTICLES)
                    ? 700
                    : 600,
                }}
              >
                {t("articles")}
              </Nav.Link>
            </Nav>

            <div className="d-flex flex-column gap-3 mt-auto">
              {/* Mobile Language Switcher: title left, dropdown right */}
              <div className="d-flex align-items-center justify-content-between py-2 border-top border-bottom border-light">
                <span className="text-xs font-bold text-main">
                  {t("landing.ngonNgu")}
                </span>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    as="button"
                    type="button"
                    className="border-0 bg-transparent d-inline-flex align-items-center gap-2 text-xs font-bold p-0 text-main"
                    style={{ cursor: "pointer" }}
                  >
                    {currentLanguage.label}
                    <Icon icon="lucide:chevron-down" width="14" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="border-0 shadow-sm mt-2"
                    style={dropdownMenuStyle}
                  >
                    {LANGUAGES.map((lang) => (
                      <Dropdown.Item
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`d-flex align-items-center justify-content-between text-xs py-2 ${language.startsWith(lang.code) ? "text-primary" : "text-dark"}`}
                      >
                        <span>{lang.label}</span>
                        {language.startsWith(lang.code) && (
                          <Icon
                            icon="lucide:check"
                            className="text-primary text-xs ms-2"
                          />
                        )}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {/* Mobile Auth options */}
              {email ? (
                <Button
                  variant="danger"
                  className="w-100 rounded-pill py-2 text-xs font-bold"
                  onClick={() => {
                    logout();
                    setShowMobileMenu(false);
                  }}
                >
                  {language.startsWith("vi")
                    ? t("landing.dangXuat")
                    : "Sign Out"}
                </Button>
              ) : (
                <div className="d-flex flex-column gap-2">
                  <Button
                    variant="outline-primary"
                    className="w-100 rounded-pill py-2.5 text-xs font-bold"
                    onClick={() => {
                      setShowMobileMenu(false);
                      handleAuthLogin();
                    }}
                  >
                    {t("signIn")}
                  </Button>
                  <Button
                    className="btn-primary-glow w-100 rounded-pill py-2.5 text-xs font-bold border-0 text-white"
                    onClick={() => {
                      setShowMobileMenu(false);
                      handleAuthRegister();
                    }}
                  >
                    {t("signUp")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
