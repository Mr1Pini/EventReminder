import { clsx } from "clsx";
import { LoaderCircle } from "lucide-react";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <LoaderCircle
      aria-hidden="true"
      className={clsx("size-4 animate-spin", className)}
    />
  );
}
