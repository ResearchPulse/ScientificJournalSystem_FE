import './Table.css';

/**
 * Reusable Data Table Component
 *
 * @param {boolean} [hover=true] - Enable row hover effect
 * @param {boolean} [striped=false] - Alternating row colors
 * @param {boolean} [compact=false] - Dense padding
 * @param {boolean} [stickyHeader=false] - Freeze table header on scroll
 * @param {string} [className=''] - Extra classes
 */
export default function Table({
  hover = true,
  striped = false,
  compact = false,
  stickyHeader = false,
  className = '',
  children,
  ...props
}) {
  const containerClasses = [
    'ui-table-container',
    stickyHeader ? 'ui-table-sticky-header' : '',
    className,
  ].filter(Boolean).join(' ');

  const tableClasses = [
    'ui-table',
    hover ? 'ui-table-hover' : '',
    striped ? 'ui-table-striped' : '',
    compact ? 'ui-table-compact' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <table className={tableClasses} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, ...props }) {
  return <thead {...props}>{children}</thead>;
}

export function TableBody({ children, ...props }) {
  return <tbody {...props}>{children}</tbody>;
}

export function TableRow({ children, className = '', ...props }) {
  return (
    <tr className={className} {...props}>
      {children}
    </tr>
  );
}

export function TableHeadCell({ children, className = '', ...props }) {
  return (
    <th className={className} {...props}>
      {children}
    </th>
  );
}

export function TableCell({ children, className = '', ...props }) {
  return (
    <td className={className} {...props}>
      {children}
    </td>
  );
}

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeadCell = TableHeadCell;
Table.Cell = TableCell;
