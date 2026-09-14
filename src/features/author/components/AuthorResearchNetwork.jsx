import Icon from "../../../shared/components/Icon";

/**
 * @file AuthorResearchNetwork.jsx
 * @description Lightweight, clean SVG-based academic collaboration & research network visualization.
 */
export default function AuthorResearchNetwork({ network }) {
  if (!network) return null;

  const { center, nodes = [] } = network;
  const cx = 200;
  const cy = 150;
  const r = 105;
  const svgW = 400;
  const svgH = 300;

  const nodeColors = {
    institution: "#0F172A", // Dark navy
    topic: "var(--primary)", // Orange
    person: "#0EA5E9",
  };

  const getPos = (angle) => ({
    x: cx + r * Math.cos((angle * Math.PI) / 180),
    y: cy + r * Math.sin((angle * Math.PI) / 180),
  });

  return (
    <div className="ap-section">
      <div className="ap-section-header">
        <div className="ap-section-header-left">
          <Icon icon="lucide:share-2" width="16" className="ap-section-icon" />
          <h2 className="ap-section-title">Research Network</h2>
        </div>
        <span className="ap-section-badge">Key Affiliations & Core Topics</span>
      </div>

      <div className="ap-network-wrapper">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="ap-network-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Connection lines */}
          {nodes.map((node) => {
            const pos = getPos(node.angle);
            return (
              <line
                key={node.id}
                x1={cx}
                y1={cy}
                x2={pos.x}
                y2={pos.y}
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            );
          })}

          {/* Outer Satellite Nodes */}
          {nodes.map((node) => {
            const pos = getPos(node.angle);
            const color = nodeColors[node.type] || "var(--text-muted)";
            return (
              <g key={node.id} className="ap-network-node-group">
                <circle cx={pos.x} cy={pos.y} r="10" fill={color} opacity="0.12" />
                <circle cx={pos.x} cy={pos.y} r="6" fill={color} />
                <text
                  x={pos.x}
                  y={pos.y + (pos.y > cy ? 18 : -14)}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="var(--text-main)"
                  fontWeight="600"
                  fontFamily="var(--font-display)"
                >
                  {node.label}
                </text>
              </g>
            );
          })}

          {/* Center Hub Node */}
          <circle cx={cx} cy={cy} r="32" fill="var(--primary)" opacity="0.12" />
          <circle cx={cx} cy={cy} r="22" fill="var(--primary)" />
          <text
            x={cx}
            y={cy - 4}
            textAnchor="middle"
            fontSize="8"
            fill="#ffffff"
            fontWeight="700"
            fontFamily="var(--font-display)"
          >
            Zhong Lin
          </text>
          <text
            x={cx}
            y={cy + 7}
            textAnchor="middle"
            fontSize="8"
            fill="#ffffff"
            fontWeight="700"
            fontFamily="var(--font-display)"
          >
            Wang
          </text>
        </svg>

        <div className="ap-network-legend">
          <span className="ap-network-legend-item">
            <span style={{ backgroundColor: "#0F172A" }} className="ap-network-dot" />
            <span>Institutions & Alliances</span>
          </span>
          <span className="ap-network-legend-item">
            <span style={{ backgroundColor: "var(--primary)" }} className="ap-network-dot" />
            <span>Foundational Research Domains</span>
          </span>
        </div>
      </div>
    </div>
  );
}
