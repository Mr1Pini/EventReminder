import { Importance } from "@/generated/prisma/enums";

export const PAGE_SIZE = 10;
export const SEARCH_DEBOUNCE_MS = 300;
export const TITLE_MAX_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 1000;
export const SEARCH_MAX_LENGTH = 100;

export const ALL_OPTION = "all";

export const EVENT_STATUSES = ["active", "completed"] as const;
export const EVENT_TABS = ["upcoming", "past"] as const;
export const DEFAULT_TAB = "upcoming";
export const EVENT_VIEWS = ["calendar", "list"] as const;
export const DEFAULT_VIEW = "calendar";

// Подію, створену кліком по дню в місячному/річному режимі, ставимо на ранок
export const DEFAULT_EVENT_HOUR = 9;
export const MOBILE_BREAKPOINT_PX = 768;
// Фіксована висота календаря збігається зі skeleton (h-180), щоб сторінка не «стрибала»
export const CALENDAR_HEIGHT_PX = 720;

export const VIEW_OPTIONS = [
  { value: "calendar", labelKey: "view.calendar" },
  { value: "list", labelKey: "view.list" },
] as const;

export const IMPORTANCE_LABEL_KEYS = {
  [Importance.NORMAL]: "importance.normal",
  [Importance.IMPORTANT]: "importance.important",
  [Importance.CRITICAL]: "importance.critical",
} as const;

export const IMPORTANCE_FILTER_OPTIONS = [
  { value: ALL_OPTION, labelKey: "filters.all" },
  { value: Importance.NORMAL, labelKey: "filters.normal" },
  { value: Importance.IMPORTANT, labelKey: "filters.important" },
  { value: Importance.CRITICAL, labelKey: "filters.critical" },
] as const;

export const STATUS_FILTER_OPTIONS = [
  { value: ALL_OPTION, labelKey: "filters.all" },
  { value: "active", labelKey: "filters.active" },
  { value: "completed", labelKey: "filters.completed" },
] as const;

export const TAB_OPTIONS = [
  { value: "upcoming", labelKey: "tabs.upcoming" },
  { value: "past", labelKey: "tabs.past" },
] as const;

// Повні назви класів, щоб Tailwind їх бачив; важливість додатково позначається текстом
export const IMPORTANCE_STYLES = {
  [Importance.NORMAL]: {
    badge: "bg-importance-normal-soft text-importance-normal-text",
    accent: "bg-importance-normal",
    border: "border-importance-normal",
  },
  [Importance.IMPORTANT]: {
    badge: "bg-importance-important-soft text-importance-important-text",
    accent: "bg-importance-important",
    border: "border-importance-important",
  },
  [Importance.CRITICAL]: {
    badge: "bg-importance-critical-soft text-importance-critical-text",
    accent: "bg-importance-critical",
    border: "border-importance-critical",
  },
} as const satisfies Record<
  Importance,
  { badge: string; accent: string; border: string }
>;

// Подія в календарі: м'яка заливка за важливістю, темніший текст і ліва смужка
export const CALENDAR_EVENT_BASE_CLASS = "border-0 border-l-4 rounded-md";
// Виконану приглушуємо нейтральними токенами, а не opacity: прозорість опускає контраст нижче AA
export const CALENDAR_EVENT_COMPLETED_CLASS =
  "bg-background text-muted line-through";
