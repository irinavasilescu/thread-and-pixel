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
import MarqueeBanner from "@/components/MarqueeBanner";
import ScrollProgressDots from "@/components/ScrollProgressDots";

const Index = () => {
  return (
    <div className="theme-slate grain-overlay min-h-screen bg-background text-foreground">
      <CustomCursor />
      <ScrollProgressDots />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeBanner className="border-y border-border" />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
