"use client";

import { clsx } from "clsx";
import { useTranslations } from "next-intl";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { EventsEmptyState } from "@/features/events/components/EventsEmptyState";
import { EventsGroups } from "@/features/events/components/EventsGroups";
import { EventsListSkeleton } from "@/features/events/components/EventsListSkeleton";
import { EventsPagination } from "@/features/events/components/EventsPagination";
import { TAB_OPTIONS } from "@/features/events/constants";
import { useEventsSearchParams } from "@/features/events/hooks/events-search-params-context";
import type { EventsPage } from "@/features/events/types";
import { useHasMounted } from "@/hooks/use-has-mounted";

interface EventsListProps {
  eventsPage: EventsPage;
}

export function EventsList({ eventsPage }: EventsListProps) {
  const t = useTranslations("events");
  const { params, isPending, updateSearchParams } = useEventsSearchParams();
  // Дати групуються за локальним часовим поясом, тому до монтування показуємо skeleton
  const hasMounted = useHasMounted();
  const { items, now, page, totalPages } = eventsPage;

  function renderContent() {
    if (!hasMounted) return <EventsListSkeleton />;
    if (items.length === 0) return <EventsEmptyState />;
    return <EventsGroups events={items} now={now} />;
  }

  return (
    <section
      aria-busy={isPending}
      className={clsx(
        "flex flex-col gap-6 transition-opacity",
        isPending && "opacity-60",
      )}
    >
      <SegmentedControl
        name="tab"
        aria-label={t("tabs.label")}
        value={params.tab}
        options={TAB_OPTIONS.map((option) => ({
          value: option.value,
          label: t(option.labelKey),
        }))}
        onChange={(tab) => updateSearchParams({ tab })}
      />
      {renderContent()}
      <EventsPagination page={page} totalPages={totalPages} />
    </section>
  );
}
