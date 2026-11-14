/**
 * Site-wide configuration: canonical domain, brand copy, contact routing,
 * navigation and the only three social channels Gravitas publishes.
 */
export const SITE_URL = "https://gravitas.wtf";
export const SITE_NAME = "GRAVITAS.WTF";

export const brand = {
  positioning: "An AI-First Venture Studio",
  manifesto: "Building things that probably shouldn’t exist. Until they do.",
  tagline: "Building what comes next. Now.",
  description:
    "Gravitas is an AI-first venture studio. We combine artificial intelligence, creative thinking and engineering to turn ambitious ideas into products, platforms and ventures.",
} as const;

export const company = {
  legalName: "Gravitas Industries (Pty) Ltd",
  registrationNumber: "2024/596436/07",
  country: "South Africa",
  founder: "Michael E. Chigbu",
} as const;

export const contact = {
  general: "hey@gravitas.wtf",
  legal: "legal@gravitas.wtf",
  partners: "partner@gravitas.wtf",
  billing: "billing@gravitas.wtf",
  whatsappNumber: "+27 68 020 0749",
  whatsappUrl: "https://wa.me/+27680200749",
} as const;

export const socials = [
  { label: "Substack", href: "https://gravitasindustries.substack.com" },
  { label: "Medium", href: "https://gravitas.medium.com" },
  { label: "WhatsApp", href: contact.whatsappUrl },
] as const;

export const primaryNav = [
  { label: "Home", to: "/" },
  { label: "Studio", to: "/studio" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Dispatch", to: "/dispatch" },
  { label: "About", to: "/about" },
] as const;

export const ecosystemNav = [
  {
    label: "Community",
    to: "/community",
    note: "Coming January 2027",
    description: "A place for builders, clients and collaborators.",
  },
  {
    label: "Origin",
    to: "/origin",
    note: "Coming January 2027",
    description: "An AI coding assistant from Gravitas.",
  },
] as const;

export const legalNav = [
  { label: "Privacy", doc: "privacy" },
  { label: "Terms", doc: "terms" },
  { label: "Cookies", doc: "cookies" },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
