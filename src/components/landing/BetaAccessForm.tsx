import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BetaAccessForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "🎉 You're on the list!",
        description: "We'll reach out soon with your beta invite. Thank you for your interest in Blasto!",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="beta-access" className="py-24 bg-background">
      <div className="container px-4">
        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Limited Access</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Request <span className="text-gradient">Beta Access</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              We're onboarding users in small groups to ensure the best experience.
            </p>
          </div>

          <Card className="border-border/50 shadow-xl shadow-primary/5">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="beta-name">Full Name</Label>
                  <Input id="beta-name" placeholder="Your name" required className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beta-email">Email Address</Label>
                  <Input id="beta-email" type="email" placeholder="you@example.com" required className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beta-reason">Why are you interested? <span className="text-muted-foreground">(optional)</span></Label>
                  <Textarea id="beta-reason" placeholder="Tell us about your journey..." rows={3} className="rounded-lg resize-none" />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full py-5 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-300"
                  disabled={loading}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  {loading ? "Submitting..." : "Request Access"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BetaAccessForm;
