"use client";

import { useTranslations } from "next-intl";
import { EventItem } from "@/features/events/components/EventItem";
import type { EventDto } from "@/features/events/types";
import { groupEventsByDay } from "@/features/events/utils";
import { formatLongDate, getRelativeDay } from "@/lib/date";

interface EventsGroupsProps {
  events: EventDto[];
  now: Date;
}

export function EventsGroups({ events, now }: EventsGroupsProps) {
  const t = useTranslations("events");
  const groups = groupEventsByDay(events);

  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => {
        const relativeDay = getRelativeDay(group.date, now);
        return (
          <section key={group.dayKey} className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-muted first-letter:uppercase">
              {relativeDay
                ? t(`day.${relativeDay}`)
                : formatLongDate(group.date)}
            </h2>
            <ul className="flex flex-col gap-2">
              {group.events.map((event) => (
                <EventItem key={event.id} event={event} now={now} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
