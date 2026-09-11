import { useTranslation } from "react-i18next";
/**
 * @file AuthorLeaderboardTable.jsx
 * @description Hiển thị bảng xếp hạng các tác giả hàng đầu trong hệ thống theo cấu trúc chuẩn hóa đồng bộ với TopAuthorsTable trên Dashboard.
 */

import { useNavigate } from 'react-router-dom';
import { EntityCard, Badge, LoadingSkeleton, EmptyState, ErrorState, Icon } from '@ui';
import { formatCount, truncate } from '@shared/utils/formatNumber';

/** Rank badge — top 3 có màu riêng đồng bộ Dashboard */
function RankBadge({ rank }) {
  const cfg = {
    1: {
      bg: 'rgba(245, 158, 11, 0.15)',
      color: '#d97706',
      icon: 'lucide:crown'
    },
    2: {
      bg: 'rgba(156, 163, 175, 0.15)',
      color: '#6b7280',
      icon: null
    },
    3: {
      bg: 'rgba(217, 119, 6, 0.1)',
      color: '#b45309',
      icon: null
    }
  }[rank] ?? {
    bg: 'transparent',
    color: 'var(--text-muted)',
    icon: null
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
      style={{
        width: 28,
        height: 28,
        backgroundColor: cfg.bg,
        color: cfg.color,
        fontSize: '0.75rem',
        fontWeight: 700
      }}
    >
      {cfg.icon ? <Icon icon={cfg.icon} width={12} /> : rank}
    </div>
  );
}

/** Author field badge */
function FieldBadge({ field }) {
  if (!field || field === '—') return <span className="text-muted-custom">—</span>;
  return (
    <Badge
      pill
      variant="secondary"
      className="d-none d-sm-inline-block text-truncate"
      style={{ fontSize: '0.68rem', border: '1px solid var(--border)', maxWidth: 'fit-content' }}
    >
      {field}
    </Badge>
  );
}

/** Author avatar initials */
function AuthorAvatar({ name }) {
  const initials = (name || '?').split(' ').slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('');
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-shrink-0 text-white"
      style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: 'var(--btn-dark)',
        fontSize: '0.7rem',
        fontWeight: 700
      }}
    >
      {initials}
    </div>
  );
}

export default function AuthorLeaderboardTable({
  authors = [],
  loading = false,
  error = null,
  onRetry = null,
  limit = null
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!loading && authors.length === 0) {
    return (
      <EmptyState
        title={t("author.chuaCoDuLieuBangXepHang")}
        description={t("author.duLieuXepHangSeHienThiODay")}
        icon="lucide:trophy"
      />
    );
  }

  const displayList = limit ? authors.slice(0, limit) : authors;

  const handleAuthorClick = author => {
    const id = author.author_id ?? author.id;
    if (id) navigate(`/authors/${id}`);
  };

  const headerCols = ['#', t("typeAuthor"), t("author.linhVuc"), t("articles"), 'Citations'];

  if (loading) {
    const loadingContent = (
      <div>
        <div className="d-none d-md-grid px-4 py-2 mb-2 rounded-3 mx-2 mt-2 author-leaderboard-header">
          {headerCols.map(h => (
            <span
              key={h}
              className="text-muted-custom"
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {h}
            </span>
          ))}
        </div>
        <div className="d-flex flex-column gap-2 pb-3 px-2">
          {Array.from({ length: limit || 8 }).map((_, idx) => (
            <div
              key={idx}
              className="d-flex d-md-grid px-3 py-3 align-items-center gap-3 rounded-4 author-leaderboard-row"
            >
              <LoadingSkeleton width="28px" height="28px" borderRadius="50%" />
              <div className="d-flex align-items-center gap-2">
                <LoadingSkeleton width="32px" height="32px" borderRadius="50%" />
                <div className="flex-grow-1">
                  <LoadingSkeleton width="120px" height="13px" className="mb-2" />
                  <LoadingSkeleton width="80px" height="10px" />
                </div>
              </div>
              <LoadingSkeleton width="90px" height="20px" borderRadius="999px" />
              <LoadingSkeleton width="50px" height="13px" />
              <LoadingSkeleton width="60px" height="13px" />
            </div>
          ))}
        </div>
      </div>
    );
    return <EntityCard description={loadingContent} bodyClassName="flex-column align-items-stretch p-2 p-md-3" />;
  }

  const tableContent = (
    <div>
      {/* Table header */}
      <div className="d-none d-md-grid px-4 py-2 mb-2 rounded-3 mx-2 mt-2 author-leaderboard-header">
        {headerCols.map(h => (
          <span
            key={h}
            className="text-muted-custom"
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="d-flex flex-column gap-2 pb-3 px-2">
        {displayList.filter(Boolean).map((author, idx) => {
          const id = author.author_id ?? author.id;
          const name = author.display_name ?? author.full_name ?? author.author_name ?? author.name ?? 'Unknown';
          const orcid = author.orcid ?? null;
          const field = author.subject_area ?? author.primary_subject_area ?? author.field ?? author.area ?? '—';
          const articles = author.article_count ?? author.papers ?? author.works_count ?? 0;
          const citations = author.citation_count ?? author.citations ?? author.cited_by_count ?? 0;
          const rank = author.final_rank ?? idx + 1;

          return (
            <div
              key={id ?? idx}
              className="d-flex d-md-grid px-3 py-3 align-items-center gap-3 font-display rounded-4 author-leaderboard-row"
              style={{ '--stagger-delay': `${idx * 60}ms` }}
              onClick={() => handleAuthorClick(author)}
            >
              <RankBadge rank={rank} />
              <div className="d-flex align-items-center gap-2 text-truncate" style={{ minWidth: 0 }}>
                <AuthorAvatar name={name} />
                <div className="text-truncate" style={{ minWidth: 0 }}>
                  <div className="text-main fw-semibold" style={{ fontSize: '0.85rem' }}>
                    {truncate(name, 28)}
                  </div>
                  {orcid ? (
                    <div className="text-muted-custom" style={{ fontSize: '0.75rem' }}>
                      {truncate(orcid, 36)}
                    </div>
                  ) : null}
                </div>
              </div>
              <FieldBadge field={field == "" ? "—" : field} />
              <span className="text-muted-custom" style={{ fontSize: '0.85rem' }}>
                {formatCount(articles)}
              </span>
              <span
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  fontWeight: 600
                }}
              >
                ↑ {formatCount(citations)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return <EntityCard description={tableContent} bodyClassName="flex-column align-items-stretch p-2 p-md-3" />;
}