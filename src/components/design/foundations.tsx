import { useEffect, useState } from "react";

import { Emblem, Logo } from "@/components/brand/logo";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  accent,
  accentGradient,
  breakpoints,
  controlBorder,
  elevation,
  motion,
  palette,
  radii,
  signal,
  spacing,
  tracking,
} from "@/lib/brand-tokens";
import { contrastPairs, evaluatePair } from "@/lib/contrast-pairs";

import { Caption, Panel, Section, SubHeading } from "./primitives";

/* ---------------------------------- Logo ---------------------------------- */

export function LogoSection() {
  return (
    <Section
      id="logo"
      eyebrow="01 · Identity"
      title="Logo system"
      intro="A geometric G that reads as an open orbit: a thick arc, a hairline slit and one forward bar. It holds at 16px and works in flat colour without the gradient. Provisional vector interpretation of the design reference sheet."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel
          label="Primary horizontal (light)"
          className="flex items-center justify-center py-10 lg:col-span-2"
        >
          <Logo className="text-2xl" />
        </Panel>
        <Panel center label="Standalone emblem">
          <Logo variant="emblem" className="size-20" />
        </Panel>
        <Panel center label="Primary horizontal (white on black)" className="bg-black">
          <Logo className="text-xl" />
        </Panel>
        <div
          className="flex items-center justify-center rounded-lg bg-white px-5 py-10"
          role="group"
          aria-label="Black on white"
        >
          <Logo tone="dark" className="text-xl" />
        </div>
        <Panel center label="App icon">
          <Logo variant="app-icon" className="size-24" />
        </Panel>
        <Panel center label="Compact mobile lockup">
          <Logo variant="mobile" />
        </Panel>
        <Panel
          center
          label="Favicon scale · flat colour · 64 / 40 / 24 / 16"
          className="lg:col-span-2"
        >
          {[64, 40, 24, 16].map((px) => (
            <span key={px} className="flex flex-col items-center gap-2 text-foreground">
              <Emblem tone="mono" style={{ width: px, height: px }} />
              <span className="meta-label">{px}px</span>
            </span>
          ))}
        </Panel>
      </div>
      <p className="text-xs text-muted-foreground">
        Brand files: <code>/brand/gravitas-emblem.svg</code>, <code>/brand/favicon.svg</code>,{" "}
        <code>/brand/app-icon.svg</code>, <code>/brand/app-icon-maskable.svg</code>, PNG exports in{" "}
        <code>/icons</code>.
      </p>
    </Section>
  );
}

/* --------------------------------- Colour --------------------------------- */

const swatches: { name: string; hex: string; note?: string }[] = [
  { name: "Obsidian", hex: palette.obsidian, note: "page" },
  { name: "Black", hex: palette.black },
  { name: "Graphite", hex: palette.graphite, note: "cards" },
  { name: "Elevated", hex: palette.elevated },
  { name: "Border", hex: palette.border, note: "hairline" },
  { name: "Muted", hex: palette.muted, note: "secondary text" },
  { name: "Paper", hex: palette.paper, note: "text" },
];

const signals: { name: string; hex: string }[] = [
  { name: "Success / Live", hex: signal.success },
  { name: "Info / Preview", hex: signal.info },
  { name: "Warning", hex: signal.warning },
  { name: "Error", hex: signal.error },
  { name: "Control border", hex: controlBorder },
];

function Swatch({ name, hex, note }: { name: string; hex: string; note?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="h-16" style={{ backgroundColor: hex }} />
      <div className="p-3">
        <p className="text-sm font-semibold text-foreground">{name}</p>
        <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{hex}</p>
        {note ? <p className="meta-label mt-1.5">{note}</p> : null}
      </div>
    </div>
  );
}

export function ColourSection() {
  return (
    <Section
      id="colour"
      eyebrow="02 · Colour"
      title="Palette and gradient"
      intro="The interface stays fundamentally black, white and grey. The gradient is a signal, not a theme."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {swatches.map((s) => (
          <Swatch key={s.name} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {signals.map((s) => (
          <Swatch key={s.name} {...s} />
        ))}
      </div>

      <div>
        <SubHeading>Accent gradient</SubHeading>
        <div
          role="img"
          aria-label="Accent gradient from silver through violet to ice"
          className="mt-4 h-12 rounded-full"
          style={{ backgroundImage: accentGradient }}
        />
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          linear-gradient(110deg, {accent.silver} 0%, {accent.violet} 52%, {accent.ice} 100%)
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel label="Use the gradient strictly as a signal">
          <ul className="space-y-3 text-sm text-foreground">
            <li className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-16 bg-accent-gradient" />
              Active navigation underline
            </li>
            <li className="flex items-center gap-3">
              <span aria-hidden="true" className="h-1.5 w-16 rounded-full bg-accent-gradient" />
              Progress indicators
            </li>
            <li className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-6 w-16 rounded-full bg-accent-gradient"
              />
              Primary actions and WAITLIST
            </li>
            <li className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="focus-gradient inline-block h-6 w-16 rounded-md border border-transparent"
                style={{
                  backgroundImage: `linear-gradient(var(--field-bg), var(--field-bg)), ${accentGradient}`,
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              />
              Focused and selected borders
            </li>
          </ul>
        </Panel>
        <Panel label="Avoid">
          <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
            <li>Gradients as a generic card background</li>
            <li>Gradients on every component</li>
            <li>Multicolour startup looks and heavy neon</li>
            <li>Gratuitous glassmorphism</li>
          </ul>
        </Panel>
      </div>
    </Section>
  );
}

/* -------------------------------- Contrast -------------------------------- */

export function ContrastSection() {
  const results = contrastPairs.map((pair) => ({ pair, ...evaluatePair(pair) }));
  const checked = results.filter((r) => r.pass !== null);
  const passed = checked.filter((r) => r.pass).length;

  return (
    <Section
      id="contrast"
      eyebrow="03 · Accessibility"
      title="WCAG AA contrast"
      intro="Computed live from the token values with the WCAG 2.x relative-luminance formula. Text needs 4.5:1; UI component boundaries and focus indicators need 3:1. Hairline borders are decorative and exempt, so form controls use a stronger control border."
    >
      <p
        role="status"
        className="rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground"
      >
        <span className="font-semibold">
          {passed} of {checked.length}
        </span>{" "}
        checked pairs pass WCAG AA
        {passed === checked.length ? "." : " — see failures below."}
      </p>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">Foreground and background contrast ratios</caption>
          <thead className="bg-card">
            <tr className="meta-label">
              <th scope="col" className="px-4 py-3 font-medium">
                Pair
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Sample
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Ratio
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Needs
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ pair, ratio, required, pass }) => (
              <tr key={pair.name} className="border-t border-border">
                <th scope="row" className="px-4 py-3 font-normal text-foreground">
                  {pair.name}
                  <span className="mt-0.5 block font-mono text-[11px] text-muted-foreground">
                    {pair.fg} on {pair.bg}
                  </span>
                </th>
                <td className="px-4 py-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-8 w-14 items-center justify-center rounded-md border border-border text-sm font-semibold"
                    style={{ color: pair.fg, backgroundColor: pair.bg }}
                  >
                    Aa
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-foreground">{ratio.toFixed(2)}:1</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">
                  {pair.kind === "decorative" ? "n/a" : `${required}:1`}
                </td>
                <td className="px-4 py-3">
                  {pass === null ? (
                    <span className="text-xs text-muted-foreground">Decorative, exempt</span>
                  ) : pass ? (
                    <span className="text-xs font-semibold text-success">✓ AA pass</span>
                  ) : (
                    <span className="text-xs font-semibold text-error">✕ AA fail</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/* ------------------------------- Typography ------------------------------- */

function useFontStatus() {
  const [status, setStatus] = useState<"checking" | "loaded" | "fallback">("checking");

  useEffect(() => {
    let live = true;
    if (!document.fonts) {
      setStatus("fallback");
      return;
    }
    Promise.all([
      document.fonts.load('700 16px "Space Grotesk"'),
      document.fonts.load('400 16px "Inter"'),
    ])
      .then(([sg, inter]) => {
        if (live) setStatus(sg.length > 0 && inter.length > 0 ? "loaded" : "fallback");
      })
      .catch(() => live && setStatus("fallback"));
    return () => {
      live = false;
    };
  }, []);

  return status;
}

export function TypographySection() {
  const fonts = useFontStatus();

  return (
    <Section
      id="type"
      eyebrow="04 · Typography"
      title="Space Grotesk and Inter"
      intro="Space Grotesk for display and headlines, Inter for body and interface. Both are self-hosted, subsetted variable WOFF2 files with font-display: swap and metric-matched fallbacks."
    >
      <p role="status" className="text-xs text-muted-foreground">
        Self-hosted font files:{" "}
        <span className={fonts === "loaded" ? "font-semibold text-success" : "text-warning"}>
          {fonts === "checking"
            ? "checking…"
            : fonts === "loaded"
              ? "loaded from /fonts"
              : "fallback in use"}
        </span>
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <Panel label="Display / headline">
          <p className="font-display text-3xl font-bold tracking-tight text-foreground">
            Space Grotesk
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Bold, semibold, medium. Tight tracking ({tracking.display}).
          </p>
        </Panel>
        <Panel label="Body">
          <p className="text-3xl font-medium text-foreground">Inter</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Regular, medium. Readable and scannable.
          </p>
        </Panel>
        <Panel label="Labels / metadata">
          <p className="eyebrow !text-foreground">Eyebrow · {tracking.eyebrow}</p>
          <p className="meta-label mt-3 !text-foreground">Metadata · {tracking.meta}</p>
          <p className="mt-3 text-sm text-muted-foreground">11-12px caps, +0.16em to +0.18em.</p>
        </Panel>
      </div>

      <Panel label="Hero example">
        <p className="eyebrow">AI Venture Studio / Community / Digital Products</p>
        <h3 className="mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
          Build what
          <br />
          comes next<span className="text-accent-b">.</span>
        </h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
          Independent thinking. AI-powered. Human-led. Gravitas is the home for ideas, tools,
          products and people who refuse to settle.
        </p>
      </Panel>

      <div className="space-y-2">
        {[
          ["h1", "text-5xl font-bold", "Heading 1"],
          ["h2", "text-4xl font-bold", "Heading 2"],
          ["h3", "text-2xl font-semibold", "Heading 3"],
          ["h4", "text-lg font-semibold", "Heading 4"],
        ].map(([tag, cls, label]) => (
          <div key={tag} className="flex items-baseline gap-4 border-b border-border pb-2">
            <span className="meta-label w-8 shrink-0">{tag}</span>
            <span className={`font-display tracking-tight text-foreground ${cls}`}>{label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------- Tokens --------------------------------- */

export function TokensSection() {
  return (
    <Section
      id="tokens"
      eyebrow="05 · Tokens"
      title="Spacing, radius, elevation, motion"
      intro="Thin borders, precise spacing, subtle elevation, minimal radii. Motion is 150-250ms ease-out, opacity and transform only, and respects prefers-reduced-motion."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel label="Spacing (px)">
          <ul className="space-y-2.5">
            {spacing.map((s) => (
              <li key={s.name} className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="w-10 font-mono">{s.name}</span>
                <span
                  aria-hidden="true"
                  className="h-3 rounded-sm bg-foreground/80"
                  style={{ width: s.px }}
                />
                <span className="font-mono">{s.px}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel label="Radius (px)">
          <ul className="flex flex-wrap items-end gap-5">
            {radii.map((r) => (
              <li
                key={r.name}
                className="flex flex-col items-center gap-2 text-xs text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className="size-14 border border-control bg-elevated"
                  style={{ borderRadius: r.px }}
                />
                <span className="font-mono">{r.name}</span>
                <span className="font-mono">{r.px === 9999 ? "pill" : r.px}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {elevation.map((e) => (
          <div
            key={e.name}
            className="rounded-lg border border-border bg-elevated p-5"
            style={{ boxShadow: e.value }}
          >
            <p className="text-sm font-semibold text-foreground">{e.name}</p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">{e.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel label="Motion (hover or focus a bar)">
          <ul className="space-y-3">
            {motion.map((m) => (
              <li key={m.name} className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="w-12 font-mono">{m.ms}ms</span>
                <button
                  type="button"
                  className="group h-3 flex-1 overflow-hidden rounded-full bg-elevated"
                  aria-label={`Replay ${m.name} motion (${m.ms} milliseconds)`}
                >
                  <span
                    className="block h-full w-1/6 rounded-full bg-accent-gradient transition-transform ease-out group-hover:translate-x-[500%] group-focus-visible:translate-x-[500%]"
                    style={{ transitionDuration: `${m.ms}ms` }}
                  />
                </button>
              </li>
            ))}
          </ul>
          <Caption>Collapses to ~0ms when reduced motion is on</Caption>
        </Panel>
        <Panel label="Breakpoints (mobile first)">
          <ul className="flex flex-wrap gap-2">
            {breakpoints.map((b) => (
              <li key={b.name}>
                <StatusBadge status="core" label={`${b.name} · ${b.px}`} />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Current viewport:{" "}
            <span className="font-semibold text-foreground">
              <span className="sm:hidden">below sm</span>
              <span className="hidden sm:inline md:hidden">sm (640+)</span>
              <span className="hidden md:inline lg:hidden">md (768+)</span>
              <span className="hidden lg:inline xl:hidden">lg (1024+)</span>
              <span className="hidden xl:inline">xl (1280+)</span>
            </span>
          </p>
        </Panel>
      </div>
    </Section>
  );
}
