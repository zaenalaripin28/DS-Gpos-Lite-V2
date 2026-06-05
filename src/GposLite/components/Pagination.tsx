import type { HTMLAttributes, ReactNode } from 'react';

export type PaginationItemType = 'page' | 'ellipsis' | 'prev' | 'next';

export interface PaginationPageItem {
  type: 'page';
  page: number;
  active?: boolean;
  onClick?: () => void;
}

export interface PaginationEllipsisItem {
  type: 'ellipsis';
}

export interface PaginationNavItem {
  type: 'prev' | 'next';
  onClick?: () => void;
  ariaLabel?: string;
}

export type PaginationItem =
  | PaginationPageItem
  | PaginationEllipsisItem
  | PaginationNavItem;

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  items: PaginationItem[];
  prevIconSrc?: string;
  nextIconSrc?: string;
}

const DEFAULT_PREV = 'assets/icons/icon-chevron-left.svg';
const DEFAULT_NEXT = 'assets/icons/icon-chevron-right.svg';

export function Pagination({
  items,
  prevIconSrc = DEFAULT_PREV,
  nextIconSrc = DEFAULT_NEXT,
  className,
  'aria-label': ariaLabel = 'Pagination',
  ...rest
}: PaginationProps) {
  const navClass = ['ds-pagination', className].filter(Boolean).join(' ');

  return (
    <nav className={navClass} aria-label={ariaLabel} {...rest}>
      {items.map((item, index) => renderItem(item, index, prevIconSrc, nextIconSrc))}
    </nav>
  );
}

function renderItem(
  item: PaginationItem,
  index: number,
  prevIconSrc: string,
  nextIconSrc: string,
): ReactNode {
  if (item.type === 'ellipsis') {
    return (
      <span
        key={`ellipsis-${index}`}
        className="ds-pagination__item ds-pagination__item--ellipsis"
        aria-hidden="true"
      >
        ...
      </span>
    );
  }

  if (item.type === 'prev') {
    return (
      <button
        key={`prev-${index}`}
        type="button"
        className="ds-pagination__item"
        aria-label={item.ariaLabel ?? 'Halaman sebelumnya'}
        onClick={item.onClick}
      >
        <img src={prevIconSrc} alt="" aria-hidden="true" />
      </button>
    );
  }

  if (item.type === 'next') {
    return (
      <button
        key={`next-${index}`}
        type="button"
        className="ds-pagination__item"
        aria-label={item.ariaLabel ?? 'Halaman berikutnya'}
        onClick={item.onClick}
      >
        <img src={nextIconSrc} alt="" aria-hidden="true" />
      </button>
    );
  }

  const pageClass = [
    'ds-pagination__item',
    item.active ? 'ds-pagination__item--active' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      key={`page-${item.page}-${index}`}
      type="button"
      className={pageClass}
      aria-current={item.active ? 'page' : undefined}
      onClick={item.onClick}
    >
      {item.page}
    </button>
  );
}
