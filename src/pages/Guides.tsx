import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import PageShell from "@/components/PageShell";
import { guideCategories, publishedGuides } from "@/lib/guides";

/**
 * The guides hub — the centre of the content cluster.
 *
 * Lists ONLY published guides. Drafts are deliberately not linked from here:
 * they render developer-facing placeholder text, and a visitor arriving on one
 * from a public hub page is a worse outcome than an empty hub. Drafts stay
 * reachable by direct URL for previewing, and stay noindex.
 */
const Guides = () => {
  const shown = publishedGuides();
  const isEmpty = shown.length === 0;

  return (
    <PageShell>
      <h1 className="text-3xl sm:text-4xl font-bold">
        IVF <span className="text-gradient">guides</span>
      </h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
        Practical guides to tracking an IVF cycle — medications, symptoms, retrieval
        numbers, and the parts nobody warns you about. Written for people in
        treatment, reviewed by clinicians, and informational only: your clinic's
        advice always comes first.
      </p>

      {isEmpty && (
        <p className="mt-6 rounded-xl border border-border/60 bg-blasto-cream/60 p-5 text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">
            Our first guides are being written.
          </span>{" "}
          Every one is reviewed by a clinician before it goes up, which takes a
          little longer — we'd rather publish nothing than publish something
          unchecked. In the meantime, the two calculators below are ready to
          use, and{" "}
          <a href="/#beta-access" className="underline hover:text-foreground">
            beta members
          </a>{" "}
          hear first when new guides land.
        </p>
      )}

      <div className="mt-12 space-y-12">
        {guideCategories.map((category) => {
          const inCategory = shown.filter((g) => g.category === category);
          if (inCategory.length === 0) return null;

          return (
            <section key={category}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-blasto-rose-dark">
                {category}
              </h2>
              <ul className="mt-4 space-y-4">
                {inCategory.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      to={`/guides/${guide.slug}/`}
                      className="group flex items-start gap-3 rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/40"
                    >
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-blasto-rose-dark" />
                      <div>
                        <p className="font-semibold leading-snug group-hover:text-primary transition-colors">
                          {guide.title}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          {guide.excerpt}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* The tools carry this section while the guides are still drafts - they
          need no medical reviewer, so they are the only pages here that can
          stand on their own today. */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">Free tools</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            {
              to: "/ivf-due-date-calculator/",
              title: "IVF due date calculator",
              blurb:
                "Work out your due date from an embryo transfer or egg retrieval date, for fresh or frozen day 3, 5, and 6 transfers.",
            },
            {
              to: "/hcg-doubling-calculator/",
              title: "hCG doubling time calculator",
              blurb:
                "Turn two beta results into a doubling time, and see that same rate over the 48-hour window published ranges are quoted in.",
            },
          ].map((tool) => (
            <div
              key={tool.to}
              className="flex flex-col rounded-2xl border border-border/60 bg-blasto-cream/60 p-6"
            >
              <h3 className="font-semibold">{tool.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {tool.blurb}
              </p>
              <Link
                to={tool.to}
                className="mt-3 inline-block self-start pt-1 text-sm font-semibold text-blasto-rose-dark hover:text-primary transition-colors"
              >
                Open the calculator →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <nav className="mt-14 border-t border-border/50 pt-7 text-sm">
        <h2 className="font-semibold text-foreground">What Blasto does</h2>
        <ul className="mt-3 space-y-2">
          <li>
            <Link to="/ivf-medication-tracker/" className="text-muted-foreground hover:text-primary transition-colors">
              IVF medication tracker
            </Link>
          </li>
          <li>
            <Link to="/ivf-symptom-tracker/" className="text-muted-foreground hover:text-primary transition-colors">
              IVF symptom tracker
            </Link>
          </li>
          <li>
            <Link to="/ivf-results-tracker/" className="text-muted-foreground hover:text-primary transition-colors">
              IVF results tracker
            </Link>
          </li>
        </ul>
      </nav>
    </PageShell>
  );
};

export default Guides;
