import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import FloatingPixels from "./FloatingPixels";

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Angular", category: "Frontend" },
  { name: "Vue", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "Figma", category: "Design" },
  { name: "Shopify", category: "E-Commerce" },
  { name: "WordPress", category: "CMS" },
  { name: "Squarespace", category: "CMS" },
  { name: "SEO", category: "Growth" },
  { name: "Node.js", category: "Backend" },
  { name: "PHP", category: "Backend" },
  { name: "Go", category: "Backend" },
  { name: "MongoDB", category: "Database" },
  { name: "MySQL", category: "Database" },
];

const AboutSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [60, -30]);

  const stats = [
    { value: t("about.stats.projects.value"), label: t("about.stats.projects.label") },
    { value: t("about.stats.satisfaction.value"), label: t("about.stats.satisfaction.label") },
    { value: t("about.stats.years.value"), label: t("about.stats.years.label") },
  ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <FloatingPixels />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, hsl(210 25% 9%), hsl(210 20% 11%), hsl(210 25% 9%))",
      }} />
      <div className="absolute inset-0 grid-bg-dark opacity-20" />

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[150px]"
        style={{ background: "hsl(175 70% 40%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div style={{ y: textY }} className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "hsl(175 70% 50%)" }}
          >
            {t("about.label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light tracking-tight text-white/90 max-w-3xl mx-auto"
          >
            {t("about.title1")}
            <br />
            {t("about.title2")} <span style={{ color: "hsl(175 70% 50%)" }}>{t("about.titleHighlight")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto leading-relaxed font-light text-white/50"
          >
            {t("about.description")}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-3 gap-4 md:gap-8 mb-24 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="text-center group"
            >
              <span className="text-3xl md:text-5xl font-light block" style={{ color: "hsl(175 70% 50%)" }}>
                {stat.value}
              </span>
              <div
                className="w-8 h-[1px] mx-auto my-3 transition-all duration-500 group-hover:w-12"
                style={{ background: "hsl(175 70% 50% / 0.3)" }}
              />
              <p className="font-mono text-[10px] md:text-xs tracking-wider uppercase text-white/35">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-center mb-10 text-white/30">
            {t("about.techTitle")}
          </p>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {technologies.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.55 + i * 0.03, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="group relative px-5 py-2.5 rounded-full cursor-default transition-all duration-300"
                style={{
                  background: "hsl(0 0% 100% / 0.04)",
                  border: "1px solid hsl(0 0% 100% / 0.08)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "hsl(175 70% 40% / 0.08)",
                    border: "1px solid hsl(175 70% 40% / 0.25)",
                  }}
                />
                <span className="relative font-mono text-xs tracking-wider text-white/50 group-hover:text-white/90 transition-colors duration-300">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
