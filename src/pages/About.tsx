import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import { SUPPORT_EMAIL } from "@/lib/site";

/**
 * DRAFT — every word below is editable, and some of it is guesswork.
 *
 * Read the two ORIGIN options in the first section and keep the one that's
 * true. I didn't pick for you: whether you went through IVF yourselves is the
 * spine of this page and not something to fabricate.
 *
 * Other things to confirm before this ships:
 *   - your wife's name, exact credentials, and that she's happy to be named
 *   - whether "we" is you two or a wider team
 *   - the founding year / how long you've been building it
 *   - a photo of the two of you, if you're willing — it does more for trust
 *     on a health site than any amount of copy
 *
 * Why this page earns its keep: a search quality rater landing here is asking
 * "who is behind this, and why should I trust them with fertility data?" Two
 * named people, one of them a physician, with a real reason to be building
 * this, is a better answer than most funded competitors can give.
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

        {/* ─── ORIGIN OPTION A — you went through IVF yourselves. ───
            Strongest version if it's true. First-hand experience is the one
            credential Flo and the clinic blogs cannot buy. Keep the specifics
            concrete — the printout, the spreadsheet, the 4am dose — because
            specifics are what make a reader think "this person was actually
            there." Delete Option B if you keep this. */}
        <p className="mt-3">
          We went through IVF ourselves, and the treatment was not the hardest
          part. The hardest part was holding it all in our heads. A protocol
          printed on a sheet of A4, doses at hours that didn't fit any normal
          day, a monitoring appointment that moved twice in a week, and results
          that arrived as numbers nobody had time to explain. We ended up running
          our own cycle out of a spreadsheet and a phone alarm, and still lay
          awake wondering whether we'd got it right.
        </p>
        <p className="mt-3">
          None of that is medically necessary. The treatment is hard enough on
          its own; the admin around it doesn't have to be. Blasto is the app we
          wanted during that time — the one that keeps the schedule, explains
          what's coming, and lays your results out so they mean something.
        </p>

        {/* ─── ORIGIN OPTION B — you did not go through IVF yourselves. ───
            Use this if A isn't true. Do not claim experience you don't have;
            it's the kind of thing readers catch, and it would undermine the
            one thing this page exists to build. Clinical proximity is a
            perfectly good reason to have built this. Delete Option A if you
            keep this.

        <p className="mt-3">
          Blasto started with the gap between how carefully IVF is run inside a
          clinic and how little support patients get outside one. [Say how you
          came to see that gap — through your wife's practice, through people
          close to you, through work.] The treatment is closely managed for a few
          hours a week. The rest of the time, patients are handed a protocol on a
          sheet of paper and left to run it themselves.
        </p>
        <p className="mt-3">
          That's the part we thought we could help with. Not the medicine —
          your clinic has that — but everything around it: the schedule, the
          doses, the results that arrive as numbers nobody has time to explain.
        </p>
        */}
      </section>

      <section>
        <h2 className="text-xl font-bold">Who we are</h2>
        <p className="mt-3">
          Blasto is built by Mindaugas Nakrošis and [WIFE'S NAME]. Mindaugas
          builds the app. [WIFE'S NAME] is a general practitioner and reviews
          everything we publish for accuracy and safety.
        </p>
        <p className="mt-3">
          We're a team of two, which means we read every piece of feedback that
          comes in and answer it ourselves. If something in the app is wrong or
          missing, telling us actually changes it.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Our medical reviewer</h2>
        <p className="mt-3">
          [WIFE'S NAME], [CREDENTIALS — e.g. MD, General Practitioner], reviews
          our guides before they're published. Her name and the date she signed
          off appear at the top of each article, and nothing publishes without
          that review.
        </p>
        <p className="mt-3">
          She's a physician on the Blasto team rather than an outside reviewer,
          and we'd rather say so than dress it up. Where an article covers
          territory that belongs to a fertility specialist — embryology numbers,
          protocol choices — we say what she reviewed it for and what she didn't.
          Our{" "}
          <Link to="/editorial-standards/" className="underline hover:text-foreground">
            editorial standards
          </Link>{" "}
          set out the whole process.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">What Blasto is not</h2>
        <p className="mt-3">
          Blasto is not a medical device, and it does not provide medical advice,
          diagnosis, or treatment. It helps you keep track of a treatment your
          clinic is running. Where the two ever conflict, your clinic is right
          and we are wrong.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">How we handle your data</h2>
        <p className="mt-3">
          Fertility data is about as personal as data gets, and the industry's
          record on handling it is not good. We don't sell it, we don't share it
          with advertisers or data brokers, and you can export or delete all of
          it whenever you want. The specifics are in our{" "}
          <Link to="/privacy/" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
          , written to be read rather than to cover us.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Get in touch</h2>
        <p className="mt-3">
          Questions, corrections, or something we got wrong:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="underline hover:text-foreground">
            {SUPPORT_EMAIL}
          </a>
          . It reaches us directly.
        </p>
      </section>
    </div>
  </PageShell>
);

export default About;
