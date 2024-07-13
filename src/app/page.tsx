import { Background } from '@/components/Background';
import { HeroSection } from '@/components/ladingPage/HeroSection';
import { FeaturesSection } from '@/components/ladingPage/FeaturesSection';
import Footer from '@/components/ladingPage/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen text-white">
      <Background />
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <Footer />
      </div>
    </main>
  );
}