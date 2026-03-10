import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: "01", title: "Discovery", desc: "Deep dive into your brand, goals, and audience to define the project blueprint." },
  { num: "02", title: "Design", desc: "Crafting visual concepts and interactive prototypes that bring your vision to life." },
  { num: "03", title: "Develop", desc: "Pixel-perfect implementation with clean, scalable, performance-first code." },
  { num: "04", title: "Deploy & Evolve", desc: "Launch with confidence and ongoing support to keep you ahead of the curve." },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="relative py-32 px-6 noise-bg" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">How we work</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">Process</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              <span className="font-mono text-6xl font-bold text-primary/10 absolute -top-4 -left-2">
                {step.num}
              </span>
              <div className="pt-12">
                <h3 className="text-xl font-medium mb-3 tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
