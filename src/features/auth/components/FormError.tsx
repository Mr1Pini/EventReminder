import { useTranslations } from "next-intl";
import type { ErrorKey } from "@/lib/action-result";

interface FormErrorProps {
  errorKey?: ErrorKey;
}

export function FormError({ errorKey }: FormErrorProps) {
  const t = useTranslations();

  if (!errorKey) return null;

  return (
    <p
      role="alert"
      className="rounded-lg bg-importance-critical-soft px-3 py-2 text-sm text-importance-critical-text"
    >
      {t(errorKey)}
    </p>
  );
}
