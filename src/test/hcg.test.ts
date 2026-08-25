import { describe, expect, it } from "vitest";
import {
  MIN_RELIABLE_HOURS,
  analyseDraws,
  formatHours,
  formatLevel,
  formatPercent,
  hoursBetween,
  parseLocalDateTime,
  projectFrom,
  type Draw,
} from "@/lib/hcg";

const at = (iso: string) => parseLocalDateTime(iso)!;
const draw = (value: number, iso: string): Draw => ({ value, at: at(iso) });

/** Both draws at the same clock time N hours apart, so the fixtures read as
 *  the interval they are testing. */
const pair = (v1: number, v2: number, hours: number) => {
  const first = draw(v1, "2026-03-02T08:00");
  return analyseDraws(first, {
    value: v2,
    at: new Date(first.at.getTime() + hours * 3_600_000),
  })!;
};

describe("parseLocalDateTime", () => {
  it("parses the value datetime-local produces", () => {
    const d = at("2026-03-02T08:30");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(2);
    expect(d.getDate()).toBe(2);
    expect(d.getHours()).toBe(8);
    expect(d.getMinutes()).toBe(30);
  });

  it("accepts an optional seconds field", () => {
    expect(parseLocalDateTime("2026-03-02T08:30:00")).not.toBeNull();
  });

  it("rejects malformed input", () => {
    for (const bad of ["", "2026-03-02", "08:30", "2026-3-2T08:30", "not a date"]) {
      expect(parseLocalDateTime(bad), bad).toBeNull();
    }
  });

  it("rejects impossible calendar dates instead of rolling them over", () => {
    expect(parseLocalDateTime("2026-02-31T08:00")).toBeNull();
    expect(parseLocalDateTime("2026-13-01T08:00")).toBeNull();
    expect(parseLocalDateTime("2025-02-29T08:00")).toBeNull();
  });

  it("rejects impossible clock times", () => {
    expect(parseLocalDateTime("2026-03-02T24:00")).toBeNull();
    expect(parseLocalDateTime("2026-03-02T08:60")).toBeNull();
  });

  it("accepts a real leap day", () => {
    expect(parseLocalDateTime("2028-02-29T08:00")).not.toBeNull();
  });
});

describe("hoursBetween", () => {
  it("counts fractional hours", () => {
    expect(hoursBetween(at("2026-03-02T08:00"), at("2026-03-04T09:30"))).toBe(49.5);
  });

  it("goes negative when the draws are the wrong way round", () => {
    expect(hoursBetween(at("2026-03-04T08:00"), at("2026-03-02T08:00"))).toBe(-48);
  });
});

describe("analyseDraws", () => {
  it("reads a clean doubling over 48 hours", () => {
    const a = pair(100, 200, 48);
    expect(a.trend).toBe("rising");
    expect(a.doublingHours).toBeCloseTo(48, 6);
    expect(a.halvingHours).toBeNull();
    expect(a.percentChange).toBeCloseTo(100, 6);
    expect(a.percentChangePer48h).toBeCloseTo(100, 6);
  });

  it("normalises a shorter interval onto the 48-hour window", () => {
    // 2^0.5 over 24 hours is the same growth rate as doubling over 48.
    const a = pair(100, 100 * Math.SQRT2, 24);
    expect(a.doublingHours).toBeCloseTo(48, 6);
    expect(a.percentChangePer48h).toBeCloseTo(100, 6);
    // The measured change is what was measured, not the normalised figure.
    expect(a.percentChange).toBeCloseTo(41.42, 2);
  });

  it("reports the same rate whatever interval it was measured over", () => {
    // Doubling every 48h, sampled at four different spacings.
    const rates = [12, 24, 48, 72].map(
      (h) => pair(100, 100 * Math.pow(2, h / 48), h).percentChangePer48h
    );
    for (const rate of rates) expect(rate).toBeCloseTo(100, 6);
  });

  it("turns the published 53%-in-48-hours floor into a doubling time", () => {
    // Barnhart 2004's slowest viable rise works out at a ~78 hour doubling,
    // which is the number this page exists to make legible.
    const a = pair(100, 153, 48);
    expect(a.doublingHours).toBeCloseTo(78.24, 2);
    expect(a.percentChangePer48h).toBeCloseTo(53, 6);
  });

  it("handles a falling level as a halving time", () => {
    const a = pair(100, 50, 72);
    expect(a.trend).toBe("falling");
    expect(a.halvingHours).toBeCloseTo(72, 6);
    expect(a.doublingHours).toBeNull();
    expect(a.percentChange).toBeCloseTo(-50, 6);
    expect(a.percentChangePer48h).toBeCloseTo(-37.0, 1);
  });

  it("treats an unchanged level as flat rather than dividing by zero", () => {
    const a = pair(100, 100, 48);
    expect(a.trend).toBe("flat");
    expect(a.doublingHours).toBeNull();
    expect(a.halvingHours).toBeNull();
    expect(a.percentChange).toBe(0);
    expect(a.percentChangePer48h).toBe(0);
  });

  it("refuses pairs that cannot describe a rate", () => {
    const first = draw(100, "2026-03-02T08:00");
    const later = draw(200, "2026-03-04T08:00");
    const earlier = draw(200, "2026-02-28T08:00");

    expect(analyseDraws(first, earlier)).toBeNull(); // second draw first
    expect(analyseDraws(first, draw(200, "2026-03-02T08:00"))).toBeNull(); // same instant
    expect(analyseDraws({ ...first, value: 0 }, later)).toBeNull();
    expect(analyseDraws(first, { ...later, value: -5 })).toBeNull();
    expect(analyseDraws({ ...first, value: NaN }, later)).toBeNull();
  });

  it("keeps the reliability floor at a full day", () => {
    // The page warns below this; pinned so it cannot drift silently.
    expect(MIN_RELIABLE_HOURS).toBe(24);
  });
});

describe("projectFrom", () => {
  it("continues the observed rate", () => {
    const second = draw(200, "2026-03-04T08:00");
    const a = pair(100, 200, 48);
    expect(projectFrom(second, a, 0)).toBeCloseTo(200, 6);
    expect(projectFrom(second, a, 48)).toBeCloseTo(400, 6);
    expect(projectFrom(second, a, 96)).toBeCloseTo(800, 6);
  });

  it("projects a falling level downwards", () => {
    const second = draw(50, "2026-03-05T08:00");
    const a = pair(100, 50, 72);
    expect(projectFrom(second, a, 72)).toBeCloseTo(25, 6);
  });
});

describe("formatting", () => {
  it("formats hours to one decimal, singular at one", () => {
    expect(formatHours(48)).toBe("48 hours");
    expect(formatHours(51.44)).toBe("51.4 hours");
    expect(formatHours(1)).toBe("1 hour");
  });

  it("signs percentages", () => {
    expect(formatPercent(61.4)).toBe("+61%");
    expect(formatPercent(-24.2)).toBe("-24%");
    expect(formatPercent(0)).toBe("0%");
  });

  it("formats levels as whole mIU/mL", () => {
    expect(formatLevel(1234.6)).toBe("1,235");
    expect(formatLevel(87)).toBe("87");
  });
});
