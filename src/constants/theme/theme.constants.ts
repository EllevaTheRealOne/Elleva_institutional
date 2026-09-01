export const THEME_STORAGE_KEY = "elleva-theme";

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

// The page is dark end to end, so the chrome that reads from the theme
// tokens — navbar, footer, borders — has to start dark as well.
export const DEFAULT_THEME = THEMES.DARK;
