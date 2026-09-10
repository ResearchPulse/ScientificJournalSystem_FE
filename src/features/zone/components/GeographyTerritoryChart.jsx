import { useTranslation } from "react-i18next";
import { useMemo } from 'react';
import { Icon } from '@ui';

// Helper function to map country code to circle-flags icon code
const getCountryFlagCode = (item) => {
  const rawCode = (item.code || item.iso_code || item.iso2 || item.name?.substring(0, 2) || '').toLowerCase().trim();
  const isoMap = {
    gb: 'gb', gbr: 'gb', uk: 'gb',
    us: 'us', usa: 'us',
    de: 'de', deu: 'de',
    nl: 'nl', nld: 'nl',
    ch: 'ch', che: 'ch',
    vn: 'vn', vnm: 'vn',
    jp: 'jp', jpn: 'jp',
    kr: 'kr', kor: 'kr',
    cn: 'cn', chn: 'cn',
    in: 'in', ind: 'in',
    br: 'br', bra: 'br',
    ru: 'ru', rus: 'ru',
    ca: 'ca', can: 'ca',
    fr: 'fr', fra: 'fr',
    au: 'au', aus: 'au'
  };
  return isoMap[rawCode] || (rawCode.length === 2 ? rawCode : 'un');
};

// Component biểu đồ dạng Horizontal Bar Chart hiển thị Top 10 Quốc gia
export default function GeographyTerritoryChart({
  data = [],
  loading = false,
  selectedCountry = null,
  onSelectCountry,
  selectedYear = 'All'
}) {
  const {
    t
  } = useTranslation();

  // Top 10 countries sorted by article count
  const top10 = useMemo(() => {
    const sorted = [...data].sort((a, b) => (Number(b.article_count) || 0) - (Number(a.article_count) || 0));
    return sorted.slice(0, 10);
  }, [data]);

  // Max value for width scaling
  const maxVal = useMemo(() => {
    const max = Math.max(...top10.map(item => Number(item.article_count) || 0), 0);
    return max > 0 ? max : 1;
  }, [top10]);

  const gridTicks = useMemo(() => {
    if (maxVal === 1) return [0, 1];
    return [0, Math.round(maxVal * 0.25), Math.round(maxVal * 0.5), Math.round(maxVal * 0.75), maxVal];
  }, [maxVal]);

  return (
    <div className="p-4 journal-dark-card h-100 d-flex flex-column">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h3 className="font-display fw-bold text-main mb-0" style={{ fontSize: '1.1rem' }}>
            {t("zone.top10QuocGiaCoSanLuongArticleCa", "Top 10 Countries by Article Output")}
          </h3>
          <p className="text-muted-custom mb-0 mt-1" style={{ fontSize: '0.8rem' }}>
            {t("zone.phanBoSoLuongBaiBaoKhoaHocXuat")}
          </p>
        </div>
        <span
          className="px-2 py-1 rounded text-muted-custom"
          style={{
            fontSize: '0.75rem',
            backgroundColor: 'var(--bg-chip)',
            fontWeight: 500,
            alignSelf: 'flex-start'
          }}
        >
          {selectedYear === 'All' ? t("zone.tatCaCacNam") : `Thống kê ${selectedYear}`}
        </span>
      </div>

      {loading ? (
        <div className="d-flex flex-column gap-3 justify-content-center flex-grow-1" style={{ minHeight: '380px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} className="d-flex align-items-center gap-3">
              <div className="skeleton-shimmer rounded-circle" style={{ width: '28px', height: '28px' }} />
              <div className="skeleton-shimmer rounded" style={{ width: '100px', height: '18px' }} />
              <div className="skeleton-shimmer flex-grow-1 rounded" style={{ height: '32px' }} />
            </div>
          ))}
        </div>
      ) : top10.length === 0 ? (
        <div
          className="d-flex align-items-center justify-content-center flex-grow-1 text-muted-custom py-5"
          style={{ minHeight: '380px', fontSize: '0.9rem' }}
        >
          {t("topic.khongCoDuLieu")}
        </div>
      ) : (
        <div className="d-flex flex-column flex-grow-1 justify-content-between pt-2">
          
          {/* Main Horizontal Bars Area */}
          <div className="position-relative d-flex flex-column gap-2.5 flex-grow-1 justify-content-around">
            
            {/* Vertical Background Gridlines */}
            <div
              className="position-absolute h-100 d-flex justify-content-between pe-2"
              style={{
                left: '191px',
                right: 0,
                top: 0,
                pointerEvents: 'none',
                zIndex: 0
              }}
            >
              {gridTicks.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    borderRight: '1px dashed rgba(0, 0, 0, 0.07)',
                    height: '100%'
                  }}
                />
              ))}
            </div>

            {/* Horizontal Rows */}
            {top10.map((item, index) => {
              const val = Number(item.article_count) || 0;
              const widthPercent = maxVal > 0 ? (val / maxVal) * 100 : 0;
              const displayWidth = Math.max(widthPercent, 12);
              const flagCode = getCountryFlagCode(item);
              const isSelected = selectedCountry?.zone_id === item.zone_id;

              return (
                <div
                  key={item.zone_id || index}
                  onClick={() => onSelectCountry?.(item)}
                  className={`d-flex align-items-center gap-3 w-100 bar-row-container position-relative z-1 py-1 ${
                    isSelected ? 'is-selected' : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Left Column: Flag + Country Name & Code */}
                  <div className="d-flex align-items-center" style={{ width: '175px', flexShrink: 0, gap: '10px' }}>
                    <div className="flex-shrink-0 d-flex align-items-center justify-content-center flag-wrapper">
                      <Icon icon={`circle-flags:${flagCode}`} width={24} height={24} className="shadow-sm rounded-circle" />
                    </div>
                    <div className="d-flex flex-column min-w-0">
                      <span
                        className="text-main fw-bold font-display text-truncate"
                        style={{ fontSize: '0.82rem' }}
                        title={item.name}
                      >
                        {item.name || item.code}
                      </span>
                      <span className="text-muted-custom font-display text-xs" style={{ fontSize: '0.68rem' }}>
                        {item.code || item.iso_code || '—'}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Horizontal Bar */}
                  <div className="flex-grow-1 position-relative d-flex align-items-center pe-2" style={{ height: '34px' }}>
                    {/* Background Bar Track */}
                    <div
                      className="position-absolute w-100 h-100 rounded-3"
                      style={{ backgroundColor: 'var(--bg-chip)', opacity: 0.4, zIndex: 0 }}
                    />

                    {/* The Fill Bar */}
                    <div
                      className={`geography-chart-bar-horizontal rounded-3 d-flex align-items-center justify-content-end px-3 position-relative ${
                        isSelected ? 'is-active' : ''
                      }`}
                      style={{
                        width: `${displayWidth}%`,
                        height: '100%',
                        zIndex: 1,
                        transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      {/* Value Label INSIDE the Horizontal Bar */}
                      <span
                        className="fw-bold font-display text-white text-nowrap bar-value-inside"
                        style={{ fontSize: '0.78rem', letterSpacing: '0.01em' }}
                      >
                        {val > 0 ? val.toLocaleString() : '0'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      )}
    </div>
  );
}