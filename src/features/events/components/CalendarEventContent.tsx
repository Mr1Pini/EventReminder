import { Check, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { IMPORTANCE_LABEL_KEYS } from "@/features/events/constants";
import type { EventDto, EventState } from "@/features/events/types";

interface CalendarEventContentProps {
  event: EventDto;
  state: EventState;
  timeText: string;
}

// Важливість і стан дублюємо текстом (підказка + прихований підпис), а не лише кольором
export function CalendarEventContent({
  event,
  state,
  timeText,
}: CalendarEventContentProps) {
  const t = useTranslations("events");
  const labels = [t(IMPORTANCE_LABEL_KEYS[event.importance])];
  if (state === "completed") labels.push(t("form.completed"));
  if (state === "overdue") labels.push(t("item.overdue"));
  const description = labels.join(", ");

  return (
    <span
      title={`${event.title} — ${description}`}
      className="flex min-w-0 items-center gap-1 px-1 py-0.5 text-xs"
    >
      {state === "completed" && (
        <Check aria-hidden="true" className="size-3 shrink-0" />
      )}
      {state === "overdue" && (
        <Clock aria-hidden="true" className="size-3 shrink-0" />
      )}
      {timeText && <span className="shrink-0 font-semibold">{timeText}</span>}
      <span className="truncate">{event.title}</span>
      <span className="sr-only">{description}</span>
    </span>
  );
}
