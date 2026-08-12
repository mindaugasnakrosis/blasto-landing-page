import { describe, expect, it } from "vitest";
import {
  EMBRYO_DAYS,
  GESTATION_DAYS,
  RETRIEVAL_TO_DUE_DAYS,
  addDays,
  daysBetween,
  dueDateFromRetrieval,
  dueDateFromTransfer,
  gestationalAge,
  gestationalAgeAtTransfer,
  milestones,
  parseISODate,
  toISODate,
  type EmbryoDay,
} from "@/lib/dueDate";

const d = (iso: string) => parseISODate(iso)!;

describe("parseISODate", () => {
  it("parses a valid date as UTC", () => {
    expect(toISODate(d("2026-01-01"))).toBe("2026-01-01");
  });

  it("rejects malformed input", () => {
    for (const bad of ["", "2026-1-1", "01/01/2026", "not a date", "2026-01"]) {
      expect(parseISODate(bad)).toBeNull();
    }
  });

  it("rejects impossible dates instead of rolling them over", () => {
    // new Date(2026, 1, 31) silently becomes March 3 — that must not pass.
    expect(parseISODate("2026-02-31")).toBeNull();
    expect(parseISODate("2026-13-01")).toBeNull();
    expect(parseISODate("2025-02-29")).toBeNull();
  });

  it("accepts a real leap day", () => {
    expect(toISODate(d("2028-02-29"))).toBe("2028-02-29");
  });
});

describe("due date from transfer", () => {
  // The published convention: a day-5 blastocyst transfer is due 261 days later.
  it("matches the standard day-5 offset against a hand-computed date", () => {
    expect(toISODate(dueDateFromTransfer(d("2026-01-01"), 5))).toBe("2026-09-19");
  });

  it("uses 266 minus embryo age for each transfer day", () => {
    const cases: [EmbryoDay, number][] = [
      [3, 263],
      [5, 261],
      [6, 260],
    ];
    for (const [day, offset] of cases) {
      const transfer = d("2026-03-15");
      expect(toISODate(dueDateFromTransfer(transfer, day))).toBe(
        toISODate(addDays(transfer, offset))
      );
    }
  });

  it("agrees with the retrieval-based calculation", () => {
    // An embryo transferred on day N was created N days earlier at retrieval;
    // both routes must land on the same due date.
    const retrieval = d("2026-05-10");
    for (const day of EMBRYO_DAYS) {
      const transfer = addDays(retrieval, day);
      expect(toISODate(dueDateFromTransfer(transfer, day))).toBe(
        toISODate(dueDateFromRetrieval(retrieval))
      );
    }
  });

  it("gives a later due date for a younger embryo", () => {
    const t = d("2026-06-01");
    expect(dueDateFromTransfer(t, 3).getTime()).toBeGreaterThan(
      dueDateFromTransfer(t, 5).getTime()
    );
    expect(dueDateFromTransfer(t, 5).getTime()).toBeGreaterThan(
      dueDateFromTransfer(t, 6).getTime()
    );
  });
});

describe("due date from retrieval", () => {
  it("adds 266 days", () => {
    expect(RETRIEVAL_TO_DUE_DAYS).toBe(266);
    expect(daysBetween(d("2026-01-01"), dueDateFromRetrieval(d("2026-01-01")))).toBe(266);
  });
});

describe("gestational age", () => {
  it("is 40w 0d on the due date", () => {
    const due = dueDateFromTransfer(d("2026-01-01"), 5);
    expect(gestationalAge(due, due).label).toBe("40w 0d");
    expect(gestationalAge(due, due).totalDays).toBe(GESTATION_DAYS);
  });

  it("counts from the notional LMP, 280 days before the due date", () => {
    const due = d("2026-09-19");
    expect(gestationalAge(addDays(due, -GESTATION_DAYS), due).totalDays).toBe(0);
  });

  it("reports the transfer-day age that surprises people", () => {
    // You are already ~2.5 weeks pregnant by obstetric dating at transfer.
    expect(gestationalAgeAtTransfer(5).label).toBe("2w 5d");
    expect(gestationalAgeAtTransfer(3).label).toBe("2w 3d");
    expect(gestationalAgeAtTransfer(6).label).toBe("2w 6d");
  });

  it("agrees with the transfer date on the day of transfer", () => {
    const transfer = d("2026-04-02");
    for (const day of EMBRYO_DAYS) {
      const due = dueDateFromTransfer(transfer, day);
      expect(gestationalAge(transfer, due).label).toBe(
        gestationalAgeAtTransfer(day).label
      );
    }
  });
});

describe("milestones", () => {
  it("places each milestone at its gestational week from the notional LMP", () => {
    const due = dueDateFromTransfer(d("2026-01-01"), 5);
    for (const m of milestones(due)) {
      expect(gestationalAge(m.date, due).label).toBe(`${m.weeks}w 0d`);
    }
  });

  it("ends on the due date at 40 weeks", () => {
    const due = dueDateFromTransfer(d("2026-01-01"), 5);
    const last = milestones(due).at(-1)!;
    expect(last.weeks).toBe(40);
    expect(toISODate(last.date)).toBe(toISODate(due));
  });

  it("is ordered", () => {
    const list = milestones(dueDateFromTransfer(d("2026-01-01"), 5));
    for (let i = 1; i < list.length; i++) {
      expect(list[i].date.getTime()).toBeGreaterThan(list[i - 1].date.getTime());
    }
  });
});

describe("DST safety", () => {
  it("is unaffected by daylight-saving transitions", () => {
    // US DST 2026 starts Mar 8 and ends Nov 1. A span crossing both must still
    // be an exact whole number of days — local-time arithmetic would drift.
    const transfer = d("2026-02-20");
    const due = dueDateFromTransfer(transfer, 5);
    expect(daysBetween(transfer, due)).toBe(261);
    expect(due.getUTCHours()).toBe(0);
  });

  it("never drifts across a full year of transfer dates", () => {
    let date = d("2026-01-01");
    for (let i = 0; i < 365; i++) {
      expect(daysBetween(date, dueDateFromTransfer(date, 5))).toBe(261);
      date = addDays(date, 1);
    }
  });
});
