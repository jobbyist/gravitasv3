import type { ReactNode } from "react";

import { SiteFooter } from "@/components/landing/footer";
import { SiteNav } from "@/components/landing/nav";
import { StatusBadge } from "@/components/ui/status-badge";
import type { StatusKey } from "@/lib/status";
import { cn } from "@/lib/utils";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  status,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  status?: StatusKey;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 85% 0%, color-mix(in oklab, var(--accent-b) 14%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-16 md:px-8 lg:pb-20 lg:pt-24">
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow">{eyebrow}</p>
          {status ? <StatusBadge status={status} /> : null}
        </div>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {lede}
          </p>
        ) : null}
        {children ? <div className="mt-8 flex flex-wrap gap-4">{children}</div> : null}
      </div>
    </section>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-16 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        {title ? (
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {title}
          </h2>
        ) : null}
        <div className={title || eyebrow ? "mt-10" : undefined}>{children}</div>
      </div>
    </section>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-[filter,background-color,border-color]";

export const buttonStyles = {
  primary: `${buttonBase} bg-accent-gradient text-primary-foreground hover:brightness-110`,
  secondary: `${buttonBase} border border-foreground/40 font-medium text-foreground hover:border-foreground hover:bg-elevated`,
};
