import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import FloatingPixels from "./FloatingPixels";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden snap-section bg-hero text-hero-foreground">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg-dark" />

      {/* Glow orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ background: "hsl(175 80% 55% / 0.15)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-8"
        >
          Digital Craft Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] mb-8"
        >
          We weave
          <br />
          <span className="text-gradient-hero font-medium">digital experiences</span>
          <br />
          pixel by pixel
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
          style={{ color: "hsl(220 10% 65%)" }}
        >
          Crafting premium websites, e-commerce platforms, and digital strategies
          that elevate brands into the future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          <a
            href="#services"
            className="font-mono text-xs tracking-wider uppercase px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-sm"
          >
            Explore Services
          </a>
          <a
            href="#about"
            className="font-mono text-xs tracking-wider uppercase px-8 py-3 border border-hero-foreground/20 text-hero-foreground hover:border-primary/50 hover:text-primary transition-all duration-300 rounded-sm"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} style={{ color: "hsl(220 10% 55%)" }} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade into light */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
};

export default HeroSection;
