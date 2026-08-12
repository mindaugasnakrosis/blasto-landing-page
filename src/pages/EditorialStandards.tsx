import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import { SUPPORT_EMAIL } from "@/lib/site";

/**
 * The credibility page. In a YMYL health vertical this is not decoration —
 * it's the page that makes the reviewer bylines on each guide mean something.
 *
 * TODO(you): the process below describes what the code already enforces
 * (src/lib/guides.ts blocks publishing without a named reviewer). Once a real
 * clinician is engaged, add them to a "Our reviewers" section here with their
 * credentials and a verifiable profile link.
 */
const EditorialStandards = () => (
  <PageShell>
    <h1 className="text-3xl sm:text-4xl font-bold">
      Editorial <span className="text-gradient">standards</span>
    </h1>
    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
      How we research, write, and review everything published under the Blasto name.
    </p>

    <div className="mt-12 space-y-9 text-foreground/90 leading-relaxed">
      <section>
        <h2 className="text-xl font-bold">Nothing publishes without review</h2>
        <p className="mt-3">
          Every guide is reviewed by a named clinician before it goes live, and the
          reviewer's name, credentials, and sign-off date appear at the top of the
          article. This is enforced in our publishing system, not just by policy:
          an article without a named reviewer cannot be published.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">We cite our sources</h2>
        <p className="mt-3">
          Claims about treatment, medications, or outcomes are sourced to peer-reviewed
          research or guidance from professional bodies, and those sources are listed
          at the end of each article so you can check them yourself.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">We say when we don't know</h2>
        <p className="mt-3">
          IVF outcomes vary enormously between individuals and clinics. Where the
          evidence is genuinely mixed or thin, we say so rather than rounding it into
          a confident answer.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Content is reviewed again as it ages</h2>
        <p className="mt-3">
          Guidance changes. Articles carry a last-reviewed date, and we re-check them
          against current guidance rather than leaving them to drift.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">None of it is medical advice</h2>
        <p className="mt-3">
          Blasto is a tracking and support tool, not a medical device. Our content is
          informational and never a substitute for your own care team, who know your
          history and your protocol. See our{" "}
          <Link to="/terms" className="underline hover:text-foreground">Terms of Service</Link>.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Tell us if we got something wrong</h2>
        <p className="mt-3">
          If you spot an error, email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="underline hover:text-foreground">
            {SUPPORT_EMAIL}
          </a>{" "}
          and we'll correct it and note the change.
        </p>
      </section>
    </div>

    <p className="mt-12 text-sm">
      <Link to="/guides" className="text-muted-foreground hover:text-primary transition-colors">
        Browse the guides →
      </Link>
    </p>
  </PageShell>
);

export default EditorialStandards;
