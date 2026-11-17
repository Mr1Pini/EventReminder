"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useTransition,
  type ReactNode,
} from "react";
import { DEFAULT_TAB, DEFAULT_VIEW } from "@/features/events/constants";
import {
  parseEventsSearchParams,
  type EventsSearchParams,
} from "@/features/events/search-params";

type SearchParamsChanges = Partial<EventsSearchParams>;

interface EventsSearchParamsValue {
  params: EventsSearchParams;
  isPending: boolean;
  hasActiveFilters: boolean;
  updateSearchParams: (changes: SearchParamsChanges) => void;
  resetFilters: () => void;
}

const EventsSearchParamsContext = createContext<EventsSearchParamsValue | null>(
  null,
);

const DEFAULT_PARAM_VALUES: Record<keyof EventsSearchParams, unknown> = {
  view: DEFAULT_VIEW,
  importance: undefined,
  status: undefined,
  q: "",
  tab: DEFAULT_TAB,
  page: 1,
};

// Спільний стан переходу потрібен, щоб тулбар міг приглушити список під час оновлення
export function EventsSearchParamsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const params = useMemo(
    () => parseEventsSearchParams(Object.fromEntries(searchParams)),
    [searchParams],
  );

  const updateSearchParams = useCallback(
    (changes: SearchParamsChanges) => {
      const nextParams = new URLSearchParams(searchParams.toString());
      // Будь-яка зміна, окрім самої сторінки, повертає список на першу сторінку
      if (!("page" in changes)) nextParams.delete("page");

      for (const [key, value] of Object.entries(changes)) {
        const isDefault =
          value === undefined ||
          value === DEFAULT_PARAM_VALUES[key as keyof EventsSearchParams];
        if (isDefault) nextParams.delete(key);
        else nextParams.set(key, String(value));
      }

      const query = nextParams.toString();
      startTransition(() => {
        router.replace(query ? `${pathname}?${query}` : pathname);
      });
    },
    [pathname, router, searchParams],
  );

  const resetFilters = useCallback(
    () =>
      updateSearchParams({ importance: undefined, status: undefined, q: "" }),
    [updateSearchParams],
  );

  const value = useMemo(
    () => ({
      params,
      isPending,
      hasActiveFilters: Boolean(params.importance || params.status || params.q),
      updateSearchParams,
      resetFilters,
    }),
    [params, isPending, updateSearchParams, resetFilters],
  );

  return (
    <EventsSearchParamsContext value={value}>
      {children}
    </EventsSearchParamsContext>
  );
}

export function useEventsSearchParams(): EventsSearchParamsValue {
  const value = useContext(EventsSearchParamsContext);
  if (!value) {
    throw new Error(
      "useEventsSearchParams must be used within EventsSearchParamsProvider",
    );
  }
  return value;
}
