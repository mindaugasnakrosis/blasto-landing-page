import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, TrendingUp } from "lucide-react";
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
import { hcgFaqs } from "@/lib/hcgFaqs";
import { cn } from "@/lib/utils";
import {
  MAX_MODELLED_HOURS,
  MIN_RELIABLE_HOURS,
  analyseDraws,
  formatHours,
  formatLevel,
  formatPercent,
  parseLevel,
  parseLocalDateTime,
  projectFrom,
} from "@/lib/hcg";

/** Sources for every clinical figure quoted below. Listed on the page as well
 *  as linked inline - see /editorial-standards. */
const REFERENCES = [
  {
    label:
      "Barnhart KT, et al. Symptomatic patients with an early viable intrauterine pregnancy: hCG curves redefined. Obstet Gynecol. 2004;104(1):50-55.",
    url: "https://pubmed.ncbi.nlm.nih.gov/15229000/",
  },
  {
    label:
      "Morse CB, et al. Performance of human chorionic gonadotropin curves in women at risk for ectopic pregnancy: exceptions to the rules. Fertil Steril. 2012;97(1):101-106.",
    url: "https://pubmed.ncbi.nlm.nih.gov/22192138/",
  },
  {
    label:
      "Barnhart KT. What serial hCG can tell you, and cannot tell you, about an early pregnancy. Fertil Steril. 2012.",
    url: "https://www.fertstert.org/article/S0015-0282(12)02233-9/fulltext",
  },
  {
    label:
      "Abnormal rate of human chorionic gonadotropin rise: a case series of patients with viable intrauterine pregnancies after embryo transfer. F&S Reports. 2020.",
    url: "https://www.fertstertreports.org/article/S2666-3341(20)30125-2/fulltext",
  },
  {
    label: "ACOG Practice Bulletin No. 193: Tubal Ectopic Pregnancy. Obstet Gynecol. 2018.",
    url: "https://pubmed.ncbi.nlm.nih.gov/29470343/",
  },
];

const PROJECTION_HOURS = [24, 48, 72];

type DrawFieldsProps = {
  id: string;
  legend: string;
  hint: string;
  value: string;
  onValueChange: (next: string) => void;
  at: string;
  onAtChange: (next: string) => void;
};

const inputClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

const DrawFields = ({
  id,
  legend,
  hint,
  value,
  onValueChange,
  at,
  onAtChange,
}: DrawFieldsProps) => (
  <fieldset>
    <legend className="text-sm font-semibold text-foreground">{legend}</legend>
    <div className="mt-3 space-y-4">
      <div>
        <label htmlFor={`${id}-value`} className="block text-sm font-medium text-foreground">
          Result
        </label>
        <input
          id={`${id}-value`}
          type="number"
          inputMode="decimal"
          min="1"
          step="any"
          placeholder="mIU/mL"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor={`${id}-at`} className="block text-sm font-medium text-foreground">
          Date and time of the draw
        </label>
        <input
          id={`${id}-at`}
          type="datetime-local"
          value={at}
          onChange={(e) => onAtChange(e.target.value)}
          className={inputClass}
        />
        <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
      </div>
    </div>
  </fieldset>
);

const HcgCalculator = () => {
  const [firstValue, setFirstValue] = useState("");
  const [firstAt, setFirstAt] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [secondAt, setSecondAt] = useState("");

  const first = parseLevel(firstValue);
  const second = parseLevel(secondValue);
  const firstDate = parseLocalDateTime(firstAt);
  const secondDate = parseLocalDateTime(secondAt);

  // Not memoised: this is four logarithms on every keystroke, and memoising it
  // would mean memoising the two draw objects first just to keep the deps
  // stable, which is more machinery than the arithmetic costs.
  const firstDraw = first !== null && firstDate ? { value: first, at: firstDate } : null;
  const secondDraw =
    second !== null && secondDate ? { value: second, at: secondDate } : null;
  const analysis = firstDraw && secondDraw ? analyseDraws(firstDraw, secondDraw) : null;

  // Everything is filled in and parses, but the pair still can't describe a
  // rate - in practice that means the second draw is not after the first.
  const orderProblem =
    !analysis &&
    first !== null &&
    second !== null &&
    firstDate !== null &&
    secondDate !== null;

  const touched = [firstValue, firstAt, secondValue, secondAt].some((v) => v !== "");
  const badLevel =
    (firstValue !== "" && first === null) || (secondValue !== "" && second === null);

  return (
    <PageShell width="wide">
      <h1 className="text-3xl sm:text-4xl font-bold">
        hCG doubling time <span className="text-gradient">calculator</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        Enter two beta hCG results and when each blood draw was taken. This works
        out the doubling time, the change between them, and what that same rate
        comes to over 48 hours, which is the window published ranges are quoted in.
      </p>

      {/* -- Calculator ------------------------------------------------- */}
      <div className="mt-10 rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <DrawFields
            id="first"
            legend="First beta"
            hint="The time of day matters. If you only know the date, 08:00 is a fair guess for both."
            value={firstValue}
            onValueChange={setFirstValue}
            at={firstAt}
            onAtChange={setFirstAt}
          />
          <DrawFields
            id="second"
            legend="Second beta"
            hint="Usually two days later, but any interval works."
            value={secondValue}
            onValueChange={setSecondValue}
            at={secondAt}
            onAtChange={setSecondAt}
          />
        </div>

        {analysis && secondDraw && (
          <div className="mt-8 border-t border-border/60 pt-8">
            <p className="text-sm font-medium text-blasto-rose-dark">
              {analysis.trend === "rising"
                ? "Doubling time"
                : analysis.trend === "falling"
                  ? "Halving time"
                  : "No change"}
            </p>
            <p className="mt-1 text-2xl sm:text-3xl font-bold tabular-nums">
              {analysis.trend === "rising"
                ? formatHours(analysis.doublingHours!)
                : analysis.trend === "falling"
                  ? formatHours(analysis.halvingHours!)
                  : "The two results are identical"}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                {
                  // Deliberately not "change over 45 hours": the third card
                  // already states the interval, and saying it twice made the
                  // row read as two numbers instead of three.
                  label: "Measured change",
                  value: formatPercent(analysis.percentChange),
                },
                {
                  label: "Same rate over 48 hours",
                  value: formatPercent(analysis.percentChangePer48h),
                },
                {
                  label: "Between the draws",
                  value: formatHours(analysis.hours),
                },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-blasto-cream/70 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold tabular-nums">{stat.value}</p>
                </div>
              ))}
            </div>

            {analysis.trend === "rising" && analysis.hours <= MAX_MODELLED_HOURS && (
              <div className="mt-8">
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <TrendingUp className="h-4 w-4 text-blasto-rose-dark" />
                  If it carried on at exactly this rate
                </h2>
                <ul className="mt-3 divide-y divide-border/50">
                  {PROJECTION_HOURS.map((hours) => (
                    <li
                      key={hours}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      {/* Short label and a nowrap value: "24 hours after the
                          second draw" plus "475 mIU/mL" broke the number across
                          two lines at 390px, which read as a rendering fault.
                          The note below carries what the hours count from. */}
                      <span className="text-sm text-muted-foreground">
                        In {hours} hours
                      </span>
                      <span className="whitespace-nowrap font-medium tabular-nums">
                        {formatLevel(projectFrom(secondDraw, analysis, hours))} mIU/mL
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Counted from your second draw. An extrapolation of two points,
                  and a generous one: the rise genuinely slows as levels climb, so
                  real results tend to come in under this.
                </p>
              </div>
            )}

            {analysis.hours < MIN_RELIABLE_HOURS && (
              <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                These draws are {formatHours(analysis.hours)} apart. Over an interval
                that short, normal assay variation is a large share of the difference,
                so the rate above is not really measuring the pregnancy.
              </p>
            )}

            {analysis.hours > MAX_MODELLED_HOURS && (
              <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                These draws are more than a week apart. hCG decelerates over that
                span, so a single doubling time fitted through both ends averages
                away a real change in rate.
              </p>
            )}
          </div>
        )}

        {badLevel && (
          <p className="mt-6 text-sm text-amber-700">
            Beta results should be a positive number in mIU/mL, digits only.
          </p>
        )}
        {orderProblem && !badLevel && (
          <p className="mt-6 text-sm text-amber-700">
            The second draw needs to be after the first one. Check the dates and times.
          </p>
        )}
        {touched && !analysis && !badLevel && !orderProblem && (
          <p className="mt-6 text-sm text-muted-foreground">
            Fill in both results and both draw times to see the rate.
          </p>
        )}
      </div>

      <div className="mt-4 rounded-xl border border-border/60 bg-blasto-cream/50 px-5 py-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="font-semibold text-foreground">
            This is arithmetic, not an interpretation.
          </strong>{" "}
          It reports how fast your numbers changed and nothing more. It does not
          tell you whether that rate is normal, reassuring, or worrying, because
          that judgement needs your history, your scan, and the assay your clinic
          used. Take these numbers to them, not the other way round.
        </p>
      </div>

      {/* -- Explanatory content ---------------------------------------- */}
      <div className="mt-16 max-w-3xl space-y-9">
        <section>
          <h2 className="text-2xl font-bold">How doubling time is worked out</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Early hCG rises roughly exponentially, so two results and the gap
            between them are enough to solve for how long a doubling would take at
            that rate:
          </p>
          <p className="mt-4 rounded-lg bg-blasto-cream/60 px-4 py-3 text-sm tabular-nums">
            doubling time = hours between draws x ln(2) / ln(second / first)
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            A rise from 100 to 200 across 48 hours is a 48-hour doubling time, by
            definition. A rise from 100 to 153 across the same window is a doubling
            time of about 78 hours. Those two framings describe the same blood
            results, which is the reason this page shows both: clinics quote
            percentage rise over two days, the internet quotes doubling times, and
            people end up comparing numbers that were never the same measurement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">What the published ranges say</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            The rule most people arrive with is that hCG doubles every 48 to 72
            hours. The research behind the modern reference curves is slower than
            that at the bottom end, and it has been revised downwards twice.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              [
                "Barnhart et al., 2004",
                "minimum rise of 53% over two days",
                "https://pubmed.ncbi.nlm.nih.gov/15229000/",
              ],
              [
                "Morse et al., 2012",
                "revised down to 35% over two days",
                "https://pubmed.ncbi.nlm.nih.gov/22192138/",
              ],
              [
                "ACOG Practice Bulletin 193",
                "discriminatory level set as high as 3,500 mIU/mL",
                "https://pubmed.ncbi.nlm.nih.gov/29470343/",
              ],
            ].map(([source, finding, url]) => (
              <li
                key={source}
                className="flex flex-wrap justify-between gap-x-4 rounded-lg bg-blasto-cream/60 px-4 py-2.5"
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline decoration-border underline-offset-4 hover:text-primary transition-colors"
                >
                  {source}
                </a>
                <span className="text-muted-foreground">{finding}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Both of those floors describe the slowest sliver of pregnancies that
            went on to be viable, not a line between good and bad. Morse and
            colleagues argued for the more conservative 35% precisely so that a
            slow-rising pregnancy would not be acted on as though it had already
            failed. They also found that levels below 500 mIU/mL were an exception
            to the pattern, which is exactly the range most first betas fall in.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Why one number tells you very little</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Individual beta values at any given point after transfer span an
            enormous range, and a first result on its own predicts far less than
            people expect it to. The change between two draws carries more
            information than either draw alone, which is why the second one gets
            ordered at all. Even then, a case series in F&S Reports documented
            viable intrauterine pregnancies after embryo transfer whose rate of rise
            was frankly abnormal. Two numbers are a data point. They are not an
            outcome.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">When bloodwork stops being the test</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            The rise decelerates as levels climb, so doubling times lengthen on
            their own and a rate measured at 3,000 is not comparable to one measured
            at 150. Once levels are high enough for a scan to see a gestational sac,
            the ultrasound answers questions the bloodwork cannot, and ACOG advises
            that any discriminatory hCG threshold used for that decision should be
            set conservatively high to avoid misreading a healthy early pregnancy.
            Past that point, more betas mostly add anxiety.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">The trigger shot</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            An hCG trigger such as Ovidrel or Pregnyl is hCG, so a test taken too
            soon after it measures the injection rather than the pregnancy. It
            clears over roughly one to two weeks depending on the dose, and clinics
            time the first beta to fall past it. If you are comparing home tests
            taken in that window, the numbers may be describing the trigger on its
            way out rather than anything rising.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Sources</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {REFERENCES.map((ref) => (
              <li key={ref.url}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-border underline-offset-4 hover:text-foreground transition-colors"
                >
                  {ref.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
            How we choose and use sources is set out in our{" "}
            <Link to="/editorial-standards/" className="underline hover:text-foreground">
              editorial standards
            </Link>
            .
          </p>
        </section>
      </div>

      {/* -- FAQ --------------------------------------------------------- */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold">Questions people ask</h2>
        <Accordion type="single" collapsible className="mt-4 w-full">
          {hcgFaqs.map((faq) => (
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

      {/* -- Product ----------------------------------------------------- */}
      <div className="mt-16 max-w-3xl rounded-2xl bg-blasto-cream p-7">
        <h2 className="text-xl font-bold">Keep your betas in one place</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Blasto logs every{" "}
          <Link to="/ivf-results-tracker/" className="underline hover:text-foreground">
            blood result and scan
          </Link>{" "}
          alongside your medications and appointments, so the numbers stay together
          instead of scattered across texts and portal screenshots. Free while it is
          in beta.
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
            <Link
              to="/ivf-due-date-calculator/"
              className={cn("text-muted-foreground hover:text-primary transition-colors")}
            >
              Work out your IVF due date
            </Link>
          </li>
          <li>
            <Link to="/ivf-results-tracker/" className="text-muted-foreground hover:text-primary transition-colors">
              Keeping track of bloodwork and results
            </Link>
          </li>
          <li>
            <Link to="/guides/" className="text-muted-foreground hover:text-primary transition-colors">
              IVF guides
            </Link>
          </li>
        </ul>
      </nav>
    </PageShell>
  );
};

export default HcgCalculator;
