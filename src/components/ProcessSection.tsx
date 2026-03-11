import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: "01", title: "Discovery", desc: "Deep dive into your brand, goals, and audience to define the project blueprint.", accent: "175 70% 40%" },
  { num: "02", title: "Design", desc: "Crafting visual concepts and interactive prototypes that bring your vision to life.", accent: "280 60% 55%" },
  { num: "03", title: "Develop", desc: "Pixel-perfect implementation with clean, scalable, performance-first code.", accent: "45 90% 55%" },
  { num: "04", title: "Deploy & Evolve", desc: "Launch with confidence and ongoing support to keep you ahead of the curve.", accent: "210 80% 55%" },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="relative py-32 px-6 snap-section overflow-hidden" ref={ref}>
      {/* Rich gradient background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, hsl(175 30% 95%), hsl(210 25% 96%), hsl(280 20% 96%), hsl(45 30% 96%))",
      }} />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4"
          >
            How we work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-light tracking-tight"
          >
            Process
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative group rounded-xl p-8 border transition-all duration-500 hover:scale-[1.02]"
              style={{
                background: "hsl(0 0% 100% / 0.7)",
                borderColor: `hsl(${step.accent} / 0.15)`,
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `hsl(${step.accent} / 0.4)`;
                e.currentTarget.style.boxShadow = `0 8px 32px hsl(${step.accent} / 0.12)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `hsl(${step.accent} / 0.15)`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Accent dot */}
              <div
                className="w-3 h-3 rounded-full mb-6"
                style={{ background: `hsl(${step.accent})` }}
              />
              <span className="font-mono text-xs tracking-wider text-muted-foreground mb-4 block">
                {step.num}
              </span>
              <h3 className="text-xl font-medium mb-3 tracking-tight">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
