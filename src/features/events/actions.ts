"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  eventIdSchema,
  eventPayloadSchema,
  type EventPayload,
} from "@/features/events/schemas";
import type { ActionResult } from "@/lib/action-result";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/session";

const EVENTS_PATH = "/events";

const SUCCESS: ActionResult = { success: true, data: undefined };
const INVALID_INPUT: ActionResult = {
  success: false,
  errorKey: "errors.invalidInput",
};
const NOT_FOUND: ActionResult = {
  success: false,
  errorKey: "errors.eventNotFound",
};

function finishMutation(affectedCount: number): ActionResult {
  if (affectedCount === 0) return NOT_FOUND;
  revalidatePath(EVENTS_PATH);
  return SUCCESS;
}

export async function createEvent(
  payload: EventPayload,
): Promise<ActionResult> {
  const userResult = await requireUserId();
  if (!userResult.success) return userResult;

  const parsed = eventPayloadSchema.safeParse(payload);
  if (!parsed.success) return INVALID_INPUT;

  await prisma.event.create({
    data: {
      ...parsed.data,
      startsAt: new Date(parsed.data.startsAt),
      userId: userResult.data,
    },
    select: { id: true },
  });

  revalidatePath(EVENTS_PATH);
  return SUCCESS;
}

export async function updateEvent(
  id: string,
  payload: EventPayload,
): Promise<ActionResult> {
  const userResult = await requireUserId();
  if (!userResult.success) return userResult;

  const parsedId = eventIdSchema.safeParse(id);
  const parsed = eventPayloadSchema.safeParse(payload);
  if (!parsedId.success || !parsed.success) return INVALID_INPUT;

  const { count } = await prisma.event.updateMany({
    where: { id: parsedId.data, userId: userResult.data },
    data: { ...parsed.data, startsAt: new Date(parsed.data.startsAt) },
  });

  return finishMutation(count);
}

export async function deleteEvent(id: string): Promise<ActionResult> {
  const userResult = await requireUserId();
  if (!userResult.success) return userResult;

  const parsedId = eventIdSchema.safeParse(id);
  if (!parsedId.success) return INVALID_INPUT;

  const { count } = await prisma.event.deleteMany({
    where: { id: parsedId.data, userId: userResult.data },
  });

  return finishMutation(count);
}

export async function setEventCompleted(
  id: string,
  isCompleted: boolean,
): Promise<ActionResult> {
  const userResult = await requireUserId();
  if (!userResult.success) return userResult;

  const parsedId = eventIdSchema.safeParse(id);
  const parsedFlag = z.boolean().safeParse(isCompleted);
  if (!parsedId.success || !parsedFlag.success) return INVALID_INPUT;

  const { count } = await prisma.event.updateMany({
    where: { id: parsedId.data, userId: userResult.data },
    data: { isCompleted: parsedFlag.data },
  });

  return finishMutation(count);
}
