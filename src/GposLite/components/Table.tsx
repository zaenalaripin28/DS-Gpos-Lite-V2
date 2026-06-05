import type { HTMLAttributes, ReactNode, TableHTMLAttributes } from 'react';

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  stickyHead?: boolean;
  rowHover?: boolean;
  data?: boolean;
  tableProps?: TableHTMLAttributes<HTMLTableElement>;
  children: ReactNode;
}

export function Table({
  stickyHead = false,
  rowHover = false,
  data = true,
  tableProps,
  children,
  className,
  ...rest
}: TableProps) {
  const scrollClass = ['ds-table-scroll', className].filter(Boolean).join(' ');
  const tableClass = [
    'ds-table',
    data ? 'ds-table--data' : '',
    stickyHead ? 'ds-table--sticky-head' : '',
    rowHover ? 'ds-table--row-hover' : '',
    tableProps?.className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={scrollClass} role="region" tabIndex={0} {...rest}>
      <table className={tableClass} {...tableProps}>
        {children}
      </table>
    </div>
  );
}
