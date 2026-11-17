import { clsx } from "clsx";
import type { ComponentProps } from "react";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={clsx(
        "h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-foreground",
        "placeholder:text-muted",
        "focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-primary/30",
        "aria-invalid:border-danger",
        className,
      )}
      {...props}
    />
  );
}
