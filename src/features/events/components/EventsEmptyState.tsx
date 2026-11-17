"use client";

import { CalendarPlus, SearchX } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useEventDialogs } from "@/features/events/components/EventDialogsProvider";
import { useEventsSearchParams } from "@/features/events/hooks/events-search-params-context";

export function EventsEmptyState() {
  const t = useTranslations("events");
  const { params, hasActiveFilters, resetFilters } = useEventsSearchParams();
  const { openCreate } = useEventDialogs();

  if (hasActiveFilters) {
    return (
      <EmptyState
        icon={<SearchX aria-hidden="true" className="size-10" />}
        title={t("empty.noResultsTitle")}
        description={t("empty.noResultsDescription")}
        action={
          <Button variant="secondary" onClick={resetFilters}>
            {t("empty.resetFilters")}
          </Button>
        }
      />
    );
  }

  return (
    <EmptyState
      icon={<CalendarPlus aria-hidden="true" className="size-10" />}
      title={
        params.tab === "upcoming"
          ? t("empty.noUpcomingTitle")
          : t("empty.noPastTitle")
      }
      description={t("empty.description")}
      action={<Button onClick={() => openCreate()}>{t("empty.create")}</Button>}
    />
  );
}
