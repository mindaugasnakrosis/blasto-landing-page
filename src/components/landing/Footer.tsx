import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import blastoLogo from "@/assets/blasto-logo.webp";
import StoreBadges from "./StoreBadges";
import { SUPPORT_EMAIL } from "@/lib/site";

/** Split so the address can break at the "@" rather than mid-domain - see the
 *  note on the link below. */
const [EMAIL_LOCAL, EMAIL_DOMAIN] = SUPPORT_EMAIL.split("@");

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-blasto-cream py-14">
      <div className="container px-4">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={blastoLogo} alt="" className="h-9 w-9 rounded-lg" width={128} height={128} />
              <span className="text-xl font-bold">Blasto</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Nurturing every step of your fertility journey. An app for iPhone and Android, for tracking
              IVF cycles, medications, symptoms, and results.
            </p>
            <StoreBadges className="mt-5 !justify-start" />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">Features</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/ivf-medication-tracker/" className="hover:text-primary transition-colors">Medication tracker</Link></li>
              <li><Link to="/ivf-symptom-tracker/" className="hover:text-primary transition-colors">Symptom tracker</Link></li>
              <li><Link to="/ivf-results-tracker/" className="hover:text-primary transition-colors">Results tracker</Link></li>
              <li><Link to="/ivf-support-companion/" className="hover:text-primary transition-colors">Support companion</Link></li>
              <li><a href="/#beta-access" className="hover:text-primary transition-colors">Request Beta Access</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">Company</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/guides/" className="hover:text-primary transition-colors">IVF Guides</Link>
              </li>
              <li>
                <Link to="/ivf-due-date-calculator/" className="hover:text-primary transition-colors">Due Date Calculator</Link>
              </li>
              <li>
                <Link to="/hcg-doubling-calculator/" className="hover:text-primary transition-colors">hCG Doubling Calculator</Link>
              </li>
              {/* About is unlinked until its placeholder copy is filled in —
                  see the noindex note in src/lib/seo.ts. Restore this alongside
                  clearing that flag. */}
              <li>
                <Link to="/editorial-standards/" className="hover:text-primary transition-colors">Editorial Standards</Link>
              </li>
              <li>
                <Link to="/privacy/" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms/" className="hover:text-primary transition-colors">Terms of Service</Link>
              </li>
              {/* Linked, not just routed: Play wants the deletion path
                  discoverable from the site, not only from the listing. */}
              <li>
                <Link to="/delete-account/" className="hover:text-primary transition-colors">Delete Account</Link>
              </li>
              <li>
                {/* At the md breakpoint this column is about 154px wide, and
                    an email address is one unbreakable token - so as an
                    inline-flex shrink-to-fit link it grew wider than the
                    viewport and put a horizontal scrollbar on every page of the
                    site. The <wbr> is what actually fixes it: overflow-wrap
                    breaks the rendered line but does not lower the element's
                    min-content width, so a flex item still refuses to shrink,
                    whereas a real break opportunity does both - and it puts the
                    break after the "@" instead of mid-domain. */}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="flex items-start gap-1.5 hover:text-primary transition-colors"
                >
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span className="min-w-0">
                    {EMAIL_LOCAL}@<wbr />
                    {EMAIL_DOMAIN}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/30 pt-6 text-center text-xs text-muted-foreground space-y-2">
          <p>
            Blasto is a personal tracking tool and does not provide medical advice.
            Always consult your healthcare provider.
          </p>
          <p>© 2026 Blasto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
