import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\dashboard\components\RecentProjectsCard.jsx
 */
import { useState } from 'react';

import { EntityCard, Badge, LoadingSkeleton, Icon, Button } from '@ui';

function ProjectStatusBadge({
  status
}) {
  const { t } = useTranslation();
  
  const statusLower = status?.toLowerCase();
  if (statusLower === 'new') {
    return (
      <Badge pill style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', border: 'none', fontSize: '0.7rem' }}>
        New
      </Badge>
    );
  }
  if (statusLower === 'deleted') {
    return (
      <Badge pill variant="danger" style={{ fontSize: '0.7rem' }}>
        Deleted
      </Badge>
    );
  }
  if (statusLower === 'paused' || statusLower === 'archived') {
    return (
      <Badge pill variant="secondary" style={{ fontSize: '0.7rem' }}>
        {statusLower === 'paused' ? t("dashboard.tamDung") : t("dashboard.luuTru")}
      </Badge>
    );
  }

  return (
    <Badge pill style={{ backgroundColor: 'var(--bg-chip)', color: 'var(--text-main)', border: '1px solid var(--border)', fontSize: '0.7rem' }}>
      {t("admin.hoatDong")}
    </Badge>
  );
}

/**
 * RecentProjectItem — một row project trong danh sách
 */
function RecentProjectItem({
  project,
  onClick
}) {
  const {
    t
  } = useTranslation();
  const name = project.project_name ?? project.name ?? project.title ?? 'Untitled';
  const journalCount = project.journal_count ?? project.journals?.length ?? 0;
  const articleCount = project.article_count ?? 0;
  const status = project.status ?? 'active';

  // Avatar initials from name (Up to 3 letters)
  const initials = name.split(' ').filter(w => w.length > 0).slice(0, 3).map(w => w[0]?.toUpperCase() ?? '').join('');
  return <div className="d-flex align-items-center gap-3 py-3 px-3 rounded-3" style={{
    cursor: 'pointer',
    transition: 'background 0.15s ease',
    borderBottom: '1px solid var(--border)'
  }} onClick={onClick} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-section)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
      {/* Avatar */}
      <div className="d-flex align-items-center justify-content-center flex-shrink-0 text-white font-display" style={{
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'var(--btn-dark)',
      fontSize: initials.length >= 3 ? '0.65rem' : '0.75rem',
      fontWeight: 700
    }}>
        {initials}
      </div>

      {/* Info */}
      <div className="flex-grow-1" style={{
      minWidth: 0
    }}>
        <div className="text-main fw-semibold text-truncate" style={{
        fontSize: '0.85rem'
      }} title={name}>
          {name}
        </div>
        <div className="text-muted-custom text-truncate" style={{
        fontSize: '0.72rem'
      }}>
          {journalCount} {t("project.tapChi")} · {articleCount} {t("author.baiBao")}</div>
      </div>

      {/* Status */}
      <ProjectStatusBadge status={status} />
    </div>;
}

/**
 * RecentProjectsCard — card chứa danh sách 3 project gần đây
 */
export default function RecentProjectsCard({
  projects,
  loading,
  error,
  onViewAll,
  onProjectClick
}) {
  const {
    t
  } = useTranslation();
  const ITEMS_PER_PAGE = 4;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil((projects?.length ?? 0) / ITEMS_PER_PAGE));
  const paginatedProjects = projects.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const actions = onViewAll ? (
    <Button
      variant="link"
      size="sm"
      className="p-0 text-decoration-none fw-semibold"
      onClick={onViewAll}
      style={{ fontSize: '0.75rem' }}
    >
      {t("dashboard.xemTatCa")}
    </Button>
  ) : null;
  const description = <div className="px-1">
      {loading ? [1, 2, 3].map(i => <div key={i} className="d-flex align-items-center gap-3 px-3 py-3">
            <LoadingSkeleton width="40px" height="40px" borderRadius="10px" />
            <div className="flex-grow-1">
               <LoadingSkeleton width="70%" height="14px" className="mb-2" />
               <LoadingSkeleton width="50%" height="11px" />
            </div>
          </div>) : error ? <div className="text-center py-5 px-3">
          <Icon icon="lucide:alert-circle" width={32} style={{
        color: '#ef4444'
      }} />
          <p className="text-muted-custom mt-2 mb-0" style={{
        fontSize: '0.8rem'
      }}>{error}</p>
        </div> : projects.length === 0 ? <div className="text-center py-5 px-3">
          <Icon icon="lucide:folder-plus" width={36} style={{
        color: 'var(--text-muted)'
      }} />
          <p className="text-main fw-semibold mt-2 mb-1" style={{
        fontSize: '0.85rem'
      }}>{t("dashboard.chuaCoProjectNao")}</p>
          <p className="text-muted-custom mb-0" style={{
        fontSize: '0.75rem'
      }}>{t("dashboard.taoProjectDauTienDeBatDauTheoD")}</p>
        </div> : <>
          {paginatedProjects.map((p, i) => <RecentProjectItem key={p.project_id ?? p.id ?? i} project={p} onClick={() => onProjectClick?.(p)} />)}

          {totalPages > 1 && <div className="d-flex align-items-center justify-content-between gap-2 px-3 pt-3 pb-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={page === 1}
                style={{ fontSize: '0.72rem', paddingInline: '0.6rem', minHeight: '28px' }}
              >
                {t("dashboard.truoc")}
              </Button>

              <span className="text-muted-custom" style={{
          fontSize: '0.72rem'
        }}>
                {t("dashboard.trang")} {page}/{totalPages}
              </span>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
                style={{ fontSize: '0.72rem', paddingInline: '0.6rem', minHeight: '28px' }}
              >
                {t("dashboard.sau")} →
              </Button>
            </div>}
        </>}
    </div>;
  return <EntityCard className="h-100" title={<span className="d-flex align-items-center gap-2">
          <Icon icon="lucide:folder-open" width={16} style={{
      color: 'var(--primary)'
    }} />
          <span>{t("dashboard.projectsGanDay")}</span>
        </span>} actions={actions} description={description} bodyClassName="flex-column align-items-stretch" />;
}