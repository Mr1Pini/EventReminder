"use client";

import { useTranslations } from "next-intl";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { VIEW_OPTIONS } from "@/features/events/constants";
import { useEventsSearchParams } from "@/features/events/hooks/events-search-params-context";

export function ViewSwitcher() {
  const t = useTranslations("events");
  const { params, updateSearchParams } = useEventsSearchParams();

  return (
    <SegmentedControl
      name="view"
      aria-label={t("view.label")}
      value={params.view}
      options={VIEW_OPTIONS.map((option) => ({
        value: option.value,
        label: t(option.labelKey),
      }))}
      onChange={(view) => updateSearchParams({ view })}
    />
  );
}
