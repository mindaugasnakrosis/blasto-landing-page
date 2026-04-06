import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageCircle, Lightbulb, Bug, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { value: "comment", label: "Comment", icon: MessageCircle },
  { value: "feature", label: "Feature Request", icon: Lightbulb },
  { value: "bug", label: "Bug Report", icon: Bug },
];

const FeedbackForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("comment");

  const labels: Record<string, string> = {
    comment: "comment",
    feature: "feature request",
    bug: "bug report",
  };

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
          form: "feedback",
          category: activeTab,
          name: (form.elements.namedItem(`fb-name-${activeTab}`) as HTMLInputElement).value,
          email: (form.elements.namedItem(`fb-email-${activeTab}`) as HTMLInputElement).value,
          message: (form.elements.namedItem(`fb-message-${activeTab}`) as HTMLTextAreaElement).value,
        }),
      });
      toast({
        title: "✅ Feedback received!",
        description: `Thank you for your ${labels[activeTab]}. We truly appreciate it.`,
      });
      form.reset();
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="feedback" className="py-24 bg-blasto-cream">
      <div className="container px-4">
        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Share your <span className="text-gradient">feedback</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Help us shape Blasto — every voice matters.
            </p>
          </div>

          <Card className="border-border/50 shadow-xl shadow-primary/5">
            <CardContent className="p-6 sm:p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full mb-6 bg-muted/60">
                  {categories.map((cat) => (
                    <TabsTrigger key={cat.value} value={cat.value} className="flex-1 gap-1.5 text-xs sm:text-sm">
                      <cat.icon className="h-3.5 w-3.5" />
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categories.map((cat) => (
                  <TabsContent key={cat.value} value={cat.value}>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor={`fb-name-${cat.value}`}>
                          Name <span className="text-muted-foreground">(optional)</span>
                        </Label>
                        <Input id={`fb-name-${cat.value}`} placeholder="Your name" className="rounded-lg" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`fb-email-${cat.value}`}>Email</Label>
                        <Input id={`fb-email-${cat.value}`} type="email" placeholder="you@example.com" required className="rounded-lg" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`fb-message-${cat.value}`}>Message</Label>
                        <Textarea
                          id={`fb-message-${cat.value}`}
                          placeholder={
                            cat.value === "bug"
                              ? "Describe the bug and steps to reproduce..."
                              : cat.value === "feature"
                              ? "What feature would help your journey?"
                              : "Share your thoughts with us..."
                          }
                          rows={4}
                          required
                          className="rounded-lg resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full rounded-full py-5 text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-300"
                        disabled={loading}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        {loading ? "Sending..." : "Submit Feedback"}
                      </Button>
                    </form>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FeedbackForm;
