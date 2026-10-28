import { AA_LARGE_OR_UI, AA_TEXT, contrastRatio } from "./contrast";
import { accent, controlBorder, palette, signal } from "./brand-tokens";

export type ContrastKind = "text" | "ui" | "decorative";

export interface ContrastPair {
  name: string;
  fg: string;
  bg: string;
  kind: ContrastKind;
}

/**
 * Every foreground/background combination the interface actually uses.
 * `decorative` pairs (hairline borders, separators) are exempt from WCAG 1.4.11
 * and are listed for transparency only.
 */
export const contrastPairs: ContrastPair[] = [
  { name: "Body text on Obsidian", fg: palette.paper, bg: palette.obsidian, kind: "text" },
  { name: "Body text on Graphite (cards)", fg: palette.paper, bg: palette.graphite, kind: "text" },
  { name: "Body text on Elevated", fg: palette.paper, bg: palette.elevated, kind: "text" },
  { name: "Muted text on Obsidian", fg: palette.muted, bg: palette.obsidian, kind: "text" },
  { name: "Muted text on Graphite", fg: palette.muted, bg: palette.graphite, kind: "text" },
  { name: "Muted text on Elevated", fg: palette.muted, bg: palette.elevated, kind: "text" },
  {
    name: "Violet text (Preview) on Obsidian",
    fg: accent.violet,
    bg: palette.obsidian,
    kind: "text",
  },
  {
    name: "Violet text (Preview) on Graphite",
    fg: accent.violet,
    bg: palette.graphite,
    kind: "text",
  },
  { name: "Ice text (Testing) on Obsidian", fg: accent.ice, bg: palette.obsidian, kind: "text" },
  {
    name: "Silver text (In development) on Graphite",
    fg: accent.silver,
    bg: palette.graphite,
    kind: "text",
  },
  { name: "Live green on Graphite", fg: signal.success, bg: palette.graphite, kind: "text" },
  { name: "Warning amber on Graphite", fg: signal.warning, bg: palette.graphite, kind: "text" },
  { name: "Error red on Graphite", fg: signal.error, bg: palette.graphite, kind: "text" },
  {
    name: "Primary button label on gradient (silver stop)",
    fg: palette.obsidian,
    bg: accent.silver,
    kind: "text",
  },
  {
    name: "Primary button label on gradient (violet stop)",
    fg: palette.obsidian,
    bg: accent.violet,
    kind: "text",
  },
  {
    name: "Primary button label on gradient (ice stop)",
    fg: palette.obsidian,
    bg: accent.ice,
    kind: "text",
  },
  { name: "Focus ring (violet) on Obsidian", fg: accent.violet, bg: palette.obsidian, kind: "ui" },
  { name: "Focus ring (violet) on Graphite", fg: accent.violet, bg: palette.graphite, kind: "ui" },
  { name: "Control border on Obsidian", fg: controlBorder, bg: palette.obsidian, kind: "ui" },
  { name: "Control border on Graphite", fg: controlBorder, bg: palette.graphite, kind: "ui" },
  {
    name: "Hairline border on Obsidian",
    fg: palette.border,
    bg: palette.obsidian,
    kind: "decorative",
  },
];

export function evaluatePair(pair: ContrastPair) {
  const ratio = contrastRatio(pair.fg, pair.bg);
  const required = pair.kind === "text" ? AA_TEXT : AA_LARGE_OR_UI;
  return {
    ratio,
    required,
    pass: pair.kind === "decorative" ? null : ratio >= required,
  };
}
