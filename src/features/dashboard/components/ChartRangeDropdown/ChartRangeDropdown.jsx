import { useState, useRef, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Icon } from '@ui';
import './ChartRangeDropdown.css';

export default function ChartRangeDropdown({
  value,
  onChange
}) {
  const { t } = useTranslation();

  const OPTIONS = [
    { label: t("dashboard.5NamGanNhat", "Last 5 years"), value: '5' },
    { label: t("dashboard.10NamGanNhat", "Last 10 years"), value: '10' },
    { label: t("dashboard.tatCa", "All time"), value: 'all' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = OPTIONS.find(opt => opt.value === value) || OPTIONS[0];

  const handleSelect = val => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="chart-range-wrapper" ref={wrapperRef}>
      {/* Trigger Button */}
      <button
        type="button"
        className={`chart-range-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{selectedOption.label}</span>
        <Icon
          icon="lucide:chevron-down"
          width={14}
          className={`crp-chevron ${isOpen ? 'is-open' : ''}`}
        />
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="chart-range-popover animate-scale-in">
          <div className="crp-header">
            <span className="crp-title">{t("dashboard.khoangThoiGian", "Time range")}</span>
          </div>

          <div className="crp-list" role="listbox">
            {OPTIONS.map(opt => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`crp-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(opt.value)}
                >
                  <span className="crp-label">{opt.label}</span>
                  {isSelected && (
                    <Icon icon="lucide:check" width={14} className="crp-check-icon" />
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