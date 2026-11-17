"use client";

import { clsx } from "clsx";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";
import { useEventsSearchParams } from "@/features/events/hooks/events-search-params-context";
import type { CalendarEvents } from "@/features/events/types";

// Календар залежить від часового поясу браузера, тому рендеримо його лише на клієнті
const EventsCalendarGrid = dynamic(
  () =>
    import("@/features/events/components/EventsCalendarGrid").then(
      (module) => module.EventsCalendarGrid,
    ),
  { ssr: false, loading: () => <Skeleton className="h-180 w-full" /> },
);

interface EventsCalendarProps {
  calendarEvents: CalendarEvents;
}

export function EventsCalendar({ calendarEvents }: EventsCalendarProps) {
  const { isPending } = useEventsSearchParams();

  return (
    <section
      aria-busy={isPending}
      className={clsx("transition-opacity", isPending && "opacity-60")}
    >
      <EventsCalendarGrid calendarEvents={calendarEvents} />
    </section>
  );
}
