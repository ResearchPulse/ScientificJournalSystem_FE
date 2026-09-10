import Icon from '../../primitives/Icon';

/**
 * Logo component that matches the style of the ResearchPulse header.
 *
 * @param {Object} props - Component props
 * @param {number} [props.size=32] - Size of the icon box
 * @param {string} [props.fontSize='1.25rem'] - Font size of the text
 * @param {string} [props.className=''] - Custom class names
 */
export default function Logo({ size = 32, fontSize = '1.25rem', className = '', ...props }) {
  return (
    <div
      className={`d-flex align-items-center text-main fw-bold ${className}`}
      style={{ fontFamily: 'var(--font-display)', fontWeight: 800, cursor: 'pointer', ...props.style }}
      {...props}
    >
      <div
        className="d-flex align-items-center justify-content-center me-2"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '8px',
          background: 'var(--btn-dark)',
          boxShadow: '0 0 10px rgba(7, 26, 28, 0.15)',
        }}
      >
        <Icon icon="lucide:activity" className="text-white text-sm" />
      </div>
      <span style={{ fontSize }}>ResearchPulse</span>
    </div>
  );
}
