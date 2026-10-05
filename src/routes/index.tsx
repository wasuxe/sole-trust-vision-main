import { createFileRoute } from "@tanstack/react-router";

import Navigation from "@/components/sections/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import GrowthEcosystem from "@/components/sections/GrowthEcosystem";
import LiveWorkflow from "@/components/sections/LiveWorkflow";
import ControlRoom from "@/components/sections/ControlRoom";
import ContentWall from "@/components/sections/ContentWall";
import BeforeAfter from "@/components/sections/BeforeAfter";
import SystemConfigurator from "@/components/sections/SystemConfigurator";
import BrandAudit from "@/components/sections/BrandAudit";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import WhySoleTrust from "@/components/sections/WhySoleTrust";
import LogoMarquee from "@/components/sections/LogoMarquee";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import InfiniteLoop from "@/components/sections/InfiniteLoop";
import AiSection from "@/components/sections/AiSection";
import FooterSection from "@/components/sections/FooterSection";

import stmLogo from "@/assets/soletrust-media-logo.png.asset.json";

const HOME_TITLE = "Sole Trust Media — Branding, Marketing, Tech & Talent Growth Partner";
const HOME_DESC = "Sole Trust Media is a modern growth company partnering with ambitious brands, startups, artists and creators across branding, marketing, technology, and talent management.";
const HOME_KEYWORDS = "branding agency, marketing agency, performance marketing, social media management, creative studio, web development, SEO, artist management, creator management, Sole Trust Media, STM Music Group";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESC },
      { name: "keywords", content: HOME_KEYWORDS },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Sole Trust Media" },
      { property: "og:image", content: stmLogo.url },
      { property: "og:image:alt", content: "Sole Trust Media" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@soletrustmedia" },
      { name: "twitter:creator", content: "@soletrustmedia" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESC },
      { name: "twitter:image", content: stmLogo.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Sole Trust Media",
          url: "/",
          logo: stmLogo.url,
          description: HOME_DESC,
          sameAs: [
            "https://www.instagram.com/soletrustmedia",
          ],
          contactPoint: [{
            "@type": "ContactPoint",
            email: "soletrustmedia@gmail.com",
            contactType: "customer support",
          }],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Sole Trust Media",
          url: "/",
          description: HOME_DESC,
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <LogoMarquee />
        <GrowthEcosystem />
        <LiveWorkflow />
        <ControlRoom />
        <ContentWall />
        <BeforeAfter />
        <BrandAudit />
        <SystemConfigurator />
        <WhySoleTrust />
        <ProcessTimeline />
        <InfiniteLoop />
        <AiSection />
        <TestimonialsSection />
      </main>
      <FooterSection />
    </div>
  );
}
