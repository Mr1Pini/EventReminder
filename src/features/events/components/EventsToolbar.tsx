"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useEventDialogs } from "@/features/events/components/EventDialogsProvider";
import { EventsSearchInput } from "@/features/events/components/EventsSearchInput";
import { ViewSwitcher } from "@/features/events/components/ViewSwitcher";
import {
  ALL_OPTION,
  IMPORTANCE_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
} from "@/features/events/constants";
import { useEventsSearchParams } from "@/features/events/hooks/events-search-params-context";

export function EventsToolbar() {
  const t = useTranslations("events");
  const { params, updateSearchParams } = useEventsSearchParams();
  const { openCreate } = useEventDialogs();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <ViewSwitcher />
        <Button onClick={() => openCreate()}>
          <Plus aria-hidden="true" className="size-4" />
          {t("newEvent")}
        </Button>
      </div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <EventsSearchInput />
        {/* На вузьких екранах фільтри прокручуються горизонтально, а не ламають розмітку */}
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
          <SegmentedControl
            name="importance"
            aria-label={t("filters.importanceLabel")}
            value={params.importance ?? ALL_OPTION}
            options={IMPORTANCE_FILTER_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.labelKey),
            }))}
            onChange={(importance) =>
              updateSearchParams({
                importance: importance === ALL_OPTION ? undefined : importance,
              })
            }
          />
          <SegmentedControl
            name="status"
            aria-label={t("filters.statusLabel")}
            value={params.status ?? ALL_OPTION}
            options={STATUS_FILTER_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.labelKey),
            }))}
            onChange={(status) =>
              updateSearchParams({
                status: status === ALL_OPTION ? undefined : status,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
