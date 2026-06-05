import type { HTMLAttributes, ReactNode } from 'react';

export type TopnavVariant = 'website' | 'tablet' | 'mobile';

export interface TopBottomNavProps extends HTMLAttributes<HTMLElement> {
  variant?: TopnavVariant;
  large?: boolean;
  iconOnly?: boolean;
  role?: string;
  children: ReactNode;
}

export function TopBottomNav({
  variant = 'website',
  large = false,
  iconOnly = false,
  role = 'banner',
  children,
  className,
  ...rest
}: TopBottomNavProps) {
  const rootClass = [
    'ds-topnav',
    `ds-topnav--${variant}`,
    large ? 'ds-topnav--lg' : '',
    iconOnly ? 'ds-topnav--icon-only' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={rootClass} role={role} {...rest}>
      {children}
    </header>
  );
}
