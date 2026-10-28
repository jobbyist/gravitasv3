import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/logo";
import { ArrowRightIcon, CloseIcon, MenuIcon, SearchIcon } from "./icons";

const navLinks = [
  { label: "Studio", id: "platform" },
  { label: "Dispatch", id: "dispatch" },
  { label: "Community", id: "community" },
  { label: "Origin", id: "origin" },
  { label: "Portfolio", id: "portfolio" },
];

/** Tracks which section is in view (for the active nav signal) and page scroll progress. */
function useScrollSignals() {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        // The topmost visible section in page order wins.
        setActive(navLinks.find((link) => visible.has(link.id))?.id ?? null);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.01] },
    );
    sections.forEach((el) => observer.observe(el));

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { active, progress };
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { active, progress } = useScrollSignals();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-obsidian/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link to="/" className="shrink-0 rounded-md" aria-label="Gravitas home">
          <Logo className="text-sm" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`#${link.id}`}
              aria-current={active === link.id ? "location" : undefined}
              className={`relative py-1 text-sm transition-colors hover:text-foreground ${
                active === link.id ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
              {/* Active navigation: one of the sanctioned gradient signals. */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-0.5 h-px bg-accent-gradient transition-opacity ${
                  active === link.id ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            aria-label="Search"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          >
            <SearchIcon className="text-lg" />
          </button>
          <button
            type="button"
            className="rounded-full border border-foreground/40 px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground hover:bg-elevated"
          >
            Sign In
          </button>
          <button
            type="button"
            className="rounded-full bg-accent-gradient px-5 py-2 text-sm font-semibold text-primary-foreground transition-[filter] hover:brightness-110"
          >
            Join
          </button>
        </div>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full text-foreground lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="text-xl" /> : <MenuIcon className="text-xl" />}
        </button>
      </div>

      {/* Scroll progress: a sanctioned gradient signal. Decorative, so hidden from AT. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-px">
        <div
          className="h-full origin-left bg-accent-gradient"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {open ? (
        <div className="border-t border-border bg-obsidian/95 px-5 pb-6 pt-4 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === link.id ? "location" : undefined}
                className="flex items-center justify-between border-b border-border py-3.5 text-sm text-foreground"
              >
                {link.label}
                <ArrowRightIcon className="text-muted-foreground" />
              </a>
            ))}
          </nav>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="rounded-full border border-foreground/40 py-2.5 text-sm font-medium text-foreground"
            >
              Sign In
            </button>
            <button
              type="button"
              className="rounded-full bg-accent-gradient py-2.5 text-sm font-semibold text-primary-foreground transition-[filter] hover:brightness-110"
            >
              Join
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
