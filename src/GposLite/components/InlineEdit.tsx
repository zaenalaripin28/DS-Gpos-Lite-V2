import { useState, type InputHTMLAttributes } from 'react';

export interface InlineEditProps {
  value?: string;
  defaultValue?: string;
  active?: boolean;
  defaultActive?: boolean;
  typing?: boolean;
  disabled?: boolean;
  confirmIconSrc?: string;
  cancelIconSrc?: string;
  onConfirm?: (value: string) => void;
  onCancel?: () => void;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'className'
  >;
}

const DEFAULT_CONFIRM = 'assets/icons/icon-check.svg';
const DEFAULT_CANCEL = 'assets/icons/icon-x-mark.svg';

export function InlineEdit({
  value,
  defaultValue = 'Value',
  active,
  defaultActive = false,
  typing = false,
  disabled = false,
  confirmIconSrc = DEFAULT_CONFIRM,
  cancelIconSrc = DEFAULT_CANCEL,
  onConfirm,
  onCancel,
  inputProps,
}: InlineEditProps) {
  const [internalActive, setInternalActive] = useState(defaultActive);
  const [draft, setDraft] = useState(defaultValue);
  const isActive = active ?? internalActive;

  const hostClass = [
    'ds-inline-edit-host',
    isActive ? 'ds-inline-edit-host--active' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inputClass = [
    'ds-inline-edit__input',
    typing ? 'ds-inline-edit__input--typing' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleConfirm = () => {
    onConfirm?.(draft);
    if (active === undefined) setInternalActive(false);
  };

  const handleCancel = () => {
    onCancel?.();
    if (active === undefined) setInternalActive(false);
  };

  if (!isActive) {
    return (
      <div className={hostClass}>
        <span className="ds-inline-edit ds-inline-edit--default">{draft}</span>
      </div>
    );
  }

  return (
    <div className={hostClass}>
      <div className="ds-inline-edit">
        <input
          type="text"
          className={inputClass}
          value={value ?? draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={disabled}
          aria-label="Nilai inline edit"
          {...inputProps}
        />
        <div className="ds-inline-edit__actions">
          <button
            type="button"
            className="ds-inline-edit-btn ds-inline-edit-btn--confirm"
            aria-label="Simpan perubahan"
            onClick={handleConfirm}
          >
            <img src={confirmIconSrc} alt="" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="ds-inline-edit-btn ds-inline-edit-btn--cancel"
            aria-label="Batalkan perubahan"
            onClick={handleCancel}
          >
            <img src={cancelIconSrc} alt="" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
