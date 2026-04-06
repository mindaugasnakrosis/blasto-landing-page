import { motion } from "framer-motion";
import { UserPlus, ClipboardList, Bell } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up for Beta",
    description: "Request early access and join a small group of users shaping Blasto.",
  },
  {
    icon: ClipboardList,
    title: "Log Your Cycle",
    description: "Enter your IVF cycle details, medications, and upcoming appointments.",
  },
  {
    icon: Bell,
    title: "Stay on Track",
    description: "Get smart reminders and insights to keep your journey organized.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-blasto-cream">
      <div className="container px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            How it <span className="text-gradient">works</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">Three simple steps to get started.</p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-start justify-center gap-8 md:gap-4 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="flex-1 flex flex-col items-center text-center relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* Connector line (hidden on mobile, hidden after last) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border" />
              )}

              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 mb-4">
                <step.icon className="h-7 w-7 text-primary" />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-[220px]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
