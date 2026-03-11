import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "150+", label: "Projects Delivered", accent: "175 70% 40%" },
  { value: "98%", label: "Client Satisfaction", accent: "45 90% 55%" },
  { value: "5+", label: "Years of Craft", accent: "280 60% 55%" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const statsY = useTransform(scrollYProgress, [0, 1], [100, -20]);

  return (
    <section id="about" className="relative py-32 px-6 snap-section overflow-hidden" ref={ref}>
      {/* Dark themed background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, hsl(210 25% 11%), hsl(200 20% 14%), hsl(175 20% 12%))",
      }} />
      <div className="absolute inset-0 grid-bg-dark opacity-30" />
      
      {/* Subtle glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]"
        style={{ background: "hsl(175 70% 40%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px]"
        style={{ background: "hsl(280 60% 50%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div style={{ y: textY }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "hsl(175 70% 50%)" }}
            >
              About us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-light tracking-tight mb-8 text-white/90"
            >
              Where thread
              <br />
              meets <span style={{ color: "hsl(175 70% 50%)" }}>pixel</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="leading-relaxed mb-6 font-light text-white/60"
            >
              We are a digital studio obsessed with the intersection of design and technology.
              Every project is a tapestry — threads of strategy, design, and code woven into
              seamless digital experiences.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="leading-relaxed font-light text-white/50"
            >
              From startups to established brands, we partner with visionaries who believe
              their digital presence should be as refined as their product.
            </motion.p>
          </motion.div>

          <motion.div style={{ y: statsY }} className="grid grid-cols-1 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1], duration: 0.7 }}
                className="relative p-8 rounded-lg overflow-hidden group transition-all duration-500"
                style={{
                  background: "hsl(0 0% 100% / 0.05)",
                  border: "1px solid hsl(0 0% 100% / 0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Accent line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 group-hover:w-1.5"
                  style={{ background: `hsl(${stat.accent})` }}
                />
                <span className="text-4xl md:text-5xl font-light bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(135deg, hsl(${stat.accent}), hsl(${stat.accent} / 0.6))` }}>
                  {stat.value}
                </span>
                <p className="font-mono text-xs tracking-wider uppercase text-white/40 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
