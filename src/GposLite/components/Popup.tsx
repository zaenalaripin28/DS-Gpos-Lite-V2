import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Button } from './Button';

export type PopupAnchorPosition = 'left' | 'center' | 'right';

export interface PopupProps {
  panelText: string;
  triggerLabel?: string;
  position?: PopupAnchorPosition;
  open?: boolean;
  defaultOpen?: boolean;
  onTriggerClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  triggerClassName?: string;
  children?: ReactNode;
}

export function Popup({
  panelText,
  triggerLabel = 'Label',
  position = 'left',
  open,
  defaultOpen = true,
  onTriggerClick,
  triggerClassName,
}: PopupProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  const wrapClass = [
    'popup-anchor-wrap',
    `popup-anchor-wrap--${position}`,
  ].join(' ');

  const triggerClass = [
    'ds-btn',
    'ds-btn-default-selected',
    'popup-anchor-btn',
    triggerClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapClass}>
      {isOpen ? (
        <div className="popup-part-panel">
          <p className="popup-part-text">{panelText}</p>
        </div>
      ) : null}
      <Button
        type="button"
        className={triggerClass}
        onClick={(e) => {
          if (open === undefined) setInternalOpen((v) => !v);
          onTriggerClick?.(e);
        }}
      >
        {triggerLabel}
      </Button>
    </div>
  );
}
