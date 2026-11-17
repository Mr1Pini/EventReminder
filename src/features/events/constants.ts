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
  },
  [Importance.IMPORTANT]: {
    badge: "bg-importance-important-soft text-importance-important-text",
    accent: "bg-importance-important",
  },
  [Importance.CRITICAL]: {
    badge: "bg-importance-critical-soft text-importance-critical-text",
    accent: "bg-importance-critical",
  },
} as const satisfies Record<Importance, { badge: string; accent: string }>;
