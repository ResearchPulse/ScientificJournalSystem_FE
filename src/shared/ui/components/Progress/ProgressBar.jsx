/**
 * ProgressBar / Progress - Visual progress bar indicator
 */
const ProgressBar = ({ current, total }) => {
  const percentage = ((total - current) / total) * 100;

  return (
    <div
      style={{
        width: '100%',
        height: '6px',
        backgroundColor: 'var(--bg-section, #ececec)',
        borderRadius: '999px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: 'var(--primary, #FF7A33)',
          borderRadius: '999px',
          transition: 'width 1s linear',
        }}
      />
    </div>
  );
};

export default ProgressBar;
