"use client";

import { useTranslations } from "next-intl";
import { Dialog } from "@/components/ui/Dialog";
import { EventForm } from "@/features/events/components/EventForm";
import type { EventDto } from "@/features/events/types";

interface EventFormDialogProps {
  event: EventDto | null;
  initialStartsAt: Date;
  onClose: () => void;
  onDelete: (event: EventDto) => void;
  onCloseAutoFocus: (event: Event) => void;
}

export function EventFormDialog({
  event,
  initialStartsAt,
  onClose,
  onDelete,
  onCloseAutoFocus,
}: EventFormDialogProps) {
  const t = useTranslations("events");

  return (
    <Dialog
      open
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      title={event ? t("editEvent") : t("newEvent")}
      onCloseAutoFocus={onCloseAutoFocus}
    >
      <EventForm
        event={event}
        initialStartsAt={initialStartsAt}
        onSaved={onClose}
        onDelete={onDelete}
        onCancel={onClose}
      />
    </Dialog>
  );
}
