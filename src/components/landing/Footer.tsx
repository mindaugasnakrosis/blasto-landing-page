import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import blastoLogo from "@/assets/blasto-logo.webp";
import AppStoreBadge from "./AppStoreBadge";
import { SUPPORT_EMAIL } from "@/lib/site";

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
              Nurturing every step of your fertility journey. An iPhone app for tracking
              IVF cycles, medications, symptoms, and results.
            </p>
            <AppStoreBadge className="mt-5" />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">Features</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/ivf-medication-tracker" className="hover:text-primary transition-colors">Medication tracker</Link></li>
              <li><Link to="/ivf-symptom-tracker" className="hover:text-primary transition-colors">Symptom tracker</Link></li>
              <li><Link to="/ivf-results-tracker" className="hover:text-primary transition-colors">Results tracker</Link></li>
              <li><Link to="/ivf-support-companion" className="hover:text-primary transition-colors">Support companion</Link></li>
              <li><a href="/#beta-access" className="hover:text-primary transition-colors">Request Beta Access</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">Company</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/guides" className="hover:text-primary transition-colors">IVF Guides</Link>
              </li>
              <li>
                <Link to="/ivf-due-date-calculator" className="hover:text-primary transition-colors">Due Date Calculator</Link>
              </li>
              {/* About is unlinked until its placeholder copy is filled in —
                  see the noindex note in src/lib/seo.ts. Restore this alongside
                  clearing that flag. */}
              <li>
                <Link to="/editorial-standards" className="hover:text-primary transition-colors">Editorial Standards</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              </li>
              <li>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {SUPPORT_EMAIL}
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
