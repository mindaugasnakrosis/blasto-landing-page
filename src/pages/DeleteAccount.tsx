import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import { SUPPORT_EMAIL } from "@/lib/site";

/**
 * Required by Google Play: an account-deletion route reachable WITHOUT
 * installing the app or signing in, linked from the store listing.
 *
 * Play's reviewers check for four things, so all four are stated plainly and
 * none of them are buried in prose: how to delete from inside the app, how to
 * delete without the app, exactly what is deleted, and what is kept and for
 * how long. Keep this page in sync with the `deleteAccount` Cloud Function —
 * if that function stops deleting something, this page is a false statement.
 */
const DeleteAccount = () => (
  <PageShell>
    <h1 className="text-3xl sm:text-4xl font-bold">
      Delete your <span className="text-gradient">Blasto account</span>
    </h1>
    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
      You can delete your Blasto account and everything in it at any time, from
      inside the app or by emailing us. Deletion is permanent and cannot be
      undone.
    </p>

    <div className="mt-12 space-y-10 text-foreground/90 leading-relaxed">
      <section className="rounded-xl border border-border/60 bg-blasto-cream/50 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Before you delete
        </p>
        <p className="mt-3">
          If you want to keep a copy of your cycle history, export it first:
          open Blasto, go to <strong>Profile → Export My Data</strong>, and save
          the file. Once the account is deleted we cannot recover any of it,
          including for you.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Option 1 — delete in the app</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6">
          <li>Open Blasto and sign in.</li>
          <li>
            Tap <strong>Profile</strong> in the bottom tab bar.
          </li>
          <li>
            Scroll to the bottom and tap <strong>Delete Account</strong>.
          </li>
          <li>
            Confirm. If you signed up with an email and password you will be
            asked for your password; if you signed in with Google or Apple you
            will be asked to re-authenticate.
          </li>
        </ol>
        <p className="mt-4">
          Deletion runs immediately. You will be signed out as soon as it
          finishes.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">
          Option 2 — delete by email (no app needed)
        </h2>
        <p className="mt-3">
          If you have already uninstalled Blasto, or you cannot sign in, email{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Account%20deletion%20request`}
            className="text-primary underline hover:no-underline"
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          from the email address on the account, with{" "}
          <strong>"Account deletion request"</strong> as the subject.
        </p>
        <p className="mt-3">
          We will confirm the request, delete the account, and email you when it
          is done — within <strong>30 days</strong>, and in practice much
          sooner. We ask you to write from the account's own email address
          because it is the only way we can tell it is really you; we will not
          delete an account on the word of a third party.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">What gets deleted</h2>
        <p className="mt-3">
          Everything tied to your account, permanently, from our live systems:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Your profile — name, email, clinic, treatment stage and dates</li>
          <li>Medications, schedules and every dose you logged</li>
          <li>Symptom and mood entries, including notes</li>
          <li>Appointments</li>
          <li>
            Results — egg retrievals, blood work and ultrasound records
          </li>
          <li>Tasks and reminders</li>
          <li>
            Your community posts, and the comments you left on other people's
            posts
          </li>
          <li>
            Voice companion session records (usage counts and timestamps — we
            never stored the audio or a transcript in the first place)
          </li>
          <li>Analytics events associated with your account</li>
          <li>Your sign-in record itself, so the account no longer exists</li>
        </ul>
        <p className="mt-4">
          Reminders scheduled on your phone are local to the device and
          disappear when you uninstall the app. Appointments Blasto added to
          your device calendar stay in your calendar — delete that "blasto"
          calendar yourself if you want them gone.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">What we keep, and for how long</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Purchase records — kept by Apple or Google, not by us.</strong>{" "}
            Your subscription receipts belong to the store you bought through
            and are governed by their retention rules, not ours.
          </li>
          <li>
            <strong>Backups and server logs — up to 30 days.</strong> Copies of
            deleted data can survive briefly in encrypted backups and
            operational logs before they age out. They are not accessible in the
            app and are never used for anything.
          </li>
          <li>
            <strong>Anything the law requires us to keep</strong>, for as long
            as it requires and no longer.
          </li>
        </ul>
      </section>

      <section className="rounded-xl border border-primary/30 bg-primary/5 p-6">
        <h2 className="text-xl font-bold">
          Deleting your account does not cancel your subscription
        </h2>
        <p className="mt-3">
          Subscriptions are billed by the app store, not by us, so cancelling
          has to happen there — and it has to happen <em>before</em> you delete,
          or you will keep being charged for an account that no longer exists.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Google Play:</strong> Play Store app → your profile icon →
            Payments &amp; subscriptions → Subscriptions → Blasto → Cancel
            subscription
          </li>
          <li>
            <strong>Apple:</strong> Settings → your name → Subscriptions →
            Blasto → Cancel Subscription
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold">Deleting some data but not all</h2>
        <p className="mt-3">
          You do not have to delete the whole account to remove something. Any
          individual medication, symptom log, appointment, result or community
          post can be deleted inside the app, and it is removed from our systems
          the same way. Account deletion is the all-at-once version.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Questions</h2>
        <p className="mt-3">
          Email{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-primary underline hover:no-underline"
          >
            {SUPPORT_EMAIL}
          </a>
          . Our{" "}
          <Link to="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>{" "}
          covers what we collect and your rights under GDPR, including access,
          correction and portability.
        </p>
      </section>
    </div>
  </PageShell>
);

export default DeleteAccount;
