import { useId } from 'react';
import './Switch.css';

/**
 * Công tắc bật/tắt (Switch / Toggle)
 * Dùng cho các cài đặt nhị phân (bật thông báo, bật lọc Open Access, chế độ xem).
 *
 * @param {boolean} checked - Trạng thái bật (true) hay tắt (false)
 * @param {Function} onChange - Hàm xử lý khi người dùng gạt công tắc
 * @param {boolean} [disabled=false] - Khóa không cho tương tác
 * @param {'sm'|'md'|'lg'} [size='md'] - Kích thước công tắc: 'sm', 'md', 'lg'
 * @param {string} [label] - Nhãn chú thích hiển thị bên cạnh công tắc
 * @param {string} [id] - Định danh HTML id của input
 * @param {string} [name] - Tên trường form input
 * @param {string} [className=''] - Các lớp CSS bổ sung
 */
export default function Switch({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  label,
  id,
  name,
  className = '',
  ...props
}) {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <label
      htmlFor={inputId}
      className={`ui-switch ui-switch-${size} ${checked ? 'is-checked' : ''} ${
        disabled ? 'is-disabled' : ''
      } ${className}`.trim()}
    >
      <input
        type="checkbox"
        role="switch"
        id={inputId}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="ui-switch-input"
        aria-checked={checked}
        {...props}
      />
      <span className="ui-switch-track" aria-hidden="true">
        <span className="ui-switch-thumb" />
      </span>
      {label && <span className="ui-switch-label">{label}</span>}
    </label>
  );
}
