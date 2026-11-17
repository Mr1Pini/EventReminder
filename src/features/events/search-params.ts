import { z } from "zod";
import {
  DEFAULT_TAB,
  DEFAULT_VIEW,
  EVENT_STATUSES,
  EVENT_TABS,
  EVENT_VIEWS,
  SEARCH_MAX_LENGTH,
} from "@/features/events/constants";
import { Importance } from "@/generated/prisma/enums";

// Невалідні значення мовчки замінюються на типові
export const eventsSearchParamsSchema = z.object({
  view: z.enum(EVENT_VIEWS).catch(DEFAULT_VIEW),
  importance: z.enum(Importance).optional().catch(undefined),
  status: z.enum(EVENT_STATUSES).optional().catch(undefined),
  q: z
    .string()
    .transform((value) => value.trim().slice(0, SEARCH_MAX_LENGTH))
    .catch(""),
  tab: z.enum(EVENT_TABS).catch(DEFAULT_TAB),
  page: z.coerce.number().int().min(1).catch(1),
});

export type EventsSearchParams = z.infer<typeof eventsSearchParamsSchema>;

export function parseEventsSearchParams(
  rawParams: Record<string, string | string[] | undefined>,
): EventsSearchParams {
  return eventsSearchParamsSchema.parse(rawParams);
}
