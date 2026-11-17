"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { useEventsSearchParams } from "@/features/events/hooks/events-search-params-context";

interface EventsPaginationProps {
  page: number;
  totalPages: number;
}

export function EventsPagination({ page, totalPages }: EventsPaginationProps) {
  const t = useTranslations("events");
  const { updateSearchParams } = useEventsSearchParams();

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label={t("pagination.label")}
      className="flex items-center justify-between gap-3"
    >
      <Button
        variant="secondary"
        disabled={page <= 1}
        onClick={() => updateSearchParams({ page: page - 1 })}
      >
        {t("pagination.previous")}
      </Button>
      <span className="text-sm text-muted">
        {t("pagination.page", { page, total: totalPages })}
      </span>
      <Button
        variant="secondary"
        disabled={page >= totalPages}
        onClick={() => updateSearchParams({ page: page + 1 })}
      >
        {t("pagination.next")}
      </Button>
    </nav>
  );
}
