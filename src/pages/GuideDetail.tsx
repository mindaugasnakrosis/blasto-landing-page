import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageShell from "@/components/PageShell";
import MedicalReview from "@/components/MedicalReview";
import type { Guide } from "@/lib/guides";

const GuideDetail = ({ guide }: { guide: Guide }) => (
  <PageShell>
    <Link
      to="/guides"
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      All guides
    </Link>

    <p className="mt-6 text-sm font-medium text-blasto-rose-dark">{guide.category}</p>
    <h1 className="mt-2 text-3xl sm:text-4xl font-bold leading-tight">{guide.title}</h1>
    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{guide.description}</p>

    <div className="mt-7">
      <MedicalReview guide={guide} />
    </div>

    {guide.sections.length > 0 ? (
      <article className="mt-12 space-y-9">
        {guide.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl sm:text-2xl font-bold">{s.heading}</h2>
            <p className="mt-3 text-foreground/90 leading-relaxed">{s.body}</p>
          </section>
        ))}
      </article>
    ) : (
      <p className="mt-12 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        No body content yet. Add <code className="text-foreground">sections</code> for{" "}
        <code className="text-foreground">{guide.slug}</code> in{" "}
        <code className="text-foreground">src/lib/guides.ts</code>.
      </p>
    )}

    {guide.references.length > 0 && (
      <section className="mt-12 border-t border-border/50 pt-7">
        <h2 className="text-sm font-semibold text-foreground">Sources</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          {guide.references.map((r) => (
            <li key={r.url}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                {r.label}
              </a>
            </li>
          ))}
        </ol>
      </section>
    )}

    <p className="mt-12 rounded-xl border border-border/60 bg-blasto-cream/60 p-5 text-sm leading-relaxed text-muted-foreground">
      <span className="font-semibold text-foreground">Informational only.</span> This
      article is not medical advice and Blasto is not a medical device. Always follow
      the guidance of your fertility clinic and healthcare providers.
    </p>
  </PageShell>
);

export default GuideDetail;
