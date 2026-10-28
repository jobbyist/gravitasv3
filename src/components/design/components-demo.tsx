import { useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import { toast } from "sonner";

import { Logo } from "@/components/brand/logo";
import * as Icons from "@/components/landing/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { STATUS_KEYS, statusMeta } from "@/lib/status";

import { Caption, Panel, Section, SubHeading } from "./primitives";

/* --------------------------------- Buttons --------------------------------- */

const variants = [
  { variant: "default", name: "Primary", hover: "brightness-110" },
  { variant: "secondary", name: "Secondary", hover: "border-foreground bg-elevated" },
  { variant: "ghost", name: "Ghost", hover: "bg-elevated text-foreground" },
  { variant: "destructive", name: "Destructive", hover: "bg-destructive/90" },
] as const;

const forcedFocus = "outline outline-2 outline-offset-2 outline-ring";

export function ButtonsSection() {
  const [loading, setLoading] = useState(false);

  return (
    <Section
      id="buttons"
      eyebrow="06 · Components"
      title="Buttons"
      intro="Pills. Primary carries the gradient because it is the key interactive state; everything else stays monochrome. Tab to any live button to see the real focus ring. The forced columns pin each state so they can be compared side by side."
    >
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[720px] text-left text-sm">
          <caption className="sr-only">Button variants and states</caption>
          <thead className="bg-card">
            <tr className="meta-label">
              {["Variant", "Default", "Hover", "Focus-visible", "Disabled", "Loading"].map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variants.map(({ variant, name, hover }) => (
              <tr key={variant} className="border-t border-border">
                <th scope="row" className="px-4 py-4 font-normal text-foreground">
                  {name}
                </th>
                <td className="px-4 py-4">
                  <Button variant={variant}>{name}</Button>
                </td>
                <td className="px-4 py-4">
                  <Button variant={variant} className={hover} tabIndex={-1}>
                    {name}
                  </Button>
                </td>
                <td className="px-4 py-4">
                  <Button variant={variant} className={forcedFocus} tabIndex={-1}>
                    {name}
                  </Button>
                </td>
                <td className="px-4 py-4">
                  <Button variant={variant} disabled>
                    {name}
                  </Button>
                </td>
                <td className="px-4 py-4">
                  <Button variant={variant} loading>
                    {name}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel label="Sizes">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">
              Large
              <Icons.ArrowRightIcon />
            </Button>
            <Button size="icon" variant="secondary" aria-label="Search">
              <Icons.SearchIcon />
            </Button>
          </div>
        </Panel>
        <Panel label="Interactive loading">
          <Button
            loading={loading}
            onClick={() => {
              setLoading(true);
              window.setTimeout(() => setLoading(false), 1800);
            }}
          >
            {loading ? "Saving" : "Click to simulate a save"}
          </Button>
          <Caption>aria-busy is set and activation is blocked while loading</Caption>
        </Panel>
      </div>
    </Section>
  );
}

/* ---------------------------------- Forms ---------------------------------- */

function Field({
  id,
  label,
  help,
  error,
  children,
}: {
  id: string;
  label: string;
  help?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-foreground">
        {label}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-msg`} role="alert" className="text-xs text-error">
          {error}
        </p>
      ) : help ? (
        <p id={`${id}-msg`} className="text-xs text-muted-foreground">
          {help}
        </p>
      ) : null}
    </div>
  );
}

export function FormsSection() {
  const [message, setMessage] = useState("");
  const max = 500;

  return (
    <Section
      id="forms"
      eyebrow="07 · Components"
      title="Inputs and forms"
      intro="Visible labels, a control border that reaches 3:1, and a gradient border plus ring on focus. Tab into any field to see it."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Field id="d-email" label="Email address" help="We only use this to confirm your spot.">
          <Input
            id="d-email"
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            aria-describedby="d-email-msg"
          />
        </Field>

        <Field id="d-email-bad" label="Email address (error)" error="Enter a valid email address.">
          <Input
            id="d-email-bad"
            type="email"
            defaultValue="not-an-email"
            aria-invalid="true"
            aria-describedby="d-email-bad-msg"
          />
        </Field>

        <Field id="d-focused" label="Focused (forced for comparison)">
          <Input
            id="d-focused"
            defaultValue="Focused input · gradient border, visible ring"
            tabIndex={-1}
            className="border-transparent bg-[linear-gradient(var(--field-bg),var(--field-bg)),var(--gradient-accent)] [background-clip:padding-box,border-box] [background-origin:border-box] shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent-b)_35%,transparent)]"
          />
        </Field>

        <Field id="d-disabled" label="Disabled">
          <Input id="d-disabled" disabled placeholder="Not available" />
        </Field>

        <Field id="d-select" label="Select option">
          <Select>
            <SelectTrigger id="d-select">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field id="d-search" label="Search">
          <div className="relative">
            <Icons.SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input id="d-search" type="search" placeholder="Search…" className="pl-9" />
          </div>
        </Field>

        <div className="md:col-span-2">
          <Field id="d-message" label="Message">
            <Textarea
              id="d-message"
              placeholder="Your message…"
              maxLength={max}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-describedby="d-message-count"
            />
            <p
              id="d-message-count"
              className="text-right text-xs text-muted-foreground"
              aria-live="polite"
            >
              {message.length}/{max}
            </p>
          </Field>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------- Badges ---------------------------------- */

const ventureMapping = [
  { name: "SkinLabs South Africa", status: "live" },
  { name: "Jobbyist Africa", status: "live" },
  { name: "Puntr.co.za", status: "in-development" },
  { name: "Klymb Finance", status: "in-development" },
  { name: "LOUDMOUF™ South Africa", status: "testing" },
  { name: "Origin by Gravitas", status: "waitlist" },
] as const;

export function BadgesSection() {
  return (
    <Section
      id="badges"
      eyebrow="08 · Components"
      title="Status badges"
      intro={
        <>
          One component, one vocabulary: <code>{'<StatusBadge status="…" />'}</code>. Status is
          always written out, never colour alone. BUILDING marks sample content that is not yet
          connected to live data.
        </>
      }
    >
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">Every status badge</caption>
          <thead className="bg-card">
            <tr className="meta-label">
              <th scope="col" className="px-4 py-3 font-medium">
                status
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                sm
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                md
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Meaning
              </th>
            </tr>
          </thead>
          <tbody>
            {STATUS_KEYS.map((status) => (
              <tr key={status} className="border-t border-border">
                <th
                  scope="row"
                  className="px-4 py-3 font-mono text-xs font-normal text-muted-foreground"
                >
                  {status}
                </th>
                <td className="px-4 py-3">
                  <StatusBadge status={status} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={status} size="md" />
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {statusMeta[status].description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Panel label="Where each status is used">
        <ul className="grid gap-3 sm:grid-cols-2">
          {ventureMapping.map((v) => (
            <li
              key={v.name}
              className="flex items-center justify-between gap-3 rounded-md border border-border px-4 py-3 text-sm text-foreground"
            >
              {v.name}
              <StatusBadge status={v.status} />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Core: Studio, Dispatch, Community, Portfolio. Scoutr and The Mannuh Project read Coming
          soon until their stages are confirmed.
        </p>
      </Panel>
    </Section>
  );
}

/* ---------------------------------- Alerts ---------------------------------- */

export function AlertsSection() {
  return (
    <Section
      id="alerts"
      eyebrow="09 · Components"
      title="Alerts and feedback"
      intro="A coloured left rule on a graphite panel, with the message in plain text."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Alert variant="success">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>You're on the list.</AlertDescription>
        </Alert>
        <Alert variant="info">
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>Preview feature, not live yet.</AlertDescription>
        </Alert>
        <Alert variant="warning">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>This listing is under review.</AlertDescription>
        </Alert>
        <Alert variant="error">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Couldn't save. Try again.</AlertDescription>
        </Alert>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel label="Toast">
          <Button
            variant="secondary"
            onClick={() =>
              toast("You're on the list.", { description: "Sample toast from /design." })
            }
          >
            Show toast
          </Button>
        </Panel>
        <Panel label="Skeleton loader">
          <div className="space-y-3" aria-busy="true" aria-label="Loading example">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </Panel>
        <Panel label="Empty state">
          <p className="font-display text-lg font-semibold text-foreground">Nothing here yet.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Real content appears here once it exists. No placeholders posing as activity.
          </p>
        </Panel>
      </div>

      <div>
        <SubHeading>Progress indicator</SubHeading>
        <div
          role="progressbar"
          aria-label="Example progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={62}
          className="mt-4 h-1.5 overflow-hidden rounded-full bg-elevated"
        >
          <div className="h-full w-[62%] rounded-full bg-accent-gradient" />
        </div>
      </div>
    </Section>
  );
}

/* ----------------------------------- Cards ----------------------------------- */

export function CardsSection() {
  return (
    <Section
      id="cards"
      eyebrow="10 · Components"
      title="Cards"
      intro="Graphite surfaces with a hairline border. No gradient backgrounds. Every card below is sample content, so each carries a BUILDING badge."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="meta-label">The Dispatch</p>
            <StatusBadge status="building" />
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-foreground">
            Sample headline: short, sourced briefs for builders
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Placeholder summary. Every real article links to its source.
          </p>
          <p className="meta-label mt-4">Sample · not a real article</p>
        </article>

        <article className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="meta-label">Podcast</p>
            <StatusBadge status="building" />
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
            The Gravitas Podcast
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Episode details load from the catalogue.
          </p>
          <Button className="mt-4" size="sm" variant="secondary" disabled>
            <Icons.PlayIcon /> Play
          </Button>
        </article>

        <article className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-elevated text-muted-foreground">
              <Icons.UserIcon />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">member-handle</p>
              <p className="text-xs text-muted-foreground">Technology</p>
            </div>
            <StatusBadge status="building" className="ml-auto" />
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
            Sample post title
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Counts and reactions stay hidden until they are real.
          </p>
        </article>

        <article className="rounded-lg border border-border bg-card p-5">
          <span className="flex size-9 items-center justify-center rounded-md bg-elevated font-display text-sm font-bold text-foreground">
            J
          </span>
          <h3 className="mt-4 font-display text-sm font-semibold text-foreground">
            Jobbyist Africa
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">Jobs &amp; Recruitment</p>
          <StatusBadge status="live" className="mt-4" />
        </article>
      </div>
    </Section>
  );
}

/* ---------------------------------- Modal ---------------------------------- */

export function ModalSection() {
  return (
    <Section
      id="modal"
      eyebrow="11 · Components"
      title="Modal"
      intro="Focus moves into the dialog, is trapped while it is open, closes on Escape and returns to the trigger."
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Open modal</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Join the waitlist</DialogTitle>
            <DialogDescription>
              Sample dialog. Nothing is submitted from this page.
            </DialogDescription>
          </DialogHeader>
          <Field id="d-modal-email" label="Email address">
            <Input id="d-modal-email" type="email" placeholder="you@example.com" />
          </Field>
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Confirm</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Section>
  );
}

/* ------------------------------ Navigation + icons ------------------------------ */

const navItems = ["Studio", "Dispatch", "Community", "Portfolio"];

export function NavigationSection() {
  // Sorted: module namespace key order is not guaranteed to match between SSR and client bundles.
  const iconEntries = (
    Object.entries(Icons) as [string, ComponentType<SVGProps<SVGSVGElement>>][]
  ).sort(([a], [b]) => a.localeCompare(b));

  return (
    <Section
      id="navigation"
      eyebrow="12 · Components"
      title="Navigation and icons"
      intro="Minimal navigation. The active item takes the gradient underline; Join is the single gradient pill."
    >
      <Panel label="Desktop">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-border px-5 py-2.5">
          <Logo className="text-xs" />
          <nav
            aria-label="Example desktop navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {navItems.map((item, i) => (
              <a
                key={item}
                href="#navigation"
                aria-current={i === 1 ? "location" : undefined}
                className={`relative py-1 text-sm hover:text-foreground ${
                  i === 1 ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item}
                {i === 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-accent-gradient"
                  />
                ) : null}
              </a>
            ))}
            <Button size="sm">Join</Button>
          </nav>
        </div>
      </Panel>

      <Panel label="Mobile">
        <div className="max-w-xs rounded-lg border border-border">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <Logo className="text-xs" />
            <button
              type="button"
              aria-label="Open menu"
              className="flex size-9 items-center justify-center rounded-full text-foreground"
            >
              <Icons.MenuIcon className="text-xl" />
            </button>
          </div>
          <nav aria-label="Example mobile navigation" className="flex flex-col px-4">
            {navItems.map((item) => (
              <a
                key={item}
                href="#navigation"
                className="flex items-center justify-between border-b border-border py-3.5 text-sm text-foreground last:border-b-0"
              >
                {item}
                <Icons.ArrowRightIcon className="text-muted-foreground" />
              </a>
            ))}
          </nav>
          <div className="p-4">
            <Button className="w-full">Join</Button>
          </div>
        </div>
      </Panel>

      <Panel label="Icon set · line style, 1.5px stroke">
        <ul className="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-8">
          {iconEntries.map(([name, Icon]) => (
            <li key={name} className="flex flex-col items-center gap-2 text-muted-foreground">
              <Icon className="text-2xl text-foreground" />
              <span className="text-center text-[10px]">{name.replace(/Icon$/, "")}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </Section>
  );
}
