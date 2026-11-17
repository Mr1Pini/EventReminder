import { addDays, addHours, format, isSameDay, startOfHour } from "date-fns";
import { uk } from "date-fns/locale/uk";

const DATE_TIME_LOCAL_FORMAT = "yyyy-MM-dd'T'HH:mm";
const DAY_KEY_FORMAT = "yyyy-MM-dd";
const TIME_FORMAT = "HH:mm";
const LONG_DATE_FORMAT = "EEEE, d MMMM";

export type RelativeDay = "today" | "tomorrow";

/** Значення для `<input type="datetime-local">` у локальному часовому поясі. */
export function toDateTimeLocalValue(date: Date): string {
  return format(date, DATE_TIME_LOCAL_FORMAT);
}

export function formatTime(date: Date): string {
  return format(date, TIME_FORMAT);
}

export function formatLongDate(date: Date): string {
  return format(date, LONG_DATE_FORMAT, { locale: uk });
}

/** Ключ календарного дня в локальному часовому поясі, для групування подій. */
export function getDayKey(date: Date): string {
  return format(date, DAY_KEY_FORMAT);
}

export function getRelativeDay(date: Date, now: Date): RelativeDay | null {
  if (isSameDay(date, now)) return "today";
  if (isSameDay(date, addDays(now, 1))) return "tomorrow";
  return null;
}

export function getNextFullHour(now: Date): Date {
  return addHours(startOfHour(now), 1);
}
