"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Textarea } from "@/components/ui/Textarea";
import { createEvent, updateEvent } from "@/features/events/actions";
import { EventFormActions } from "@/features/events/components/EventFormActions";
import { IMPORTANCE_LABEL_KEYS } from "@/features/events/constants";
import {
  eventFormSchema,
  type EventFormValues,
} from "@/features/events/schemas";
import type { EventDto } from "@/features/events/types";
import {
  getNewEventFormValues,
  toEventFormValues,
  toEventPayload,
} from "@/features/events/utils";
import { Importance } from "@/generated/prisma/enums";
import { useErrorToast } from "@/hooks/use-error-toast";
import { useValidationMessage } from "@/hooks/use-validation-message";

interface EventFormProps {
  event: EventDto | null;
  initialStartsAt: Date;
  onSaved: () => void;
  onCancel: () => void;
  onDelete: (event: EventDto) => void;
}

export function EventForm({
  event,
  initialStartsAt,
  onSaved,
  onCancel,
  onDelete,
}: EventFormProps) {
  const t = useTranslations("events");
  const showErrorToast = useErrorToast();
  const getValidationMessage = useValidationMessage();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event
      ? toEventFormValues(event)
      : getNewEventFormValues(initialStartsAt),
  });

  const importanceOptions = Object.values(Importance).map((value) => ({
    value,
    label: t(IMPORTANCE_LABEL_KEYS[value]),
  }));

  async function handleSave(values: EventFormValues) {
    const payload = toEventPayload(values);
    const result = event
      ? await updateEvent(event.id, payload)
      : await createEvent(payload);

    if (!result.success) {
      showErrorToast(result.errorKey);
      return;
    }
    toast.success(t(event ? "toast.updated" : "toast.created"));
    onSaved();
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleSave)}
      className="flex flex-col gap-4"
    >
      <Field
        id="title"
        label={t("form.title")}
        error={getValidationMessage(errors.title?.message)}
      >
        {(controlProps) => (
          <Input {...controlProps} {...register("title")} autoComplete="off" />
        )}
      </Field>
      <Field
        id="startsAt"
        label={t("form.startsAt")}
        error={getValidationMessage(errors.startsAt?.message)}
      >
        {(controlProps) => (
          <Input
            {...controlProps}
            {...register("startsAt")}
            type="datetime-local"
          />
        )}
      </Field>
      <div className="flex flex-col gap-1.5">
        <span id="importance-label" className="text-sm font-medium">
          {t("form.importance")}
        </span>
        <Controller
          control={control}
          name="importance"
          render={({ field }) => (
            <SegmentedControl
              name="importance"
              aria-labelledby="importance-label"
              value={field.value}
              options={importanceOptions}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <Field
        id="description"
        label={t("form.description")}
        error={getValidationMessage(errors.description?.message)}
      >
        {(controlProps) => (
          <Textarea {...controlProps} {...register("description")} />
        )}
      </Field>
      {event && (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            {...register("isCompleted")}
            className="size-4 accent-primary-strong"
          />
          {t("form.completed")}
        </label>
      )}
      <EventFormActions
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        onDelete={event ? () => onDelete(event) : undefined}
      />
    </form>
  );
}
