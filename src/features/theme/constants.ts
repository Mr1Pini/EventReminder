export const THEME_STORAGE_KEY = "theme";
export const DARK_COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

export const THEME_PREFERENCES = ["light", "dark", "system"] as const;
export const DEFAULT_THEME_PREFERENCE = "system";

/*
 * Виконується в <head> до першого малювання, тому не може імпортувати код застосунку:
 * це самостійний рядок. Логіка збігається з resolveTheme у utils.ts.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var p=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});var d=p==="dark"||(p!=="light"&&matchMedia(${JSON.stringify(DARK_COLOR_SCHEME_QUERY)}).matches);document.documentElement.dataset.theme=d?"dark":"light"}catch(e){}})()`;
