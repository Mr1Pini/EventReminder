import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { EventDialogsProvider } from "@/features/events/components/EventDialogsProvider";
import { EventsCalendar } from "@/features/events/components/EventsCalendar";
import { EventsList } from "@/features/events/components/EventsList";
import { EventsToolbar } from "@/features/events/components/EventsToolbar";
import { EventsSearchParamsProvider } from "@/features/events/hooks/events-search-params-context";
import { getCalendarEvents, getEventsPage } from "@/features/events/queries";
import { parseEventsSearchParams } from "@/features/events/search-params";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("events");
  return { title: t("pageTitle") };
}

export default async function EventsPage({
  searchParams,
}: PageProps<"/events">) {
  const t = await getTranslations("events");
  const params = parseEventsSearchParams(await searchParams);
  const content =
    params.view === "calendar" ? (
      <EventsCalendar calendarEvents={await getCalendarEvents(params)} />
    ) : (
      <EventsList eventsPage={await getEventsPage(params)} />
    );

  return (
    <EventDialogsProvider>
      <EventsSearchParamsProvider>
        <h1 className="sr-only">{t("pageTitle")}</h1>
        <div className="flex flex-col gap-6">
          <EventsToolbar />
          {content}
        </div>
      </EventsSearchParamsProvider>
    </EventDialogsProvider>
  );
}
