import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeAppearance =
  | 'default'
  | 'primary'
  | 'subtle'
  | 'important'
  | 'added'
  | 'removed';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** Modifier: `.ds-badge--{appearance}` */
  appearance?: BadgeAppearance;
  /** Konten badge (angka atau teks) */
  children: ReactNode;
}

export function Badge({
  appearance = 'default',
  children,
  className,
  ...rest
}: BadgeProps) {
  const rootClass = ['ds-badge', `ds-badge--${appearance}`, className]
    .filter(Boolean)
    .join(' ');

  if (appearance === 'added' || appearance === 'removed') {
    const prefix = appearance === 'added' ? '+' : '-';
    return (
      <div className={rootClass} {...rest}>
        <span className="ds-badge__prefix">{prefix}</span>
        <span className="ds-badge__content">{children}</span>
      </div>
    );
  }

  return (
    <div className={rootClass} {...rest}>
      {children}
    </div>
  );
}
