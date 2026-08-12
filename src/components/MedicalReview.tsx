import { Link } from "react-router-dom";
import { BadgeCheck, TriangleAlert } from "lucide-react";
import type { Guide } from "@/lib/guides";
import { publishBlockers } from "@/lib/guides";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

/**
 * Reviewer byline for a guide.
 *
 * This is the E-E-A-T signal that matters most in a health vertical: a named
 * clinician, their credentials, and the date they signed off, linked to the
 * standards that govern the review. It renders an unmistakable warning instead
 * when a draft has no reviewer, so an unreviewed article can't quietly ship
 * looking finished.
 */
const MedicalReview = ({ guide }: { guide: Guide }) => {
  const blockers = publishBlockers(guide);

  if (guide.status !== "published" || !guide.reviewer) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
        <div className="leading-relaxed">
          <p className="font-semibold text-foreground">
            Draft — not published, not indexed.
          </p>
          <p className="mt-1 text-muted-foreground">
            {blockers.length > 0 ? (
              <>Still needs {blockers.join(", ")}.</>
            ) : (
              <>Set status to &ldquo;published&rdquo; in src/lib/guides.ts.</>
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-blasto-cream/60 p-4 text-sm">
      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-blasto-sage-dark" />
      <div className="leading-relaxed">
        <p className="text-foreground">
          Medically reviewed by{" "}
          <span className="font-semibold">{guide.reviewer.name}</span>
          {guide.reviewer.credentials && (
            <span className="text-muted-foreground">
              , {guide.reviewer.credentials}
            </span>
          )}
        </p>
        <p className="mt-1 text-muted-foreground">
          {guide.reviewedOn && <>Last reviewed {formatDate(guide.reviewedOn)}. </>}
          <Link to="/editorial-standards" className="underline hover:text-foreground">
            How we review content
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MedicalReview;
