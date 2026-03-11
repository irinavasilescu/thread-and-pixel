import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const technologies = [
  { name: "React", icon: "⚛️", color: "191 97% 77%", desc: "UI Library" },
  { name: "Angular", icon: "🅰️", color: "0 80% 55%", desc: "Framework" },
  { name: "Shopify", icon: "🛍️", color: "146 55% 50%", desc: "E-Commerce" },
  { name: "WordPress", icon: "📝", color: "204 30% 50%", desc: "CMS" },
  { name: "PHP", icon: "🐘", color: "240 40% 55%", desc: "Backend" },
  { name: "Go", icon: "🔷", color: "192 70% 45%", desc: "Systems" },
  { name: "TypeScript", icon: "📘", color: "211 60% 48%", desc: "Language" },
  { name: "Node.js", icon: "🟢", color: "120 35% 45%", desc: "Runtime" },
  { name: "Tailwind", icon: "🎨", color: "198 80% 50%", desc: "Styling" },
  { name: "Next.js", icon: "▲", color: "0 0% 25%", desc: "Meta-framework" },
];

const TechCard = ({ tech, index }: { tech: typeof technologies[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer"
      style={{ perspective: "800px" }}
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 8 : 0,
          rotateX: isHovered ? -5 : 0,
          scale: isHovered ? 1.05 : 1,
          z: isHovered ? 30 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative rounded-2xl p-6 md:p-8 overflow-hidden"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, hsl(${tech.color} / 0.12), hsl(${tech.color} / 0.04))`
            : "hsl(0 0% 100% / 0.6)",
          border: `1px solid ${isHovered ? `hsl(${tech.color} / 0.35)` : "hsl(var(--border) / 0.4)"}`,
          backdropFilter: "blur(12px)",
          transition: "background 0.4s ease, border-color 0.4s ease",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at 50% 0%, hsl(${tech.color} / 0.15), transparent 70%)`,
          }}
        />

        {/* Animated border shimmer */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `conic-gradient(from 0deg, transparent, hsl(${tech.color} / 0.2), transparent, hsl(${tech.color} / 0.1), transparent)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center gap-3">
          <motion.span
            className="text-3xl md:text-4xl"
            animate={{ scale: isHovered ? 1.2 : 1, y: isHovered ? -4 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {tech.icon}
          </motion.span>

          <h3
            className="text-sm md:text-base font-medium tracking-tight transition-colors duration-300"
            style={{ color: isHovered ? `hsl(${tech.color})` : "hsl(var(--foreground))" }}
          >
            {tech.name}
          </h3>

          <motion.p
            className="text-xs text-muted-foreground font-mono tracking-wider uppercase"
            animate={{ opacity: isHovered ? 1 : 0.5, y: isHovered ? 0 : 4 }}
            transition={{ duration: 0.3 }}
          >
            {tech.desc}
          </motion.p>

          {/* Animated underline */}
          <motion.div
            className="h-px rounded-full"
            animate={{ width: isHovered ? "60%" : "0%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ background: `hsl(${tech.color} / 0.5)` }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const TechnologiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 snap-section overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, hsl(var(--background)), hsl(175 15% 96%), hsl(var(--background)))",
      }} />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4"
          >
            Our Toolkit
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-4"
          >
            Technologies We <span className="text-primary">Master</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground font-light text-sm max-w-lg mx-auto"
          >
            A curated stack of modern technologies we use to craft exceptional digital products
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {technologies.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
