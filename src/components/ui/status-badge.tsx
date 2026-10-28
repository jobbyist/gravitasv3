import { cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { statusMeta, type StatusKey } from "@/lib/status";

/**
 * The one status badge. Replaces every ad-hoc "Early Access" / "In development"
 * pill. Status is always conveyed in text, never by colour alone.
 *
 *   <StatusBadge status="waitlist" />
 *
 * The gradient is reserved for WAITLIST, the single call to action among the
 * statuses. Every other status uses a flat colour.
 */
const statusBadgeVariants = cva(
  "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border font-semibold uppercase leading-none",
  {
    variants: {
      status: {
        core: "border-foreground/60 text-foreground",
        waitlist: "border-transparent bg-accent-gradient text-primary-foreground",
        preview: "border-accent-b/70 bg-accent-b/10 text-accent-b",
        live: "border-live/60 bg-live/10 text-live",
        "coming-soon": "border-dashed border-muted-foreground text-muted-foreground",
        "in-development": "border-accent-a/60 text-accent-a",
        testing: "border-accent-c/60 bg-accent-c/10 text-accent-c",
        building: "border-dotted border-muted-foreground/70 text-muted-foreground",
      },
      size: {
        sm: "px-2.5 py-1 text-[10px] tracking-[0.16em]",
        md: "px-3 py-1.5 text-[11px] tracking-[0.16em]",
      },
    },
    defaultVariants: { size: "sm" },
  },
);

export interface StatusBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  status: StatusKey;
  size?: "sm" | "md";
  /** Override the visible label, e.g. "Sample". Keep it short. */
  label?: string;
}

export function StatusBadge({ status, size, label, className, ...props }: StatusBadgeProps) {
  const meta = statusMeta[status];

  return (
    <span
      data-status={status}
      title={meta.description}
      className={cn(statusBadgeVariants({ status, size }), className)}
      {...props}
    >
      {status === "live" ? (
        <span aria-hidden="true" className="size-1.5 rounded-full bg-live" />
      ) : null}
      <span className="sr-only">Status: </span>
      {label ?? meta.label}
    </span>
  );
}
