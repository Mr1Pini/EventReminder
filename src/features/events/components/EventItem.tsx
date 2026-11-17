"use client";

import { clsx } from "clsx";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { setEventCompleted } from "@/features/events/actions";
import { useEventDialogs } from "@/features/events/components/EventDialogsProvider";
import { ImportanceBadge } from "@/features/events/components/ImportanceBadge";
import { IMPORTANCE_STYLES } from "@/features/events/constants";
import type { EventDto } from "@/features/events/types";
import { getEventState } from "@/features/events/utils";
import { useErrorToast } from "@/hooks/use-error-toast";
import { formatTime } from "@/lib/date";

interface EventItemProps {
  event: EventDto;
  now: Date;
}

export function EventItem({ event, now }: EventItemProps) {
  const t = useTranslations("events");
  const showErrorToast = useErrorToast();
  const { openEdit } = useEventDialogs();
  const [isPending, startTransition] = useTransition();
  const state = getEventState(event, now);
  const isCompleted = state === "completed";

  function handleToggleCompleted(nextIsCompleted: boolean) {
    startTransition(async () => {
      const result = await setEventCompleted(event.id, nextIsCompleted);
      if (!result.success) showErrorToast(result.errorKey);
      else toast.success(t("toast.statusUpdated"));
    });
  }

  return (
    <li
      className={clsx(
        "flex items-start gap-3 rounded-xl border border-border p-3",
        isCompleted ? "bg-background" : "bg-surface",
      )}
    >
      {/* Обгортка збільшує зону дотику до 40 px, не змінюючи розмір самого чекбокса */}
      <label className="-m-2 flex size-10 shrink-0 cursor-pointer items-center justify-center">
        <input
          type="checkbox"
          checked={isCompleted}
          disabled={isPending}
          onChange={(changeEvent) =>
            handleToggleCompleted(changeEvent.target.checked)
          }
          aria-label={t("item.toggleCompleted", { title: event.title })}
          className="size-4 accent-primary-strong"
        />
      </label>
      <span
        aria-hidden="true"
        className={clsx(
          "w-1 self-stretch rounded-full",
          IMPORTANCE_STYLES[event.importance].accent,
        )}
      />
      <button
        type="button"
        onClick={() => openEdit(event)}
        className="flex min-w-0 flex-1 flex-col gap-1 rounded text-left focus-ring"
      >
        <span className="flex flex-wrap items-center gap-2">
          <time
            dateTime={event.startsAt.toISOString()}
            className="text-sm font-medium text-muted"
          >
            {formatTime(event.startsAt)}
          </time>
          <ImportanceBadge importance={event.importance} />
          {state === "overdue" && (
            <Badge className="bg-importance-critical-soft text-importance-critical-text">
              {t("item.overdue")}
            </Badge>
          )}
        </span>
        <span
          className={clsx(
            "font-medium break-words",
            // Приглушення токеном muted, а не opacity: так контраст лишається не нижче AA
            isCompleted ? "text-muted line-through" : "text-foreground",
          )}
        >
          {event.title}
        </span>
        {event.description && (
          <span className="line-clamp-2 text-sm break-words text-muted">
            {event.description}
          </span>
        )}
      </button>
    </li>
  );
}
