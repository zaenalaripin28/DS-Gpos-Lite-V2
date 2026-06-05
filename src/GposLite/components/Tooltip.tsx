import type { HTMLAttributes } from 'react';

export type TooltipPlacement = 'top' | 'bottom';
export type TooltipPosition = 'center' | 'left' | 'right';
export type TooltipContentMode = 'default' | 'truncate' | 'overflow';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  placement?: TooltipPlacement;
  position?: TooltipPosition;
  contentMode?: TooltipContentMode;
  triggerIconSrc?: string;
  triggerWidth?: number;
  triggerHeight?: number;
}

const DEFAULT_TRIGGER_ICON =
  'assets/icons/icon-solid-information-circle.svg';

export function Tooltip({
  text,
  placement = 'top',
  position = 'center',
  contentMode = 'default',
  triggerIconSrc = DEFAULT_TRIGGER_ICON,
  triggerWidth = 24,
  triggerHeight = 24,
  className,
  ...rest
}: TooltipProps) {
  const rootClass = [
    'ds-tooltip',
    `ds-tooltip--${placement}`,
    `ds-tooltip--position-${position}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const partClass = [
    'ds-tooltip-part',
    contentMode !== 'default' ? `ds-tooltip-part--${contentMode}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass} {...rest}>
      <span className={partClass} role="tooltip">
        {text}
      </span>
      <span className="ds-tooltip__trigger" aria-hidden="true">
        <img
          src={triggerIconSrc}
          alt=""
          width={triggerWidth}
          height={triggerHeight}
        />
      </span>
    </div>
  );
}
