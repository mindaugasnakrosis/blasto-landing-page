/**
 * IVF due date arithmetic.
 *
 * Pure functions, no React, no ambient "today" — every function that needs the
 * current date takes it as an argument. That keeps this testable and keeps the
 * prerendered HTML deterministic (a `new Date()` evaluated during SSR would
 * bake a stale date into the static page and mismatch on hydration).
 *
 * ── The dating convention ─────────────────────────────────────────────────
 * Obstetric dating counts 280 days (40 weeks) from the last menstrual period,
 * and LMP is conventionally 14 days before ovulation. In IVF, egg retrieval
 * stands in for ovulation — and unlike natural conception, it's a known date,
 * which is why IVF due dates are more precise than LMP-based estimates.
 *
 *   due date = retrieval + 280 − 14  = retrieval + 266
 *
 * An embryo transferred on day N was created at retrieval N days earlier, so:
 *
 *   due date = transfer + 266 − N
 *
 *   day 3 (cleavage)   → transfer + 263
 *   day 5 (blastocyst) → transfer + 261
 *   day 6 (blastocyst) → transfer + 260
 *
 * Frozen transfers use the same arithmetic: what matters is the embryo's age
 * at transfer, not how long it spent frozen.
 */

export const GESTATION_DAYS = 280;
/** LMP is dated 14 days before ovulation/retrieval by convention. */
export const LMP_OFFSET_DAYS = 14;
export const RETRIEVAL_TO_DUE_DAYS = GESTATION_DAYS - LMP_OFFSET_DAYS; // 266

export type EmbryoDay = 3 | 5 | 6;
export const EMBRYO_DAYS: EmbryoDay[] = [3, 5, 6];

/* ── Date helpers ─────────────────────────────────────────────────────────
 * Everything is anchored to UTC midnight. Working in local time would let a
 * DST transition shift a result by a day, which for a due date is a real bug.
 */

/** Parse a "YYYY-MM-DD" value (what <input type="date"> produces) as UTC. */
export function parseISODate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, y, m, d] = match;
  const date = new Date(Date.UTC(+y, +m - 1, +d));
  // Rejects impossible dates that Date would silently roll over (Feb 31).
  if (
    date.getUTCFullYear() !== +y ||
    date.getUTCMonth() !== +m - 1 ||
    date.getUTCDate() !== +d
  ) {
    return null;
  }
  return date;
}

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 86_400_000);
}

export function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

/* ── Due date ─────────────────────────────────────────────────────────── */

export function dueDateFromRetrieval(retrieval: Date): Date {
  return addDays(retrieval, RETRIEVAL_TO_DUE_DAYS);
}

export function dueDateFromTransfer(transfer: Date, embryoDay: EmbryoDay): Date {
  return addDays(transfer, RETRIEVAL_TO_DUE_DAYS - embryoDay);
}

/** The notional LMP the due date is counted from. Gestational age derives
 *  from this, so it's the anchor for every milestone below. */
export function lmpFromDueDate(dueDate: Date): Date {
  return addDays(dueDate, -GESTATION_DAYS);
}

/* ── Gestational age ──────────────────────────────────────────────────── */

export type GestationalAge = {
  weeks: number;
  days: number;
  totalDays: number;
  /** "4w 3d" — how clinics write it. */
  label: string;
};

export function gestationalAge(on: Date, dueDate: Date): GestationalAge {
  const totalDays = daysBetween(lmpFromDueDate(dueDate), on);
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays - weeks * 7;
  return { weeks, days, totalDays, label: `${weeks}w ${days}d` };
}

/** Gestational age at the moment of transfer — the "you're already ~2.5 weeks
 *  pregnant before the transfer" fact, which surprises most people. */
export function gestationalAgeAtTransfer(embryoDay: EmbryoDay): GestationalAge {
  const totalDays = LMP_OFFSET_DAYS + embryoDay;
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays - weeks * 7;
  return { weeks, days, totalDays, label: `${weeks}w ${days}d` };
}

/* ── Milestones ───────────────────────────────────────────────────────── */

export type Milestone = {
  label: string;
  detail: string;
  weeks: number;
  date: Date;
};

const MILESTONE_SPEC: Omit<Milestone, "date">[] = [
  { weeks: 5, label: "Earliest ultrasound", detail: "A gestational sac is usually visible from around this point.", },
  { weeks: 6, label: "Heartbeat scan", detail: "Many clinics schedule the first viability scan around 6–7 weeks.", },
  { weeks: 8, label: "Discharge to obstetric care", detail: "Fertility clinics often hand over to routine antenatal care around now.", },
  { weeks: 12, label: "End of first trimester", detail: "Often when first-trimester screening is offered.", },
  { weeks: 20, label: "Anatomy scan", detail: "The detailed mid-pregnancy ultrasound.", },
  { weeks: 24, label: "Viability milestone", detail: "The point from which survival outside the womb becomes possible.", },
  { weeks: 28, label: "Third trimester", detail: "", },
  { weeks: 37, label: "Full term", detail: "Anything from here is considered term.", },
  { weeks: 40, label: "Due date", detail: "Only about 4% of babies arrive exactly on it.", },
];

export function milestones(dueDate: Date): Milestone[] {
  const lmp = lmpFromDueDate(dueDate);
  return MILESTONE_SPEC.map((m) => ({ ...m, date: addDays(lmp, m.weeks * 7) }));
}

/* ── Formatting ───────────────────────────────────────────────────────── */

export function formatLong(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatShort(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
