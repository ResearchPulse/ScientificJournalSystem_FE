import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\catalog\components\JournalTable.jsx
 */
import { Table } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import { Badge, Icon } from '@ui';

export default function JournalTable({
  journals = [],
  followedJournals = {},
  onFollow,
  page = 1,
  limit = 10
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      {/* 1. TABLE LAYOUT (Desktop & Tablet) */}
      <section className="catalog-surface catalog-table-card d-none d-md-block">
        <div className="table-responsive">
          <Table hover className="catalog-table align-middle mb-0 text-start">
            <thead>
              <tr>
                <th className="ps-4 pe-2 py-3 text-muted-custom font-display" style={{ width: '56px' }}>
                  {t("catalog.stt", "No.")}
                </th>
                <th className="px-3 py-3">{t("catalog.tapChi", "Journal")}</th>
                <th className="px-3 py-3">ISSN</th>
                <th className="px-3 py-3">{t("catalog.nhaXuatBan", "Publisher")}</th>
                <th className="px-3 py-3">{t("catalog.quocGia", "Country")}</th>
                <th className="px-3 py-3">{t("catalog.quartile", "Quartile")}</th>
                <th className="px-3 py-3">{t("catalog.chiSo", "Metric")}</th>
                <th className="px-3 py-3">{t("catalog.nam", "Year")}</th>
                <th className="px-3 py-3">{t("catalog.truyCap", "Access")}</th>
                <th className="px-4 py-3 text-end">{t("catalog.thaoTac", "Action")}</th>
              </tr>
            </thead>
            <tbody>
              {journals.map((journal, index) => {
                const id = journal.id || journal.journal_id;
                const isFollowed = !!followedJournals[id];
                const itemIndex = (page - 1) * limit + index + 1;
                return (
                  <tr key={id} onClick={() => navigate(`/journals/${id}`)}>
                    <td className="ps-4 pe-2 py-3 text-muted-custom font-display" style={{ fontSize: '0.85rem' }}>
                      {itemIndex}
                    </td>
                    <td className="px-3 py-3">
                      <div className="catalog-journal-name">{journal.display_name}</div>
                    </td>
                    <td className="px-3 py-3 text-muted-custom catalog-mono">{journal.issn || '—'}</td>
                    <td className="px-3 py-3 text-main">{journal.publisher || '—'}</td>
                    <td className="px-3 py-3 text-main">{journal.country || '—'}</td>
                    <td className="px-3 py-3">
                      {journal.quartile ? (
                        <Badge
                          pill
                          variant={journal.quartile === 'Q1' ? 'q1' : 'secondary'}
                          className="text-xs fw-semibold px-2 py-0.5"
                        >
                          {journal.quartile}
                        </Badge>
                      ) : '—'}
                    </td>
                    <td className="px-3 py-3 fw-semibold text-main catalog-mono">{journal.metric_value ?? '—'}</td>
                    <td className="px-3 py-3 text-main">{journal.metric_year || '—'}</td>
                    <td className="px-3 py-3">
                      <Badge
                        pill
                        variant={journal.is_open_access ? 'success' : 'warning'}
                        className="text-xs px-2 py-0.5"
                      >
                        {journal.is_open_access ? t("catalog.openAccess", "Open Access") : t("catalog.subscription", "Subscription")}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-end">
                      <div className="d-inline-flex align-items-center">
                        <button
                          type="button"
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            onFollow(id);
                          }}
                          className={`catalog-follow-btn ${isFollowed ? 'is-followed' : ''}`}
                        >
                          <Icon icon={isFollowed ? 'lucide:check' : 'lucide:plus'} width="13" />
                          <span>{isFollowed ? t("catalog.daTheoDoi", "Following") : t("catalog.theoDoi", "Follow")}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </section>

      {/* 2. CARD LAYOUT (Mobile) */}
      <div className="d-block d-md-none">
        <div className="d-flex flex-column gap-3">
          {journals.map((journal, index) => {
            const id = journal.id || journal.journal_id;
            const isFollowed = !!followedJournals[id];
            const itemIndex = (page - 1) * limit + index + 1;
            return (
              <div
                key={id}
                onClick={() => navigate(`/journals/${id}`)}
                className="catalog-mobile-card"
                role="button"
                tabIndex={0}
              >
                <div className="p-3">
                  {/* Header: STT & Badges */}
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-muted-custom text-xs font-display fw-semibold">
                      {t("catalog.stt", "No.")} {itemIndex}
                    </span>
                    <div className="d-flex gap-1.5 align-items-center">
                      {journal.quartile && (
                        <Badge
                          pill
                          variant={journal.quartile === 'Q1' ? 'q1' : 'secondary'}
                          className="text-xs fw-semibold px-2 py-0.5"
                        >
                          {journal.quartile}
                        </Badge>
                      )}
                      <Badge
                        pill
                        variant={journal.is_open_access ? 'success' : 'warning'}
                        className="text-xs px-2 py-0.5"
                      >
                        {journal.is_open_access ? t("catalog.openAccess", "Open Access") : t("catalog.subscription", "Subscription")}
                      </Badge>
                    </div>
                  </div>

                  {/* Journal Title */}
                  <h6 className="catalog-journal-name mb-2" style={{ fontSize: '0.92rem', lineHeight: '1.4' }}>
                    {journal.display_name}
                  </h6>

                  {/* Metadata (Publisher, Country, ISSN) */}
                  <div className="text-muted-custom text-xs mb-3 d-flex flex-wrap gap-x-2 gap-y-1 align-items-center">
                    {journal.publisher && <span>{journal.publisher}</span>}
                    {journal.publisher && journal.country && <span>•</span>}
                    {journal.country && <span>{journal.country}</span>}
                    {journal.issn && (
                      <>
                        <span>•</span>
                        <span className="catalog-mono">ISSN: {journal.issn}</span>
                      </>
                    )}
                  </div>

                  {/* Footer: Metric & Action */}
                  <div className="pt-2 border-top border-light d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="text-xs">
                      <span className="text-muted-custom">{t("catalog.chiSo", "Metric")}: </span>
                      <span className="fw-semibold text-main catalog-mono">{journal.metric_value ?? '—'}</span>
                      {journal.metric_year && (
                        <span className="text-muted-custom ms-1">({journal.metric_year})</span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        onFollow(id);
                      }}
                      className={`catalog-follow-btn ${isFollowed ? 'is-followed' : ''}`}
                    >
                      <Icon icon={isFollowed ? 'lucide:check' : 'lucide:plus'} width="13" />
                      <span>{isFollowed ? t("catalog.daTheoDoi", "Following") : t("catalog.theoDoi", "Follow")}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}