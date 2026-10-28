import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { accent, accentGradient, controlBorder, palette, signal } from "@/lib/brand-tokens";
import { contrastRatio } from "@/lib/contrast";
import { contrastPairs, evaluatePair } from "@/lib/contrast-pairs";

const css = readFileSync(path.resolve(__dirname, "../styles.css"), "utf8");

/** Reads `--name: #hex;` from the :root block of styles.css. */
function cssToken(name: string): string {
  const match = css.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})\\s*;`));
  if (!match?.[1]) throw new Error(`Token ${name} not found in styles.css`);
  return match[1].toUpperCase();
}

describe("design tokens", () => {
  it("keeps styles.css in sync with brand-tokens.ts", () => {
    expect(cssToken("--obsidian")).toBe(palette.obsidian);
    expect(cssToken("--graphite")).toBe(palette.graphite);
    expect(cssToken("--elevated")).toBe(palette.elevated);
    expect(cssToken("--border")).toBe(palette.border);
    expect(cssToken("--muted-foreground")).toBe(palette.muted);
    expect(cssToken("--foreground")).toBe(palette.paper);
    expect(cssToken("--accent-a")).toBe(accent.silver);
    expect(cssToken("--accent-b")).toBe(accent.violet);
    expect(cssToken("--accent-c")).toBe(accent.ice);
    expect(cssToken("--control")).toBe(controlBorder);
    expect(cssToken("--success")).toBe(signal.success);
    expect(cssToken("--warning")).toBe(signal.warning);
    expect(cssToken("--error")).toBe(signal.error);
  });

  it("uses the blueprint accent gradient (110deg, #BFC4D0 0%, #8B7BFF 52%, #BCEBFF 100%)", () => {
    expect(accentGradient).toBe("linear-gradient(110deg, #BFC4D0 0%, #8B7BFF 52%, #BCEBFF 100%)");
    expect(css).toMatch(
      /110deg,\s*var\(--accent-a\) 0%,\s*var\(--accent-b\) 52%,\s*var\(--accent-c\) 100%/,
    );
  });

  it("self-hosts fonts with font-display: swap and no external font host", () => {
    expect(css).not.toMatch(/fonts\.(googleapis|gstatic)\.com/);
    expect(css.match(/font-display:\s*swap/g)?.length).toBeGreaterThanOrEqual(2);
    expect(css).toContain("/fonts/space-grotesk-latin-wght-normal.woff2");
    expect(css).toContain("/fonts/inter-latin-wght-normal.woff2");
  });

  it("defines eyebrow tracking between +0.16em and +0.18em", () => {
    expect(css).toMatch(/--tracking-eyebrow:\s*0\.18em/);
    expect(css).toMatch(/--tracking-meta:\s*0\.16em/);
    expect(css).toMatch(/--tracking-tight:\s*-0\.025em/);
  });
});

describe("WCAG AA contrast", () => {
  it("computes known reference ratios", () => {
    expect(contrastRatio("#FFFFFF", "#000000")).toBeCloseTo(21, 5);
    expect(contrastRatio("#777777", "#FFFFFF")).toBeCloseTo(4.48, 1);
  });

  it.each(contrastPairs.filter((p) => p.kind !== "decorative"))("$name meets AA", (pair) => {
    const { ratio, required, pass } = evaluatePair(pair);
    expect(pass, `${pair.fg} on ${pair.bg} is ${ratio.toFixed(2)}:1, needs ${required}:1`).toBe(
      true,
    );
  });
});
