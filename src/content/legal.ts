import { company, contact } from "@/lib/site";

/**
 * Legal page copy. Drafted for gravitas.wtf as it works today. These documents
 * need review by a South African legal professional before they are relied on;
 * see docs/IMPLEMENTATION_CHECKLIST.md.
 */
export interface LegalDoc {
  slug: "privacy" | "terms" | "cookies";
  title: string;
  description: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}

const UPDATED = "14 November 2026";

export const legalDocs: Record<LegalDoc["slug"], LegalDoc> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    description: `How ${company.legalName} collects, uses and protects personal information on gravitas.wtf.`,
    updated: UPDATED,
    sections: [
      {
        heading: "Who we are",
        body: [
          `gravitas.wtf is operated by ${company.legalName} (registration number ${company.registrationNumber}), a company registered in South Africa. In this policy, “Gravitas”, “we” and “us” refer to that company.`,
          `Questions about this policy or your personal information can be sent to ${contact.legal}.`,
        ],
      },
      {
        heading: "Information we collect",
        body: [
          "Account information: if you sign in, we receive your email address and, if you use Google sign-in, your name and profile picture from Google.",
          "Information you send us: the content of emails, WhatsApp messages and enquiries you choose to send.",
          "Technical information: our hosting and database providers record standard request data, such as IP address, browser type and the pages requested, to operate and secure the service.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "To provide and secure your account, respond to enquiries, deliver services you have engaged us for, send service-related emails, and improve the site.",
          "We do not sell personal information. We send marketing emails only where you have asked to receive them, and every marketing email includes a way to unsubscribe.",
        ],
      },
      {
        heading: "Service providers",
        body: [
          "We use trusted providers to run the site, including Vercel (hosting), Supabase (authentication and database), Google (optional sign-in) and an email delivery provider. They process information on our behalf and only as needed to provide their services. Some of these providers store data outside South Africa.",
        ],
      },
      {
        heading: "Retention",
        body: [
          "We keep account information while your account is active and enquiry records for as long as needed to respond and to meet legal, tax and accounting obligations. You can ask us to delete your account at any time.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          `You can ask to access, correct or delete the personal information we hold about you, or object to how we process it, by emailing ${contact.legal}. You may also lodge a complaint with the Information Regulator of South Africa.`,
        ],
      },
      {
        heading: "Changes",
        body: [
          "We will update this page when our practices change and show the date of the latest version at the top.",
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms of Use",
    description: `The terms that apply when you use gravitas.wtf, operated by ${company.legalName}.`,
    updated: UPDATED,
    sections: [
      {
        heading: "About these terms",
        body: [
          `These terms apply to your use of gravitas.wtf, operated by ${company.legalName}. By using the site you agree to them. Client projects are governed by a separate written agreement, which takes precedence for that work.`,
        ],
      },
      {
        heading: "Accounts",
        body: [
          "You are responsible for activity on your account and for keeping access to your email secure. Tell us promptly if you believe your account has been misused.",
        ],
      },
      {
        heading: "Acceptable use",
        body: [
          "Do not misuse the site: no attempts to break security, scrape at a disruptive rate, upload malicious code, or use the site to break the law or infringe others’ rights.",
        ],
      },
      {
        heading: "Content and intellectual property",
        body: [
          "Site content, including Dispatch articles, branding and design, belongs to Gravitas or its licensors. You may share links and short quotations with attribution. Names and marks of client projects belong to their owners.",
        ],
      },
      {
        heading: "Information on the site",
        body: [
          "We work to keep information accurate and clearly labelled by stage, but the site is provided for general information. Products marked as coming soon, in preview or in development may change.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "To the extent permitted by law, Gravitas is not liable for indirect or consequential loss arising from use of the site. Nothing in these terms limits rights you have under South African consumer protection law.",
        ],
      },
      {
        heading: "Governing law and contact",
        body: [
          `These terms are governed by the laws of the Republic of South Africa. Questions: ${contact.legal}.`,
        ],
      },
    ],
  },
  cookies: {
    slug: "cookies",
    title: "Cookie Policy",
    description: "How gravitas.wtf uses cookies and similar browser storage.",
    updated: UPDATED,
    sections: [
      {
        heading: "What we use",
        body: [
          "Essential storage only: when you sign in, your browser stores a session token so you stay signed in. The site also remembers, for the current browser session, that you have already seen the loading screen.",
          "We do not currently use advertising or third-party tracking cookies. If we add analytics or marketing tools that need consent, we will update this page and ask for your consent first.",
        ],
      },
      {
        heading: "Managing storage",
        body: [
          "You can clear cookies and site data in your browser settings at any time. Clearing them signs you out.",
          `Questions: ${contact.legal}.`,
        ],
      },
    ],
  },
};
