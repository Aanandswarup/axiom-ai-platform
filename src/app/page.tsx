import React from "react";
import { Navbar } from "@/components/navigation/navbar";
import { Hero } from "@/components/hero/hero";
import { LogoMarquee } from "@/components/marquee/logo-marquee";
import { BentoGrid } from "@/components/bento/bento-grid";
import { AgentConsole } from "@/components/console/agent-console";
import { ProcessTimeline } from "@/components/timeline/process-timeline";
import { Testimonials } from "@/components/testimonials/testimonials";
import { Pricing } from "@/components/pricing/pricing";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { CTABanner } from "@/components/cta/cta-banner";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <main className="relative flex flex-col w-full min-h-screen">
      {/* 1. Sticky Glass Navbar with theme toggle */}
      <Navbar />

      {/* 2. Hero with word-by-word reveal & WebGL R3F canvas */}
      <Hero />

      {/* 3. Logo Marquee with verified SVGL logos */}
      <LogoMarquee />

      {/* 4. Asymmetric Bento-Grid Feature Section with 3D tilt */}
      <BentoGrid />

      {/* 5. Interactive "Agent Console" Centerpiece */}
      <AgentConsole />

      {/* 6. Process Timeline with scroll-linked line */}
      <ProcessTimeline />

      {/* 7. Testimonials with verified metric cards */}
      <Testimonials />

      {/* 8. Pricing with monthly/yearly toggle */}
      <Pricing />

      {/* 9. Technical FAQ Accordion */}
      <FAQAccordion />

      {/* 10. Closing CTA Band with animated gradient mesh */}
      <CTABanner />

      {/* 11. Footer with multi-column links & giant bleed wordmark */}
      <Footer />
    </main>
  );
}
