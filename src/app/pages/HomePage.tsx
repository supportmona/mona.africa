import HeroSection from "@/app/components/HeroSection";
import NavigationBar from "@/app/components/NavigationBar";
import AboutSection from "@/app/components/AboutSection";
import ExpertsSection from "@/app/components/ExpertsSection";
import CercleMonaSection from "@/app/components/CercleMonaSection";
import NFCCardSection from "@/app/components/NFCCardSection";
import B2BSection from "@/app/components/B2BSection";
import FooterSection from "@/app/components/FooterSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <HeroSection />
      <AboutSection />
      <ExpertsSection />
      <CercleMonaSection />
      <NFCCardSection />
      <B2BSection />
      <FooterSection />
    </div>
  );
}