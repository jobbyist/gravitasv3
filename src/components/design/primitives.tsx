import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Layout primitives used only by the /design living kitchen. */

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-t border-border py-14"
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2
        id={`${id}-title`}
        className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl"
      >
        {title}
        <span className="text-accent-b">.</span>
      </h2>
      {intro ? (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{intro}</p>
      ) : null}
      <div className="mt-8 space-y-10">{children}</div>
    </section>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="font-display text-lg font-semibold text-foreground">{children}</h3>;
}

export function Panel({
  className,
  children,
  label,
  center = false,
}: {
  className?: string;
  children: ReactNode;
  label?: string;
  /** Centre the content in the remaining space (logo and icon showcases). */
  center?: boolean;
}) {
  return (
    <div className={cn("flex flex-col rounded-lg border border-border bg-card p-5", className)}>
      {label ? <p className="meta-label mb-4">{label}</p> : null}
      <div className={cn(center && "flex flex-1 items-center justify-center gap-6 py-6")}>
        {children}
      </div>
    </div>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return <p className="meta-label mt-3">{children}</p>;
}
