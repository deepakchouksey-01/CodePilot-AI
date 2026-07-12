import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/landing/Hero";
import TrustedBy from "@/components/landing/TrustedBy";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import DashboardPreview from "@/components/landing/DashboardPreview";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <DashboardPreview />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}