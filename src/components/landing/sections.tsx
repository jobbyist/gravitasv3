import { Link } from "@tanstack/react-router";

import planetImg from "@/assets/planet.jpg";
import podcastImg from "@/assets/podcast.jpg";
import { buttonStyles } from "@/components/site/page-shell";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate, type ArticleSummary } from "@/lib/dispatch";
import { ownershipLabel, portfolio } from "@/lib/portfolio";
import { brand, contact } from "@/lib/site";
import {
  ArrowRightIcon,
  CodeIcon,
  CpuIcon,
  LayersIcon,
  MessageCircleIcon,
  PlayIcon,
  SparklesIcon,
} from "./icons";

/* ---------------------------------- Hero ---------------------------------- */

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={planetImg}
        alt=""
        width={1024}
        height={1024}
        className="pointer-events-none absolute -right-[30%] top-1/2 w-[min(900px,150vw)] -translate-y-[46%] mix-blend-screen lg:-right-[14%] lg:w-[min(920px,70vw)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 72% 38%, color-mix(in oklab, var(--accent-b) 16%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-24 pt-16 sm:pt-20 md:px-8 lg:min-h-[78vh] lg:grid-cols-[minmax(0,1fr)_auto] lg:pb-28 lg:pt-24">
        <div className="max-w-2xl">
          <p className="eyebrow">GRAVITAS.WTF&ensp;/&ensp;{brand.positioning}</p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Building things that probably shouldn’t exist.{" "}
            <span className="text-accent-gradient">Until they do.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            We combine artificial intelligence, creative thinking and engineering to turn ambitious
            ideas into products, platforms and ventures that move things forward.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link to="/studio" className={buttonStyles.primary}>
              Explore the Studio
              <ArrowRightIcon className="text-base" />
            </Link>
            <a
              href="#podcast"
              aria-label="Watch The Video — Building Gravitas"
              className="group flex items-center gap-3"
            >
              <span className="flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:bg-elevated">
                <PlayIcon className="text-sm" />
              </span>
              <span className="text-sm font-medium text-foreground transition-colors group-hover:text-accent-c">
                Watch The Video
              </span>
            </a>
          </div>
        </div>

        <div className="hidden flex-col justify-end gap-1 pb-4 text-sm lg:flex">
          <span className="meta-label">{brand.tagline}</span>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Shared --------------------------------- */

function SectionIntro({
  eyebrow,
  title,
  link,
}: {
  eyebrow: string;
  title: string;
  link?: { label: string; to: string };
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {link ? (
        <Link
          to={link.to}
          className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {link.label}
          <ArrowRightIcon />
        </Link>
      ) : null}
    </div>
  );
}

/* ------------------------------- What We Do ------------------------------- */

const offerings = [
  {
    icon: LayersIcon,
    title: "Studio",
    desc: "We design, build and run intelligent digital systems for businesses: websites, apps, dashboards, automation and AI assistants.",
  },
  {
    icon: SparklesIcon,
    title: "Ventures",
    desc: "We build and operate our own AI-enabled products, from skincare intelligence to sports and financial insight.",
  },
  {
    icon: CpuIcon,
    title: "Infrastructure",
    desc: "Shared foundations (auth, payments, content and automation) mean every new project starts from a stronger base.",
  },
];

export function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="scroll-mt-20 border-t border-border py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionIntro
          eyebrow="What we do"
          title="A studio that builds for clients and for itself."
          link={{ label: "Inside the Studio", to: "/studio" }}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {offerings.map((o) => (
            <div key={o.title} className="rounded-lg border border-border bg-card p-6">
              <o.icon className="text-2xl text-accent-c" />
              <h3 className="mt-5 font-display text-xl font-semibold">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Selected Work ------------------------------ */

export function SelectedWorkSection() {
  const selected = portfolio.filter((p) => p.ownership !== "coming-soon").slice(0, 6);
  return (
    <section id="work" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionIntro
          eyebrow="Selected work"
          title="Ventures we run. Systems we’ve built."
          link={{ label: "View the portfolio", to: "/portfolio" }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {selected.map((p) => (
            <article
              key={p.slug}
              className="flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/30"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="meta-label">{ownershipLabel[p.ownership]}</span>
                {p.status ? <StatusBadge status={p.status} /> : null}
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.category}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ The Approach ------------------------------ */

const approach = [
  {
    step: "01",
    title: "AI does real work",
    desc: "AI is part of how we research, prototype, build and operate, not a feature bolted on at the end.",
  },
  {
    step: "02",
    title: "Creative thinking sets direction",
    desc: "We question the obvious answer first. Sometimes the right build is a platform; sometimes it’s one good automation.",
  },
  {
    step: "03",
    title: "Engineering makes it last",
    desc: "Secure backends, tested releases and maintenance after launch. People stay accountable for what ships.",
  },
];

export function ApproachSection() {
  return (
    <section
      id="approach"
      className="scroll-mt-20 border-y border-border bg-graphite/40 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionIntro
          eyebrow="The Gravitas approach"
          title="AI, creativity and engineering, in that order of honesty."
        />
        <ol className="grid gap-8 md:grid-cols-3">
          {approach.map((a) => (
            <li key={a.step} className="border-t border-border pt-6">
              <span className="text-accent-gradient font-display text-sm font-bold">{a.step}</span>
              <h3 className="mt-3 font-display text-xl font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------- Dispatch -------------------------------- */

export function DispatchSection({ articles }: { articles: ArticleSummary[] }) {
  return (
    <section id="dispatch" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionIntro
          eyebrow="Dispatch"
          title="The signal from inside Gravitas."
          link={{ label: "Read Dispatch", to: "/dispatch" }}
        />
        {articles.length === 0 ? (
          <p className="text-sm text-muted-foreground">New articles are on the way.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                to="/dispatch/$slug"
                params={{ slug: a.slug }}
                className="group flex flex-col"
              >
                {a.cover_image ? (
                  <img
                    src={a.cover_image}
                    alt=""
                    width={1600}
                    height={900}
                    loading="lazy"
                    className="aspect-video w-full rounded-lg border border-border object-cover transition-opacity group-hover:opacity-90"
                  />
                ) : null}
                <p className="meta-label mt-4">
                  {a.category} · {formatDate(a.published_at)}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold leading-snug group-hover:underline">
                  {a.title}
                </h3>
                {a.dek ? (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.dek}</p>
                ) : null}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ----------------------------- Podcast preview ----------------------------- */

export function PodcastSection() {
  return (
    <section id="podcast" className="scroll-mt-20 py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-8 overflow-hidden rounded-xl border border-border bg-card md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <img
            src={podcastImg}
            alt=""
            width={1024}
            height={768}
            loading="lazy"
            className="h-full max-h-80 w-full object-cover"
          />
          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">Podcast</p>
              <StatusBadge status="coming-soon" label="Season 2 · January 2027" />
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
              Building Gravitas
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              The process of building Gravitas: developing products, experimenting with AI and
              running ventures from South Africa. Season 1 [Pilot] is being brought together on
              Dispatch.
            </p>
            <span className="mt-6 inline-flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex size-10 items-center justify-center rounded-full border border-control text-foreground">
                <PlayIcon className="text-sm" />
              </span>
              Episodes arrive on Dispatch soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Upcoming ecosystem ---------------------------- */

export function EcosystemSection() {
  const items = [
    {
      icon: MessageCircleIcon,
      title: "Community",
      to: "/community" as const,
      desc: "A place for founders, builders, clients and collaborators to share what’s working.",
    },
    {
      icon: CodeIcon,
      title: "Origin",
      to: "/origin" as const,
      desc: "An AI coding assistant from Gravitas, built on how we ship software ourselves.",
    },
  ];
  return (
    <section id="ecosystem" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionIntro eyebrow="Upcoming ecosystem" title="Coming January 2027." />
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((i) => (
            <Link
              key={i.title}
              to={i.to}
              className="group rounded-lg border border-dashed border-border p-6 transition-colors hover:border-foreground/40"
            >
              <div className="flex items-center justify-between">
                <i.icon className="text-2xl text-muted-foreground" />
                <StatusBadge status="coming-soon" label="January 2027" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold">{i.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Work with us ------------------------------ */

export function WorkWithUsSection() {
  return (
    <section id="work-with-us" className="scroll-mt-20 pb-8 pt-16 lg:pt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-xl border border-border bg-card px-6 py-14 text-center md:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 0%, color-mix(in oklab, var(--accent-b) 18%, transparent), transparent 70%)",
            }}
          />
          <div className="relative">
            <p className="eyebrow">Work with us</p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Have something that probably shouldn’t exist yet?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
              Tell us what you’re building. We’ll tell you honestly what it takes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className={buttonStyles.primary}>
                Start a Project
                <ArrowRightIcon />
              </Link>
              <a href={`mailto:${contact.general}`} className={buttonStyles.secondary}>
                {contact.general}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
