import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SUPPORT_EMAIL } from "@/lib/site";

const faqs = [
  {
    q: "How much does Blasto cost?",
    a: "Blasto is completely free while it's in beta. Pricing for the full release hasn't been decided yet — beta members will hear about it first, and you'll never be charged without clearly opting in.",
  },
  {
    q: "How do I cancel?",
    a: "There's nothing to cancel during the free beta — you can simply delete your account at any time. If paid plans are introduced later, subscriptions will be managed through your Apple App Store account, where you can cancel anytime with a couple of taps.",
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
    a: `Blasto is an iPhone app. During the beta, access is by invitation — request access on this page and we'll send you an invite. Questions? Email us at ${SUPPORT_EMAIL}.`,
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="scroll-mt-16 py-24 bg-background">
      <div className="container px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Questions, <span className="text-gradient">answered</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            The things people ask us most.
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
