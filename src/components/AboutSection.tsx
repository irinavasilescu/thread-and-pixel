import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import AmbientAccents from "./AmbientAccents";

const technologies = [
  "React", "Angular", "Vue", "TypeScript", "JavaScript", "Figma",
  "Shopify", "WordPress", "Squarespace", "SEO", "Node.js", "PHP",
  "Go", "MongoDB", "MySQL",
];

const AboutSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: t("about.stats.projects.value"), label: t("about.stats.projects.label") },
    { value: t("about.stats.satisfaction.value"), label: t("about.stats.satisfaction.label") },
    { value: t("about.stats.years.value"), label: t("about.stats.years.label") },
  ];

  return (
    <section id="about" ref={ref} className="relative border-t border-border py-28 md:py-36 px-6 overflow-hidden">
      <AmbientAccents variant="left" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-5">
            {t("about.label")}
          </p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] text-foreground max-w-xl">
            {t("about.title1")} {t("about.title2")} {t("about.titleHighlight")}
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            {t("about.description")}
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="block text-2xl md:text-4xl font-medium tracking-tight text-foreground">
                  {stat.value}
                </span>
                <p className="mt-2 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5"
        >
          <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              {t("about.techTitle")}
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border px-3.5 py-1.5 font-mono text-xs tracking-wide text-card-foreground/75 transition-colors duration-300 hover:border-primary/60 hover:text-card-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
