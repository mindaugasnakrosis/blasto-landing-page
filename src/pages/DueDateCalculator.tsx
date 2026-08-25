import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Sparkles } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StoreBadges from "@/components/landing/StoreBadges";
import { isAppLive } from "@/lib/site";
import { calculatorFaqs } from "@/lib/calculatorFaqs";
import { cn } from "@/lib/utils";
import {
  EMBRYO_DAYS,
  dueDateFromRetrieval,
  dueDateFromTransfer,
  formatLong,
  formatShort,
  gestationalAge,
  gestationalAgeAtTransfer,
  milestones,
  parseISODate,
  type EmbryoDay,
} from "@/lib/dueDate";

type Mode = "transfer" | "retrieval";

/** Today at UTC midnight, matching the UTC-anchored dates in lib/dueDate.
 *  Resolved on the client only — see the effect below. */
function todayUTC(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

const DueDateCalculator = () => {
  const [mode, setMode] = useState<Mode>("transfer");
  const [dateValue, setDateValue] = useState("");
  const [embryoDay, setEmbryoDay] = useState<EmbryoDay>(5);

  // Deliberately not initialised during render: the prerendered HTML would
  // otherwise bake in the build date and mismatch on hydration.
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(todayUTC()), []);

  const parsed = parseISODate(dateValue);
  const dueDate = useMemo(() => {
    if (!parsed) return null;
    return mode === "transfer"
      ? dueDateFromTransfer(parsed, embryoDay)
      : dueDateFromRetrieval(parsed);
  }, [parsed, mode, embryoDay]);

  const currentAge = today && dueDate ? gestationalAge(today, dueDate) : null;
  const upcoming = dueDate
    ? milestones(dueDate).filter((m) => !today || m.date >= today)
    : [];

  return (
    <PageShell width="wide">
      <h1 className="text-3xl sm:text-4xl font-bold">
        IVF due date <span className="text-gradient">calculator</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        Enter your embryo transfer date — or your egg retrieval date — and see your
        estimated due date, how far along you are today, and when each milestone
        falls. Works for fresh and frozen transfers, day 3, 5, or 6.
      </p>

      {/* ── Calculator ───────────────────────────────────────────────── */}
      <div className="mt-10 rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
        <div className="inline-flex rounded-full bg-muted p-1 text-sm font-medium">
          {(
            [
              ["transfer", "Transfer date"],
              ["retrieval", "Retrieval date"],
            ] as [Mode, string][]
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              aria-pressed={mode === value}
              className={cn(
                "rounded-full px-4 py-1.5 transition-colors",
                mode === value
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="cycle-date"
              className="block text-sm font-medium text-foreground"
            >
              {mode === "transfer" ? "Embryo transfer date" : "Egg retrieval date"}
            </label>
            <input
              id="cycle-date"
              type="date"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              {mode === "transfer"
                ? "On your clinic paperwork or discharge instructions."
                : "The day your eggs were collected."}
            </p>
          </div>

          {mode === "transfer" && (
            <div>
              <span className="block text-sm font-medium text-foreground">
                Embryo age at transfer
              </span>
              <div className="mt-2 flex gap-2">
                {EMBRYO_DAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setEmbryoDay(day)}
                    aria-pressed={embryoDay === day}
                    className={cn(
                      "flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                      embryoDay === day
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    )}
                  >
                    Day {day}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Day 5 and 6 are blastocysts; day 3 is a cleavage-stage embryo.
              </p>
            </div>
          )}
        </div>

        {/* Results */}
        {dueDate && (
          <div className="mt-8 border-t border-border/60 pt-8">
            <p className="text-sm font-medium text-blasto-rose-dark">
              Estimated due date
            </p>
            <p className="mt-1 text-2xl sm:text-3xl font-bold">{formatLong(dueDate)}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {currentAge && (
                <div className="rounded-xl bg-blasto-cream/70 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    How far along today
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    {currentAge.totalDays < 0
                      ? "Not started yet"
                      : currentAge.totalDays > 294
                        ? "Past due date"
                        : currentAge.label}
                  </p>
                </div>
              )}
              {mode === "transfer" && (
                <div className="rounded-xl bg-blasto-cream/70 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Gestational age on transfer day
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    {gestationalAgeAtTransfer(embryoDay).label}
                  </p>
                </div>
              )}
            </div>

            {upcoming.length > 0 && (
              <div className="mt-8">
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <CalendarDays className="h-4 w-4 text-blasto-rose-dark" />
                  What's ahead
                </h2>
                <ul className="mt-3 divide-y divide-border/50">
                  {upcoming.map((m) => (
                    <li
                      key={m.weeks}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
                    >
                      <div>
                        <span className="font-medium">{m.label}</span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {m.weeks} weeks
                        </span>
                        {m.detail && (
                          <p className="text-sm text-muted-foreground">{m.detail}</p>
                        )}
                      </div>
                      <span className="text-sm tabular-nums text-muted-foreground">
                        {formatShort(m.date)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {dateValue && !parsed && (
          <p className="mt-6 text-sm text-amber-700">
            That doesn't look like a valid date — please check it.
          </p>
        )}
      </div>

      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        An estimate, not a medical record. Your clinic may date your pregnancy
        slightly differently or adjust after an early scan — their date is the one
        to go by.
      </p>

      {/* ── Explanatory content ──────────────────────────────────────── */}
      <div className="mt-16 max-w-3xl space-y-9">
        <section>
          <h2 className="text-2xl font-bold">How IVF due dates are worked out</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Pregnancy is dated as 280 days — 40 weeks — from the last menstrual
            period, and by convention the LMP falls 14 days before ovulation. In an
            IVF cycle, egg retrieval stands in for ovulation, so the due date lands
            266 days after retrieval.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            An embryo transferred on day 5 was created five days before that
            transfer, so those five days come off the total. That's where the
            familiar numbers come from:
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["Day 3 (cleavage-stage)", "transfer date + 263 days"],
              ["Day 5 (blastocyst)", "transfer date + 261 days"],
              ["Day 6 (blastocyst)", "transfer date + 260 days"],
              ["Egg retrieval", "retrieval date + 266 days"],
            ].map(([label, formula]) => (
              <li
                key={label}
                className="flex flex-wrap justify-between gap-x-4 rounded-lg bg-blasto-cream/60 px-4 py-2.5"
              >
                <span className="font-medium">{label}</span>
                <span className="text-muted-foreground tabular-nums">{formula}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Why IVF dating is more precise</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            With natural conception, ovulation is estimated from the last period and
            can be several days out. With IVF, the date of fertilization is known
            exactly — which is why an IVF due date carries none of that guesswork.
            It's still an estimate of when labour starts, but the gestational age
            behind it is solid.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Frozen transfers</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Time in storage doesn't count. A day-5 blastocyst transferred after two
            years frozen is dated exactly like a fresh day-5 transfer, because what
            matters is the embryo's age at transfer. Use the same setting above.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">
            You're further along than you'd think
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Because gestational age counts from a notional period two weeks before
            the embryo existed, you are already about two and a half weeks pregnant
            on transfer day — 2w 5d for a day-5 blastocyst. It catches almost
            everyone out, and it's why the first scan comes sooner than expected.
          </p>
        </section>
      </div>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold">Questions people ask</h2>
        <Accordion type="single" collapsible className="mt-4 w-full">
          {calculatorFaqs.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q}>
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ── Product ──────────────────────────────────────────────────── */}
      <div className="mt-16 max-w-3xl rounded-2xl bg-blasto-cream p-7">
        <h2 className="text-xl font-bold">Track the whole cycle, not just the date</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Blasto keeps your medications, appointments, symptoms, and{" "}
          <Link to="/ivf-results-tracker/" className="underline hover:text-foreground">
            retrieval results
          </Link>{" "}
          in one place through every phase of treatment. Free while it's in beta.
        </p>
        <div className="mt-5">
          {isAppLive ? (
            <StoreBadges className="!justify-start" />
          ) : (
            <Button asChild size="lg" className="rounded-full px-7 font-semibold">
              <a href="/#beta-access">
                <Sparkles className="mr-2 h-4 w-4" />
                Request Beta Access
              </a>
            </Button>
          )}
        </div>
      </div>

      <nav className="mt-12 max-w-3xl border-t border-border/50 pt-7 text-sm">
        <h2 className="font-semibold">Related</h2>
        <ul className="mt-3 space-y-2">
          <li>
            <Link to="/hcg-doubling-calculator/" className="text-muted-foreground hover:text-primary transition-colors">
              hCG doubling time calculator
            </Link>
          </li>
          <li>
            <Link to="/guides/" className="text-muted-foreground hover:text-primary transition-colors">
              IVF guides
            </Link>
          </li>
          <li>
            <Link to="/ivf-medication-tracker/" className="text-muted-foreground hover:text-primary transition-colors">
              Tracking your IVF medications
            </Link>
          </li>
          <li>
            <Link to="/ivf-symptom-tracker/" className="text-muted-foreground hover:text-primary transition-colors">
              Logging symptoms through your cycle
            </Link>
          </li>
        </ul>
      </nav>
    </PageShell>
  );
};

export default DueDateCalculator;
