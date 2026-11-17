import { z } from "zod";
import {
  DESCRIPTION_MAX_LENGTH,
  TITLE_MAX_LENGTH,
} from "@/features/events/constants";
import { Importance } from "@/generated/prisma/enums";

const titleSchema = z
  .string()
  .trim()
  .min(1, "validation.titleRequired")
  .max(TITLE_MAX_LENGTH, "validation.titleTooLong");

const descriptionSchema = z
  .string()
  .trim()
  .max(DESCRIPTION_MAX_LENGTH, "validation.descriptionTooLong");

export const eventFormSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  // Значення поля datetime-local: локальний час без часового поясу
  startsAt: z
    .string()
    .min(1, "validation.startsAtRequired")
    .refine((value) => !Number.isNaN(new Date(value).getTime()), {
      error: "validation.startsAtInvalid",
    }),
  importance: z.enum(Importance),
  isCompleted: z.boolean(),
});

export const eventPayloadSchema = z.object({
  title: titleSchema,
  description: descriptionSchema.nullable(),
  startsAt: z.iso.datetime(),
  importance: z.enum(Importance),
  isCompleted: z.boolean(),
});

export const eventIdSchema = z.string().min(1);

export type EventFormValues = z.infer<typeof eventFormSchema>;
export type EventPayload = z.infer<typeof eventPayloadSchema>;
