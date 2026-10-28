import planetImg from "@/assets/planet.jpg";
import podcastImg from "@/assets/podcast.jpg";
import thumbAi from "@/assets/thumb-ai.jpg";
import thumbHabits from "@/assets/thumb-habits.jpg";
import thumbWork from "@/assets/thumb-work.jpg";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  BriefcaseIcon,
  ChevronRightIcon,
  CodeIcon,
  CompassIcon,
  CpuIcon,
  FileTextIcon,
  HeartIcon,
  LayersIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  PlayIcon,
  ShareIcon,
  SparklesIcon,
  UserIcon,
} from "./icons";

/* ---------------------------------- Hero ---------------------------------- */

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Planet visual — black background disappears via blend */}
      <img
        src={planetImg}
        alt=""
        width={1024}
        height={1024}
        className="pointer-events-none absolute -right-[30%] top-1/2 w-[min(900px,150vw)] -translate-y-[46%] mix-blend-screen lg:-right-[14%] lg:w-[min(920px,70vw)]"
      />
      {/* Soft accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 72% 38%, color-mix(in oklab, var(--accent-b) 16%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-24 pt-16 sm:pt-20 md:px-8 lg:min-h-[82vh] lg:grid-cols-[minmax(0,1fr)_auto] lg:pb-28 lg:pt-24">
        <div className="max-w-2xl">
          <p className="eyebrow">
            AI Venture Studio&ensp;/&ensp;Community&ensp;/&ensp;Digital Products
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Build what
            <br />
            comes next
            <span className="text-accent-gradient">.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            Gravitas is an independent, community-first AI venture studio
            building the next generation of digital products, media
            experiences, tools and services. We combine frontier AI, human
            creativity and community participation to challenge the status quo
            and create what's next.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <a
              href="#platform"
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Explore the platform
              <ArrowRightIcon className="text-base" />
            </a>
            <button type="button" className="group flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:bg-elevated">
                <PlayIcon className="text-sm" />
              </span>
              <span className="text-left">
                <span className="block text-sm font-medium text-foreground">
                  Watch our story
                </span>
                <span className="block text-xs text-muted-foreground">
                  2 min
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Vertical manifesto + scroll cue (desktop) */}
        <div className="hidden flex-col justify-center gap-1 text-sm lg:flex">
          <span className="text-muted-foreground">Ideas.</span>
          <span className="text-muted-foreground">People.</span>
          <span className="text-muted-foreground">Products.</span>
          <span className="mt-4 text-foreground">Gravitas.</span>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden items-center gap-3 lg:flex">
        <span className="text-[10px] font-medium tracking-[0.25em] text-muted-foreground">
          SCROLL
        </span>
        <span
          aria-hidden="true"
          className="h-14 w-px"
          style={{
            background:
              "linear-gradient(to bottom, var(--accent-b), transparent)",
          }}
        />
      </div>
    </section>
  );
}

/* --------------------------------- Shared --------------------------------- */

function SectionHeader({
  title,
  note,
  live,
  link,
}: {
  title: string;
  note?: string;
  live?: boolean;
  link?: string;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <h2 className="eyebrow !text-foreground">{title}</h2>
        {note ? (
          <span className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
            <span aria-hidden="true" className="text-accent-gradient">•</span>
            {note}
          </span>
        ) : null}
        {live ? (
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-live" />
            Live discussions
          </span>
        ) : null}
      </div>
      {link ? (
        <a
          href="#"
          className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {link}
          <ArrowRightIcon />
        </a>
      ) : null}
    </div>
  );
}

function EarlyAccessBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full bg-accent-gradient px-2.5 py-1 text-[10px] font-semibold text-primary-foreground ${className}`}
    >
      Early Access
    </span>
  );
}

/* ------------------------------ The Platform ------------------------------ */

const platformCards = [
  {
    icon: LayersIcon,
    title: "Studio",
    desc: "Our mission, experiments, roadmap and venture updates.",
    link: "Explore",
  },
  {
    icon: FileTextIcon,
    title: "Dispatch",
    desc: "Daily AI, tech and culture briefs, curated for builders.",
    link: "Read the latest",
  },
  {
    icon: MessageCircleIcon,
    title: "Community",
    desc: "Discuss, share, learn and build together.",
    link: "Join the conversation",
  },
  {
    icon: CodeIcon,
    title: "Origin",
    desc: "AI coding assistant for the next generation.",
    link: "Join the waitlist",
    early: true,
  },
  {
    icon: CompassIcon,
    title: "Portfolio",
    desc: "Discover our ventures and participate in what's next.",
    link: "View ventures",
  },
];

export function PlatformSection() {
  return (
    <section id="platform" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader title="The Platform" link="More about Gravitas" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {platformCards.map((card) => (
            <article
              key={card.title}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-muted-foreground/40"
            >
              {card.early ? (
                <EarlyAccessBadge className="absolute right-4 top-5" />
              ) : null}
              <card.icon className="text-2xl text-muted-foreground transition-colors group-hover:text-foreground" />
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                {card.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {card.desc}
              </p>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-foreground/90 transition-colors hover:text-accent-c"
              >
                {card.link}
                <ArrowRightIcon />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Dispatch + Podcast --------------------------- */

const dispatchArticles = [
  {
    img: thumbAi,
    category: "Business",
    title: "The next wave of AI startups in Africa",
    meta: "3 min read • 28 Oct 2026",
  },
  {
    img: thumbHabits,
    category: "Lifestyle",
    title: "How to build better digital habits",
    meta: "5 min read • 27 Oct 2026",
  },
  {
    img: thumbWork,
    category: "Science",
    title: "The future of work in an AI-first world",
    meta: "4 min read • 26 Oct 2026",
  },
];

const podcastTracks = [
  { no: "10", title: "What are your thoughts on AI-assisted development tools?" },
  { no: "09", title: "Building products in public" },
  { no: "08", title: "The next wave of African tech" },
];

export function DispatchSection() {
  return (
    <section id="dispatch" className="scroll-mt-20 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          {/* Dispatch panel */}
          <div className="rounded-3xl border border-border bg-card p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="eyebrow !text-foreground">
                  Latest from the Dispatch
                </h2>
                <span className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
                  <span aria-hidden="true" className="text-accent-gradient">•</span>
                  Updated daily
                </span>
              </div>
              <a
                href="#"
                className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                View all
                <ArrowRightIcon />
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
              {/* Featured article */}
              <a
                href="#"
                className="group relative block min-h-[320px] overflow-hidden rounded-2xl border border-border sm:min-h-[380px]"
              >
                <img
                  src={planetImg}
                  alt=""
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, color-mix(in oklab, var(--obsidian) 94%, transparent) 18%, color-mix(in oklab, var(--obsidian) 30%, transparent) 60%, transparent 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-flex items-center rounded-full border border-border bg-obsidian/70 px-2.5 py-1 text-[10px] font-medium tracking-[0.15em] text-muted-foreground uppercase">
                    Tech &amp; AI
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                    OpenAI unveils GPT-5.1 with major improvements in reasoning
                    and multimodal capabilities
                  </h3>
                  <p className="mt-3 text-xs text-muted-foreground">
                    4 min read&ensp;•&ensp;28 Oct 2026
                  </p>
                </div>
              </a>

              {/* Article list */}
              <div className="flex flex-col justify-between gap-4">
                {dispatchArticles.map((article, i) => (
                  <a
                    key={article.title}
                    href="#"
                    className={`group flex items-start gap-4 py-1 ${
                      i > 0 ? "border-t border-border pt-4" : ""
                    }`}
                  >
                    <img
                      src={article.img}
                      alt=""
                      width={816}
                      height={816}
                      loading="lazy"
                      className="size-16 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground uppercase">
                        {article.category}
                      </p>
                      <h4 className="mt-1 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-accent-c">
                        {article.title}
                      </h4>
                      <p className="mt-1.5 text-[11px] text-muted-foreground">
                        {article.meta}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Podcast panel */}
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="relative h-52 sm:h-60">
              <img
                src={podcastImg}
                alt="The Gravitas Podcast cover"
                width={1024}
                height={640}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, color-mix(in oklab, var(--card) 90%, transparent) 2%, transparent 45%)",
                }}
              />
              <button
                type="button"
                aria-label="Play episode"
                className="absolute bottom-4 left-4 flex size-10 items-center justify-center rounded-full border border-border bg-obsidian/80 text-foreground backdrop-blur transition-colors hover:bg-elevated"
              >
                <PlayIcon className="text-xs" />
              </button>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  The Gravitas Podcast
                </h3>
                <a
                  href="#"
                  className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  View all
                  <ArrowRightIcon />
                </a>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Episode 12&ensp;·&ensp;The Future of Work
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div
                  className="flex h-8 flex-1 items-center gap-[2px]"
                  aria-hidden="true"
                >
                  {Array.from({ length: 44 }, (_, i) => (
                    <span
                      key={i}
                      className="w-[3px] shrink-0 rounded-full bg-accent-b/80"
                      style={{
                        height: `${Math.round(
                          22 + 78 * Math.abs(Math.sin(i * 1.35) * Math.cos(i * 0.4))
                        )}%`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">32:45</span>
              </div>

              <div className="mt-4">
                {podcastTracks.map((track, i) => (
                  <div
                    key={track.no}
                    className={`flex items-start gap-4 py-3 ${
                      i > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <span className="w-5 shrink-0 pt-0.5 text-xs text-muted-foreground">
                      {track.no}
                    </span>
                    <p className="text-xs leading-relaxed text-foreground/90">
                      {track.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ Community + Origin panel ------------------------ */

const channels = [
  { icon: CpuIcon, name: "Technology", members: "12.4k members" },
  { icon: BriefcaseIcon, name: "Business", members: "8.7k members" },
  { icon: HeartIcon, name: "Lifestyle", members: "6.1k members" },
  { icon: MessageCircleIcon, name: "General", members: "4.2k members" },
];

export function CommunityOriginSection() {
  return (
    <section id="community" className="scroll-mt-20 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* Community */}
          <div>
            <SectionHeader title="Community" live link="View all" />
            <div className="grid gap-4 md:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
              {/* Discussion card */}
              <article className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-elevated text-muted-foreground">
                    <UserIcon className="text-base" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      thomash
                    </p>
                    <p className="text-xs text-muted-foreground">2h ago</p>
                  </div>
                  <span className="ml-auto shrink-0 rounded-full border border-border px-2.5 py-1 text-[10px] text-muted-foreground">
                    Tech &amp; AI
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-foreground">
                  What's your take on the future of AI in creative industries?
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  With tools like Sora and Runway getting better every day,
                  where do you think this is heading? Will it replace creative
                  jobs or just level the playing field?
                </p>
                <div className="mt-6 flex items-center gap-6 border-t border-border pt-4 text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-xs">
                    <ArrowUpIcon className="text-sm" /> 248
                  </span>
                  <span className="flex items-center gap-1.5 text-xs">
                    <MessageSquareIcon className="text-sm" /> 96
                  </span>
                  <span className="flex items-center gap-1.5 text-xs">
                    <ShareIcon className="text-sm" /> Share
                  </span>
                </div>
              </article>

              {/* Channels */}
              <div className="flex flex-col justify-between gap-3">
                {channels.map((channel) => (
                  <a
                    key={channel.name}
                    href="#"
                    className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-muted-foreground/40"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-elevated text-muted-foreground transition-colors group-hover:text-foreground">
                      <channel.icon className="text-base" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {channel.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {channel.members}
                      </p>
                    </div>
                    <ChevronRightIcon className="ml-auto shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Origin */}
          <div id="origin" className="scroll-mt-20">
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 55% at 85% 110%, color-mix(in oklab, var(--accent-b) 22%, transparent), transparent 70%)",
                }}
              />
              <div className="relative flex items-center gap-3">
                <p className="font-display text-sm font-bold tracking-[0.2em] text-foreground">
                  ORIGIN
                </p>
                <span className="text-xs text-muted-foreground">
                  by GRAVITAS
                </span>
                <EarlyAccessBadge className="ml-auto" />
              </div>
              <h3 className="relative mt-6 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Your AI coding partner.
              </h3>
              <p className="relative mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                Build, iterate and deploy faster with Claude, ChatGPT and
                Gemini.
              </p>
              <a
                href="#"
                className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Join the waitlist
                <ArrowRightIcon className="text-base" />
              </a>

              {/* Mock assistant UI */}
              <div className="relative mt-8 rounded-2xl border border-border bg-obsidian/70 p-4 backdrop-blur">
                <div className="flex items-center gap-2.5 border-b border-border pb-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-accent-gradient text-[10px] font-bold text-primary-foreground">
                    G
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    AI
                  </span>
                </div>
                <div className="mt-3 rounded-lg border border-border bg-elevated px-3 py-2.5 text-xs text-muted-foreground">
                  Build something amazing...
                </div>
                <div className="mt-3 space-y-2">
                  {[
                    { name: "Claude", color: "var(--accent-a)" },
                    { name: "ChatGPT", color: "var(--accent-b)" },
                    { name: "Gemini", color: "var(--accent-c)" },
                  ].map((model) => (
                    <div
                      key={model.name}
                      className="flex items-center gap-2.5 rounded-lg border border-border bg-elevated px-3 py-2.5"
                    >
                      <SparklesIcon
                        className="text-sm"
                        style={{ color: model.color }}
                      />
                      <span className="text-xs text-foreground">
                        {model.name}
                      </span>
                      <ChevronRightIcon className="ml-auto text-xs text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Portfolio ------------------------------- */

const ventures = [
  { mark: "S", name: "SkinLabs®", category: "Health & Beauty", status: "In development", dot: "var(--accent-b)" },
  { mark: "P", name: "Puntr", category: "Sports & Betting", status: "In development", dot: "var(--accent-b)" },
  { mark: "K", name: "Klymb", category: "Finance & Markets", status: "In development", dot: "var(--accent-b)" },
  { mark: "L", name: "LOUDMOUH™", category: "Consumer Brand", status: "Planning", dot: "var(--accent-a)" },
  { mark: "J", name: "Jobbyst SA", category: "Jobs & Recruitment", status: "Live", dot: "var(--live)" },
  { mark: "S", name: "Scoutr", category: "Discovery & Lifestyle", status: "In development", dot: "var(--accent-b)" },
  { mark: "M", name: "The Mannuh Project", category: "Culture & Media", status: "Planning", dot: "var(--accent-a)" },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="scroll-mt-20 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="eyebrow !text-foreground">Our Portfolio</h2>
            <span className="hidden text-xs text-muted-foreground sm:block">
              7 ventures&ensp;·&ensp;1 ecosystem
            </span>
          </div>
          <a
            href="#"
            className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            View all ventures
            <ArrowRightIcon />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ventures.map((venture) => (
            <article
              key={venture.name}
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-muted-foreground/40"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-elevated font-display text-sm font-bold text-foreground transition-colors group-hover:text-accent-c">
                {venture.mark}
              </span>
              <h3 className="mt-4 font-display text-sm font-semibold text-foreground">
                {venture.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {venture.category}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: venture.dot }}
                />
                {venture.status}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
