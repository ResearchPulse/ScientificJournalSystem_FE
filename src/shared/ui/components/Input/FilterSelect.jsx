import { useState, useRef, useEffect } from 'react';
import { Icon } from '@ui';
import './FilterInput.css';

/**
 * Shared component cho ô Dropdown (Popover Select) chuẩn hóa trong Design System.
 * Thiết kế popover đồng bộ với ChartRangeDropdown (header title, checkmark, animate scale-in).
 * 
 * @param {string|number} value - Giá trị đang chọn
 * @param {Function} onChange - Callback khi chọn option (nhận synthetic event e hoặc value)
 * @param {Array} options - Mảng các { value, label, title } hoặc string
 * @param {string} [header] - Tiêu đề nhóm hiển thị ở đầu popover (VD: "TIME RANGE", "SELECT FIELD")
 * @param {string} [title] - Alias cho header
 * @param {string} [placeholder] - Chữ hiển thị khi chưa có giá trị
 * @param {boolean} [disabled=false] - Trạng thái disabled
 * @param {'default'|'compact'} [variant='default'] - Kiểu kích thước
 * @param {'left'|'right'} [align='left'] - Căn lề của popover
 * @param {string} [className=''] - Class mở rộng
 * @param {object} [style={}] - Style inline
 * @param {string} [name=''] - Tên form field
 */
export default function FilterSelect({ 
  value, 
  onChange, 
  options = [], 
  header,
  title,
  placeholder,
  disabled = false, 
  variant = 'default',
  align = 'left',
  className = '', 
  style = {},
  name = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Normalize options array
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return {
        value: opt.value ?? '',
        label: opt.label ?? String(opt.value ?? ''),
        title: opt.title || opt.label || ''
      };
    }
    return {
      value: opt,
      label: String(opt),
      title: String(opt)
    };
  });

  // Find active option
  const selectedOption = normalizedOptions.find(opt => String(opt.value) === String(value));
  const displayLabel = selectedOption 
    ? selectedOption.label 
    : (placeholder || (normalizedOptions[0] ? normalizedOptions[0].label : ''));

  const headerText = header || title;

  // Handle click outside to close popover
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (val) => {
    if (disabled) return;
    if (onChange) {
      // Create synthetic event compatible with standard <select onChange={e => e.target.value}>
      const syntheticEvent = {
        target: { value: val, name },
        currentTarget: { value: val, name },
        preventDefault: () => {},
        stopPropagation: () => {},
        toString: () => String(val),
        valueOf: () => val
      };
      onChange(syntheticEvent, val);
    }
    setIsOpen(false);
  };

  const isCompact = variant === 'compact';

  return (
    <div 
      ref={wrapperRef}
      className={`shared-filter-select-wrapper ${isOpen ? 'is-open' : ''} ${isCompact ? 'is-compact' : ''} ${disabled ? 'is-disabled' : ''} ${className}`.trim()}
      style={style}
    >
      <button
        type="button"
        className={`shared-filter-select-trigger ${isOpen ? 'active is-open' : ''} ${isCompact ? 'compact' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="shared-filter-select-label" title={displayLabel}>
          {displayLabel}
        </span>
        <Icon 
          icon="lucide:chevron-down" 
          width={15} 
          className={`shared-filter-select-chevron ${isOpen ? 'is-open' : ''}`} 
        />
      </button>

      {isOpen && (
        <div 
          className={`shared-filter-select-popover animate-scale-in ${align === 'right' ? 'align-right' : 'align-left'}`}
          role="listbox"
        >
          {headerText && (
            <div className="shared-filter-select-header">
              <span className="shared-filter-select-title">{headerText}</span>
            </div>
          )}

          <div className="shared-filter-select-list">
            {normalizedOptions.map((opt, idx) => {
              const isSelected = String(opt.value) === String(value);
              return (
                <button
                  key={opt.value !== '' ? opt.value : `empty-${idx}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`shared-filter-select-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(opt.value)}
                  title={opt.title || opt.label}
                >
                  <span className="shared-filter-select-item-text">{opt.label}</span>
                  {isSelected && (
                    <Icon icon="lucide:check" width={14} className="shared-filter-select-check" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
