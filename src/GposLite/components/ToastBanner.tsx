import type { HTMLAttributes, ReactNode } from 'react';

export type ToastBannerAppearance =
  | 'announcement'
  | 'success'
  | 'warning'
  | 'error';

export interface ToastBannerProps extends HTMLAttributes<HTMLDivElement> {
  appearance?: ToastBannerAppearance;
  text: ReactNode;
  icon?: ReactNode;
}

export function ToastBanner({
  appearance = 'warning',
  text,
  icon,
  className,
  ...rest
}: ToastBannerProps) {
  const rootClass = ['ds-banner', `ds-banner--${appearance}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass} {...rest}>
      {icon ? (
        <div className="ds-banner__icon">{icon}</div>
      ) : (
        <div className="ds-banner__icon" aria-hidden="true" />
      )}
      <div className="ds-banner__text">{text}</div>
    </div>
  );
}
