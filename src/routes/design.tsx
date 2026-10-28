import { createFileRoute } from "@tanstack/react-router";

import { Logo } from "@/components/brand/logo";
import {
  AlertsSection,
  BadgesSection,
  ButtonsSection,
  CardsSection,
  FormsSection,
  ModalSection,
  NavigationSection,
} from "@/components/design/components-demo";
import {
  ColourSection,
  ContrastSection,
  LogoSection,
  TokensSection,
  TypographySection,
} from "@/components/design/foundations";
import { Toaster } from "@/components/ui/sonner";

const toc = [
  ["logo", "Logo"],
  ["colour", "Colour"],
  ["contrast", "Contrast"],
  ["type", "Type"],
  ["tokens", "Tokens"],
  ["buttons", "Buttons"],
  ["forms", "Forms"],
  ["badges", "Badges"],
  ["alerts", "Alerts"],
  ["cards", "Cards"],
  ["modal", "Modal"],
  ["navigation", "Navigation"],
] as const;

/**
 * Design system living kitchen. Hidden by design: not linked from any navigation,
 * not in a sitemap, and marked noindex so search engines skip it.
 */
export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: "Design system — Gravitas v3" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { name: "googlebot", content: "noindex, nofollow" },
    ],
  }),
  component: DesignPage,
});

function DesignPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <a
        href="#design-main"
        className="sr-only z-[60] rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-border bg-obsidian/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 md:px-8">
          <Logo className="text-xs" />
          <span className="meta-label">Design system</span>
          <nav
            aria-label="Sections"
            className="flex w-full gap-1 overflow-x-auto sm:ml-auto sm:w-auto"
          >
            {toc.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="shrink-0 rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="design-main" className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <div className="py-16">
          <p className="eyebrow">Gravitas v3 · Internal reference</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl">
            Design system<span className="text-accent-b">.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Every token and component in one place, rendered from the same code the site uses.
            Monochrome editorial, restrained futurism. This page is not linked from the site and is
            marked noindex.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            Keyboard check: press{" "}
            <kbd className="rounded border border-control px-1.5 py-0.5 text-xs">Tab</kbd> to move
            through every control. Each one shows a visible focus state.
          </p>
        </div>

        <LogoSection />
        <ColourSection />
        <ContrastSection />
        <TypographySection />
        <TokensSection />
        <ButtonsSection />
        <FormsSection />
        <BadgesSection />
        <AlertsSection />
        <CardsSection />
        <ModalSection />
        <NavigationSection />
      </main>

      <Toaster />
    </div>
  );
}
