import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import ProjectsSection from "@/components/ProjectsSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <div className="glow-line" />
      <ProjectsSection />
      <div className="glow-line" />
      <TechnologiesSection />
      <div className="glow-line" />
      <AboutSection />
      <ProcessSection />
      <div className="glow-line" />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
