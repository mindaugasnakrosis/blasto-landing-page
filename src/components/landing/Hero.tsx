import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck } from "lucide-react";
import { PhoneFrame } from "./PhoneMockups";
import AppStoreBadge from "./AppStoreBadge";
import { isAppLive } from "@/lib/site";
import screenHero from "@/assets/screenshots/screen-hero.webp";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pt-16">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-32 right-[15%] w-48 h-48 rounded-full bg-blasto-teal/15 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 right-[10%] w-32 h-32 rounded-full bg-blasto-sage/20 blur-2xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container relative z-10 grid items-center gap-12 px-4 py-16 sm:py-24 lg:grid-cols-2 lg:gap-8">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-start"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-sm font-medium text-foreground/80">
                {isAppLive ? "Now on the App Store" : "Limited Beta — Spots filling up"}
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            The IVF app that keeps your{" "}
            <span className="text-gradient">cycle organized</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Nurturing every step of your fertility journey — medications, appointments,
            symptoms, and results in one calm iPhone app, with a supportive voice
            companion by your side the whole way.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            {isAppLive ? (
              <AppStoreBadge />
            ) : (
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
              >
                <a href="#beta-access">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Request Beta Access
                </a>
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-base border-primary/30 hover:bg-primary/5"
            >
              <a href="#features">See what's inside</a>
            </Button>
          </motion.div>

          <motion.p
            className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ShieldCheck className="h-4 w-4 text-blasto-sage-dark" />
            Private by design — your data is never sold. Free during beta.
          </motion.p>
        </div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <PhoneFrame className="rotate-2 hover:rotate-0 transition-transform duration-500">
            {/* The LCP element. Eager + high priority; the prerendered HTML
                means the preload scanner finds it before React boots. */}
            <img
              src={screenHero}
              alt="Blasto home screen showing an egg retrieval countdown and today's medication tasks"
              width={750}
              height={1626}
              loading="eager"
              decoding="async"
              // React 18 drops the camelCase `fetchPriority` prop silently
              // (it landed in React 19), so pass the DOM attribute directly.
              {...{ fetchpriority: "high" }}
            />
          </PhoneFrame>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
