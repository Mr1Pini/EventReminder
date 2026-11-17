"use client";

import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { deleteEvent } from "@/features/events/actions";
import type { EventDto } from "@/features/events/types";
import { useErrorToast } from "@/hooks/use-error-toast";

interface DeleteEventDialogProps {
  event: EventDto;
  onClose: () => void;
  onCloseAutoFocus: (event: Event) => void;
}

export function DeleteEventDialog({
  event,
  onClose,
  onCloseAutoFocus,
}: DeleteEventDialogProps) {
  const t = useTranslations("events");
  const showErrorToast = useErrorToast();
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      const result = await deleteEvent(event.id);
      if (!result.success) {
        showErrorToast(result.errorKey);
        return;
      }
      toast.success(t("toast.deleted"));
      onClose();
    });
  }

  return (
    <Dialog
      open
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      title={t("delete.title")}
      description={t("delete.description", { title: event.title })}
      onCloseAutoFocus={onCloseAutoFocus}
    >
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          {t("form.cancel")}
        </Button>
        <Button variant="danger" isLoading={isPending} onClick={handleConfirm}>
          {t("delete.confirm")}
        </Button>
      </div>
    </Dialog>
  );
}
