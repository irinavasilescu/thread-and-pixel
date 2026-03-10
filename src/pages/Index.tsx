import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div className="h-px glow-line" />
      <ServicesSection />
      <div className="h-px glow-line" />
      <AboutSection />
      <ProcessSection />
      <div className="h-px glow-line" />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
