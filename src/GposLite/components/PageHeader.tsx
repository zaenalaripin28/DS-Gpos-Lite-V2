import type { HTMLAttributes, ReactNode } from 'react';

export interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
  title: string;
  actionsOn?: boolean;
  toolbarOn?: boolean;
  subfiltersOn?: boolean;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
  toolbar?: ReactNode;
  subfilters?: ReactNode;
}

export function PageHeader({
  title,
  actionsOn = false,
  toolbarOn = false,
  subfiltersOn = false,
  breadcrumbs,
  actions,
  toolbar,
  subfilters,
  className,
  ...rest
}: PageHeaderProps) {
  const rootClass = [
    'ds-page-header',
    actionsOn ? 'ds-page-header--actions-on' : '',
    toolbarOn ? 'ds-page-header--toolbar-on' : '',
    subfiltersOn ? 'ds-page-header--subfilters-on' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={rootClass} {...rest}>
      <div className="ds-page-header__row">
        <div className="ds-page-header__start">
          {breadcrumbs}
          <h1 className="ds-page-header__title">{title}</h1>
        </div>
        {actions ? (
          <div className="ds-page-header__actions">{actions}</div>
        ) : null}
      </div>
      {toolbar ? (
        <div className="ds-page-header__row ds-page-header__row--toolbar">
          <div className="ds-page-header__toolbar">{toolbar}</div>
        </div>
      ) : null}
      {subfilters ? (
        <div className="ds-page-header__subfilters">{subfilters}</div>
      ) : null}
    </header>
  );
}
