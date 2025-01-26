'use client';

import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { CommunitySection } from "@/components/landing/CommunitySection";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <HeroSection />
      <FeaturesSection />
      <CommunitySection />
    </div>
  );
}
