/**
 * GRAVITAS v3 design tokens (Brand Blueprint, 28 Oct 2026, pages 6-7).
 *
 * `src/styles.css` is the runtime source of truth. These constants mirror it so
 * /design can render and verify every token; `design-tokens.test.ts` fails if the
 * two drift apart.
 */

export const palette = {
  obsidian: "#090909",
  black: "#000000",
  graphite: "#171717",
  elevated: "#202020",
  border: "#303030",
  muted: "#8B8B8B",
  paper: "#FFFFFF",
} as const;

export const accent = {
  silver: "#BFC4D0",
  violet: "#8B7BFF",
  ice: "#BCEBFF",
} as const;

/** The one gradient. A signal, never a theme or a card background. */
export const accentGradient = `linear-gradient(110deg, ${accent.silver} 0%, ${accent.violet} 52%, ${accent.ice} 100%)`;

export const signal = {
  success: "#4ADE9B",
  info: "#8B7BFF",
  warning: "#F5B14C",
  error: "#FF6B6B",
} as const;

/**
 * Hairline borders (#303030) are decorative. Form controls need a boundary that
 * reaches 3:1 (WCAG 1.4.11), so they use this token instead.
 */
export const controlBorder = "#6F6F6F";

export const spacing = [
  { name: "xs", px: 4 },
  { name: "sm", px: 8 },
  { name: "md", px: 12 },
  { name: "lg", px: 16 },
  { name: "xl", px: 24 },
  { name: "2xl", px: 32 },
  { name: "3xl", px: 48 },
  { name: "4xl", px: 64 },
] as const;

export const radii = [
  { name: "sm", px: 2 },
  { name: "md", px: 8 },
  { name: "lg", px: 16 },
  { name: "xl", px: 24 },
  { name: "full", px: 9999 },
] as const;

export const elevation = [
  { name: "xs", value: "0 1px 2px rgba(0,0,0,0.3)" },
  { name: "sm", value: "0 2px 4px rgba(0,0,0,0.4)" },
  { name: "md", value: "0 4px 12px rgba(0,0,0,0.5)" },
  { name: "lg", value: "0 8px 24px rgba(0,0,0,0.6)" },
] as const;

export const breakpoints = [
  { name: "xs", px: 480 },
  { name: "md", px: 768 },
  { name: "lg", px: 1024 },
  { name: "xl", px: 1280 },
] as const;

export const motion = [
  { name: "fast", ms: 150 },
  { name: "base", ms: 200 },
  { name: "slow", ms: 250 },
] as const;

export const tracking = {
  display: "-0.025em",
  eyebrow: "0.18em",
  meta: "0.16em",
} as const;
