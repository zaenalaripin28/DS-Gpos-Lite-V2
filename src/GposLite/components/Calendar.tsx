import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';

export type CalendarDayModifier =
  | 'outside'
  | 'today'
  | 'selected'
  | 'range'
  | 'disabled'
  | 'text-subtle';

export interface CalendarDay {
  label: string | number;
  modifiers?: CalendarDayModifier[];
  disabled?: boolean;
  selected?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}

export interface CalendarProps extends HTMLAttributes<HTMLDivElement> {
  monthLabel: string;
  weekDays?: string[];
  days: CalendarDay[];
  ariaLabel?: string;
  prevIconSrc?: string;
  nextIconSrc?: string;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
}

const DEFAULT_WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const DEFAULT_PREV = 'assets/icons/icon-chevron-left.svg';
const DEFAULT_NEXT = 'assets/icons/icon-chevron-right.svg';

function dayClass(day: CalendarDay): string {
  const mods = new Set(day.modifiers ?? []);
  if (day.disabled) mods.add('disabled');
  if (day.selected) mods.add('selected');
  return [
    'ds-calendar-day',
    mods.has('outside') ? 'ds-calendar-day--outside' : '',
    mods.has('today') ? 'ds-calendar-day--today' : '',
    mods.has('selected') ? 'ds-calendar-day--selected' : '',
    mods.has('range') ? 'ds-calendar-day--range' : '',
    mods.has('disabled') ? 'ds-calendar-day--disabled' : '',
    mods.has('text-subtle') ? 'ds-calendar-day--text-subtle' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function Calendar({
  monthLabel,
  weekDays = DEFAULT_WEEK_DAYS,
  days,
  ariaLabel,
  prevIconSrc = DEFAULT_PREV,
  nextIconSrc = DEFAULT_NEXT,
  onPrevMonth,
  onNextMonth,
  className,
  ...rest
}: CalendarProps) {
  const rootClass = ['ds-calendar', className].filter(Boolean).join(' ');

  return (
    <div
      className={rootClass}
      role="group"
      aria-label={ariaLabel ?? `Kalender ${monthLabel}`}
      {...rest}
    >
      <div className="ds-calendar__body">
        <div
          className="ds-calendar-month-header"
          role="group"
          aria-label="Navigasi bulan"
        >
          <button
            type="button"
            className="ds-calendar-month-header__nav"
            aria-label="Bulan sebelumnya"
            onClick={onPrevMonth}
          >
            <img src={prevIconSrc} alt="" aria-hidden="true" />
          </button>
          <h2 className="ds-calendar-month-header__label">{monthLabel}</h2>
          <button
            type="button"
            className="ds-calendar-month-header__nav"
            aria-label="Bulan berikutnya"
            onClick={onNextMonth}
          >
            <img src={nextIconSrc} alt="" aria-hidden="true" />
          </button>
        </div>
        <div className="ds-calendar-week-header" role="row">
          {weekDays.map((day) => (
            <span
              key={day}
              className="ds-calendar-week-header__day"
              role="columnheader"
            >
              {day}
            </span>
          ))}
        </div>
        <div className="ds-calendar-days" role="grid" aria-label={monthLabel}>
          {days.map((day, index) => {
            const isOutside = day.modifiers?.includes('outside');
            const isDisabled = day.disabled || isOutside;
            return (
              <button
                key={`${day.label}-${index}`}
                type="button"
                className={dayClass(day)}
                disabled={isDisabled}
                aria-disabled={isDisabled || undefined}
                aria-selected={day.selected || undefined}
                tabIndex={isDisabled ? -1 : undefined}
                onClick={day.onClick}
              >
                {day.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
