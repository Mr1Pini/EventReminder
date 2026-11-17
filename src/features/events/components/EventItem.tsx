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
import { formatTime } from "@/lib/date";

interface EventItemProps {
  event: EventDto;
  now: Date;
}

export function EventItem({ event, now }: EventItemProps) {
  const t = useTranslations("events");
  const tRoot = useTranslations();
  const { openEdit } = useEventDialogs();
  const [isPending, startTransition] = useTransition();
  const state = getEventState(event, now);
  const isCompleted = state === "completed";

  function handleToggleCompleted(nextIsCompleted: boolean) {
    startTransition(async () => {
      const result = await setEventCompleted(event.id, nextIsCompleted);
      if (!result.success) toast.error(tRoot(result.errorKey));
      else toast.success(t("toast.statusUpdated"));
    });
  }

  return (
    <li className="flex items-start gap-3 rounded-xl border border-border bg-surface p-3">
      <input
        type="checkbox"
        checked={isCompleted}
        disabled={isPending}
        onChange={(changeEvent) =>
          handleToggleCompleted(changeEvent.target.checked)
        }
        aria-label={t("item.toggleCompleted", { title: event.title })}
        className="mt-1 size-4 shrink-0 accent-primary-strong"
      />
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
        className={clsx(
          "flex min-w-0 flex-1 flex-col gap-1 rounded text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          isCompleted && "opacity-60",
        )}
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
            "font-medium break-words text-foreground",
            isCompleted && "line-through",
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
