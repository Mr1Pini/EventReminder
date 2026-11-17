"use client";

import { TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function EventsError({ retry }: { retry: () => void }) {
  const t = useTranslations("common");

  return (
    <EmptyState
      icon={<TriangleAlert aria-hidden="true" className="size-10" />}
      title={t("errorTitle")}
      description={t("errorDescription")}
      action={<Button onClick={() => retry()}>{t("retry")}</Button>}
    />
  );
}
