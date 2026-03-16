import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import ProjectsSection from "@/components/ProjectsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import WaveDivider from "@/components/WaveDivider";
import MarqueeBanner from "@/components/MarqueeBanner";
import ScrollProgressDots from "@/components/ScrollProgressDots";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <ScrollProgressDots />
      <Navbar />
      <HeroSection />
      <MarqueeBanner className="border-y border-border/50" />
      <ServicesSection />
      {/* Services (light) → Projects (dark) */}
      <WaveDivider fillColor="hsl(210 20% 13%)" />
      <ProjectsSection />
      {/* Projects (dark) → Process (light) */}
      <WaveDivider fillColor="hsl(var(--background))" flip />
      <ProcessSection />
      {/* Process (light) → About (dark) */}
      <WaveDivider fillColor="hsl(210 25% 11%)" />
      <AboutSection />
      {/* About (dark) → FAQ (light) */}
      <WaveDivider fillColor="hsl(var(--background))" flip />
      <FAQSection />
      {/* FAQ (light) → Contact (dark) */}
      <WaveDivider fillColor="hsl(210 25% 10%)" />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
