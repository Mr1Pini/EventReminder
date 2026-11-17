import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import {
  IMPORTANCE_LABEL_KEYS,
  IMPORTANCE_STYLES,
} from "@/features/events/constants";
import type { Importance } from "@/generated/prisma/enums";

interface ImportanceBadgeProps {
  importance: Importance;
}

export function ImportanceBadge({ importance }: ImportanceBadgeProps) {
  const t = useTranslations("events");

  return (
    <Badge className={IMPORTANCE_STYLES[importance].badge}>
      {t(IMPORTANCE_LABEL_KEYS[importance])}
    </Badge>
  );
}
