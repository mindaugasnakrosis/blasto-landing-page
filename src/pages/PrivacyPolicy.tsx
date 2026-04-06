import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import blastoLogo from "@/assets/blasto-logo.png";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container px-4 py-4 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <img src={blastoLogo} alt="Blasto logo" className="h-7 w-7 rounded-lg" />
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
        <p className="text-muted-foreground mb-10">Last updated: April 6, 2026</p>

        <div className="space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p>Blasto ("we", "our", or "us") operates the Blasto mobile application and related services. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, "the Service").</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> When you sign in using Google Sign-In or Apple Sign-In, we receive your name, email address, and profile picture as provided by the authentication provider. We use this information solely to create and manage your account.</li>
              <li><strong>Health Data:</strong> IVF cycle details, medication schedules, and appointment information you voluntarily enter into the app.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with the app, including device information, log data, and analytics.</li>
              <li><strong>Feedback and Communications:</strong> Information you provide when submitting feedback, requesting beta access, or contacting us.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Google API Services</h2>
            <p className="mb-3">Our use of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements. Specifically:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We only request access to the data necessary to provide the Service (name, email, profile picture for authentication).</li>
              <li>We do not use Google user data for serving advertisements.</li>
              <li>We do not transfer Google user data to third parties unless necessary to provide the Service, required by law, or with your explicit consent.</li>
              <li>We do not use Google user data for purposes unrelated to the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, maintain, and improve our services</li>
              <li>To create and manage your account</li>
              <li>To send you updates about the app and your beta access</li>
              <li>To improve and personalize your experience</li>
              <li>To respond to your feedback and support requests</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal and health data. All data is encrypted in transit and at rest. However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Data Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share anonymized, aggregated data for research or analytical purposes. We will never share your health data without your explicit consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Data Retention and Deletion</h2>
            <p className="mb-3">We retain your personal data only for as long as necessary to provide the Service and fulfill the purposes described in this policy. You may request deletion of your account and all associated data at any time by contacting us at <a href="mailto:support@blastoivf.com" className="text-primary hover:underline">support@blastoivf.com</a>. Upon receiving a deletion request, we will delete your data within 30 days, except where retention is required by law.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Your Rights Under GDPR</h2>
            <p className="mb-3">If you are located in the European Economic Area (EEA), you have the following rights under the General Data Protection Regulation (GDPR):</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Right of Access:</strong> You may request a copy of the personal data we hold about you.</li>
              <li><strong>Right to Rectification:</strong> You may request correction of inaccurate or incomplete data.</li>
              <li><strong>Right to Erasure:</strong> You may request deletion of your personal data.</li>
              <li><strong>Right to Data Portability:</strong> You may request a machine-readable copy of your data.</li>
              <li><strong>Right to Restrict Processing:</strong> You may request that we limit how we use your data.</li>
              <li><strong>Right to Object:</strong> You may object to our processing of your personal data.</li>
              <li><strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it at any time.</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, contact us at <a href="mailto:support@blastoivf.com" className="text-primary hover:underline">support@blastoivf.com</a>. We will respond to your request within 30 days. You also have the right to lodge a complaint with your local data protection supervisory authority.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul className="list-none pl-0 mt-3 space-y-1">
              <li><strong>Blasto</strong></li>
              <li>Email: <a href="mailto:support@blastoivf.com" className="text-primary hover:underline">support@blastoivf.com</a></li>

            </ul>
          </section>
        </div>
      </motion.main>
    </div>
  );
};

export default PrivacyPolicy;
