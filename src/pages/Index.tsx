import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import TrustPrivacy from "@/components/landing/TrustPrivacy";
import FAQ from "@/components/landing/FAQ";
import BetaAccessForm from "@/components/landing/BetaAccessForm";
import FeedbackForm from "@/components/landing/FeedbackForm";
import Newsletter from "@/components/landing/Newsletter";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Features />
        <HowItWorks />
        <TrustPrivacy />
        <FAQ />
        <BetaAccessForm />
        <FeedbackForm />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Index;
