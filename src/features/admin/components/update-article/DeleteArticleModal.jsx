/**
 * - show:       điều khiển hiển thị modal (state ở page cha).
 * - onClose:    đóng modal không xóa (nút "Cancel" hoặc click ra ngoài).
 * - onConfirm:  xác nhận xóa (nút "Delete Article").
 * - articleTitle: tên bài báo - hiển thị trong nội dung cảnh báo để
 *                  admin chắc chắn đang xóa đúng bài.
 */
import { Modal } from 'react-bootstrap';
import { Button, Icon } from '@ui';

export default function DeleteArticleModal({ show, onClose, onConfirm, articleTitle }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body className="admin-delete-modal">
        {/* Icon cảnh báo tròn, nền đỏ nhạt */}
        <div className="admin-delete-modal__icon">
          <Icon icon="lucide:alert-triangle" />
        </div>

        <h3 className="admin-delete-modal__title">Delete this article?</h3>
        <p className="admin-delete-modal__description">
          This will permanently delete <strong>&ldquo;{articleTitle}&rdquo;</strong> and all
          associated manuscript files. This action cannot be undone.
        </p>

        {/* Action buttons - Cancel (outline) bên trái, Delete (destructive, filled) bên phải */}
        <div className="admin-delete-modal__actions d-flex gap-2 justify-content-center">
          <Button variant="outline" onClick={onClose} className="px-4">
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="px-4">
            Delete Article
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}