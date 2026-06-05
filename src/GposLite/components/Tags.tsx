import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';

export type TagAppearance =
  | 'standard'
  | 'bluelight'
  | 'greenlight'
  | 'greylight'
  | 'yellowlight'
  | 'purplelight'
  | 'redlight';

export type TagSnapshotState = 'hover' | 'pressed' | 'focus';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  appearance?: TagAppearance;
  label: string;
  removable?: boolean;
  /** Snapshot: `.ds-tag--state-{state}` */
  snapshotState?: TagSnapshotState;
  removeIconSrc?: string;
  onRemove?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}

const DEFAULT_REMOVE_ICON = 'assets/icons/icon-x-mark.svg';

export function Tag({
  appearance = 'standard',
  label,
  removable = false,
  snapshotState,
  removeIconSrc = DEFAULT_REMOVE_ICON,
  onRemove,
  className,
  tabIndex,
  ...rest
}: TagProps) {
  const rootClass = [
    'ds-tag',
    `ds-tag--${appearance}`,
    removable ? 'ds-tag--removable' : '',
    snapshotState ? `ds-tag--state-${snapshotState}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={rootClass}
      tabIndex={snapshotState === 'focus' ? tabIndex ?? 0 : tabIndex}
      {...rest}
    >
      <span className="ds-tag__label">{label}</span>
      {removable ? (
        <button
          type="button"
          className="ds-tag__remove"
          aria-label={`Hapus tag ${label}`}
          onClick={onRemove}
        >
          <img src={removeIconSrc} alt="" aria-hidden="true" />
        </button>
      ) : null}
    </span>
  );
}
