import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const capabilities = [
  "React",
  "Angular",
  "Vue",
  "TypeScript",
  "JavaScript",
  "GraphQL",
  "HTML",
  "CSS",
  "Tailwind",
  "Figma",
  "Shopify",
  "WordPress",
  "Squarespace",
  "SEO",
  "Node.js",
  "PHP",
  "Go",
  "MongoDB",
  "MySQL",
  "Docker",
];

const AboutSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = t("about.metrics", { returnObjects: true }) as { value: string; label: string }[];

  return (
    <section id="about" ref={ref} className="border-b border-border py-28 md:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-foreground leading-[0.95]">
              {t("about.title1")} <span className="text-primary">{t("about.titleHighlight")}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 lg:pt-14"
          >
            <p className="text-lg md:text-xl leading-relaxed text-foreground">{t("about.description")}</p>
          </motion.div>
        </div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-border"
        >
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`py-10 md:py-14 px-6 md:px-8 border-border ${i !== 0 ? "md:border-l" : ""} ${i % 2 === 1 ? "border-l md:border-l" : ""} ${i < 2 ? "border-b md:border-b-0" : ""}`}
            >
              <p className="text-4xl md:text-6xl font-bold tracking-[-0.04em] text-foreground">{m.value}</p>
              <p className="mt-4 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-foreground/70">
                {m.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 md:mt-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-5">
                {t("about.techTitle")}
              </p>
              <h3 className="text-2xl md:text-4xl font-bold tracking-[-0.03em] text-foreground">
                {t("about.techHeadline")}
              </h3>
            </div>
            <div className="lg:col-span-8">
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {capabilities.map((c) => (
                  <li
                    key={c}
                    className="flex items-center justify-center border border-border px-4 py-4 font-mono text-xs md:text-sm text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
