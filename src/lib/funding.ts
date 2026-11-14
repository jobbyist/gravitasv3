import { z } from "zod";

import type { FundingApplicationRow } from "@/integrations/supabase/types";

export const FUNDING_STATUSES = [
  "researching",
  "drafting",
  "submitted",
  "under_review",
  "shortlisted",
  "interview",
  "awarded",
  "rejected",
  "withdrawn",
] as const;
export type FundingStatus = (typeof FUNDING_STATUSES)[number];

export const FUNDING_KINDS = [
  "grant",
  "accelerator",
  "equity",
  "debt",
  "competition",
  "credits",
  "partnership",
  "other",
] as const;

export const PRIORITIES = ["low", "medium", "high"] as const;

export const statusLabel: Record<FundingStatus, string> = {
  researching: "Researching",
  drafting: "Drafting",
  submitted: "Submitted",
  under_review: "Under review",
  shortlisted: "Shortlisted",
  interview: "Interview / pitch",
  awarded: "Awarded",
  rejected: "Not successful",
  withdrawn: "Withdrawn",
};

export const kindLabel: Record<(typeof FUNDING_KINDS)[number], string> = {
  grant: "Grant",
  accelerator: "Accelerator",
  equity: "Equity investment",
  debt: "Loan / debt",
  competition: "Competition / pitch",
  credits: "Cloud / API credits",
  partnership: "Partnership",
  other: "Other",
};

export const OPEN_STATUSES: readonly FundingStatus[] = [
  "researching",
  "drafting",
  "submitted",
  "under_review",
  "shortlisted",
  "interview",
];

export function statusTone(status: string) {
  if (status === "awarded") return "border-live/60 bg-live/10 text-live";
  if (status === "rejected" || status === "withdrawn") return "border-border text-muted-foreground";
  if (["submitted", "under_review", "shortlisted", "interview"].includes(status))
    return "border-accent-b/60 bg-accent-b/10 text-accent-b";
  return "border-dashed border-muted-foreground text-muted-foreground";
}

const optionalText = z
  .string()
  .trim()
  .max(2000)
  .transform((v) => (v === "" ? null : v));
const optionalDate = z
  .string()
  .trim()
  .refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), "Use YYYY-MM-DD")
  .transform((v) => (v === "" ? null : v));
const optionalAmount = z
  .string()
  .trim()
  .refine(
    (v) => v === "" || (!Number.isNaN(Number(v)) && Number(v) >= 0),
    "Enter a positive number",
  )
  .transform((v) => (v === "" ? null : Number(v)));

export const fundingFormSchema = z.object({
  programme: z.string().trim().min(2, "Programme name is required").max(200),
  funder: z.string().trim().min(2, "Funder or organisation is required").max(200),
  kind: z.enum(FUNDING_KINDS),
  status: z.enum(FUNDING_STATUSES),
  priority: z.enum(PRIORITIES),
  venture: optionalText,
  amount_requested: optionalAmount,
  amount_awarded: optionalAmount,
  currency: z
    .string()
    .trim()
    .regex(/^[A-Z]{3}$/, "Use a 3-letter currency code, e.g. ZAR"),
  deadline: optionalDate,
  submitted_on: optionalDate,
  decision_expected: optionalDate,
  next_action: optionalText,
  next_action_due: optionalDate,
  url: z
    .string()
    .trim()
    .refine((v) => v === "" || /^https?:\/\//.test(v), "Must start with http:// or https://")
    .transform((v) => (v === "" ? null : v)),
  contact_name: optionalText,
  contact_email: z
    .string()
    .trim()
    .refine((v) => v === "" || z.string().email().safeParse(v).success, "Enter a valid email")
    .transform((v) => (v === "" ? null : v)),
  notes: z
    .string()
    .trim()
    .max(10000)
    .transform((v) => (v === "" ? null : v)),
});

export type FundingFormInput = z.input<typeof fundingFormSchema>;
export type FundingFormValues = z.output<typeof fundingFormSchema>;

export function emptyFundingForm(): FundingFormInput {
  return {
    programme: "",
    funder: "",
    kind: "grant",
    status: "researching",
    priority: "medium",
    venture: "",
    amount_requested: "",
    amount_awarded: "",
    currency: "ZAR",
    deadline: "",
    submitted_on: "",
    decision_expected: "",
    next_action: "",
    next_action_due: "",
    url: "",
    contact_name: "",
    contact_email: "",
    notes: "",
  };
}

export function toFormInput(row: FundingApplicationRow): FundingFormInput {
  return {
    programme: row.programme,
    funder: row.funder,
    kind: row.kind as FundingFormInput["kind"],
    status: row.status as FundingFormInput["status"],
    priority: row.priority as FundingFormInput["priority"],
    venture: row.venture ?? "",
    amount_requested: row.amount_requested?.toString() ?? "",
    amount_awarded: row.amount_awarded?.toString() ?? "",
    currency: row.currency,
    deadline: row.deadline ?? "",
    submitted_on: row.submitted_on ?? "",
    decision_expected: row.decision_expected ?? "",
    next_action: row.next_action ?? "",
    next_action_due: row.next_action_due ?? "",
    url: row.url ?? "",
    contact_name: row.contact_name ?? "",
    contact_email: row.contact_email ?? "",
    notes: row.notes ?? "",
  };
}

export function formatMoney(amount: number | null, currency: string) {
  if (amount == null) return "—";
  try {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString("en-ZA")}`;
  }
}

/** Whole days from today (Africa/Johannesburg) to an ISO date. Negative = past. */
export function daysUntil(date: string | null, today = new Date()) {
  if (!date) return null;
  const todayIso = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Johannesburg" }).format(
    today,
  );
  const ms = Date.parse(`${date}T00:00:00Z`) - Date.parse(`${todayIso}T00:00:00Z`);
  return Math.round(ms / 86_400_000);
}
