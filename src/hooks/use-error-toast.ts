import { useTranslations } from "next-intl";
import { toast } from "sonner";
import type { ErrorKey } from "@/lib/action-result";

/** Повертає функцію, що показує toast із перекладеним текстом помилки серверної дії. */
export function useErrorToast(): (errorKey: ErrorKey) => void {
  const t = useTranslations();

  return (errorKey) => {
    toast.error(t(errorKey));
  };
}
