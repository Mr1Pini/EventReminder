import { clsx } from "clsx";
import type { ComponentProps } from "react";
import { Spinner } from "./Spinner";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "md" | "icon";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-strong text-primary-foreground hover:bg-primary-strong-hover",
  secondary:
    "border border-border bg-surface text-foreground hover:bg-background",
  ghost: "text-muted hover:bg-background hover:text-foreground",
  danger: "bg-danger text-primary-foreground hover:bg-danger-hover",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "h-10 px-4 text-sm",
  icon: "size-10",
};

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

interface ButtonProps extends ComponentProps<"button">, ButtonStyleOptions {
  isLoading?: boolean;
}

/** Класи кнопки для елементів, що мають виглядати як кнопка, але є посиланням. */
export function getButtonClassName({
  variant = "primary",
  size = "md",
}: ButtonStyleOptions = {}): string {
  return clsx(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
    "focus-ring",
    "disabled:cursor-not-allowed disabled:opacity-60",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
  );
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={clsx(getButtonClassName({ variant, size }), className)}
      {...props}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
}
