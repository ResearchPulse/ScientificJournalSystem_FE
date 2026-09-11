import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\catalog\components\JournalResultCard.jsx
 */
import { Card, Button } from 'react-bootstrap';
import { Badge } from '@ui';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
export default function JournalResultCard({
  journal,
  isFollowed = false,
  onFollow,
  onTagClick
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const id = journal.id || journal.journal_id;
  const {
    display_name,
    publisher,
    country,
    issn,
    is_open_access,
    quartile,
    subject_category_name,
    subject_area_name,
    metric_value,
    metric_name,
    metric_year
  } = journal;
  return <Card onClick={() => navigate(`/journals/${id}`)} className="journal-dark-card mb-3 text-start position-relative transition-all duration-300 card-hover-lift" style={{
    borderRadius: '16px',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer'
  }}>
      <Card.Body className="p-4">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-4">
          
          {/* Main info block (Left) */}
          <div className="flex-grow-1">
            <Link to={`/journals/${id}`} onClick={e => e.stopPropagation()} className="text-decoration-none text-main hover:text-primary d-block mb-2">
              <h5 className="font-display fw-bold mb-1 fs-5" style={{
              letterSpacing: '-0.02em',
              lineHeight: '1.3'
            }}>
                {display_name}
              </h5>
            </Link>
            
            {/* Publisher & Meta info line */}
            <div className="d-flex flex-wrap align-items-center gap-2 text-muted-custom text-xs mb-3" style={{
            fontSize: '0.8rem'
          }}>
              <span>{publisher}</span>
              <span className="text-muted-custom">•</span>
              <span>{country}</span>
              <span className="text-muted-custom">•</span>
              <span className="font-monospace">ISSN: {issn}</span>
            </div>

            {/* Badges line */}
            <div className="d-flex flex-wrap align-items-center gap-2">
              
              {quartile && (
                <Badge
                  pill
                  variant={quartile === 'Q1' ? 'q1' : 'secondary'}
                  className="fw-bold px-2.5 py-1 text-xs"
                >
                  {quartile}
                </Badge>
              )}

              {/* Open Access / Subscription Badge */}
              <Badge
                pill
                variant={is_open_access ? "success" : "warning"}
                className="d-inline-flex align-items-center gap-1 px-2.5 py-1 text-xs"
              >
                <Icon icon={is_open_access ? "lucide:unlock" : "lucide:lock"} width="12" />
                <span>{is_open_access ? "Open Access" : "Subscription"}</span>
              </Badge>

              {/* Subject Category tag */}
              {subject_category_name && (
                <Badge
                  pill
                  variant="secondary"
                  onClick={e => {
                    e.stopPropagation();
                    if (onTagClick) onTagClick(subject_category_name);
                  }}
                  className="px-2.5 py-1 text-xs cursor-pointer"
                >
                  {subject_category_name}
                </Badge>
              )}

              {/* Subject Area tag */}
              {subject_area_name && subject_area_name !== subject_category_name && (
                <Badge
                  pill
                  variant="secondary"
                  onClick={e => {
                    e.stopPropagation();
                    if (onTagClick) onTagClick(subject_area_name);
                  }}
                  className="px-2.5 py-1 text-xs cursor-pointer"
                >
                  {subject_area_name}
                </Badge>
              )}
            </div>

          </div>

          {/* Metric & Action button block (Right) */}
          <div className="d-flex flex-row flex-md-column align-items-center align-items-md-end justify-content-between justify-content-md-center gap-3 w-100 w-md-auto border-top border-md-top-0 border-light pt-3 pt-md-0" style={{
          minWidth: '130px'
        }}>
            
            {/* Metric Score */}
            <div className="text-start text-md-end">
              {metric_value ? <>
                  <div className="font-monospace text-primary fw-bold lh-1 fs-3">
                    {metric_value}
                  </div>
                  <div className="text-muted-custom text-uppercase tracking-wide mt-1" style={{
                fontSize: '0.68rem',
                letterSpacing: '0.05em'
              }}>
                    {metric_name || 'SJR'}{metric_year ? ` · ${metric_year}` : ''}
                  </div>
                </> : <span className="text-muted-custom text-xs italic" style={{
              fontSize: '0.75rem'
            }}>{t("catalog.chuaCoDuLieu")}</span>}
            </div>

            <div className="d-flex flex-wrap align-items-center justify-content-end gap-2">
              <Button size="sm" variant={isFollowed ? 'outline-success' : 'outline-primary'} onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onFollow(id);
            }} className={`d-flex align-items-center justify-content-center gap-1.5 px-3 py-1.5 fw-semibold ${isFollowed ? 'bg-success-10' : 'btn-outline-glow'}`} style={{
              borderRadius: '8px',
              fontSize: '0.8rem',
              transition: 'all 0.2s ease'
            }}>
                {isFollowed ? <>
                    <Icon icon="lucide:check" width="14" />
                    <span>{t("catalog.daTheoDoi")}</span>
                  </> : <>
                    <Icon icon="lucide:plus" width="14" />
                    <span>{t("catalog.theoDoi")}</span>
                  </>}
              </Button>
            </div>

          </div>

        </div>
      </Card.Body>
    </Card>;
}