import type { HTMLAttributes } from 'react';

export type LozengeAppearance =
  | 'default'
  | 'bold'
  | 'new'
  | 'removed'
  | 'success'
  | 'inprogress'
  | 'moved';

export interface LozengeProps extends HTMLAttributes<HTMLSpanElement> {
  appearance?: LozengeAppearance;
  children: string;
}

export function Lozenge({
  appearance = 'default',
  children,
  className,
  ...rest
}: LozengeProps) {
  const rootClass = ['ds-lozenge', `ds-lozenge--${appearance}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={rootClass} {...rest}>
      {children}
    </span>
  );
}
