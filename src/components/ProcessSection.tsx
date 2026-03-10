import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);

  return (
    <section id="process" className="relative py-32 px-6 snap-section noise-bg bg-surface" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-30" />
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

        {/* Progress line */}
        <div className="hidden lg:block relative mb-16">
          <div className="h-px bg-border w-full" />
          <motion.div className="h-px bg-primary absolute top-0 left-0" style={{ width: lineWidth }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <span className="font-mono text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors duration-500 absolute -top-4 -left-2">
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
