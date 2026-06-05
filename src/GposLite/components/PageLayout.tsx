import type { HTMLAttributes, ReactNode } from 'react';

export type PageLayoutVariant = 'website' | 'tablet' | 'mobile';

export interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  variant?: PageLayoutVariant;
  menuExpand?: boolean;
  submenuOn?: boolean;
  topnav?: ReactNode;
  aside?: ReactNode;
  drawer?: ReactNode;
  overlay?: ReactNode;
  footerNav?: ReactNode;
  children: ReactNode;
}

export function PageLayout({
  variant = 'website',
  menuExpand = false,
  submenuOn = false,
  topnav,
  aside,
  drawer,
  overlay,
  footerNav,
  children,
  className,
  ...rest
}: PageLayoutProps) {
  const rootClass = [
    'ds-page-layout',
    `ds-page-layout--${variant}`,
    menuExpand ? 'ds-page-layout--menu-expand' : '',
    submenuOn ? 'ds-page-layout--submenu-on' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass} {...rest}>
      {topnav}
      <div className="ds-page-layout__body">
        {aside ? <aside className="ds-page-layout__aside">{aside}</aside> : null}
        {drawer ? (
          <div className="ds-page-layout__drawer">{drawer}</div>
        ) : null}
        {overlay ? (
          <div className="ds-page-layout__overlay">{overlay}</div>
        ) : null}
        <main className="ds-page-layout__content">{children}</main>
      </div>
      {footerNav ? (
        <footer className="ds-footer-nav" role="contentinfo">
          {footerNav}
        </footer>
      ) : null}
    </div>
  );
}
