/**
 * Beta hCG rise arithmetic.
 *
 * Pure functions, no React, no ambient "now" - every function that needs a
 * clock takes it as an argument, which keeps this testable and keeps the
 * prerendered HTML deterministic (a `new Date()` evaluated during SSR would
 * bake the build date into the static page and mismatch on hydration).
 *
 * -- The model --------------------------------------------------------------
 * Early hCG rises approximately exponentially, so between two draws:
 *
 *   v2 = v1 * 2^(hours / T)        T = the doubling time
 *
 * Rearranged, that is all this file computes:
 *
 *   T = hours * ln2 / ln(v2 / v1)
 *
 * The same relation, expressed as the percentage change over a fixed 48-hour
 * window, is what published reference ranges are stated in - so the page can
 * put a 41-hour interval and a 53-hour interval on the same footing.
 *
 * -- What this deliberately does not do -------------------------------------
 * It renders no verdict. There is no "normal", no "reassuring", no viability
 * estimate, and no comparison of the visitor's number against a threshold.
 * Published ranges belong on the page as cited context; applying them to one
 * person's pair of results is interpretation, and interpretation is the
 * clinic's job - they have the ultrasound, the history, and the assay. The
 * arithmetic is the part a calculator can honestly own.
 */

/** A single beta draw: the result, and when the blood was taken. */
export type Draw = {
  /** Serum beta hCG in mIU/mL. */
  value: number;
  at: Date;
};

export type Trend = "rising" | "flat" | "falling";

export type HcgAnalysis = {
  /** Hours between the two draws. Fractional - the time of day matters. */
  hours: number;
  /** v2 / v1. */
  ratio: number;
  /** Percentage change across the interval that was actually measured. */
  percentChange: number;
  /** The same growth rate re-expressed over 48 hours, because that is the
   *  window every published range is quoted in. */
  percentChangePer48h: number;
  /** Hours to double at the observed rate. Null unless rising. */
  doublingHours: number | null;
  /** Hours to halve at the observed rate. Null unless falling. */
  halvingHours: number | null;
  trend: Trend;
};

/**
 * Draws closer together than this are dominated by assay variability rather
 * than by anything the pregnancy is doing: the same tube run twice can differ
 * by a few percent, and over a short interval that noise is most of the
 * signal. The page warns rather than refusing - the arithmetic is still
 * arithmetic, it just should not be read as a growth rate.
 */
export const MIN_RELIABLE_HOURS = 24;

/** Past roughly a week, a single exponential fitted through two points stops
 *  describing anything real: the rise genuinely decelerates as levels climb. */
export const MAX_MODELLED_HOURS = 168;

/** The interval published reference ranges are quoted over. */
export const REFERENCE_WINDOW_HOURS = 48;

/* -- Parsing ------------------------------------------------------------- */

/**
 * Parse the "YYYY-MM-DDTHH:MM" value an <input type="datetime-local"> produces.
 *
 * Local time, not UTC, and that is deliberate: only the interval between the
 * two draws matters here, and across a daylight-saving change the local-time
 * reading is the one that yields the true number of elapsed hours.
 */
export function parseLocalDateTime(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::\d{2})?$/.exec(value);
  if (!match) return null;
  const [, y, mo, d, hh, mi] = match;
  if (+hh > 23 || +mi > 59) return null;

  const date = new Date(+y, +mo - 1, +d, +hh, +mi);
  // Only the calendar part is checked for rollover (Feb 31 must not pass).
  // The hour is left alone on purpose: on a spring-forward date the wall clock
  // skips an hour, so a real input can legitimately land on a time that does
  // not exist and JS shifts it. Rejecting that would be wrong.
  if (
    date.getFullYear() !== +y ||
    date.getMonth() !== +mo - 1 ||
    date.getDate() !== +d
  ) {
    return null;
  }
  return date;
}

/**
 * Parse a typed beta result. Rejects anything that is not a plain positive
 * number, so a stray "mIU/mL" or a negative sign shows the input error rather
 * than silently becoming NaN halfway down the arithmetic.
 */
export function parseLevel(value: string): number | null {
  const trimmed = value.trim();
  if (!/^\d+(\.\d+)?$/.test(trimmed)) return null;
  const level = Number(trimmed);
  return level > 0 ? level : null;
}

export function hoursBetween(from: Date, to: Date): number {
  return (to.getTime() - from.getTime()) / 3_600_000;
}

/* -- Analysis ------------------------------------------------------------ */

const isPositiveFinite = (n: number) => Number.isFinite(n) && n > 0;

/**
 * Compare two draws. Returns null when the pair cannot describe a rate:
 * non-positive or non-finite values, or a second draw at or before the first.
 */
export function analyseDraws(first: Draw, second: Draw): HcgAnalysis | null {
  if (!isPositiveFinite(first.value) || !isPositiveFinite(second.value)) return null;

  const hours = hoursBetween(first.at, second.at);
  if (!isPositiveFinite(hours)) return null;

  const ratio = second.value / first.value;
  const percentChange = (ratio - 1) * 100;
  const percentChangePer48h =
    (Math.pow(ratio, REFERENCE_WINDOW_HOURS / hours) - 1) * 100;

  // ln(ratio) is 0 at ratio 1, which would divide to Infinity rather than to
  // "no doubling time", so the flat case is split out before the division.
  const trend: Trend = ratio > 1 ? "rising" : ratio < 1 ? "falling" : "flat";
  const timeToFactorTwo = (hours * Math.LN2) / Math.abs(Math.log(ratio));

  return {
    hours,
    ratio,
    percentChange,
    percentChangePer48h,
    doublingHours: trend === "rising" ? timeToFactorTwo : null,
    halvingHours: trend === "falling" ? timeToFactorTwo : null,
    trend,
  };
}

/**
 * The level the same exponential predicts `hoursAhead` after the second draw.
 *
 * An extrapolation of two points, nothing more. hCG decelerates as it climbs,
 * so this runs ahead of reality at higher levels - the page says so, and only
 * projects a few days out.
 */
export function projectFrom(
  second: Draw,
  analysis: HcgAnalysis,
  hoursAhead: number
): number {
  return second.value * Math.pow(analysis.ratio, hoursAhead / analysis.hours);
}

/* -- Formatting ---------------------------------------------------------- */

/** "51.4 hours" - clinics talk in hours, so days are not worth the ambiguity. */
export function formatHours(hours: number): string {
  const rounded = Math.round(hours * 10) / 10;
  return `${rounded} hour${rounded === 1 ? "" : "s"}`;
}

/** "+61%" / "-24%". Signed, because the sign is the whole point. */
export function formatPercent(percent: number): string {
  const rounded = Math.round(percent);
  return `${rounded > 0 ? "+" : ""}${rounded}%`;
}

/** Whole mIU/mL with thousands separators. The assay does not report decimals
 *  at these levels, so neither does the projection. */
export function formatLevel(value: number): string {
  return Math.round(value).toLocaleString("en-US");
}
