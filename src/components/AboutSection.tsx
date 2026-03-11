import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5+", label: "Years of Craft" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const statsY = useTransform(scrollYProgress, [0, 1], [100, -20]);

  return (
    <section id="about" className="relative py-32 px-6 snap-section overflow-hidden" ref={ref}>
      {/* Warm gradient background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(160deg, hsl(30 30% 97%), hsl(175 15% 95%), hsl(45 25% 97%))",
      }} />
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div style={{ y: textY }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4"
            >
              About us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-light tracking-tight mb-8"
            >
              Where thread
              <br />
              meets <span className="text-primary">pixel</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground leading-relaxed mb-6 font-light"
            >
              We are a digital studio obsessed with the intersection of design and technology.
              Every project is a tapestry — threads of strategy, design, and code woven into
              seamless digital experiences.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-muted-foreground leading-relaxed font-light"
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
                className="border border-border/50 p-8 rounded-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
                style={{ background: "hsl(0 0% 100% / 0.5)" }}
              >
                <span className="text-4xl md:text-5xl font-light text-gradient">{stat.value}</span>
                <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
