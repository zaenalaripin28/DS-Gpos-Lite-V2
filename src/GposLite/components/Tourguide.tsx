import type { HTMLAttributes, ReactNode } from 'react';
import { Button, type ButtonAppearance } from './Button';

export interface TourguideAction {
  label: string;
  appearance?: ButtonAppearance;
  onClick?: () => void;
}

export interface TourguideProps extends HTMLAttributes<HTMLElement> {
  title: string;
  instruction: ReactNode;
  progress?: string;
  actions?: TourguideAction[];
}

export function Tourguide({
  title,
  instruction,
  progress,
  actions = [],
  className,
  ...rest
}: TourguideProps) {
  const rootClass = ['ds-tourguide', className].filter(Boolean).join(' ');

  return (
    <article className={rootClass} aria-label="Tourguide" {...rest}>
      <div className="ds-tourguide__body">
        <h3 className="ds-tourguide__title">{title}</h3>
        <p className="ds-tourguide__instruction">{instruction}</p>
        <div className="ds-tourguide__footer">
          {progress ? (
            <span className="ds-tourguide__progress">{progress}</span>
          ) : null}
          <div className="ds-tourguide__actions">
            {actions.map((action, i) => (
              <Button
                key={`${action.label}-${i}`}
                type="button"
                appearance={action.appearance ?? 'subtle'}
                className="ds-btn-spotlight"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
