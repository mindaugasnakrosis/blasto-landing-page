import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mic, Pill, HeartPulse, BarChart3, BookOpen, Check, ArrowRight } from "lucide-react";
import { PhoneFrame, PhoneScreen, ScreenCompanion } from "./PhoneMockups";
import { cn } from "@/lib/utils";
import { hrefFor } from "@/lib/seo";

type Feature = {
  icon: typeof Mic;
  eyebrow: string;
  title: ReactNode;
  description: string;
  bullets: string[];
  screen: ReactNode;
  /** Deep page for this feature. These links are what make the standalone
   *  pages crawlable and pass the homepage's authority down to them. */
  href: string;
  linkLabel: string;
};

const features: Feature[] = [
  {
    icon: Mic,
    eyebrow: "Your AI companion",
    title: (
      <>
        Someone to talk to, <span className="text-gradient">any hour of the cycle</span>
      </>
    ),
    description:
      "IVF comes with questions at 11pm and nerves before every scan. Blasto's voice companion is one tap away on every screen — it listens, explains what's ahead in plain language, and helps you log things hands-free.",
    bullets: [
      "Talk or type — whatever feels right in the moment",
      "Knows where you are in your treatment",
      "Never a substitute for your clinic's advice",
    ],
    screen: <ScreenCompanion />,
    href: "/ivf-support-companion",
    linkLabel: "More about the companion",
  },
  {
    icon: Pill,
    eyebrow: "Medications & appointments",
    title: (
      <>
        Every dose and date, <span className="text-gradient">off your mind</span>
      </>
    ),
    description:
      "Stim protocols are a part-time job. Blasto turns yours into a simple daily checklist — injections, pills, and appointments with reminders timed the way you want them.",
    bullets: [
      "Today's tasks in one clear list",
      "Reminders for every medication and appointment",
      "Your clinic, protocol, and treatment phase in one place",
    ],
    screen: <PhoneScreen name="home" alt="Blasto home screen with today's medication tasks and reminders" />,
    href: "/ivf-medication-tracker",
    linkLabel: "More about medication tracking",
  },
  {
    icon: HeartPulse,
    eyebrow: "Symptom tracking",
    title: (
      <>
        Log how you feel <span className="text-gradient">in seconds</span>
      </>
    ),
    description:
      "Track symptoms and their intensity as you go, so you can spot patterns and give your care team a clearer picture — and see how common what you're feeling is among others on the same road.",
    bullets: [
      "Quick intensity sliders, no long forms",
      "A running log across your whole cycle",
      "Gentle reassurance, backed by real prevalence data",
    ],
    screen: <PhoneScreen name="symptoms" alt="Blasto symptom tracking screen with intensity slider" />,
    href: "/ivf-symptom-tracker",
    linkLabel: "More about symptom tracking",
  },
  {
    icon: BarChart3,
    eyebrow: "Results",
    title: (
      <>
        Your numbers, <span className="text-gradient">finally clear</span>
      </>
    ),
    description:
      "From eggs retrieved to euploid embryos, Blasto lays out every retrieval, blood draw, and ultrasound as a clean funnel — so you always know where things stand without decoding a portal printout.",
    bullets: [
      "Retrieval funnel from eggs to embryos",
      "Blood work and ultrasounds alongside",
      "Every cycle kept for easy reference",
    ],
    screen: <PhoneScreen name="results" alt="Blasto results screen showing an egg retrieval funnel chart" />,
    href: "/ivf-results-tracker",
    linkLabel: "More about results tracking",
  },
  {
    icon: BookOpen,
    eyebrow: "Learn",
    title: (
      <>
        Understand what's happening, <span className="text-gradient">phase by phase</span>
      </>
    ),
    description:
      "Short, readable articles matched to your treatment phase — medications explained, nutrition tips, and the emotional side of IVF. Informational only, and always deferring to your healthcare provider.",
    bullets: [
      "Picked for you based on where you are",
      "5-minute reads, not medical journals",
      "Covers the emotional journey too",
    ],
    screen: <PhoneScreen name="learn" alt="Blasto learn screen with articles matched to your treatment phase" />,
    href: "/guides",
    linkLabel: "Read the IVF guides",
  },
];

const Features = () => {
  return (
    <section id="features" className="scroll-mt-16 py-24 bg-background">
      <div className="container px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Everything you need, <span className="text-gradient">in one place</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Designed thoughtfully to support you through every phase of your IVF journey.
          </p>
        </motion.div>

        <div className="space-y-24 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.eyebrow}
              className={cn(
                "flex flex-col items-center gap-10 lg:gap-16",
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              )}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-blasto-rose-dark">
                  <feature.icon className="h-4 w-4" />
                  {feature.eyebrow}
                </div>
                <h3 className="mt-4 text-2xl sm:text-3xl font-bold leading-snug">{feature.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{feature.description}</p>
                <ul className="mt-6 space-y-2.5 text-left inline-block">
                  {feature.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                        <Check className="h-3 w-3 text-blasto-rose-dark" strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div>
                  <Link
                    to={hrefFor(feature.href)}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blasto-rose-dark hover:text-primary transition-colors"
                  >
                    {feature.linkLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
              <PhoneFrame className="w-[240px] sm:w-[270px]">{feature.screen}</PhoneFrame>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
