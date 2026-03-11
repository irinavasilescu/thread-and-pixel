import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

const technologies = [
  { name: "React", color: "191 97% 77%", desc: "UI Library", icon: "⚛️" },
  { name: "Angular", color: "0 80% 55%", desc: "Framework", icon: "🅰️" },
  { name: "Shopify", color: "146 55% 50%", desc: "E-Commerce", icon: "🛍️" },
  { name: "WordPress", color: "204 30% 50%", desc: "CMS", icon: "📝" },
  { name: "PHP", color: "240 40% 55%", desc: "Backend", icon: "🐘" },
  { name: "Go", color: "192 70% 45%", desc: "Systems", icon: "🔷" },
  { name: "TypeScript", color: "211 60% 48%", desc: "Language", icon: "📘" },
  { name: "Node.js", color: "120 35% 45%", desc: "Runtime", icon: "🟢" },
  { name: "Tailwind", color: "198 80% 50%", desc: "Styling", icon: "🎨" },
  { name: "Next.js", color: "0 0% 25%", desc: "Meta-framework", icon: "▲" },
];

const TechHexCard = ({ tech, index }: { tech: typeof technologies[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 25);
    rotateX.set(-py * 25);
    x.set(px * 8);
    y.set(py * 8);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      className="relative cursor-pointer group"
      style={{ perspective: "600px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, x, y, transformStyle: "preserve-3d" }}
        className="relative rounded-xl p-1 transition-shadow duration-500"
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            background: hovered
              ? `conic-gradient(from ${Date.now() % 360}deg, hsl(${tech.color}), hsl(${tech.color} / 0.3), hsl(${tech.color}), hsl(${tech.color} / 0.3))`
              : `conic-gradient(from 0deg, hsl(var(--border) / 0.3), hsl(var(--border) / 0.1), hsl(var(--border) / 0.3))`,
          }}
          style={{
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1.5px",
            borderRadius: "0.75rem",
          }}
        />

        <div
          className="relative rounded-xl px-4 py-6 md:px-5 md:py-8 overflow-hidden"
          style={{
            background: hovered
              ? `linear-gradient(145deg, hsl(${tech.color} / 0.08), hsl(var(--background) / 0.95))`
              : "hsl(var(--background) / 0.7)",
            backdropFilter: "blur(16px)",
            transition: "background 0.4s ease",
          }}
        >
          {/* Glow sphere */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full pointer-events-none"
            animate={{ opacity: hovered ? 0.6 : 0, scale: hovered ? 1 : 0.5 }}
            transition={{ duration: 0.4 }}
            style={{ background: `radial-gradient(circle, hsl(${tech.color} / 0.3), transparent 70%)` }}
          />

          <div className="relative z-10 flex flex-col items-center text-center gap-3">
            <motion.div
              className="text-3xl md:text-4xl"
              animate={{
                scale: hovered ? 1.25 : 1,
                y: hovered ? -6 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
            >
              {tech.icon}
            </motion.div>

            <div>
              <h3
                className="text-sm md:text-base font-semibold tracking-tight transition-colors duration-300"
                style={{ color: hovered ? `hsl(${tech.color})` : "hsl(var(--foreground))" }}
              >
                {tech.name}
              </h3>
              <motion.p
                className="text-[10px] font-mono tracking-[0.15em] uppercase mt-1"
                animate={{ opacity: hovered ? 0.9 : 0.4, y: hovered ? 0 : 4 }}
                style={{ color: hovered ? `hsl(${tech.color} / 0.8)` : "hsl(var(--muted-foreground))" }}
              >
                {tech.desc}
              </motion.p>
            </div>

            {/* Progress bar */}
            <motion.div
              className="w-full h-[2px] rounded-full overflow-hidden mt-1"
              style={{ background: "hsl(var(--border) / 0.3)" }}
            >
              <motion.div
                className="h-full rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: hovered ? "100%" : "0%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ background: `linear-gradient(90deg, hsl(${tech.color} / 0.6), hsl(${tech.color}))` }}
              />
            </motion.div>
          </div>
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

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div className="text-center mb-20">
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
            Technologies We <span className="text-primary font-medium">Master</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)" }}
          />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {technologies.map((tech, i) => (
            <TechHexCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
