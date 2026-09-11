import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown } from 'react-bootstrap';
import { useAuthStore } from '@/app/store/authStore';
import { useUserStore } from '@/app/store/userStore';
import { PrimaryButton, Badge, LoadingSkeleton, Icon } from '@ui';

const ProjectMembersList = ({ 
  project,
  members, 
  loading, 
  onInviteClick, 
  onChangeRole, 
  onRemoveMember, 
  actionLoading,
  currentUser
}) => {
  const { t } = useTranslation();

  const roleStyles = {
    OWNER: { backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid rgba(220, 38, 38, 0.2)' },
    ADMIN: { backgroundColor: '#e0e7ff', color: '#4f46e5', border: '1px solid rgba(79, 70, 229, 0.2)' },
    MEMBER: { backgroundColor: '#dcfce7', color: '#16a34a', border: '1px solid rgba(22, 163, 74, 0.2)' },
    VIEWER: { backgroundColor: '#f1f5f9', color: '#64748b', border: '1px solid rgba(100, 116, 139, 0.2)' },
  };

  const translateRole = (role) => {
    switch (role?.toUpperCase()) {
      case 'OWNER': return t('project.chuSoHuu', 'Chủ sở hữu');
      case 'ADMIN': return t('project.quanTriVien', 'Quản trị viên');
      case 'MEMBER': return t('project.thanhVien', 'Thành viên');
      case 'VIEWER': return t('project.nguoiXem', 'Người xem');
      default: return role || 'MEMBER';
    }
  };

  const getStatusBadge = (status) => {
    if (status?.toUpperCase() === 'INVITED') {
      return (
        <Badge pill style={{ backgroundColor: '#fef3c7', color: '#d97706', border: '1px solid rgba(217, 119, 6, 0.2)', fontSize: '0.75rem' }}>
          {t("project.daMoi", "Đã mời")}
        </Badge>
      );
    }
    return (
      <Badge pill style={{ backgroundColor: '#dcfce7', color: '#16a34a', border: '1px solid rgba(22, 163, 74, 0.2)', fontSize: '0.75rem' }}>
        {t("project.dangHoatDong", "Đang hoạt động")}
      </Badge>
    );
  };

  const authStateUser = useAuthStore.getState()?.user;
  const userStoreEmail = useUserStore.getState()?.email;

  const currentUserId = currentUser?.user_id || currentUser?.id || authStateUser?.user_id || authStateUser?.id;
  const currentEmail = (currentUser?.email || authStateUser?.email || userStoreEmail || '').trim().toLowerCase();

  // 1. Vai trò từ project do backend trả về trực tiếp (getProjectById trả về p.user_role)
  const projectUserRole = (project?.user_role || '').toUpperCase();

  // 2. Tìm member tương ứng với user hiện tại trong danh sách members
  const matchedMember = members?.find(m => {
    const mUserId = m.user_id || m.id;
    const mEmail = (m.email || '').trim().toLowerCase();
    if (mUserId && currentUserId && String(mUserId) === String(currentUserId)) return true;
    if (mEmail && currentEmail && mEmail === currentEmail) return true;
    return false;
  });

  const memberRole = matchedMember?.role?.toUpperCase();

  // 3. Kiểm tra quyền Owner
  const isOwner = Boolean(
    projectUserRole === 'OWNER' ||
    memberRole === 'OWNER' ||
    (project?.user_id && currentUserId && String(project.user_id) === String(currentUserId)) ||
    (currentEmail && members?.some(m => m.role?.toUpperCase() === 'OWNER' && (m.email || '').trim().toLowerCase() === currentEmail)) ||
    // Nếu project chỉ có 1 member duy nhất là OWNER và user đang xem được trang này -> user chính là Owner
    (members?.length === 1 && members[0]?.role?.toUpperCase() === 'OWNER') ||
    // Mặc định cho phép nếu projectUserRole chưa xác định hoặc là OWNER
    (!projectUserRole || projectUserRole === 'OWNER')
  );

  // 4. Cho phép quản lý/mời nếu là Owner, Admin, Administrator, hoặc mặc định nếu không bị gán rõ là VIEWER
  const canManageOthers = Boolean(
    isOwner ||
    projectUserRole === 'ADMIN' ||
    memberRole === 'ADMIN' ||
    currentUser?.role === 'ADMINISTRATOR' ||
    authStateUser?.role === 'ADMINISTRATOR' ||
    (projectUserRole !== 'VIEWER' && projectUserRole !== 'MEMBER' && memberRole !== 'VIEWER' && memberRole !== 'MEMBER')
  );

  return (
    <div className="glass-card rounded-4 shadow-sm border p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold text-main mb-1">{t("project.thanhVienDuAn", "Project Members")}</h5>
          <p className="text-muted-custom small mb-0">{t("project.quanLyNhungNguoiCoQuyen", "Manage people with access to this project.")}</p>
        </div>
        {canManageOthers && (
          <PrimaryButton 
            id="btn-invite-member"
            className="d-flex align-items-center gap-2 px-3 py-2"
            onClick={onInviteClick}
          >
            <Icon icon="lucide:user-plus" width="18" /> {t("project.themThanhVien", "Add Member")}
          </PrimaryButton>
        )}
      </div>

      {loading ? (
        <div className="py-2 d-flex flex-column gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="d-flex align-items-center justify-content-between py-2 border-bottom">
              <div className="d-flex align-items-center gap-3">
                <LoadingSkeleton variant="circle" width="42px" height="42px" />
                <div>
                  <LoadingSkeleton width="120px" height="18px" className="mb-2" />
                  <LoadingSkeleton width="160px" height="14px" />
                </div>
              </div>
              <LoadingSkeleton width="80px" height="24px" className="rounded-pill" />
            </div>
          ))}
        </div>
      ) : members?.length === 0 ? (
        <div className="text-center py-5 text-muted-custom">
          <Icon icon="lucide:users" width="48" className="mb-3 opacity-50" />
          <p className="mb-0">{t("project.duAnNayChuaCoThanhVien")}</p>
        </div>
      ) : (
        <div className="list-group list-group-flush border-top pt-2">
          {members?.map((member) => {
            return (
              <div key={member.id || member.user_id} className="list-group-item bg-transparent px-0 py-3 border-bottom d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{
                    width: '42px',
                    height: '42px',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}>
                    {((member.first_name?.[0] || member.last_name?.[0] || member.user?.full_name?.[0] || member.email?.[0] || 'U')).toUpperCase()}
                  </div>
                  <div>
                    <h6 className="fw-bold text-main mb-0 d-flex align-items-center gap-2">
                      {(member.first_name || member.last_name)
                        ? `${member.first_name || ''} ${member.last_name || ''}`.trim()
                        : (member.user?.full_name || member.name || member.email || t("project.nguoiDung"))} 
                      {getStatusBadge(member.status)}
                    </h6>
                    <div className="text-muted-custom small mt-1">
                      {member.email || member.user?.email}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <Badge 
                    pill 
                    className="fw-medium px-2.5 py-1" 
                    style={roleStyles[member.role?.toUpperCase()] || roleStyles.VIEWER}
                  >
                    {translateRole(member.role)}
                  </Badge>
                  {(() => {
                    const memberUserId = member.user_id || member.id;
                    const isSelf = Boolean(
                      (memberUserId && currentUserId && String(memberUserId) === String(currentUserId)) ||
                      (member.email && currentUser?.email && member.email.toLowerCase() === currentUser.email.toLowerCase())
                    );
                    
                    const isOwner = member.role?.toUpperCase() === 'OWNER';
                    
                    if (isOwner) return null; // Owner cannot be kicked/leave via this list
                    
                    if (isSelf) {
                      // Bản thân có thể tự rời đi
                      return (
                        <Dropdown>
                          <Dropdown.Toggle 
                            variant="light" 
                            className="btn-sm border-0 bg-transparent text-muted-custom" 
                            id={`dropdown-${member.id || member.user_id}`}
                            disabled={actionLoading}
                          >
                            <Icon icon="lucide:more-vertical" width="18" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end" className="shadow border-0 rounded-3">
                            <Dropdown.Item 
                              onClick={() => onRemoveMember(member.user_id)}
                              className="small text-danger dropdown-item-custom-hover"
                            >
                              <Icon icon="lucide:log-out" width="16" className="me-2" /> 
                              {t("project.roiKhoiDuAn", "Rời khỏi dự án")}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      );
                    }

                    if (canManageOthers) {
                      // Có quyền quản lý người khác
                      return (
                        <Dropdown>
                          <Dropdown.Toggle 
                            variant="light" 
                            className="btn-sm border-0 bg-transparent text-muted-custom" 
                            id={`dropdown-${member.id || member.user_id}`}
                            disabled={actionLoading}
                          >
                            <Icon icon="lucide:more-vertical" width="18" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end" className="shadow border-0 rounded-3">
                            <Dropdown.Item 
                              onClick={() => onChangeRole(member.user_id, 'ADMIN')}
                              className="small dropdown-item-custom-hover"
                            >
                              <Icon icon="lucide:shield" width="16" className="me-2" /> {t("project.datLamAdmin")}
                            </Dropdown.Item>
                            <Dropdown.Item 
                              onClick={() => onChangeRole(member.user_id, 'MEMBER')}
                              className="small dropdown-item-custom-hover"
                            >
                              <Icon icon="lucide:user" width="16" className="me-2" /> {t("project.datLamMember")}
                            </Dropdown.Item>
                            <Dropdown.Item 
                              onClick={() => onChangeRole(member.user_id, 'VIEWER')}
                              className="small dropdown-item-custom-hover"
                            >
                              <Icon icon="lucide:eye" width="16" className="me-2" /> {t("project.datLamViewer")}
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item 
                              onClick={() => onRemoveMember(member.user_id)}
                              className="small text-danger dropdown-item-custom-hover"
                            >
                              <Icon icon="lucide:user-x" width="16" className="me-2" /> 
                              {member.status?.toUpperCase() === 'INVITED' ? t("project.huyLoiMoi") : t("project.xoaThanhVien")}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      );
                    }

                    return null;
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectMembersList;
