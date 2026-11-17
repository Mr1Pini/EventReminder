import {
  DARK_COLOR_SCHEME_QUERY,
  DEFAULT_THEME_PREFERENCE,
  THEME_PREFERENCES,
  THEME_STORAGE_KEY,
} from "@/features/theme/constants";

export type ThemePreference = (typeof THEME_PREFERENCES)[number];
export type ResolvedTheme = "light" | "dark";

function isThemePreference(value: unknown): value is ThemePreference {
  return THEME_PREFERENCES.some((preference) => preference === value);
}

// Запасне сховище на випадок, коли localStorage недоступний (приватний режим, заблоковані
// дані сайту): вибір діє до перезавантаження сторінки, просто не зберігається
let inMemoryPreference: ThemePreference = DEFAULT_THEME_PREFERENCE;

export function getStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : DEFAULT_THEME_PREFERENCE;
  } catch {
    return inMemoryPreference;
  }
}

export function storePreference(preference: ThemePreference): void {
  inMemoryPreference = preference;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Див. коментар до inMemoryPreference
  }
}

export function resolveTheme(
  preference: ThemePreference,
  prefersDark: boolean,
): ResolvedTheme {
  if (preference === "system") return prefersDark ? "dark" : "light";
  return preference;
}

export function applyTheme(preference: ThemePreference): void {
  const prefersDark = matchMedia(DARK_COLOR_SCHEME_QUERY).matches;
  document.documentElement.dataset.theme = resolveTheme(
    preference,
    prefersDark,
  );
}
