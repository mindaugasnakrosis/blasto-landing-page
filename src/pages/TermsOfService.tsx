import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import blastoLogo from "@/assets/blasto-logo.webp";
import { SUPPORT_EMAIL } from "@/lib/site";

const TermsOfService = () => {
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

      <main className="animate-rise-in container px-4 py-12 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-10">Last updated: October 14, 2026</p>

        {/* Same text as the app's Profile > Terms of Service
            (fertility-app src/screens/profile/TermsOfServiceScreen.tsx). The
            paywall links here, so keep the two in step. */}
        <div className="space-y-8 text-foreground/90 leading-relaxed">
          <p>Please read these Terms of Service ("Terms") carefully before using the Blasto mobile application ("the App") operated by Blasto ("we", "our", or "us"). By accessing or using the App, you agree to be bound by these Terms. If you do not agree, please do not use the App.</p>

          <section>
            <h2 className="text-xl font-semibold mb-3">1. No Medical Advice Disclaimer</h2>
            <p className="mb-3">Blasto is a personal tracking and community support tool designed to help you organize and record your fertility treatment journey. The App does not provide medical advice, diagnosis, or treatment of any kind.</p>
            <p className="mb-3">All information presented within the App, including but not limited to treatment tracking features, symptom logs, community posts, and AI assistant responses, is for informational and personal tracking purposes only. This information should never be used as a substitute for professional medical advice.</p>
            <p>Always seek the advice of your physician, fertility specialist, or other qualified healthcare provider with any questions you may have regarding a medical condition or treatment. Never disregard professional medical advice or delay in seeking it because of something you have read or tracked in the App.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Community Guidelines</h2>
            <p className="mb-3">Our community features are intended to provide a supportive and respectful space for individuals on their fertility journey. By using community features, you agree to the following guidelines:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>No Harassment or Bullying:</strong> Treat all community members with respect and kindness. Harassment, bullying, intimidation, or any form of abusive behavior will not be tolerated.</li>
              <li><strong>No Medical Claims:</strong> Do not present personal experiences as medical advice. You may share your own experiences, but you must not make claims about treatments, medications, or procedures that could be interpreted as medical recommendations. Always encourage others to consult their healthcare providers.</li>
              <li><strong>No Spam or Promotion:</strong> Do not post promotional content, advertisements, or spam of any kind in community spaces.</li>
              <li><strong>Respect Privacy:</strong> Do not share other users' personal information without their explicit consent. Be mindful that fertility journeys are deeply personal.</li>
              <li><strong>Appropriate Content:</strong> All content must be appropriate and relevant to the fertility and IVF community. Content that is offensive, discriminatory, or unrelated may be removed.</li>
            </ul>
            <p className="mt-3">We reserve the right to remove any content that violates these guidelines and to suspend or terminate the accounts of users who repeatedly violate community standards.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Responsibilities</h2>
            <p className="mb-3">As a user of Blasto, you are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing accurate information when creating your account</li>
              <li>If you sign in with Google or Apple, authorising us to receive your basic profile information (name and email) from that provider</li>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activity that occurs under your account</li>
              <li>Ensuring your use of the App complies with all applicable laws and regulations</li>
              <li>The accuracy of any health or treatment data you enter into the App</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>
            <p className="mt-3">You agree not to use the App for any unlawful purpose or in any way that could damage, disable, or impair the App's functionality.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Subscriptions and Payments</h2>
            <p className="mb-3">Blasto is free to use, with limits on how many items of each kind you can keep active. Blasto Premium is an optional auto-renewing subscription, offered monthly or yearly, that removes those limits and raises the monthly voice assistant allowance. The price and billing period are shown in the App before you confirm a purchase.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment is charged to the App Store or Google Play account you purchase with when you confirm the purchase.</li>
              <li>The subscription renews automatically for the same period and price unless it is cancelled at least 24 hours before the end of the current period. Your account is charged for the renewal within the 24 hours before the current period ends.</li>
              <li>You can manage or cancel the subscription in your App Store or Google Play account settings. Cancelling stops the next renewal; Premium stays active until the end of the period you have paid for.</li>
              <li>Deleting the App or your Blasto account does not cancel a subscription - cancel it in the store as well.</li>
              <li>If a free trial is offered, any unused part of it ends when you buy a subscription.</li>
              <li>Purchases are processed by Apple or Google, and refunds are handled by them under their own refund policies.</li>
              <li>If Premium ends, everything you have saved stays in your account; the free limits then apply to adding new items.</li>
            </ul>
            <p className="mt-3">If you downloaded the App from Apple's App Store, Apple's <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" className="text-primary hover:underline">Standard Licensed Application End User License Agreement</a> also applies to your use of the App. Where it and these Terms differ, these Terms apply to the extent permitted.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Account Termination</h2>
            <p className="mb-3">You may delete your account at any time through the App's Profile settings. Upon account deletion, all your personal data will be permanently removed from our systems within 30 days.</p>
            <p className="mb-3">We reserve the right to suspend or terminate your account at our sole discretion, without prior notice, for conduct that we determine:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violates these Terms or our Community Guidelines</li>
              <li>Is harmful to other users, third parties, or the integrity of the App</li>
              <li>Involves fraudulent, abusive, or unlawful activity</li>
            </ul>
            <p className="mt-3">In the event of termination for violation of these Terms, we may retain certain data as required by law or for legitimate business purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Intellectual Property</h2>
            <p className="mb-3">The App and its original content, features, and functionality are owned by Blasto and are protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any part of the App without our express written permission.</p>
            <p>Content you create and post within the App (such as community posts and comments) remains your intellectual property. However, by posting content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute such content within the App.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
            <p className="mb-3">To the fullest extent permitted by applicable law, Blasto and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Loss of data or information</li>
              <li>Personal injury or property damage resulting from your use of the App</li>
              <li>Any unauthorized access to or alteration of your data</li>
              <li>Any medical decisions made based on information tracked or displayed in the App</li>
              <li>Any interruption or cessation of the App's availability</li>
            </ul>
            <p className="mt-3 mb-3">Where liability cannot be excluded, our total liability to you is limited to the amount you paid us in the twelve months before the claim.</p>
            <p>The App is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. We do not warrant that the App will be uninterrupted, error-free, or completely secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Indemnification</h2>
            <p>You agree to indemnify and hold harmless Blasto and its affiliates from any claims, losses, damages, liabilities, costs, and expenses (including reasonable legal fees) arising from your use of the App, your violation of these Terms, or your violation of any rights of another user or third party.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Changes to These Terms</h2>
            <p>We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms within the App and updating the "Last updated" date. Your continued use of the App following any changes constitutes your acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Blasto operates, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved in the competent courts of that jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <ul className="list-none pl-0 mt-3 space-y-1">
              <li><strong>Blasto</strong></li>
              <li>Email: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary hover:underline">{SUPPORT_EMAIL}</a></li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
