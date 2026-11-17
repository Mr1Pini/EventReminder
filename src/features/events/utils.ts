import type { EventInput } from "@fullcalendar/react";
import { clsx } from "clsx";
import {
  CALENDAR_EVENT_BASE_CLASS,
  CALENDAR_EVENT_COMPLETED_CLASS,
  IMPORTANCE_STYLES,
} from "@/features/events/constants";
import type { EventFormValues, EventPayload } from "@/features/events/schemas";
import type {
  EventDto,
  EventsDayGroup,
  EventState,
} from "@/features/events/types";
import { Importance } from "@/generated/prisma/enums";
import { getDayKey, toDateTimeLocalValue } from "@/lib/date";

export function getEventState(event: EventDto, now: Date): EventState {
  if (event.isCompleted) return "completed";
  if (event.startsAt < now) return "overdue";
  return "upcoming";
}

/** Групує події за локальними днями; порядок подій і днів зберігається. */
export function groupEventsByDay(events: EventDto[]): EventsDayGroup[] {
  const groups = new Map<string, EventsDayGroup>();

  for (const event of events) {
    const dayKey = getDayKey(event.startsAt);
    const group = groups.get(dayKey);
    if (group) {
      group.events.push(event);
    } else {
      groups.set(dayKey, { dayKey, date: event.startsAt, events: [event] });
    }
  }

  return [...groups.values()];
}

export function toCalendarEvent(event: EventDto, now: Date): EventInput {
  const styles = IMPORTANCE_STYLES[event.importance];
  const isCompleted = getEventState(event, now) === "completed";

  return {
    id: event.id,
    title: event.title,
    start: event.startsAt,
    className: clsx(
      CALENDAR_EVENT_BASE_CLASS,
      styles.border,
      isCompleted ? CALENDAR_EVENT_COMPLETED_CLASS : styles.badge,
    ),
  };
}

export function toEventPayload(values: EventFormValues): EventPayload {
  return {
    title: values.title,
    description: values.description || null,
    startsAt: new Date(values.startsAt).toISOString(),
    importance: values.importance,
    isCompleted: values.isCompleted,
  };
}

export function toEventFormValues(event: EventDto): EventFormValues {
  return {
    title: event.title,
    description: event.description ?? "",
    startsAt: toDateTimeLocalValue(event.startsAt),
    importance: event.importance,
    isCompleted: event.isCompleted,
  };
}

export function getNewEventFormValues(startsAt: Date): EventFormValues {
  return {
    title: "",
    description: "",
    startsAt: toDateTimeLocalValue(startsAt),
    importance: Importance.NORMAL,
    isCompleted: false,
  };
}
