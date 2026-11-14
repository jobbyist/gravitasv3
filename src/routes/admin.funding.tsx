import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";

import { RequireAuth } from "@/components/site/require-auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import type {
  FundingApplicationEventRow,
  FundingApplicationRow,
} from "@/integrations/supabase/types";
import { FUNDING_ROLES, useAuth } from "@/lib/auth";
import {
  FUNDING_KINDS,
  FUNDING_STATUSES,
  OPEN_STATUSES,
  PRIORITIES,
  daysUntil,
  emptyFundingForm,
  formatMoney,
  fundingFormSchema,
  kindLabel,
  statusLabel,
  statusTone,
  toFormInput,
  type FundingFormInput,
  type FundingStatus,
} from "@/lib/funding";

export const Route = createFileRoute("/admin/funding")({
  component: () => (
    <RequireAuth roles={FUNDING_ROLES}>
      <FundingPage />
    </RequireAuth>
  ),
});

const QUERY_KEY = ["admin", "funding"] as const;

function useApplications() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("funding_applications")
        .select("*")
        .order("deadline", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data ?? [];
    },
  });
}

/** Writes an audit entry. Throws if it can't, so callers never act unlogged. */
async function audit(action: string, entityId: string, metadata: Record<string, unknown> = {}) {
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Your session has expired. Sign in again.");
  const { error } = await supabase.from("audit_logs").insert({
    actor_id: data.user.id,
    action,
    entity_type: "funding_application",
    entity_id: entityId,
    metadata: metadata as never,
  });
  if (error) throw new Error(`Couldn't write the audit log: ${error.message}`);
}

/** Only http(s) links are rendered as anchors, whatever is stored in the row. */
function safeExternalUrl(url: string | null) {
  return url && /^https?:\/\//i.test(url) ? url : null;
}

type Filter = "open" | "all" | FundingStatus;

function FundingPage() {
  const apps = useApplications();
  const [filter, setFilter] = useState<Filter>("open");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<FundingApplicationRow | "new" | null>(null);
  const [viewing, setViewing] = useState<FundingApplicationRow | null>(null);

  const rows = useMemo(() => {
    const all = apps.data ?? [];
    const q = search.trim().toLowerCase();
    return all.filter((r) => {
      const statusOk =
        filter === "all"
          ? true
          : filter === "open"
            ? (OPEN_STATUSES as readonly string[]).includes(r.status)
            : r.status === filter;
      const searchOk =
        !q ||
        [r.programme, r.funder, r.venture, r.notes]
          .filter(Boolean)
          .some((v) => v!.toLowerCase().includes(q));
      return statusOk && searchOk;
    });
  }, [apps.data, filter, search]);

  const summary = useMemo(() => {
    const all = apps.data ?? [];
    const open = all.filter((r) => (OPEN_STATUSES as readonly string[]).includes(r.status));
    const sumBy = (list: FundingApplicationRow[], key: "amount_requested" | "amount_awarded") => {
      const totals = new Map<string, number>();
      for (const r of list) {
        const v = r[key];
        if (v != null) totals.set(r.currency, (totals.get(r.currency) ?? 0) + Number(v));
      }
      return [...totals.entries()].map(([c, v]) => formatMoney(v, c)).join(" · ") || "—";
    };
    return {
      open: open.length,
      submitted: all.filter((r) =>
        ["submitted", "under_review", "shortlisted", "interview"].includes(r.status),
      ).length,
      requested: sumBy(open, "amount_requested"),
      awarded: sumBy(
        all.filter((r) => r.status === "awarded"),
        "amount_awarded",
      ),
      dueSoon: open.filter((r) => {
        const d = daysUntil(r.deadline);
        return d !== null && d >= 0 && d <= 14;
      }).length,
    };
  }, [apps.data]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Funding</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Track grants, accelerators, investment, competitions and credit programmes for Gravitas
            and its ventures.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing("new")}
          className="rounded-full bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110"
        >
          New application
        </button>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Stat label="Open" value={summary.open} />
        <Stat label="Submitted / in review" value={summary.submitted} />
        <Stat label="Due in 14 days" value={summary.dueSoon} highlight={summary.dueSoon > 0} />
        <Stat label="Requested (open)" value={summary.requested} small />
        <Stat label="Awarded" value={summary.awarded} small />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {(["open", "all", ...FUNDING_STATUSES] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                filter === f
                  ? "border-foreground bg-elevated text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "open" ? "Open" : f === "all" ? "All" : statusLabel[f]}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search programmes, funders, ventures"
          aria-label="Search funding applications"
          className="focus-gradient w-full rounded-full border border-control bg-[var(--field-bg)] px-4 py-2 text-sm outline-none sm:w-72"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-border">
        {apps.isLoading ? (
          <p className="p-6 text-sm text-muted-foreground">Loading applications…</p>
        ) : apps.isError ? (
          <p role="alert" className="p-6 text-sm text-error">
            Couldn’t load applications: {(apps.error as Error).message}
          </p>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-medium">
              {(apps.data ?? []).length === 0 ? "No funding applications yet" : "Nothing matches"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {(apps.data ?? []).length === 0
                ? "Add the programmes you’re researching or applying to, and track every deadline here."
                : "Try another filter or search."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-border bg-card">
                <tr className="meta-label">
                  <th className="px-4 py-3 font-medium">Programme</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Deadline</th>
                  <th className="px-4 py-3 font-medium">Requested</th>
                  <th className="px-4 py-3 font-medium">Next action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="cursor-pointer transition-colors hover:bg-card"
                    onClick={() => setViewing(r)}
                  >
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="text-left font-medium text-foreground hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewing(r);
                        }}
                      >
                        {r.programme}
                      </button>
                      <p className="text-xs text-muted-foreground">
                        {r.funder}
                        {r.venture ? ` · for ${r.venture}` : ""}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {kindLabel[r.kind as keyof typeof kindLabel] ?? r.kind}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={r.status} />
                    </td>
                    <td className="px-4 py-3">
                      <Deadline
                        date={r.deadline}
                        open={(OPEN_STATUSES as readonly string[]).includes(r.status)}
                      />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatMoney(r.amount_requested, r.currency)}
                    </td>
                    <td className="max-w-[220px] px-4 py-3 text-muted-foreground">
                      <span className="line-clamp-1">{r.next_action ?? "—"}</span>
                      {r.next_action_due ? (
                        <span className="text-xs">by {r.next_action_due}</span>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FundingFormSheet
        target={editing}
        onClose={() => setEditing(null)}
        onSaved={(row) => {
          setEditing(null);
          setViewing(row);
        }}
      />
      <FundingDetailSheet
        row={viewing ? ((apps.data ?? []).find((r) => r.id === viewing.id) ?? viewing) : null}
        onClose={() => setViewing(null)}
        onEdit={(row) => {
          setViewing(null);
          setEditing(row);
        }}
      />
    </div>
  );
}

function Stat({
  label,
  value,
  small,
  highlight,
}: {
  label: string;
  value: ReactNode;
  small?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border bg-card p-4 ${highlight ? "border-warning/60" : "border-border"}`}
    >
      <p className="meta-label">{label}</p>
      <p className={`mt-2 font-display font-bold ${small ? "text-lg" : "text-3xl"}`}>{value}</p>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusTone(status)}`}
    >
      {statusLabel[status as FundingStatus] ?? status}
    </span>
  );
}

function Deadline({ date, open }: { date: string | null; open: boolean }) {
  if (!date) return <span className="text-muted-foreground">—</span>;
  const d = daysUntil(date);
  let note = "";
  let tone = "text-muted-foreground";
  if (open && d !== null) {
    if (d < 0) {
      note = `${Math.abs(d)}d overdue`;
      tone = "text-error";
    } else if (d === 0) {
      note = "today";
      tone = "text-warning";
    } else if (d <= 14) {
      note = `in ${d}d`;
      tone = "text-warning";
    } else {
      note = `in ${d}d`;
    }
  }
  return (
    <span>
      <span className="text-foreground">{date}</span>
      {note ? <span className={`ml-2 text-xs ${tone}`}>{note}</span> : null}
    </span>
  );
}

/* ------------------------------- Form sheet ------------------------------- */

function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-xs font-medium text-foreground">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1 text-xs text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "focus-gradient w-full rounded-md border border-control bg-[var(--field-bg)] px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground";

function FundingFormSheet({
  target,
  onClose,
  onSaved,
}: {
  target: FundingApplicationRow | "new" | null;
  onClose: () => void;
  onSaved: (row: FundingApplicationRow) => void;
}) {
  const open = target !== null;
  const isNew = target === "new";
  const key = isNew ? "new" : (target?.id ?? "none");
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-border bg-background sm:max-w-xl"
      >
        <SheetHeader>
          <SheetTitle className="font-display">
            {isNew ? "New funding application" : "Edit application"}
          </SheetTitle>
          <SheetDescription>
            Required: programme and funder. Everything else is optional.
          </SheetDescription>
        </SheetHeader>
        {open ? (
          <FundingForm
            key={key}
            initial={isNew || !target ? emptyFundingForm() : toFormInput(target)}
            existing={isNew ? null : target}
            onSaved={onSaved}
            onCancel={onClose}
          />
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function FundingForm({
  initial,
  existing,
  onSaved,
  onCancel,
}: {
  initial: FundingFormInput;
  existing: FundingApplicationRow | null;
  onSaved: (row: FundingApplicationRow) => void;
  onCancel: () => void;
}) {
  const qc = useQueryClient();
  const { user } = useAuth();
  const [values, setValues] = useState<FundingFormInput>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof FundingFormInput>(k: K, v: FundingFormInput[K]) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const save = useMutation({
    mutationFn: async () => {
      const parsed = fundingFormSchema.safeParse(values);
      if (!parsed.success) {
        const next: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
          const k = String(issue.path[0]);
          next[k] ??= issue.message;
        }
        setErrors(next);
        throw new Error("Please fix the highlighted fields.");
      }
      setErrors({});
      if (existing) {
        const { data, error } = await supabase
          .from("funding_applications")
          .update(parsed.data)
          .eq("id", existing.id)
          .select()
          .single();
        if (error) throw new Error(error.message);
        await audit("funding.update", data.id, { programme: data.programme });
        return data;
      }
      const { data, error } = await supabase
        .from("funding_applications")
        .insert({ ...parsed.data, created_by: user?.id ?? null, owner_id: user?.id ?? null })
        .select()
        .single();
      if (error) throw new Error(error.message);
      await audit("funding.create", data.id, { programme: data.programme });
      return data;
    },
    onSuccess: (row) => {
      void qc.invalidateQueries({ queryKey: QUERY_KEY });
      void qc.invalidateQueries({ queryKey: ["admin", "funding-events", row.id] });
      toast.success(existing ? "Application updated" : "Application added");
      onSaved(row);
    },
    onError: (e) => toast.error((e as Error).message),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    save.mutate();
  }

  const text = (
    k: keyof FundingFormInput,
    label: string,
    props: Record<string, unknown> = {},
    className?: string,
  ) => (
    <Field label={label} htmlFor={`f-${k}`} error={errors[k]} className={className}>
      <input
        id={`f-${k}`}
        value={values[k] as string}
        onChange={(e) => set(k, e.target.value as never)}
        aria-invalid={errors[k] ? true : undefined}
        aria-describedby={errors[k] ? `f-${k}-error` : undefined}
        className={inputClass}
        {...props}
      />
    </Field>
  );

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-5 pb-8" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        {text(
          "programme",
          "Programme *",
          { placeholder: "e.g. Parallel for Startups" },
          "sm:col-span-2",
        )}
        {text("funder", "Funder / organisation *", { placeholder: "e.g. Parallel Web Systems" })}
        {text("venture", "For (venture or Gravitas)", {
          placeholder: "Gravitas, SkinLabs, Puntr…",
        })}
        <Field label="Type" htmlFor="f-kind">
          <select
            id="f-kind"
            value={values.kind}
            onChange={(e) => set("kind", e.target.value as never)}
            className={inputClass}
          >
            {FUNDING_KINDS.map((k) => (
              <option key={k} value={k}>
                {kindLabel[k]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status" htmlFor="f-status">
          <select
            id="f-status"
            value={values.status}
            onChange={(e) => set("status", e.target.value as never)}
            className={inputClass}
          >
            {FUNDING_STATUSES.map((s) => (
              <option key={s} value={s}>
                {statusLabel[s]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Priority" htmlFor="f-priority">
          <select
            id="f-priority"
            value={values.priority}
            onChange={(e) => set("priority", e.target.value as never)}
            className={inputClass}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p[0]!.toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </Field>
        {text("currency", "Currency", { maxLength: 3, placeholder: "ZAR" })}
        {text("amount_requested", "Amount requested", { inputMode: "decimal", placeholder: "0" })}
        {text("amount_awarded", "Amount awarded", { inputMode: "decimal", placeholder: "0" })}
      </div>

      <fieldset className="grid gap-4 border-t border-border pt-5 sm:grid-cols-3">
        <legend className="meta-label mb-3">Dates</legend>
        {text("deadline", "Deadline", { type: "date" })}
        {text("submitted_on", "Submitted on", { type: "date" })}
        {text("decision_expected", "Decision expected", { type: "date" })}
      </fieldset>

      <fieldset className="grid gap-4 border-t border-border pt-5 sm:grid-cols-[minmax(0,1fr)_160px]">
        <legend className="meta-label mb-3">Next step</legend>
        {text("next_action", "Next action", { placeholder: "e.g. Draft pitch deck" })}
        {text("next_action_due", "Due", { type: "date" })}
      </fieldset>

      <fieldset className="grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
        <legend className="meta-label mb-3">Details</legend>
        {text("url", "Programme link", { type: "url", placeholder: "https://" }, "sm:col-span-2")}
        {text("contact_name", "Contact name")}
        {text("contact_email", "Contact email", { type: "email" })}
        <Field label="Notes" htmlFor="f-notes" error={errors["notes"]} className="sm:col-span-2">
          <textarea
            id="f-notes"
            rows={5}
            value={values.notes}
            onChange={(e) => set("notes", e.target.value)}
            className={inputClass}
            placeholder="Eligibility, requirements, documents needed, links to drafts…"
          />
        </Field>
      </fieldset>

      <div className="flex justify-end gap-3 border-t border-border pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={save.isPending}
          className="rounded-full bg-accent-gradient px-5 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110 disabled:opacity-60"
        >
          {save.isPending ? "Saving…" : existing ? "Save changes" : "Add application"}
        </button>
      </div>
    </form>
  );
}

/* ------------------------------ Detail sheet ------------------------------ */

function FundingDetailSheet({
  row,
  onClose,
  onEdit,
}: {
  row: FundingApplicationRow | null;
  onClose: () => void;
  onEdit: (row: FundingApplicationRow) => void;
}) {
  return (
    <Sheet open={row !== null} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-border bg-background sm:max-w-xl"
      >
        {row ? <FundingDetail key={row.id} row={row} onClose={onClose} onEdit={onEdit} /> : null}
      </SheetContent>
    </Sheet>
  );
}

function FundingDetail({
  row,
  onClose,
  onEdit,
}: {
  row: FundingApplicationRow;
  onClose: () => void;
  onEdit: (row: FundingApplicationRow) => void;
}) {
  const qc = useQueryClient();
  const { user } = useAuth();
  const [note, setNote] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const events = useQuery({
    queryKey: ["admin", "funding-events", row.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("funding_application_events")
        .select("*")
        .eq("application_id", row.id)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data ?? [];
    },
  });

  const changeStatus = useMutation({
    mutationFn: async (status: FundingStatus) => {
      const patch: Partial<FundingApplicationRow> = { status };
      if (status === "submitted" && !row.submitted_on) {
        patch.submitted_on = new Intl.DateTimeFormat("en-CA", {
          timeZone: "Africa/Johannesburg",
        }).format(new Date());
      }
      const { error } = await supabase.from("funding_applications").update(patch).eq("id", row.id);
      if (error) throw new Error(error.message);
      await audit("funding.status", row.id, { from: row.status, to: status });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: QUERY_KEY });
      void qc.invalidateQueries({ queryKey: ["admin", "funding-events", row.id] });
      toast.success("Status updated");
    },
    onError: (e) => toast.error((e as Error).message),
  });

  const addNote = useMutation({
    mutationFn: async () => {
      const body = note.trim();
      if (!body) throw new Error("Write a note first.");
      const { error } = await supabase
        .from("funding_application_events")
        .insert({ application_id: row.id, kind: "note", body, created_by: user?.id ?? null });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      setNote("");
      void qc.invalidateQueries({ queryKey: ["admin", "funding-events", row.id] });
    },
    onError: (e) => toast.error((e as Error).message),
  });

  const remove = useMutation({
    mutationFn: async () => {
      // Log first: a delete that can't be audited doesn't happen.
      await audit("funding.delete", row.id, { programme: row.programme });
      const { error } = await supabase.from("funding_applications").delete().eq("id", row.id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success("Application deleted");
      onClose();
    },
    onError: (e) => toast.error((e as Error).message),
  });

  const details: [string, ReactNode][] = [
    ["Funder", row.funder],
    ["For", row.venture ?? "—"],
    ["Type", kindLabel[row.kind as keyof typeof kindLabel] ?? row.kind],
    ["Priority", row.priority],
    ["Requested", formatMoney(row.amount_requested, row.currency)],
    ["Awarded", formatMoney(row.amount_awarded, row.currency)],
    [
      "Deadline",
      <Deadline
        key="d"
        date={row.deadline}
        open={(OPEN_STATUSES as readonly string[]).includes(row.status)}
      />,
    ],
    ["Submitted", row.submitted_on ?? "—"],
    ["Decision expected", row.decision_expected ?? "—"],
    [
      "Contact",
      row.contact_name || row.contact_email
        ? `${row.contact_name ?? ""} ${row.contact_email ? `<${row.contact_email}>` : ""}`.trim()
        : "—",
    ],
  ];

  return (
    <div className="pb-8">
      <SheetHeader>
        <SheetTitle className="pr-6 font-display text-2xl">{row.programme}</SheetTitle>
        <SheetDescription asChild>
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill status={row.status} />
            {safeExternalUrl(row.url) ? (
              <a
                href={safeExternalUrl(row.url) ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline"
              >
                Programme link ↗
              </a>
            ) : null}
          </div>
        </SheetDescription>
      </SheetHeader>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <label htmlFor="quick-status" className="sr-only">
          Change status
        </label>
        <select
          id="quick-status"
          value={row.status}
          disabled={changeStatus.isPending}
          onChange={(e) => changeStatus.mutate(e.target.value as FundingStatus)}
          className={`${inputClass} w-auto`}
        >
          {FUNDING_STATUSES.map((s) => (
            <option key={s} value={s}>
              {statusLabel[s]}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => onEdit(row)}
          className="rounded-full border border-foreground/40 px-4 py-2 text-sm hover:bg-elevated"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => setConfirmDelete(true)}
          className="rounded-full px-4 py-2 text-sm text-error hover:bg-error/10"
        >
          Delete
        </button>
      </div>

      {row.next_action ? (
        <div className="mt-6 rounded-lg border border-border bg-card p-4">
          <p className="meta-label">
            Next action{row.next_action_due ? ` · due ${row.next_action_due}` : ""}
          </p>
          <p className="mt-1 text-sm">{row.next_action}</p>
        </div>
      ) : null}

      <dl className="mt-6 divide-y divide-border border-y border-border">
        {details.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-2.5 text-sm">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="text-right capitalize-first">{v}</dd>
          </div>
        ))}
      </dl>

      {row.notes ? (
        <div className="mt-6">
          <p className="meta-label">Notes</p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{row.notes}</p>
        </div>
      ) : null}

      <section className="mt-8">
        <p className="meta-label">Timeline</p>
        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addNote.mutate();
          }}
        >
          <label htmlFor="note" className="sr-only">
            Add a note
          </label>
          <input
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note or update"
            className={inputClass}
          />
          <button
            type="submit"
            disabled={addNote.isPending}
            className="shrink-0 rounded-md border border-control px-3 text-sm hover:bg-elevated disabled:opacity-60"
          >
            Add
          </button>
        </form>
        <ol className="mt-4 space-y-3">
          {(events.data ?? []).map((ev: FundingApplicationEventRow) => (
            <li key={ev.id} className="border-l border-border pl-4">
              <p className="text-xs text-muted-foreground">
                {new Intl.DateTimeFormat("en-ZA", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "Africa/Johannesburg",
                }).format(new Date(ev.created_at))}
              </p>
              <p className="mt-0.5 text-sm">
                {ev.kind === "created"
                  ? `Added as ${statusLabel[ev.to_status as FundingStatus] ?? ev.to_status}`
                  : ev.kind === "status_change"
                    ? `${statusLabel[ev.from_status as FundingStatus] ?? ev.from_status} → ${statusLabel[ev.to_status as FundingStatus] ?? ev.to_status}`
                    : ev.body}
              </p>
            </li>
          ))}
          {events.isLoading ? <li className="text-sm text-muted-foreground">Loading…</li> : null}
        </ol>
      </section>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this application?</AlertDialogTitle>
            <AlertDialogDescription>
              “{row.programme}” and its timeline will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => remove.mutate()}
              className="bg-error text-primary-foreground hover:bg-error/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
