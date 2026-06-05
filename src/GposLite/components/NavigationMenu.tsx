import type { HTMLAttributes, ReactNode } from 'react';

export interface NavigationMenuProps extends HTMLAttributes<HTMLDivElement> {
  hide?: boolean;
  interactive?: boolean;
  children: ReactNode;
}

export function NavigationMenu({
  hide = false,
  interactive = true,
  children,
  className,
  ...rest
}: NavigationMenuProps) {
  const rootClass = [
    'ds-sidebar-nav-expand',
    hide ? 'ds-sidebar-nav-expand--hide' : '',
    interactive ? 'ds-sidebar-nav-expand--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass} {...rest}>
      {children}
    </div>
  );
}
