import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import PageShell from "@/components/PageShell";
import { guideCategories, guides, publishedGuides } from "@/lib/guides";

/**
 * The guides hub — the centre of the content cluster.
 *
 * In production this lists published guides grouped by category. Until any are
 * published it shows the planned slate instead, so the structure is reviewable
 * without putting thin pages in front of crawlers (the hub itself is indexable;
 * the draft articles are not).
 */
const Guides = () => {
  const published = publishedGuides();
  const isEmpty = published.length === 0;
  const shown = isEmpty ? guides : published;

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
        <p className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Planned articles.</span>{" "}
          None are published yet — each needs body copy, sources, and a named
          medical reviewer first. They stay noindex and out of the sitemap until
          then.
        </p>
      )}

      <div className="mt-12 space-y-12">
        {guideCategories.map((category) => {
          const inCategory = shown.filter((g) => g.category === category);
          if (inCategory.length === 0) return null;

          return (
            <section key={category}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-blasto-sage-dark">
                {category}
              </h2>
              <ul className="mt-4 space-y-4">
                {inCategory.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      to={`/guides/${guide.slug}`}
                      className="group flex items-start gap-3 rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/40"
                    >
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-blasto-sage-dark" />
                      <div>
                        <p className="font-semibold leading-snug group-hover:text-primary transition-colors">
                          {guide.title}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          {guide.excerpt}
                        </p>
                        {guide.status === "draft" && (
                          <span className="mt-2 inline-block rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-700">
                            Draft
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl border border-border/60 bg-blasto-cream/60 p-6">
        <h2 className="font-semibold">IVF due date calculator</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Work out your due date from an embryo transfer or egg retrieval date, for
          fresh or frozen day 3, 5, and 6 transfers.
        </p>
        <Link
          to="/ivf-due-date-calculator"
          className="mt-3 inline-block text-sm font-semibold text-blasto-sage-dark hover:text-primary transition-colors"
        >
          Open the calculator →
        </Link>
      </div>

      <nav className="mt-14 border-t border-border/50 pt-7 text-sm">
        <h2 className="font-semibold text-foreground">What Blasto does</h2>
        <ul className="mt-3 space-y-2">
          <li>
            <Link to="/ivf-medication-tracker" className="text-muted-foreground hover:text-primary transition-colors">
              IVF medication tracker
            </Link>
          </li>
          <li>
            <Link to="/ivf-symptom-tracker" className="text-muted-foreground hover:text-primary transition-colors">
              IVF symptom tracker
            </Link>
          </li>
          <li>
            <Link to="/ivf-results-tracker" className="text-muted-foreground hover:text-primary transition-colors">
              IVF results tracker
            </Link>
          </li>
        </ul>
      </nav>
    </PageShell>
  );
};

export default Guides;
