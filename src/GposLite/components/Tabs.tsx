import { useState, type ButtonHTMLAttributes } from 'react';

export interface TabItem {
  id: string;
  label: string;
  required?: boolean;
  notification?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  selectedId?: string;
  defaultSelectedId?: string;
  track?: boolean;
  ariaLabel?: string;
  onTabChange?: (id: string) => void;
  tabProps?: Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'role' | 'type' | 'className'
  >;
}

export function Tabs({
  tabs,
  selectedId,
  defaultSelectedId,
  track = true,
  ariaLabel = 'Tabs',
  onTabChange,
  tabProps,
}: TabsProps) {
  const [internalId, setInternalId] = useState(
    defaultSelectedId ?? tabs[0]?.id ?? '',
  );
  const activeId = selectedId ?? internalId;

  const tablistClass = ['ds-tablist', track ? 'ds-tablist--track' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={tablistClass}
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map((tab) => {
        const selected = tab.id === activeId;
        const tabClass = [
          'ds-tab',
          selected ? 'ds-tab--selected' : '',
          tab.required ? 'ds-tab--required' : '',
          tab.notification ? 'ds-tab--notification' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={tab.id}
            type="button"
            className={tabClass}
            role="tab"
            aria-selected={selected}
            onClick={() => {
              if (selectedId === undefined) setInternalId(tab.id);
              onTabChange?.(tab.id);
            }}
            {...tabProps}
          >
            <span className="ds-tab__label">{tab.label}</span>
            <span className="ds-tab__indicator" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
