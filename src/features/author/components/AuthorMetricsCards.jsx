import Icon from "../../../shared/components/Icon";

/**
 * @file AuthorMetricsCards.jsx
 * @description Compact, high-density scientific metrics strip.
 */
export default function AuthorMetricsCards({ metrics }) {
  if (!metrics) return null;

  const fmt = (num) => {
    if (num == null) return "0";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toLocaleString();
  };

  const metricItems = [
    {
      icon: "lucide:file-text",
      label: "Publications",
      value: fmt(metrics.publications),
      subtext: "Peer-reviewed works",
    },
    {
      icon: "lucide:quote",
      label: "Citations",
      value: fmt(metrics.citations),
      subtext: "Total indexed citations",
      highlight: true,
    },
    {
      icon: "lucide:trending-up",
      label: "h-index",
      value: metrics.hIndex,
      subtext: "Productivity & impact",
    },
    {
      icon: "lucide:layers",
      label: "i10-index",
      value: fmt(metrics.i10Index),
      subtext: "Papers ≥ 10 citations",
    },
    {
      icon: "lucide:flame",
      label: "Highly Cited",
      value: metrics.highlyCitedPapers,
      subtext: "Top 1% in field",
    },
    {
      icon: "lucide:network",
      label: "Research Areas",
      value: metrics.researchAreas,
      subtext: "Interdisciplinary fields",
    },
  ];

  return (
    <div className="ap-metrics-strip">
      {metricItems.map((item, idx) => (
        <div key={idx} className={`ap-metric-tile ${item.highlight ? "highlight" : ""}`}>
          <div className="ap-metric-tile-header">
            <Icon icon={item.icon} width="14" className="ap-metric-icon" />
            <span className="ap-metric-tile-label">{item.label}</span>
          </div>
          <div className="ap-metric-tile-val">{item.value}</div>
          <div className="ap-metric-tile-sub">{item.subtext}</div>
        </div>
      ))}
    </div>
  );
}
