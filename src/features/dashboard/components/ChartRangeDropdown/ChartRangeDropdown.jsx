import { useTranslation } from "react-i18next";
import { FilterSelect } from '@ui';

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

  return (
    <FilterSelect
      value={value}
      onChange={(e, val) => onChange && onChange(val !== undefined ? val : (e?.target ? e.target.value : e))}
      options={OPTIONS}
      variant="compact"
      align="right"
      header={t("dashboard.khoangThoiGian", "Time range")}
      className="chart-range-wrapper"
    />
  );
}