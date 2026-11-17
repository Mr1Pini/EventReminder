"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/Input";
import {
  SEARCH_DEBOUNCE_MS,
  SEARCH_MAX_LENGTH,
} from "@/features/events/constants";
import { useEventsSearchParams } from "@/features/events/hooks/events-search-params-context";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

export function EventsSearchInput() {
  const t = useTranslations("events");
  const { params, updateSearchParams } = useEventsSearchParams();
  const [value, setValue] = useState(params.q);
  const [lastSeenQuery, setLastSeenQuery] = useState(params.q);
  const debouncedValue = useDebouncedValue(value, SEARCH_DEBOUNCE_MS);
  const lastPushedQueryRef = useRef(params.q);

  // Поле синхронізуємо з URL лише при зовнішніх змінах (наприклад, «Скинути фільтри»),
  // інакше відповідь на власний debounce-запит затирала б символи, які користувач ще вводить
  if (params.q !== lastSeenQuery) {
    setLastSeenQuery(params.q);
    if (params.q !== debouncedValue) setValue(params.q);
  }

  useEffect(() => {
    if (debouncedValue === lastPushedQueryRef.current) return;
    lastPushedQueryRef.current = debouncedValue;
    // Збіг із URL означає, що запит уже застосовано (наприклад, після скидання фільтрів);
    // зайвий replace із застарілими параметрами міг би скасувати іншу зміну користувача
    const nextQuery = debouncedValue.trim();
    if (nextQuery !== params.q) updateSearchParams({ q: nextQuery });
  }, [debouncedValue, params.q, updateSearchParams]);

  return (
    <div className="relative flex-1">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
      />
      <Input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        maxLength={SEARCH_MAX_LENGTH}
        placeholder={t("search.placeholder")}
        aria-label={t("search.label")}
        className="pl-9"
      />
    </div>
  );
}
