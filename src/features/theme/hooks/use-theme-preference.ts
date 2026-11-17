import { useCallback, useLayoutEffect, useSyncExternalStore } from "react";
import {
  DARK_COLOR_SCHEME_QUERY,
  DEFAULT_THEME_PREFERENCE,
} from "@/features/theme/constants";
import {
  applyTheme,
  getStoredPreference,
  storePreference,
  type ThemePreference,
} from "@/features/theme/utils";

const sameTabListeners = new Set<() => void>();

// `storage` повідомляє про зміну в інших вкладках, а власний набір — про зміну в цій
function subscribe(onChange: () => void): () => void {
  sameTabListeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    sameTabListeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useThemePreference(): {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
} {
  const preference = useSyncExternalStore<ThemePreference>(
    subscribe,
    getStoredPreference,
    () => DEFAULT_THEME_PREFERENCE,
  );

  const setPreference = useCallback((next: ThemePreference) => {
    storePreference(next);
    applyTheme(next);
    sameTabListeners.forEach((notify) => notify());
  }, []);

  // Перезастосовуємо тему до малювання: у dev Strict Mode після ремонтування стирає
  // атрибут, який виставив inline-скрипт. Для «Системної» ще й слідкуємо за змінами ОС.
  // Читаємо збережене значення, а не `preference`: під час гідратації воно ще серверне
  // («system»), і тема на мить блимнула б кольором ОС замість обраного користувачем
  useLayoutEffect(() => {
    const current = getStoredPreference();
    applyTheme(current);
    if (current !== "system") return;

    const query = matchMedia(DARK_COLOR_SCHEME_QUERY);
    const handleChange = () => applyTheme("system");
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, [preference]);

  return { preference, setPreference };
}
