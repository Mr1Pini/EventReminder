import { clsx } from "clsx";

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
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
      className="inline-flex flex-wrap gap-1 rounded-lg border border-border bg-surface p-1"
      {...ariaProps}
    >
      {options.map((option) => (
        <label key={option.value} className="relative">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
            className="peer sr-only"
          />
          <span
            className={clsx(
              "block cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium text-muted transition-colors",
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
