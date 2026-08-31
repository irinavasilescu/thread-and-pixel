import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const stepKeys = ["01", "02", "03", "04"] as const;

const ProcessSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" ref={ref} className="border-b border-border py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-5">
              {t("process.label")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.04em] text-foreground">
              {t("process.title")}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 lg:pt-2 max-w-2xl text-base md:text-lg leading-relaxed text-foreground"
          >
            {t("process.intro")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
          {stepKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border-r border-b border-border p-8 md:p-12"
            >
              <span className="font-mono text-[11px] tracking-[0.2em] text-primary">{key}</span>
              <h3 className="mt-8 text-xl md:text-3xl font-bold tracking-[-0.03em] text-foreground">
                {t(`process.steps.${key}.title`)}
              </h3>
              <p className="mt-4 max-w-md text-sm md:text-base leading-relaxed text-foreground">
                {t(`process.steps.${key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
