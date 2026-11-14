import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

import { Logo } from "@/components/brand/logo";
import { useAuth } from "@/lib/auth";
import { ecosystemNav, primaryNav } from "@/lib/site";
import { ArrowRightIcon, ChevronDownIcon, CloseIcon, MenuIcon } from "./icons";

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
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
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return progress;
}

function isActive(pathname: string, to: string) {
  return to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
}

function EcosystemMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        Ecosystem
        <ChevronDownIcon className={`text-xs transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 rounded-lg border border-border bg-card p-2 shadow-lg">
          {ecosystemNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 transition-colors hover:bg-elevated"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className="meta-label">{item.note}</span>
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{item.description}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function AccountActions({ onNavigate }: { onNavigate?: () => void }) {
  const { ready, user, isStaff, signOut } = useAuth();

  if (ready && user) {
    return (
      <>
        {isStaff ? (
          <Link
            to="/admin"
            onClick={onNavigate}
            className="rounded-full border border-foreground/40 px-5 py-2 text-center text-sm font-medium text-foreground transition-colors hover:border-foreground hover:bg-elevated"
          >
            Admin
          </Link>
        ) : null}
        <Link
          to="/client-portal"
          onClick={onNavigate}
          className="rounded-full border border-foreground/40 px-5 py-2 text-center text-sm font-medium text-foreground transition-colors hover:border-foreground hover:bg-elevated"
        >
          Client Portal
        </Link>
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            void signOut();
          }}
          className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <>
      <Link
        to="/sign-in"
        onClick={onNavigate}
        className="rounded-full border border-foreground/40 px-5 py-2 text-center text-sm font-medium text-foreground transition-colors hover:border-foreground hover:bg-elevated"
      >
        Sign In
      </Link>
      <Link
        to="/client-portal"
        onClick={onNavigate}
        className="rounded-full bg-accent-gradient px-5 py-2 text-center text-sm font-semibold text-primary-foreground transition-[filter] hover:brightness-110"
      >
        Client Portal
      </Link>
    </>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const progress = useScrollProgress();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-obsidian/80 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link to="/" className="shrink-0 rounded-md" aria-label="Gravitas home">
          <Logo className="text-sm" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {primaryNav.map((link) => {
            const active = isActive(pathname, link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 text-sm transition-colors hover:text-foreground ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-px bg-accent-gradient transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
          <EcosystemMenu />
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <AccountActions />
        </div>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full text-foreground lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="text-xl" /> : <MenuIcon className="text-xl" />}
        </button>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-px">
        <div
          className="h-full origin-left bg-accent-gradient"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-obsidian/95 px-5 pb-6 pt-4 backdrop-blur-md lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {primaryNav.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                aria-current={isActive(pathname, link.to) ? "page" : undefined}
                className="flex items-center justify-between border-b border-border py-3.5 text-sm text-foreground"
              >
                {link.label}
                <ArrowRightIcon className="text-muted-foreground" />
              </Link>
            ))}
            <p className="eyebrow mt-5 mb-1">Ecosystem</p>
            {ecosystemNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-border py-3.5 text-sm text-foreground"
              >
                {item.label}
                <span className="meta-label">{item.note}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <AccountActions onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </header>
  );
}
