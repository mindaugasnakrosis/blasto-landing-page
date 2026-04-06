import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import BetaAccessForm from "@/components/landing/BetaAccessForm";
import FeedbackForm from "@/components/landing/FeedbackForm";
import Newsletter from "@/components/landing/Newsletter";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <BetaAccessForm />
      <FeedbackForm />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Index;
