/**
 * Typography Tokens and Scales
 * Standardized according to docs/TYPOGRAPHY.md
 */

export const TYPOGRAPHY = {
  fontFamily: {
    display: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    body: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "JetBrains Mono, monospace",
    ui: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  roles: {
    display: "font-medium tracking-tight text-[clamp(42px,5.5vw,76px)] leading-[1.08]",
    headline: "font-medium tracking-tight text-[clamp(32px,3.8vw,48px)] leading-[1.15]",
    subheadline: "font-normal text-[clamp(20px,2.2vw,28px)] leading-[1.3]",
    body: "text-base md:text-lg font-normal leading-relaxed",
    ui: "text-xs md:text-sm font-medium tracking-wide",
    metrics: "font-medium tracking-tight text-[clamp(28px,3vw,44px)] font-mono",
    microcopy: "text-[10px] md:text-xs font-mono tracking-wider uppercase",
  },
} as const;
