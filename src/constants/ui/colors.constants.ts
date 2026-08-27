/**
 * Color Design Tokens
 * Standardized according to docs/COLOR_SYSTEM.md
 */

export const COLOR_TOKENS = {
  light: {
    background: "#F7F8F6",
    surface: "#FFFFFF",
    secondary: "#F1F3F1",
    text: "#0A0D0C",
    secondaryText: "#4E5653",
    border: "rgba(10, 13, 12, 0.08)",
  },
  dark: {
    background: "#050607",
    surface: "#0A0D0F",
    secondary: "#0E1214",
    text: "#F5F7F6",
    secondaryText: "#8E9995",
    border: "#26292E",
  },
  accent: {
    emeraldCyan: "#189890",
    deepEmerald: "#0C5F5A",
    soft: "#D9F1EE",
  },
} as const;
