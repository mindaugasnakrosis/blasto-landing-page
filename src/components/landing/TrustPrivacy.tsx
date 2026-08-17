import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lock, Download, EyeOff, Stethoscope } from "lucide-react";

const points = [
  {
    icon: EyeOff,
    title: "Never sold, never traded",
    description:
      "We don't sell your data and we don't share it with advertisers or data brokers. Your fertility journey is nobody's business but yours.",
  },
  {
    icon: Download,
    title: "Export or delete anytime",
    description:
      "Your data belongs to you. Request an export whenever you like, or delete your account and we erase your data within 30 days.",
  },
  {
    icon: Lock,
    title: "Private by design",
    description:
      "Your entries are encrypted and access is limited to what's needed to run the app — nothing more.",
  },
];

const TrustPrivacy = () => {
  return (
    <section id="privacy" className="scroll-mt-16 py-24 bg-blasto-cream">
      <div className="container px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Your data is <span className="text-gradient">yours</span>. Full stop.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            This is some of the most personal data there is. We treat it that way.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              className="rounded-2xl bg-card p-6 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <point.icon className="h-6 w-6 text-blasto-rose-dark" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{point.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mx-auto mt-10 flex max-w-4xl items-start gap-3 rounded-2xl border border-border/60 bg-background/60 p-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-blasto-rose-dark" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Blasto is not a medical device.</span>{" "}
            It's a personal tracking and support tool — it doesn't provide medical advice,
            diagnosis, or treatment. Always follow the guidance of your fertility clinic and
            healthcare providers. See our{" "}
            <Link to="/privacy/" className="underline hover:text-foreground">Privacy Policy</Link> and{" "}
            <Link to="/terms/" className="underline hover:text-foreground">Terms of Service</Link>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustPrivacy;
