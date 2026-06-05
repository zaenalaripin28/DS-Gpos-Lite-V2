import { useState, type ReactNode } from 'react';

export interface DateTimePickerProps {
  dateLabel: ReactNode;
  timeLabel: ReactNode;
  activeSegment?: 'date' | 'time';
  datePanel?: ReactNode;
  timePanel?: ReactNode;
  dateOpen?: boolean;
  timeOpen?: boolean;
}

export function DateTimePicker({
  dateLabel,
  timeLabel,
  activeSegment = 'date',
  datePanel,
  timePanel,
  dateOpen = false,
  timeOpen = false,
}: DateTimePickerProps) {
  const [segment, setSegment] = useState<'date' | 'time'>(activeSegment);
  const [isDateOpen, setDateOpen] = useState(dateOpen);
  const [isTimeOpen, setTimeOpen] = useState(timeOpen);

  const barClass = [
    'ds-date-time-picker__bar',
    isDateOpen || isTimeOpen ? 'ds-date-time-picker__bar--focus' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="ds-date-time-picker">
      <div className={barClass}>
        <button
          type="button"
          className={[
            'ds-date-time-picker__segment',
            'ds-date-time-picker__segment--date',
            segment === 'date'
              ? 'ds-date-time-picker__segment--active'
              : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-haspopup="dialog"
          aria-expanded={isDateOpen}
          onClick={() => {
            setSegment('date');
            setDateOpen((v) => !v);
            setTimeOpen(false);
          }}
        >
          {dateLabel}
        </button>
        <button
          type="button"
          className={[
            'ds-date-time-picker__segment',
            'ds-date-time-picker__segment--time',
            segment === 'time'
              ? 'ds-date-time-picker__segment--active'
              : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-haspopup="listbox"
          aria-expanded={isTimeOpen}
          onClick={() => {
            setSegment('time');
            setTimeOpen((v) => !v);
            setDateOpen(false);
          }}
        >
          {timeLabel}
        </button>
      </div>
      {isDateOpen && datePanel ? (
        <div
          className="ds-date-time-picker__dropdown ds-date-time-picker__dropdown--date ds-calendar"
          role="dialog"
          aria-label="Date time picker calendar"
        >
          {datePanel}
        </div>
      ) : null}
      {isTimeOpen && timePanel ? (
        <div
          className="ds-date-time-picker__dropdown ds-date-time-picker__dropdown--time ds-time-picker"
          role="listbox"
          aria-label="Date time picker time list"
        >
          {timePanel}
        </div>
      ) : null}
    </div>
  );
}
