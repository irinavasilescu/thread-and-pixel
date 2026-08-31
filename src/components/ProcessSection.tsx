import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import AmbientAccents from "./AmbientAccents";

const stepKeys = ["01", "02", "03", "04"] as const;

const ProcessSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" ref={ref} className="relative border-t border-border py-28 md:py-36 px-6 overflow-hidden">
      <AmbientAccents variant="right" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
        >
          <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-5">
            {t("process.label")}
          </p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] text-foreground">
            {t("process.title")}
          </h2>
          <p className="mt-5 max-w-sm text-muted-foreground leading-relaxed">
            {t("process.intro")}
          </p>
        </motion.div>

        <div className="lg:col-span-8">
          {stepKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-[auto_1fr] gap-6 md:gap-10 border-b border-border py-8 first:border-t"
            >
              <span className="font-mono text-sm text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                {key}
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground">
                  {t(`process.steps.${key}.title`)}
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                  {t(`process.steps.${key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
