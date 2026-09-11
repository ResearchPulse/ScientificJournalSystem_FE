import { useTranslation } from "react-i18next";
import { t } from "i18next";
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
  onFollow
}) {
  const { t: _t } = useTranslation();
  const navigate = useNavigate();
  return <section className="catalog-surface catalog-table-card">
      <div className="table-responsive">
        <Table hover className="catalog-table align-middle mb-0 text-start">
          <thead>
            <tr>
              <th className="px-4 py-3">Journal</th>
              <th className="px-3 py-3">ISSN</th>
              <th className="px-3 py-3">Publisher</th>
              <th className="px-3 py-3">Country</th>
              <th className="px-3 py-3">Quartile</th>
              <th className="px-3 py-3">Metric</th>
              <th className="px-3 py-3">Year</th>
              <th className="px-3 py-3">Access</th>
              <th className="px-4 py-3 text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {journals.map(journal => {
            const id = journal.id || journal.journal_id;
            const isFollowed = !!followedJournals[id];
            return <tr key={id} onClick={() => navigate(`/journals/${id}`)}>
                  <td className="px-4 py-3">
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
                      {journal.is_open_access ? 'Open Access' : 'Subscription'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <div className="d-inline-flex align-items-center">
                      <button type="button" onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    onFollow(id);
                  }} className={`catalog-follow-btn ${isFollowed ? 'is-followed' : ''}`}>
                        <Icon icon={isFollowed ? 'lucide:check' : 'lucide:plus'} width="13" />
                        <span>{isFollowed ? t("catalog.daTheoDoi") : t("catalog.theoDoi")}</span>
                      </button>
                    </div>
                  </td>
                </tr>;
          })}
          </tbody>
        </Table>
      </div>
    </section>;
}