import type { InputHTMLAttributes } from 'react';

export interface RangeProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  fillImageSrc?: string;
}

const DEFAULT_FILL = 'assets/images/range=default.svg';

export function Range({
  label,
  fillImageSrc = DEFAULT_FILL,
  className,
  min = 0,
  max = 100,
  ...rest
}: RangeProps) {
  const rootClass = ['ds-range', 'ds-range--interactive', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass}>
      {label ? <span className="ds-range__label">{label}</span> : null}
      <div className="ds-range__track">
        <div
          className="ds-range__fill"
          style={{ backgroundImage: `url(${fillImageSrc})` }}
        />
        <div className="ds-range__thumb" />
        <input
          type="range"
          className="ds-range__input"
          min={min}
          max={max}
          aria-label={label ?? 'Range'}
          {...rest}
        />
      </div>
    </div>
  );
}
