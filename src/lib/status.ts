/**
 * Status vocabulary from the Brand Blueprint (pages 4, 7, 9, 14).
 * Labels tell visitors what is live, what is a preview, what is on a waitlist.
 */
export const STATUS_KEYS = [
  "core",
  "waitlist",
  "preview",
  "live",
  "coming-soon",
  "in-development",
  "testing",
  "building",
] as const;

export type StatusKey = (typeof STATUS_KEYS)[number];

export interface StatusMeta {
  label: string;
  description: string;
}

export const statusMeta: Record<StatusKey, StatusMeta> = {
  core: { label: "Core", description: "Part of the platform foundation." },
  waitlist: { label: "Waitlist", description: "Not open yet. Join the waitlist for early access." },
  preview: { label: "Preview", description: "Works, but not final. Expect changes." },
  live: { label: "Live", description: "Running in production." },
  "coming-soon": { label: "Coming soon", description: "Planned. Not available yet." },
  "in-development": { label: "In development", description: "Being built right now." },
  testing: { label: "Testing", description: "Built and being tested before release." },
  building: {
    label: "Building",
    description: "Sample content shown until this is connected to live data.",
  },
};
