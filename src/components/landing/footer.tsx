import { Wordmark } from "./brand";
import {
  ArrowRightIcon,
  DiscordIcon,
  InstagramIcon,
  XSocialIcon,
  YoutubeIcon,
} from "./icons";

const footerNav = ["Studio", "Dispatch", "Community", "Origin", "Portfolio"];
const footerLegal = ["Privacy", "Terms", "Cookies", "Contact"];
const socials = [
  { icon: XSocialIcon, label: "X" },
  { icon: YoutubeIcon, label: "YouTube" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: DiscordIcon, label: "Discord" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,320px)]">
          {/* Brand */}
          <div>
            <Wordmark />
            <p className="mt-3 text-xs text-muted-foreground">
              Independent. Community-first. AI-powered.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-14 gap-y-2 sm:flex sm:gap-14">
            <nav className="flex flex-col gap-2.5" aria-label="Footer">
              {footerNav.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item}
                </a>
              ))}
            </nav>
            <nav className="flex flex-col gap-2.5" aria-label="Legal">
              {footerLegal.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-sm font-medium text-foreground">
              Join our community
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Get the latest updates, content and opportunities.
            </p>
            <form
              className="mt-4 flex items-center rounded-full border border-border bg-card p-1 pl-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-gradient text-primary-foreground transition-opacity hover:opacity-90"
              >
                <ArrowRightIcon className="text-base" />
              </button>
            </form>
            <div className="mt-5 flex items-center gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
                >
                  <social.icon className="text-base" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Gravitas Industries (Pty) Ltd. All rights reserved.</p>
          <p>South Africa&ensp;·&ensp;gravitas.wtf</p>
        </div>
      </div>
    </footer>
  );
}
