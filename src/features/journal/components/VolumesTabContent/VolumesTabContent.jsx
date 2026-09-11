import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\journal\components\VolumesTabContent.jsx
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LoadingSkeleton,
  Icon,
  Spinner,
  PaginationControls,
  Badge,
  EmptyState,
  ErrorState,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from '@ui';
export default function VolumesTabContent({
  volumes = [],
  issuesByVolume = {},
  issueErrors = {},
  journalId,
  onVolumeExpand,
  loading,
  error = false,
  volumePagination,
  issuePaginationByVolume = {},
  onVolumePageChange,
  onIssuePageChange
}) {
  const {
    t
  } = useTranslation();
  const MONTH_NAMES = ['', t("journal.thang1"), t("journal.thang2"), t("journal.thang3"), t("journal.thang4"), t("journal.thang5"), t("journal.thang6"), t("journal.thang7"), t("journal.thang8"), t("journal.thang9"), t("journal.thang10"), t("journal.thang11"), t("journal.thang12")];
  const navigate = useNavigate();
  const [expandedVolumes, setExpandedVolumes] = useState({});

  /** Toggle accordion mở/đóng volume; trigger lazy load nếu chưa có data */
  const toggleVolume = volumeId => {
    const isNowExpanded = !expandedVolumes[volumeId];
    setExpandedVolumes(prev => ({
      ...prev,
      [volumeId]: isNowExpanded
    }));
    if (isNowExpanded && onVolumeExpand) {
      onVolumeExpand(volumeId);
    }
  };

  /** Tạo URL điều hướng đến trang bài báo theo issue */
  const getIssueArticlesUrl = issueId => {
    const query = new URLSearchParams({
      issue_id: issueId
    });
    if (journalId) query.set('journal_id', journalId);
    return `/articles?${query.toString()}`;
  };

  /** Render shared pagination controls with API pagination metadata. */
  const renderPagination = (pagination, onPageChange) => {
    const totalPages = pagination?.totalPages || pagination?.total_pages || (pagination?.total && pagination?.limit ? Math.ceil(pagination.total / pagination.limit) : 1);
    const currentPage = pagination?.page || 1;
    if (totalPages <= 1) return null;
    return (
      <div className="d-flex justify-content-end align-items-center mt-3 pt-2">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    );
  };
  if (loading) {
    return <div className="d-flex flex-column gap-3">
        {[1, 2, 3].map(i => <div key={i} className="journal-volume-card p-3">
            <LoadingSkeleton variant="text" width="40%" height="24px" className="mb-2" />
            <LoadingSkeleton variant="text" width="20%" height="16px" />
          </div>)}
      </div>;
  }
  if (error) {
    return <ErrorState title={t("journal.khongTheTaiTapChi")} message={t("journal.daXayRaLoiKhiTaiDuLieuVui")} onRetry={() => window.location.reload()} />;
  }
  if (!volumes || volumes.length === 0) {
    return <EmptyState title={t("journal.chuaCoVolumeNao")} message={t("journal.tapChiNayHienChuaCoTapPhatH")} />;
  }
  return (
    <div className="journal-volume-list">
      <Accordion alwaysOpen>
        {volumes.map(vol => {
          const volumeId = vol.volume_id || vol.id;
          const volumeYear = vol.publication_year || vol.year;
          const isExpanded = !!expandedVolumes[volumeId];
          const issues = issuesByVolume[volumeId];
          const issueError = issueErrors[volumeId];
          const issuePagination = issuePaginationByVolume[volumeId];
          const issueCountLabel = vol.issue_count !== undefined && vol.issue_count > 0
            ? `• ${vol.issue_count} ${vol.issue_count === 1 ? t("journal.soLuongIssueDon", "issue") : t("journal.soLuongIssue", "issues")}`
            : null;

          return (
            <AccordionItem
              key={volumeId}
              isExpanded={isExpanded}
              onToggle={() => toggleVolume(volumeId)}
            >
              <AccordionHeader
                title={`Volume ${vol.volume_number || 'N/A'}`}
                badge={volumeYear}
                badgeVariant="secondary"
                meta={issueCountLabel}
                icon="lucide:folder"
                expandedIcon="lucide:folder-open"
              />

              <AccordionBody>
                {issues === undefined && !issueError ? (
                  <div className="d-flex align-items-center gap-2 py-3 text-muted-custom">
                    <Spinner size="sm" variant="primary" />
                    {t("journal.dangTaiDanhSachIssue")}
                  </div>
                ) : issueError ? (
                  <div className="d-flex align-items-center gap-2 py-3 text-danger">
                    <Icon icon="lucide:alert-triangle" width="16" />
                    {t("journal.khongTheTaiDanhSachIssuesVuiLo")}
                  </div>
                ) : !issues || issues.length === 0 ? (
                  <div className="text-muted-custom py-3 text-start">
                    <Icon icon="lucide:inbox" width="14" className="me-1" />
                    {t("journal.volumeNayChuaCoIssue")}
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2 py-2">
                    {issues.map(issue => {
                      const issueId = issue.issue_id || issue.id;
                      const issueYear = issue.publication_year || issue.year;
                      const issueMonth = issue.month ? MONTH_NAMES[issue.month] || `Tháng ${issue.month}` : null;
                      const periodLabel = [issueMonth, issueYear].filter(Boolean).join(' ');
                      const articleCount = issue.article_count;

                      return (
                        <div
                          key={issueId}
                          className="journal-issue-row"
                          onClick={() => navigate(getIssueArticlesUrl(issueId))}
                          role="button"
                          tabIndex={0}
                          onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              navigate(getIssueArticlesUrl(issueId));
                            }
                          }}
                        >
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <Icon icon="lucide:file-stack" className="text-muted-custom" width="16" />
                            <span className="journal-issue-title">Issue {issue.issue_number || 'N/A'}</span>
                            {periodLabel && <Badge pill variant="secondary">{periodLabel}</Badge>}
                            {articleCount !== undefined && (
                              <span className="text-muted-custom small ms-1">
                                • {articleCount} {articleCount === 1 ? t("journal.soLuongBaiBaoDon", "article") : t("journal.soLuongBaiBao", "articles")}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {renderPagination(issuePagination, nextPage => onIssuePageChange && onIssuePageChange(volumeId, nextPage), 'issue')}
                  </div>
                )}
              </AccordionBody>
            </AccordionItem>
          );
        })}
      </Accordion>
      {renderPagination(volumePagination, nextPage => onVolumePageChange && onVolumePageChange(nextPage), 'volume')}
    </div>
  );
}