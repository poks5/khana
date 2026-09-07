
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { AboutHeader } from "@/components/About/AboutHeader";
import { HeroSection } from "@/components/About/HeroSection";
import { MissionSection } from "@/components/About/MissionSection";
import { FeaturesGrid } from "@/components/About/FeaturesGrid";
import { HighlightsSection } from "@/components/About/HighlightsSection";
import { TargetAudienceSection } from "@/components/About/TargetAudienceSection";
import { SafetyDisclaimer } from "@/components/About/SafetyDisclaimer";
import { CallToAction } from "@/components/About/CallToAction";

const About = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <AboutHeader />

      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className={`${isMobile ? 'px-4' : 'container mx-auto px-4'} py-6 max-w-6xl`}>
          <HeroSection />
          <MissionSection />
          <FeaturesGrid />
          <HighlightsSection />
          <TargetAudienceSection />
          <SafetyDisclaimer />
          <CallToAction />
        </div>
      </ScrollArea>
    </div>
  );
};

export default About;
