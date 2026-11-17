import { clsx } from "clsx";
import type { ReactNode } from "react";

interface SegmentedOption<T extends string> {
  value: T;
  label: ReactNode;
  // Обов'язково для опцій, де label — лише іконка
  ariaLabel?: string;
}

interface SegmentedControlProps<T extends string> {
  name: string;
  value: T;
  options: readonly SegmentedOption<T>[];
  onChange: (value: T) => void;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

// Нативні radio дають клавіатурну навігацію стрілками й коректну семантику «з коробки»
export function SegmentedControl<T extends string>({
  name,
  value,
  options,
  onChange,
  ...ariaProps
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      className="inline-flex shrink-0 gap-1 rounded-lg border border-border bg-surface p-1"
      {...ariaProps}
    >
      {options.map((option) => (
        <label key={option.value} title={option.ariaLabel} className="relative">
          <input
            type="radio"
            name={name}
            value={option.value}
            aria-label={option.ariaLabel}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
            className="peer sr-only"
          />
          <span
            className={clsx(
              // Висота 40 px на мобільному — зручна ціль для дотику
              "flex min-h-10 cursor-pointer items-center rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors md:min-h-8",
              "hover:text-foreground",
              "peer-checked:bg-primary-strong peer-checked:text-primary-foreground",
              "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary",
            )}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
