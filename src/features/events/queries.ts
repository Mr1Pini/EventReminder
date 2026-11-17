"use server";

import { PAGE_SIZE } from "@/features/events/constants";
import {
  eventsSearchParamsSchema,
  type EventsSearchParams,
} from "@/features/events/search-params";
import type { CalendarEvents, EventsPage } from "@/features/events/types";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { requireUserIdOrRedirect } from "@/lib/session";

const EVENT_SELECT = {
  id: true,
  title: true,
  description: true,
  startsAt: true,
  importance: true,
  isCompleted: true,
} satisfies Prisma.EventSelect;

function buildFiltersWhere(
  userId: string,
  { importance, status, q }: EventsSearchParams,
): Prisma.EventWhereInput {
  return {
    userId,
    importance,
    isCompleted: status === undefined ? undefined : status === "completed",
    OR: q
      ? [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ]
      : undefined,
  };
}

export async function getEventsPage(
  rawParams: EventsSearchParams,
): Promise<EventsPage> {
  const userId = await requireUserIdOrRedirect();
  const params = eventsSearchParamsSchema.parse(rawParams);
  const isUpcoming = params.tab === "upcoming";
  const now = new Date();
  const where: Prisma.EventWhereInput = {
    ...buildFiltersWhere(userId, params),
    startsAt: isUpcoming ? { gte: now } : { lt: now },
  };

  const totalCount = await prisma.event.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const page = Math.min(params.page, totalPages);
  const items = await prisma.event.findMany({
    where,
    orderBy: { startsAt: isUpcoming ? "asc" : "desc" },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: EVENT_SELECT,
  });

  return { items, now, page, totalCount, totalPages };
}

export async function getCalendarEvents(
  rawParams: EventsSearchParams,
): Promise<CalendarEvents> {
  const userId = await requireUserIdOrRedirect();
  const params = eventsSearchParamsSchema.parse(rawParams);

  const items = await prisma.event.findMany({
    where: buildFiltersWhere(userId, params),
    orderBy: { startsAt: "asc" },
    select: EVENT_SELECT,
  });

  return { items, now: new Date() };
}
