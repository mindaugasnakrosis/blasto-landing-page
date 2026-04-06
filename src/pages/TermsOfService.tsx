import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import blastoLogo from "@/assets/blasto-logo.png";

const TermsOfService = () => {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-10">Last updated: April 6, 2026</p>

        <div className="space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the Blasto application ("the App"), operated by MB TrustGoods, a company registered in Lithuania, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Beta Program</h2>
            <p>Blasto is currently available as a closed beta. Access is granted at our discretion and may be revoked at any time. Beta features may change, be incomplete, or contain errors. By participating in the beta, you acknowledge that the App is under active development.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Medical Disclaimer</h2>
            <p className="font-medium">Blasto is not a medical device and does not provide medical advice. The App is designed as a tracking and organizational tool only. Always consult your healthcare provider for medical decisions related to your IVF treatment. We are not responsible for any medical outcomes based on information tracked in the App.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. User Accounts and Authentication</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You may sign in using third-party authentication providers such as Google Sign-In or Apple Sign-In. By doing so, you authorize us to access basic profile information (name, email, profile picture) from those providers.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You must provide accurate and complete information when creating an account.</li>
              <li>You are responsible for all activities that occur under your account.</li>
              <li>You must notify us immediately of any unauthorized use of your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Acceptable Use</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the App for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the App</li>
              <li>Interfere with or disrupt the App's functionality</li>
              <li>Reverse engineer, decompile, or disassemble any part of the App</li>
              <li>Share your beta access with unauthorized individuals</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Intellectual Property</h2>
            <p>All content, features, and functionality of the App are owned by MB TrustGoods and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, MB TrustGoods shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the App. Our total liability shall not exceed the amount you paid us in the twelve months prior to the claim.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Termination</h2>
            <p>We may terminate or suspend your access to the App at any time, with or without cause, with or without notice. Upon termination, your right to use the App will immediately cease. You may request deletion of your data upon termination by contacting us.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the Republic of Lithuania, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Lithuania.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. We will provide notice of significant changes. Your continued use of the App after changes constitutes acceptance of the updated Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <ul className="list-none pl-0 mt-3 space-y-1">
              <li><strong>MB TrustGoods</strong></li>
              <li>Email: <a href="mailto:support@blastoivf.com" className="text-primary hover:underline">support@blastoivf.com</a></li>
              <li>Country: Lithuania</li>
            </ul>
          </section>
        </div>
      </motion.main>
    </div>
  );
};

export default TermsOfService;
