import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import blastoLogo from "@/assets/blasto-logo.webp";
import { SUPPORT_EMAIL } from "@/lib/site";

/**
 * The public privacy policy. Three documents have to agree with each other:
 * this page, the in-app policy (fertility-app/src/screens/profile/
 * PrivacyPolicyScreen.tsx) and the Play Data safety form (fertility-app/
 * PLAY_DATA_SAFETY.md). A store form that contradicts the developer's own
 * policy is the easiest kind of policy violation to prove — so if a
 * third-party service is added or dropped, all three change together.
 *
 * Deliberately platform-neutral: it describes what the app does, not which
 * store you got it from, so it does not need rewriting at each launch.
 */
const mail = `mailto:${SUPPORT_EMAIL}`;

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container px-4 py-4 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <img src={blastoLogo} alt="Blasto logo" className="h-7 w-7 rounded-lg" width={128} height={128} />
            <span className="font-bold text-lg text-foreground">Blasto</span>
          </Link>
        </div>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 py-12 max-w-3xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: August 16, 2026</p>

        <div className="space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p>Blasto ("we", "our", or "us") operates the Blasto mobile application and this website (together, "the Service"). IVF data is among the most personal data there is, and this policy is written to be read rather than to cover us: it explains what we collect, who processes it, how long we keep it, and how you get rid of it.</p>
            <p className="mt-3">In short: we do not sell your data, we do not share it with advertisers or data brokers, and you can export or delete everything yourself at any time.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
            <p className="mb-3">Almost everything here is information you choose to enter. The app works with none of it filled in.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account information:</strong> Your email address, and your name if you provide one. If you sign in with Google or Apple we receive your name and email address from that provider and use them only to create and run your account.</li>
              <li><strong>Treatment data:</strong> Treatment stage, cycle dates, clinic name and protocol details you enter.</li>
              <li><strong>Medication records:</strong> Medication names, dosages, schedules, and the doses you log.</li>
              <li><strong>Symptom and mood logs:</strong> Entries, intensity ratings and any notes you write.</li>
              <li><strong>Appointments:</strong> Dates, times, types, locations and notes.</li>
              <li><strong>Results:</strong> Egg retrieval numbers, blood work entries and ultrasound records.</li>
              <li><strong>Community content:</strong> Posts, comments and reactions you share in the community feature. Anything you post there is visible to other members — treat it as public.</li>
              <li><strong>Voice companion audio:</strong> When you talk to the AI companion, your speech is streamed to our voice provider to generate a reply. It is processed for that purpose and not stored — we keep only a count of sessions and turns, to meter the monthly allowance.</li>
              <li><strong>Usage data:</strong> In-app events such as which screens you open and which features you use, recorded as counts, identifiers and flags. Medical content is never included in analytics.</li>
              <li><strong>Diagnostics:</strong> Crash reports and performance data, stripped of identifying information before they leave your device.</li>
              <li><strong>Subscription status:</strong> Whether you have an active subscription. We never see or store your payment details.</li>
              <li><strong>Correspondence:</strong> What you send us when you contact support, submit feedback or request beta access through this website.</li>
            </ul>
            <p className="mt-3">We do not collect your location. Appointments the app adds to your device calendar are written on the device and never sent to us.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. How We Store Your Data</h2>
            <p>Your data is stored using Firebase, a Google Cloud service. It is encrypted in transit using industry-standard TLS and encrypted at rest by the platform, with access controls limiting who can reach it. No system is perfectly secure, and we will not claim otherwise — but nothing about your treatment leaves the app in the clear.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Third-Party Services</h2>
            <p className="mb-3">These providers process data on our behalf, only to make the Service work. None of them are permitted to use it for their own purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Firebase (Google):</strong> Authentication, database storage and server functions.</li>
              <li><strong>ElevenLabs:</strong> Powers the AI voice companion. Audio is processed to generate a reply and is not retained afterwards.</li>
              <li><strong>RevenueCat:</strong> Manages subscriptions. It receives your account identifier and your subscription status, and never receives your health or treatment data.</li>
              <li><strong>Sentry:</strong> Crash and error reporting, so we can fix problems. Reports carry no email address, no IP address, and none of your symptoms, medications or messages.</li>
              <li><strong>PostHog:</strong> Product analytics, so we can see which parts of the app are used and where people get stuck. It receives your account identifier, the screens you open and actions such as "logged a medication" - never the medication, symptom, result or message itself. Hosted in the European Union.</li>
              <li><strong>Brevo:</strong> Delivers account emails such as address verification and password resets.</li>
              <li><strong>Apple and Google:</strong> Whichever app store you downloaded Blasto from processes subscription payments. The store handles the transaction and tells us only whether your subscription is active.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Google API Services</h2>
            <p className="mb-3">Our use of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements. Specifically:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We only request access to the data necessary to provide the Service (name, email, profile picture for authentication).</li>
              <li>We do not use Google user data for serving advertisements.</li>
              <li>We do not transfer Google user data to third parties unless necessary to provide the Service, required by law, or with your explicit consent.</li>
              <li>We do not use Google user data for purposes unrelated to the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide the app's features and keep your data in sync across your devices</li>
              <li>To personalise what you see based on the treatment stage you are in</li>
              <li>To send the notifications you have turned on, such as medication and appointment reminders</li>
              <li>To run the community feature, including moderation, reporting and blocking</li>
              <li>To manage subscriptions and premium access</li>
              <li>To fix crashes and improve the app</li>
              <li>To respond to your support requests</li>
              <li>To meet our legal obligations</li>
            </ul>
            <p className="mt-3">We do not use your data to train advertising profiles, and we do not use your health data to train third-party AI models.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Data Sharing</h2>
            <p>We do not sell, rent or trade your personal information. Your health and treatment data is never shared with advertisers or data brokers. We share data only with the processors listed in section 4, where the law requires it, or to protect the safety and rights of our users or the public. Community posts are shared with other members of the community by definition — that is what posting means.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Exporting and Deleting Your Data</h2>
            <p className="mb-3">Both are self-service, and neither requires you to ask us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Export:</strong> Profile → <strong>Export My Data</strong> in the app produces a machine-readable copy of everything we hold about you.</li>
              <li><strong>Delete:</strong> Profile → <strong>Delete Account</strong> permanently deletes your account and all associated data — profile, medications, symptoms, appointments, results, tasks, community posts and comments, voice-session records and analytics events — along with your sign-in record itself.</li>
            </ul>
            <p className="mt-3">If you have uninstalled the app or cannot sign in, email <a href={mail} className="text-primary hover:underline">{SUPPORT_EMAIL}</a> from the account's email address and we will delete it for you. Full instructions, including exactly what is deleted and what is retained, are on the <Link to="/delete-account/" className="text-primary hover:underline">account deletion page</Link>.</p>
            <p className="mt-3">Deleting your account does not cancel a paid subscription — subscriptions are billed by the app store and must be cancelled there first.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Data Retention</h2>
            <p>We keep your data for as long as your account exists. When you delete your account, it is removed from our live systems immediately; residual copies in encrypted backups and operational logs age out within 30 days. We retain nothing beyond that except where the law requires it.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Your Rights Under GDPR</h2>
            <p className="mb-3">If you are in the European Economic Area or the UK, you have the following rights under the General Data Protection Regulation:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Right of access:</strong> A copy of the personal data we hold about you — available immediately through Export My Data.</li>
              <li><strong>Right to rectification:</strong> Correction of inaccurate or incomplete data, editable in the app at any time.</li>
              <li><strong>Right to erasure:</strong> Deletion of your personal data, available immediately through Delete Account.</li>
              <li><strong>Right to data portability:</strong> A machine-readable copy of your data, which is what the export produces.</li>
              <li><strong>Right to restrict processing:</strong> You may ask us to limit how we use your data.</li>
              <li><strong>Right to object:</strong> You may object to our processing of your personal data.</li>
              <li><strong>Right to withdraw consent:</strong> Where processing rests on consent, you may withdraw it at any time.</li>
            </ul>
            <p className="mt-3">To exercise the rights that are not self-service, contact us at <a href={mail} className="text-primary hover:underline">{SUPPORT_EMAIL}</a>. We respond within 30 days. You also have the right to complain to your local data protection authority.</p>
            <p className="mt-3">If you live in California or another US state with comparable privacy law, you have equivalent rights to know, delete and correct your data, and to opt out of its sale or sharing — we do not sell or share personal information as those laws define it, and we do not discriminate against anyone for exercising these rights.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Children's Privacy</h2>
            <p>Blasto is not intended for anyone under 18. We do not knowingly collect data from children, and if we learn that we have, we will delete it.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">12. Medical Disclaimer</h2>
            <p>Blasto is a personal tracking and community support tool. It is not a medical device and does not provide medical advice, diagnosis or treatment, and nothing in it — including anything shared by other members — is a substitute for your clinic. Always consult your healthcare provider about your treatment.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">13. Changes to This Policy</h2>
            <p>We may update this policy from time to time. Material changes will be posted here and in the app, with the "Last updated" date changed. Continuing to use the Service after a change means you accept the updated policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">14. Contact Us</h2>
            <p>Questions about this policy or how we handle your data:</p>
            <ul className="list-none pl-0 mt-3 space-y-1">
              <li><strong>Blasto</strong></li>
              <li>Email: <a href={mail} className="text-primary hover:underline">{SUPPORT_EMAIL}</a></li>
            </ul>
          </section>
        </div>
      </motion.main>
    </div>
  );
};

export default PrivacyPolicy;
