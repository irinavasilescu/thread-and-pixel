import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { projects } from "@/data/projects";

const capabilities = [
  "React", "Angular", "Vue", "TypeScript", "JavaScript", "Figma",
  "Shopify", "WordPress", "Squarespace", "SEO", "Node.js", "PHP",
  "Go", "MongoDB", "MySQL",
];

const AboutSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = t("about.metrics", { returnObjects: true }) as { value: string; label: string }[];

  return (
    <section id="about" ref={ref} className="border-b border-border py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Metric bar — thin vertical borders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-border"
        >
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`py-8 md:py-10 px-6 md:px-8 border-border ${i !== 0 ? "md:border-l" : ""} ${i % 2 === 1 ? "border-l md:border-l" : ""} ${i < 2 ? "border-b md:border-b-0" : ""}`}
            >
              <p className="text-3xl md:text-5xl font-bold tracking-[-0.04em] text-foreground">
                {m.value}
              </p>
              <p className="mt-3 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-foreground/70">
                {m.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Client list */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-5">
              {t("about.clientsLabel")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.04em] text-foreground">
              {t("about.clientsTitle")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <ul className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-14 border-t border-border">
              {projects.map((p) => (
                <li
                  key={p.slug}
                  className="flex items-baseline justify-between gap-6 border-b border-border py-5"
                >
                  <span className="text-lg md:text-xl font-bold tracking-[-0.02em] text-foreground">
                    {p.title}
                  </span>
                  <span className="font-mono text-xs text-foreground/70">{p.year}</span>
                </li>
              ))}
            </ul>

            <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/70">
              {t("about.techTitle")}
            </p>
            <ul className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-2 gap-x-6">
              {capabilities.map((c) => (
                <li key={c} className="font-mono text-xs text-foreground">
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
