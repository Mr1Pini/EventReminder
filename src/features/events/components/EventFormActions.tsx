import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

interface EventFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  // Передається лише під час редагування: у новій події видаляти ще нічого
  onDelete?: () => void;
}

export function EventFormActions({
  isSubmitting,
  onCancel,
  onDelete,
}: EventFormActionsProps) {
  const t = useTranslations("events.form");

  return (
    <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
      {onDelete && (
        <Button variant="danger" onClick={onDelete} className="mr-auto">
          {t("delete")}
        </Button>
      )}
      <Button variant="secondary" onClick={onCancel}>
        {t("cancel")}
      </Button>
      <Button type="submit" isLoading={isSubmitting}>
        {t("save")}
      </Button>
    </div>
  );
}
