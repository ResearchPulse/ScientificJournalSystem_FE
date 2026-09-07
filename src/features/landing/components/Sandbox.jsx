/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\landing\components\Sandbox.jsx
 */
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Icon from "../../../shared/components/Icon";
import useSandboxSearch from "../hooks/useSandboxSearch";
import "./Sandbox.css";

const typeConfig = {
  JOURNAL: {
    labelKey: "typeJournal",
    icon: "lucide:book-open",
    variant: "primary",
    textColor: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.1)",
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  AUTHOR: {
    labelKey: "typeAuthor",
    icon: "lucide:user",
    variant: "secondary",
    textColor: "#a855f7",
    bgColor: "rgba(168, 85, 247, 0.1)",
    borderColor: "rgba(168, 85, 247, 0.2)",
  },
  ARTICLE: {
    labelKey: "typeArticle",
    icon: "lucide:file-text",
    variant: "success",
    textColor: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.1)",
    borderColor: "rgba(16, 185, 129, 0.2)",
  },
  KEYWORD: {
    labelKey: "typeKeyword",
    icon: "lucide:hash",
    variant: "warning",
    textColor: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)",
    borderColor: "rgba(245, 158, 11, 0.2)",
  },
  AREA: {
    labelKey: "typeArea",
    icon: "lucide:layers",
    variant: "danger",
    textColor: "#ec4899",
    bgColor: "rgba(236, 72, 153, 0.1)",
    borderColor: "rgba(236, 72, 153, 0.2)",
  },
  CATEGORY: {
    labelKey: "typeCategory",
    icon: "lucide:tag",
    variant: "info",
    textColor: "#6366f1",
    bgColor: "rgba(99, 102, 241, 0.1)",
    borderColor: "rgba(99, 102, 241, 0.2)",
  },
};

const defaultType = {
  labelKey: "search",
  icon: "lucide:help-circle",
  variant: "dark",
  textColor: "#94a3b8",
  bgColor: "rgba(148, 163, 184, 0.1)",
  borderColor: "rgba(148, 163, 184, 0.2)",
};

const CLICKABLE_TYPES = ["JOURNAL", "AUTHOR", "ARTICLE", "KEYWORD"];
const BADGE_TYPES = ["KEYWORD", "AUTHOR", "ARTICLE", "JOURNAL"];
const STAGGER_DELAY_MS = 50;

export default function Sandbox() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    searchValue,
    setSearchValue,
    isLoading,
    searchResult,
    error,
    handleTagClick,
    handleSearchSubmit,
  } = useSandboxSearch();

  const tags = [
    "LLM",
    "RAG",
    "Transformer",
    "Computer Vision",
    "Reinforcement Learning",
  ];

  return (
    <section id="search-sandbox" className="py-5 bg-dark-bg position-relative">
      <Container style={{ maxWidth: "960px" }}>
        {/* Glowing border card container */}
        <div
          className="p-1 rounded-5"
          style={{
            background:
              "linear-gradient(135deg, var(--primary-light) 0%, rgba(255, 255, 255, 0.5) 50%, var(--primary-light) 100%)",
            boxShadow: "0 15px 45px rgba(255, 122, 51, 0.05)",
          }}
        >
          {/* Card Body */}
          <div
            className="rounded-5 py-5 px-4 p-sm-5 text-center position-relative overflow-hidden"
            style={{ backgroundColor: "var(--bg-card)", zIndex: 1 }}
          >
            {/* Header label */}
            <div
              className="d-inline-flex align-items-center gap-2 mb-4 text-xs font-bold tracking-wider text-uppercase"
              style={{ fontSize: "0.75rem", color: "var(--primary)" }}
            >
              <Icon
                icon="lucide:sparkle"
                className="animate-spin-slow"
                style={{ color: "var(--primary)" }}
              />
              <span>{t("sandboxTitle")}</span>
            </div>

            {/* Form */}
            <Form
              onSubmit={handleSearchSubmit}
              className="sandbox-search-form mx-auto mb-4"
            >
              <div className="sandbox-searchbar">
                <InputGroup
                  size="lg"
                  className="sandbox-searchbar-inner"
                >
                  <span className="sandbox-search-icon">
                    <Icon icon="lucide:search" className="fs-5" />
                  </span>

                  <Form.Control
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={t("sandboxPlaceholder")}
                    className="sandbox-search-input fs-6"
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary-glow sandbox-search-btn me-1"
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span>...</span>
                      </>
                    ) : (
                      <>
                        <span>{t("searchBtn")}</span>
                        <Icon icon="lucide:arrow-right" className="fs-6" />
                      </>
                    )}
                  </Button>
                </InputGroup>
              </div>
            </Form>

            {/* Tag suggestions */}
            <div
              className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3 mx-auto"
              style={{ maxWidth: "800px" }}
            >
              <span
                className="text-muted-custom font-bold tracking-wider text-uppercase d-flex align-items-center gap-1"
                style={{ fontSize: "0.7rem" }}
              >
                <Icon icon="lucide:sliders" style={{ fontSize: "0.65rem" }} />
                <span>{t("tryNowLabel")}</span>
              </span>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className="sandbox-chip"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading indicator */}
            {isLoading && (
              <div className="sandbox-loading mt-4 mx-auto p-4 d-flex align-items-center justify-content-center gap-2 text-muted-custom"
                style={{ maxWidth: "600px" }}
              >
                <Icon
                  icon="lucide:database"
                  className="sandbox-loading-icon fs-5"
                  style={{ color: "var(--primary)" }}
                />
                <span>Analyzing publications databases...</span>
              </div>
            )}

            {error && (
              <div
                className="sandbox-error mt-4 mx-auto p-4"
                style={{ maxWidth: "600px" }}
              >
                <div className="d-flex align-items-start gap-3 text-danger">
                  <Icon icon="lucide:alert-circle" className="fs-4 mt-1" />
                  <div>
                    <h5 className="font-bold text-main text-sm m-0">
                      API Error
                    </h5>
                    <p
                      className="text-muted-custom mt-1 mb-0"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {searchResult && (
              <div
                className="sandbox-results mt-4 mx-auto"
                style={{ maxWidth: "600px" }}
              >
                <div
                  className="sandbox-results-meta d-flex align-items-center justify-content-between mb-3 pb-2"
                >
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="rounded-circle sandbox-live-dot"
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: searchResult.isRealData
                          ? "#198754"
                          : "#ffc107",
                      }}
                    />
                    <span
                      className="font-bold tracking-wider text-uppercase"
                      style={{
                        fontSize: "0.65rem",
                        color: searchResult.isRealData ? "#198754" : "#ffc107",
                      }}
                    >
                      {searchResult.isRealData
                        ? t("realData")
                        : "Offline Demo Data"}
                    </span>
                  </div>
                  <span
                    className="text-muted-custom"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {searchResult.isRealData
                      ? t("sourceLiveApi")
                      : "Simulated Sandbox"}
                  </span>
                </div>

                <h4 className="sandbox-results-title">
                  {t("resultsFor")} "
                  <span className="sandbox-results-keyword">
                    {searchResult.keyword}
                  </span>
                  "
                </h4>

                {searchResult.items && searchResult.items.length > 0 ? (
                  <div className="sandbox-result-list">
                    {searchResult.items.map((item, index) => {
                      const cfg = typeConfig[item.type] || defaultType;
                      const isOutlineBadge = !BADGE_TYPES.includes(item.type);
                      return (
                        <div
                          key={item.id || index}
                          className={[
                            "sandbox-result-card d-flex align-items-center justify-content-between",
                            CLICKABLE_TYPES.includes(item.type)
                              ? "is-clickable"
                              : "",
                            item.type === "JOURNAL" ? "is-journal" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          style={{ animationDelay: `${index * STAGGER_DELAY_MS}ms` }}
                          onClick={() => {
                            if (item.type === "JOURNAL") {
                              navigate(`/journals/${item.id}`);
                            }
                            if (item.type === "AUTHOR") {
                              navigate(`/authors/${item.id}`);
                            }
                            if (item.type === "ARTICLE") {
                              navigate(`/articles/${item.id}/visual`);
                            }
                            if (item.type === "KEYWORD") {
                              navigate(`/keywords/${item.id}`);
                            }
                          }}
                        >
                          <div
                            className="d-flex align-items-center gap-3 text-truncate"
                            style={{ flex: "1 1 auto", minWidth: 0 }}
                          >
                            <div
                              className="sandbox-result-icon"
                              style={{
                                color: cfg.textColor,
                                backgroundColor: cfg.bgColor,
                              }}
                            >
                              <Icon icon={cfg.icon} className="fs-5" />
                            </div>
                            <span
                              className="sandbox-result-title font-medium text-main text-sm text-truncate"
                            >
                              {item.name}
                            </span>
                          </div>
                          <span
                            className={[
                              "sandbox-result-badge",
                              isOutlineBadge ? "is-outline" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            style={{
                              backgroundColor: isOutlineBadge
                                ? "transparent"
                                : cfg.bgColor,
                              color: isOutlineBadge
                                ? cfg.textColor
                                : "#000000",
                              borderColor: cfg.borderColor,
                            }}
                          >
                            {t(cfg.labelKey)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="d-flex flex-column align-items-center justify-content-center py-5 text-center text-muted-custom">
                    <Icon
                      icon="lucide:search-x"
                      className="fs-1 text-muted-custom mb-2"
                    />
                    <p className="text-sm m-0" style={{ fontSize: "0.85rem" }}>
                      {t("noResults")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}