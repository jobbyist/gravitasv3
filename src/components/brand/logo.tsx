import { useId, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * GRAVITAS v3 logo system (Brand Blueprint p.5 + design reference sheet).
 *
 * The emblem is a geometric G that reads as an open orbit: a thick arc with a cut
 * terminal, a hairline slit, and one forward-pointing bar. It holds up at 16px and
 * works in flat colour. This is a clean SVG interpretation of the reference; swap
 * the paths below if a final production vector master is supplied.
 *
 * Tones:  "light"  silver gradient, for dark backgrounds (default)
 *         "dark"   flat near-black, for white backgrounds
 *         "mono"   flat currentColor, for favicons and one-colour print
 */

export const EMBLEM_PATHS = [
  "M84 19A46 46 0 1 0 37.3 94.2L41.7 78.8A30 30 0 1 1 68 26Z",
  "M38.5 94.5A46 46 0 0 0 96 50L80 50A30 30 0 0 1 42.5 79Z",
  "M47 52.5L100 42L97.5 55L72 61.5L40 63.5Z",
] as const;

export type LogoTone = "light" | "dark" | "mono";
export type LogoVariant = "horizontal" | "mobile" | "emblem" | "app-icon";

const INK = "#0A0A0A";

function fillFor(tone: LogoTone, gradientId: string) {
  if (tone === "light") return `url(#${gradientId})`;
  if (tone === "dark") return INK;
  return "currentColor";
}

export function Emblem({
  tone = "light",
  className,
  title,
  style,
}: {
  tone?: LogoTone;
  className?: string | undefined;
  /** Pass when the emblem stands alone; omitted, it is decorative. */
  title?: string | undefined;
  style?: CSSProperties | undefined;
}) {
  const gradientId = `gv-${useId().replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("size-8 shrink-0", className)}
      style={style}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {tone === "light" ? (
        <defs>
          <linearGradient
            id={gradientId}
            x1="10"
            y1="5"
            x2="92"
            y2="98"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.5" stopColor="#C6CAD6" />
            <stop offset="1" stopColor="#8C92A6" />
          </linearGradient>
        </defs>
      ) : null}
      <g fill={fillFor(tone, gradientId)}>
        {EMBLEM_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

export function AppIcon({
  tone = "light",
  className,
  title,
}: {
  tone?: LogoTone;
  className?: string | undefined;
  title?: string | undefined;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-16 shrink-0 items-center justify-center rounded-lg border",
        tone === "dark" ? "border-black/15 bg-white" : "border-border bg-obsidian shadow-md",
        className,
      )}
    >
      <Emblem tone={tone} title={title} className="size-[56%]" />
    </span>
  );
}

function textColor(tone: LogoTone) {
  if (tone === "dark") return "text-[#0A0A0A]";
  return tone === "mono" ? "text-current" : "text-foreground";
}

function mutedColor(tone: LogoTone) {
  if (tone === "dark") return "text-[#4A4A4A]";
  return tone === "mono" ? "text-current" : "text-muted-foreground";
}

export function Logo({
  variant = "horizontal",
  tone = "light",
  className,
}: {
  variant?: LogoVariant;
  tone?: LogoTone;
  className?: string | undefined;
}) {
  if (variant === "emblem") {
    return <Emblem tone={tone} title="Gravitas" className={cn("size-12", className)} />;
  }

  if (variant === "app-icon") {
    return <AppIcon tone={tone} title="Gravitas" className={className} />;
  }

  if (variant === "mobile") {
    return (
      <span
        role="img"
        aria-label="Gravitas v3"
        className={cn("inline-flex flex-col items-center gap-2", textColor(tone), className)}
      >
        <Emblem tone={tone} className="size-9" />
        <span aria-hidden="true" className="inline-flex items-start gap-1">
          <span className="font-display text-xs font-medium uppercase tracking-[0.42em] pl-[0.42em]">
            Gravitas
          </span>
          <span className={cn("text-[7px] font-medium leading-none", mutedColor(tone))}>v3</span>
        </span>
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label="Gravitas v3"
      className={cn("inline-flex items-center gap-3", textColor(tone), className)}
    >
      <Emblem tone={tone} className="size-[1.9em]" />
      <span aria-hidden="true" className="inline-flex items-start gap-1.5">
        <span className="font-display text-[1em] font-medium uppercase leading-none tracking-[0.42em]">
          Gravitas
        </span>
        <span className={cn("text-[0.65em] font-medium leading-none", mutedColor(tone))}>v3</span>
      </span>
    </span>
  );
}
