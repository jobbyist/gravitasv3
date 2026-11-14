import { SITE_NAME, absoluteUrl, brand, company, contact, socials } from "./site";

const DEFAULT_OG = "/og-image.png";

interface PageHeadOptions {
  title: string;
  description: string;
  path: string;
  image?: string | null | undefined;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string | null | undefined;
  jsonLd?: Record<string, unknown>[];
}

/**
 * One place to build a page's <head>: title, description, canonical URL,
 * Open Graph, Twitter and optional JSON-LD. Every public route uses it.
 */
export function pageHead({
  title,
  description,
  path,
  image,
  type = "website",
  noindex = false,
  publishedTime,
  jsonLd = [],
}: PageHeadOptions) {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? DEFAULT_OG);
  const fullTitle = title.includes("GRAVITAS") ? title : `${title} | ${SITE_NAME}`;

  const meta = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    ...(publishedTime ? [{ property: "article:published_time", content: publishedTime }] : []),
    ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
  ];

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify(data),
    })),
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gravitas",
  legalName: company.legalName,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/icons/icon-512.png"),
  description: brand.description,
  slogan: brand.manifesto,
  email: contact.general,
  founder: { "@type": "Person", name: company.founder },
  address: { "@type": "PostalAddress", addressCountry: "ZA" },
  sameAs: socials.filter((s) => s.label !== "WhatsApp").map((s) => s.href),
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
