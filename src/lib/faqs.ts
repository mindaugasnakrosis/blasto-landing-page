/**
 * FAQ content — single source of truth.
 *
 * Rendered visibly by <FAQ /> and emitted as FAQPage structured data by
 * src/lib/seo.ts. Keep them in one place: Google treats FAQPage markup that
 * doesn't match on-page text as a spam signal, so these must never drift.
 */
import { SUPPORT_EMAIL } from "./site";

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How much does Blasto cost?",
    a: "Blasto is completely free while it's in beta. Pricing for the full release hasn't been decided yet — beta members will hear about it first, and you'll never be charged without clearly opting in.",
  },
  {
    q: "How do I cancel?",
    a: "There's nothing to cancel during the free beta — you can simply delete your account at any time. If paid plans are introduced later, subscriptions will be managed through the App Store or Google Play, whichever you downloaded Blasto from, where you can cancel anytime with a couple of taps.",
  },
  {
    q: "Is Blasto medical advice?",
    a: "No. Blasto helps you organize and track your IVF journey, but it isn't a medical device and doesn't provide medical advice, diagnosis, or treatment. Its content is informational only — always follow the guidance of your fertility clinic and healthcare providers.",
  },
  {
    q: "Who can see my fertility data?",
    a: "Only you. We never sell your data, and we don't share it with advertisers or data brokers. Your entries are encrypted and access is restricted to what's needed to operate the app.",
  },
  {
    q: "What happens to my data if I delete my account?",
    a: "Your data is permanently deleted from our systems within 30 days of your request. You can also ask for an export of your data at any time — the details are in our Privacy Policy.",
  },
  {
    q: "What devices does Blasto work on?",
    a: `Blasto runs on iPhone and Android phones. During the beta, access is by invitation — request access on this page and we'll send you an invite. Questions? Email us at ${SUPPORT_EMAIL}.`,
  },
];
