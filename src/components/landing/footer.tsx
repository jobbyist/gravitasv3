import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/logo";
import { brand, company, contact, ecosystemNav, legalNav, primaryNav, socials } from "@/lib/site";
import { MediumIcon, SubstackIcon, WhatsAppIcon } from "./icons";

const socialIcons = {
  Substack: SubstackIcon,
  Medium: MediumIcon,
  WhatsApp: WhatsAppIcon,
} as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,300px)]">
          <div>
            <Logo className="text-sm" />
            <p className="mt-4 max-w-xs text-sm text-foreground">{brand.manifesto}</p>
            <p className="mt-2 text-xs text-muted-foreground">{brand.positioning}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-14 gap-y-6 sm:flex sm:gap-14">
            <nav className="flex flex-col gap-2.5" aria-label="Footer">
              <p className="eyebrow mb-1">Explore</p>
              {primaryNav.slice(1).map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              {ecosystemNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-2.5" aria-label="Company">
              <p className="eyebrow mb-1">Company</p>
              <Link
                to="/contact"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </Link>
              <Link
                to="/partners"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Partners
              </Link>
              {legalNav.map((item) => (
                <Link
                  key={item.doc}
                  to="/legal/$doc"
                  params={{ doc: item.doc }}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="eyebrow">Get in touch</p>
            <a
              href={`mailto:${contact.general}`}
              className="mt-3 block text-sm text-foreground transition-colors hover:text-accent-c"
            >
              {contact.general}
            </a>
            <div className="mt-5 flex items-center gap-2.5">
              {socials.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Gravitas on ${social.label}`}
                    className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="text-base" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. Reg. no. {company.registrationNumber}. All rights
            reserved.
          </p>
          <p>{brand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
