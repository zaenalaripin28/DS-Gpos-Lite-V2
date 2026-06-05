import type { HTMLAttributes, MouseEventHandler } from 'react';

export type BreadcrumbItemState = 'default' | 'hover' | 'press' | 'focus';

export interface BreadcrumbItemData {
  label: string;
  showHomeIcon?: boolean;
  showChevron?: boolean;
  current?: boolean;
  /** Snapshot state dokumentasi */
  state?: BreadcrumbItemState;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItemData[];
  truncated?: boolean;
  homeIconSrc?: string;
  chevronIconSrc?: string;
}

const DEFAULT_HOME_ICON = 'assets/icons/icon-home.svg';
const DEFAULT_CHEVRON_ICON = 'assets/icons/icon-chevron-right.svg';

export function Breadcrumbs({
  items,
  truncated = false,
  homeIconSrc = DEFAULT_HOME_ICON,
  chevronIconSrc = DEFAULT_CHEVRON_ICON,
  className,
  'aria-label': ariaLabel = 'Breadcrumb',
  ...rest
}: BreadcrumbsProps) {
  const navClass = ['flex', 'items-center', 'flex-wrap', 'gap-0', className]
    .filter(Boolean)
    .join(' ');

  const containerClass = [
    'ds-bc-container',
    truncated ? 'ds-bc-container--truncated' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const textClass = [
    'ds-bc-text',
    truncated ? 'ds-bc-text--truncated' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav aria-label={ariaLabel} className={navClass} {...rest}>
      {items.map((item, index) => {
        const stateMod =
          !item.current && item.state ? `ds-bc-item--${item.state}` : '';
        const itemClass = ['ds-bc-item', stateMod].filter(Boolean).join(' ');

        return (
          <div
            key={`${item.label}-${index}`}
            className={itemClass}
            onClick={item.onClick}
            role={item.onClick ? 'button' : undefined}
            tabIndex={item.onClick ? 0 : undefined}
          >
            <span className="ds-bc-sep" aria-hidden="true">
              /
            </span>
            <div className={containerClass}>
              {item.showHomeIcon ? (
                <div className="ds-bc-icon">
                  <img src={homeIconSrc} alt="" />
                </div>
              ) : null}
              <span
                className={textClass}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.label}
              </span>
              {item.showChevron ? (
                <div className="ds-bc-icon">
                  <img src={chevronIconSrc} alt="" />
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
