import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Wordmark } from "./brand";
import {
  ArrowRightIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
} from "./icons";

const navLinks = [
  { label: "Studio", href: "#platform" },
  { label: "Dispatch", href: "#dispatch" },
  { label: "Community", href: "#community" },
  { label: "Origin", href: "#origin" },
  { label: "Portfolio", href: "#portfolio", dot: true },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-obsidian/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link to="/" className="shrink-0" aria-label="Gravitas home">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              {link.dot ? (
                <span
                  aria-hidden="true"
                  className="size-1 rounded-full bg-accent-b"
                />
              ) : null}
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
            className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-elevated"
          >
            Sign In
          </button>
          <button
            type="button"
            className="rounded-full bg-accent-gradient px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
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

      {open ? (
        <div className="border-t border-border bg-obsidian/95 px-5 pb-6 pt-4 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
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
              className="rounded-full border border-border py-2.5 text-sm font-medium text-foreground"
            >
              Sign In
            </button>
            <button
              type="button"
              className="rounded-full bg-accent-gradient py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Join
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
