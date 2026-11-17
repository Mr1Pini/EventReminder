import { clsx } from "clsx";
import type { ComponentProps } from "react";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={clsx(
        "min-h-24 w-full resize-y rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground",
        "placeholder:text-muted",
        "focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-primary/30",
        "aria-invalid:border-danger",
        className,
      )}
      {...props}
    />
  );
}
