"use client";

import FullCalendar, {
  type DateClickInfo,
  type EventClickInfo,
  type EventDisplayInfo,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import ukLocale from "@fullcalendar/react/locales/uk";
import multiMonthPlugin from "@fullcalendar/react/multimonth";
import breezyThemePlugin from "@fullcalendar/react/themes/breezy";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { CalendarEventContent } from "@/features/events/components/CalendarEventContent";
import { useEventDialogs } from "@/features/events/components/EventDialogsProvider";
import {
  CALENDAR_HEIGHT_PX,
  DEFAULT_EVENT_HOUR,
  MOBILE_BREAKPOINT_PX,
} from "@/features/events/constants";
import type { CalendarEvents } from "@/features/events/types";
import { getEventState, toCalendarEvent } from "@/features/events/utils";
import { setStartOfHour } from "@/lib/date";
import "./events-calendar.css";

const PLUGINS = [
  breezyThemePlugin,
  dayGridPlugin,
  timeGridPlugin,
  multiMonthPlugin,
  interactionPlugin,
];

// Без явного формату FullCalendar скорочує «09:00» до «9», а список показує HH:mm
const TIME_FORMAT = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
} as const;

const HEADER_TOOLBAR = {
  start: "prev,next today",
  center: "title",
  end: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay",
};

interface EventsCalendarGridProps {
  calendarEvents: CalendarEvents;
}

export function EventsCalendarGrid({
  calendarEvents,
}: EventsCalendarGridProps) {
  const t = useTranslations("calendar");
  const { openCreate, openEdit } = useEventDialogs();
  const { items, now } = calendarEvents;
  // Компонент рендериться лише на клієнті (ssr: false), тому ширину вікна можна читати одразу
  const [initialView] = useState(() =>
    window.innerWidth < MOBILE_BREAKPOINT_PX ? "timeGridDay" : "dayGridMonth",
  );
  const eventsById = useMemo(
    () => new Map(items.map((event) => [event.id, event])),
    [items],
  );
  const events = useMemo(
    () => items.map((event) => toCalendarEvent(event, now)),
    [items, now],
  );

  function handleDateClick(info: DateClickInfo) {
    // Клік по дню (місяць/рік) не несе часу, тому ставимо типову годину; у тижні/дні — час слота
    openCreate(
      info.allDay ? setStartOfHour(info.date, DEFAULT_EVENT_HOUR) : info.date,
    );
  }

  function handleEventClick(info: EventClickInfo) {
    info.jsEvent.preventDefault();
    const event = eventsById.get(info.event.id);
    if (event) openEdit(event);
  }

  function renderEventContent(info: EventDisplayInfo) {
    const event = eventsById.get(info.event.id);
    if (!event) return null;
    return (
      <CalendarEventContent
        event={event}
        state={getEventState(event, now)}
        timeText={info.timeText}
      />
    );
  }

  return (
    <FullCalendar
      plugins={PLUGINS}
      locale={ukLocale}
      firstDay={1}
      timeZone="local"
      initialView={initialView}
      height={CALENDAR_HEIGHT_PX}
      headerToolbar={HEADER_TOOLBAR}
      buttons={{
        today: { text: t("today") },
        prev: { hint: t("previous") },
        next: { hint: t("next") },
        multiMonthYear: { text: t("year") },
        dayGridMonth: { text: t("month") },
        timeGridWeek: { text: t("week") },
        timeGridDay: { text: t("day") },
      }}
      // Тема робить кнопки 36–38 px; доводимо до зручної для дотику цілі 40 px
      buttonClass="min-h-10 min-w-10"
      events={events}
      eventDisplay="block"
      eventTimeFormat={TIME_FORMAT}
      slotHeaderFormat={TIME_FORMAT}
      eventContent={renderEventContent}
      dayMaxEvents
      nowIndicator
      allDaySlot={false}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
    />
  );
}
