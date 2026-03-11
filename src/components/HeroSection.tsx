import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const GlitchText = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const chars = "░▒▓█▄▀■□◆◇";
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i <= children.length) {
          const real = children.slice(0, i);
          const glitch = i < children.length
            ? Array.from({ length: Math.min(3, children.length - i) }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
            : "";
          setDisplayed(real + glitch);
          i++;
        } else {
          setDisplayed(children);
          setDone(true);
          clearInterval(interval);
        }
      }, 45);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [children, delay]);

  return (
    <span className={done ? "" : "opacity-90"}>
      {displayed}
    </span>
  );
};

const MorphBlob = ({ className, color, duration, size }: { className: string; color: string; duration: number; size: number }) => (
  <motion.div
    className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`}
    style={{ width: size, height: size, background: color }}
    animate={{
      scale: [1, 1.4, 0.9, 1.2, 1],
      x: [0, 30, -20, 15, 0],
      y: [0, -25, 15, -10, 0],
      borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "50% 50% 60% 40%", "30% 70% 40% 60%", "40% 60% 70% 30%"],
    }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
  />
);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden snap-section bg-hero text-hero-foreground"
    >
      {/* Grid */}
      <div className="absolute inset-0 grid-bg-dark" />

      {/* Morphing aurora blobs */}
      <MorphBlob className="top-[10%] left-[15%]" color="hsl(175 80% 50% / 0.15)" duration={12} size={600} />
      <MorphBlob className="bottom-[5%] right-[10%]" color="hsl(210 80% 55% / 0.1)" duration={15} size={500} />
      <MorphBlob className="top-[40%] right-[30%]" color="hsl(280 60% 55% / 0.06)" duration={18} size={400} />

      {/* Floating lines / scan effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, hsl(175 80% 55% / 0.03) 50%, transparent 100%)", height: "200%" }}
        animate={{ y: ["-50%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Content with parallax tilt */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ perspective: 1200, rotateX, rotateY }}
      >
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-primary"
          />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary">
            <GlitchText delay={300}>Digital Craft Studio</GlitchText>
          </span>
        </motion.div>

        {/* Main heading with staggered reveal */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] mb-8"
        >
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="block"
          >
            We weave
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="text-gradient-hero font-medium inline-block my-2"
          >
            digital experiences
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="block"
          >
            pixel by pixel
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-14 font-light"
          style={{ color: "hsl(220 10% 65%)" }}
        >
          Crafting premium websites, e-commerce platforms, and digital strategies
          that elevate brands into the future.
        </motion.p>

        {/* Buttons with magnetic hover */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(175 80% 50% / 0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="group relative font-mono text-xs tracking-wider uppercase px-8 py-3.5 bg-primary text-primary-foreground rounded-sm overflow-hidden"
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.15), transparent)" }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <span className="relative">Explore Services</span>
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05, borderColor: "hsl(175 70% 30%)" }}
            whileTap={{ scale: 0.97 }}
            className="font-mono text-xs tracking-wider uppercase px-8 py-3.5 border border-hero-foreground/20 text-hero-foreground hover:text-primary transition-colors duration-300 rounded-sm"
          >
            Learn More
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Animated wave transition */}
      <div className="absolute -bottom-1 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="hsl(var(--background))"
            animate={{
              d: [
                "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
                "M0,80 C240,20 480,100 720,40 C960,0 1200,100 1440,80 L1440,120 L0,120 Z",
                "M0,40 C240,100 480,20 720,80 C960,120 1200,20 1440,40 L1440,120 L0,120 Z",
                "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,80 L1440,120 L0,120 Z"
            fill="hsl(var(--background))"
            opacity={0.6}
            animate={{
              d: [
                "M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,80 L1440,120 L0,120 Z",
                "M0,60 C360,100 720,40 1080,80 C1260,100 1380,60 1440,60 L1440,120 L0,120 Z",
                "M0,90 C360,50 720,90 1080,50 C1260,30 1380,90 1440,90 L1440,120 L0,120 Z",
                "M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,80 L1440,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
