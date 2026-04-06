import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import FloatingPixels from "./FloatingPixels";

const stepKeys = ["01", "02", "03", "04"] as const;
const accents = ["175 70% 40%", "280 60% 55%", "45 90% 55%", "210 80% 55%"];

const ProcessSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <FloatingPixels variant="dark" />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, hsl(var(--background)), hsl(175 15% 96%), hsl(var(--background)))",
      }} />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4"
          >
            {t("process.label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-light tracking-tight"
          >
            {t("process.title")}
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stepKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative group rounded-xl p-8 transition-all duration-500 hover:scale-[1.02] overflow-hidden"
              style={{
                background: "hsl(0 0% 100% / 0.6)",
                border: `1px solid hsl(${accents[i]} / 0.15)`,
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `hsl(${accents[i]} / 0.4)`;
                e.currentTarget.style.boxShadow = `0 8px 32px hsl(${accents[i]} / 0.12)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `hsl(${accents[i]} / 0.15)`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="w-3 h-3 rounded-full mb-6" style={{ background: `hsl(${accents[i]})` }} />
              <span className="font-mono text-xs tracking-wider text-muted-foreground mb-4 block">{key}</span>
              <h3 className="text-xl font-medium mb-3 tracking-tight">{t(`process.steps.${key}.title`)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">{t(`process.steps.${key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
