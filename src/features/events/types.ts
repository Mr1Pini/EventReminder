import type { Importance } from "@/generated/prisma/enums";

export interface EventDto {
  id: string;
  title: string;
  description: string | null;
  startsAt: Date;
  importance: Importance;
  isCompleted: boolean;
}

export interface EventsPage {
  items: EventDto[];
  // Момент, відносно якого сервер розділив події на майбутні й минулі
  now: Date;
  page: number;
  totalCount: number;
  totalPages: number;
}

export type EventState = "completed" | "overdue" | "upcoming";

export interface EventsDayGroup {
  dayKey: string;
  date: Date;
  events: EventDto[];
}
