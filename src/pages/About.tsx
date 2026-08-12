import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import { SUPPORT_EMAIL } from "@/lib/site";

/**
 * TODO(you): every [BRACKETED] block below needs your words — I've left them
 * blank rather than inventing a founder story, because a fabricated origin on
 * an About page is both dishonest and easy for readers to catch.
 *
 * This page carries real SEO weight: it's where a search quality rater looks
 * to answer "who is behind this health site, and why should I trust them?"
 * A named human with a real reason to be building this beats anything else
 * you can put here. If Blasto came out of your own IVF experience, say so
 * plainly — that's first-hand experience, the "E" that clinic sites can't buy.
 */
const About = () => (
  <PageShell>
    <h1 className="text-3xl sm:text-4xl font-bold">
      About <span className="text-gradient">Blasto</span>
    </h1>
    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
      Who builds Blasto, and why.
    </p>

    <div className="mt-12 space-y-9 text-foreground/90 leading-relaxed">
      <section>
        <h2 className="text-xl font-bold">Why we built this</h2>
        <p className="mt-3 rounded-xl border border-dashed border-border p-5 text-muted-foreground">
          [WHY: The origin story. What made you build an IVF app rather than
          anything else — ideally a first-hand or close-hand experience of IVF and
          the specific thing that was broken about tracking it. Two or three
          paragraphs, first person, no marketing voice.]
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Who we are</h2>
        <p className="mt-3 rounded-xl border border-dashed border-border p-5 text-muted-foreground">
          [WHO: Your name, what you do, and anything that makes you credible to
          build this. A photo helps. If there are others involved, name them.
          Anonymous health brands do not earn trust — from readers or from
          Google's quality raters.]
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Our medical reviewers</h2>
        <p className="mt-3 rounded-xl border border-dashed border-border p-5 text-muted-foreground">
          [REVIEWERS: Once a reproductive endocrinologist or fertility nurse is
          engaged, name them here with credentials and a verifiable profile link,
          and add them to the guides they review in src/lib/guides.ts. Until then
          this section should stay empty rather than vague — see our{" "}
          <Link to="/editorial-standards" className="underline">editorial standards</Link>.]
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">What Blasto is not</h2>
        <p className="mt-3">
          Blasto is not a medical device, and it does not provide medical advice,
          diagnosis, or treatment. It helps you keep track of a treatment your clinic
          is running. When the two conflict, your clinic is right.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">How we handle your data</h2>
        <p className="mt-3">
          Fertility data is among the most sensitive there is. We don't sell it, we
          don't share it with advertisers or data brokers, and you can export or
          delete it whenever you want. The specifics are in our{" "}
          <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Get in touch</h2>
        <p className="mt-3">
          Questions, corrections, or feedback:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="underline hover:text-foreground">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </section>
    </div>
  </PageShell>
);

export default About;
