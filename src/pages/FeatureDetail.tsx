import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import PageShell from "@/components/PageShell";
import { PhoneFrame, ScreenCompanion } from "@/components/landing/PhoneMockups";
import AppStoreBadge from "@/components/landing/AppStoreBadge";
import { isAppLive } from "@/lib/site";
import { featurePageBySlug, type FeaturePage, type ScreenKey } from "@/lib/featurePages";
import screenHome from "@/assets/screenshots/screen-home.webp";
import screenSymptoms from "@/assets/screenshots/screen-symptoms.webp";
import screenResults from "@/assets/screenshots/screen-results.webp";

const screens: Record<ScreenKey, { node: JSX.Element; alt: string }> = {
  home: {
    node: <img src={screenHome} alt="Blasto home screen with today's medication tasks and reminders" width={750} height={1626} loading="lazy" decoding="async" />,
    alt: "Blasto home screen with today's medication tasks and reminders",
  },
  symptoms: {
    node: <img src={screenSymptoms} alt="Blasto symptom tracking screen with intensity slider" width={750} height={1626} loading="lazy" decoding="async" />,
    alt: "Blasto symptom tracking screen with intensity slider",
  },
  results: {
    node: <img src={screenResults} alt="Blasto results screen showing an egg retrieval funnel chart" width={750} height={1626} loading="lazy" decoding="async" />,
    alt: "Blasto results screen showing an egg retrieval funnel chart",
  },
  companion: { node: <ScreenCompanion />, alt: "Blasto voice companion" },
};

const FeatureDetail = ({ page }: { page: FeaturePage }) => (
  <PageShell width="wide">
    <div className="grid items-start gap-12 lg:grid-cols-[1fr_280px]">
      <div>
        <p className="text-sm font-medium text-blasto-sage-dark">{page.eyebrow}</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold leading-tight">
          {page.h1} <span className="text-gradient">{page.h1Accent}</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{page.intro}</p>

        <ul className="mt-7 space-y-2.5">
          {page.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                <Check className="h-3 w-3 text-blasto-sage-dark" strokeWidth={3} />
              </span>
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-12 space-y-10">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl sm:text-2xl font-bold">{s.heading}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-blasto-cream p-7">
          <h2 className="text-xl font-bold">
            {isAppLive ? "Get Blasto" : "Try it during the beta"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Blasto is free while it's in beta. Private by design — your data is never sold.
          </p>
          <div className="mt-5">
            {isAppLive ? (
              <AppStoreBadge />
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

        <nav className="mt-12 border-t border-border/50 pt-7">
          <h2 className="text-sm font-semibold text-foreground">More of what's inside</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {page.related.map((slug) => {
              const rel = featurePageBySlug(slug);
              if (!rel) return null;
              return (
                <li key={slug}>
                  <Link to={slug} className="text-muted-foreground hover:text-primary transition-colors">
                    {rel.eyebrow} — {rel.h1} {rel.h1Accent}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link to="/guides" className="text-muted-foreground hover:text-primary transition-colors">
                IVF guides
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="hidden lg:block sticky top-24">
        <PhoneFrame className="w-[260px]">{screens[page.screen].node}</PhoneFrame>
      </div>
    </div>
  </PageShell>
);

export default FeatureDetail;
