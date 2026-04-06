import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    try {
      await fetch("https://script.google.com/macros/s/AKfycbwpb6li2kLQMXENKYkG6IBOmXsGoPeo-hzF3bqtLH6BPeYo01evMfnepdM20YH5xaeo0A/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "newsletter",
          email: (form.querySelector("input[type=email]") as HTMLInputElement).value,
        }),
      });
      toast({
        title: "📬 Subscribed!",
        description: "You'll be the first to know when Blasto launches publicly.",
      });
      form.reset();
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold">
            Stay <span className="text-gradient">updated</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Be the first to know when Blasto launches publicly.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              required
              className="rounded-full flex-1 px-5 py-5"
            />
            <Button
              type="submit"
              className="rounded-full px-8 py-5 font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105"
              disabled={loading}
            >
              {loading ? "..." : "Subscribe"}
            </Button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">No spam, ever. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
