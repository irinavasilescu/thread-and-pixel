import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import WaveDivider from "./WaveDivider";

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

const InteractiveText = ({ text }: { text: string }) => (
  <>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        className="inline-block"
        whileHover={{ y: -6, rotate: Math.random() > 0.5 ? 5 : -5, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 600, damping: 25 }}
        style={{ cursor: "default" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </>
);

const InteractiveWords = ({ text }: { text: string }) => (
  <>
    {text.split(" ").map((word, wi) => (
      <span key={wi} className="inline-block whitespace-nowrap">
        {wi > 0 && <span>{"\u00A0"}</span>}
        {word.split("").map((char, ci) => (
          <motion.span
            key={ci}
            className="inline-block"
            whileHover={{ y: -6, rotate: Math.random() > 0.5 ? 5 : -5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 600, damping: 25 }}
            style={{ cursor: "default" }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    ))}
  </>
);

const HeroSection = () => {
  const { t } = useTranslation();
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
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero text-hero-foreground"
    >
      <div className="absolute inset-0 grid-bg-dark" />
      <MorphBlob className="top-[10%] left-[15%]" color="hsl(175 80% 50% / 0.15)" duration={12} size={600} />
      <MorphBlob className="bottom-[5%] right-[10%]" color="hsl(210 80% 55% / 0.1)" duration={15} size={500} />
      <MorphBlob className="top-[40%] right-[30%]" color="hsl(280 60% 55% / 0.06)" duration={18} size={400} />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, hsl(175 80% 55% / 0.03) 50%, transparent 100%)", height: "200%" }}
        animate={{ y: ["-50%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ perspective: 1200, rotateX, rotateY }}
      >
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
            <GlitchText delay={300}>{t("hero.tag")}</GlitchText>
          </span>
        </motion.div>

        <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] mb-8">
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="block"
          >
            <InteractiveText text={t("hero.line1")} />
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="text-gradient-hero font-medium inline-flex flex-wrap justify-center my-2"
          >
            <InteractiveWords text={t("hero.line2")} />
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="block"
          >
            <InteractiveText text={t("hero.line3")} />
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-14 font-light"
          style={{ color: "hsl(220 10% 65%)" }}
        >
          {t("hero.subtitle")}
        </motion.p>

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
            <span className="relative">{t("hero.cta1")}</span>
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05, borderColor: "hsl(175 70% 30%)" }}
            whileTap={{ scale: 0.97 }}
            className="font-mono text-xs tracking-wider uppercase px-8 py-3.5 border border-hero-foreground/20 text-hero-foreground hover:text-primary transition-colors duration-300 rounded-sm"
          >
            {t("hero.cta2")}
          </motion.a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <WaveDivider fillColor="hsl(var(--background))" />
      </div>
    </section>
  );
};

export default HeroSection;
