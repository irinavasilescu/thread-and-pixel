import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import AmbientAccents from "./AmbientAccents";

const HeroSection = () => {
  const { t } = useTranslation();

  const proofs = [
    { value: t("hero.proof.speed.value"), label: t("hero.proof.speed.label") },
    { value: t("hero.proof.launch.value"), label: t("hero.proof.launch.label") },
    { value: t("hero.proof.custom.value"), label: t("hero.proof.custom.label") },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-32 pb-24 px-6"
    >
      <AmbientAccents variant="right" />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-end">
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-8"
          >
            {t("hero.tag")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-medium tracking-[-0.03em] text-foreground max-w-4xl"
          >
            {t("hero.headline")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-11 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
            >
              {t("hero.cta1")}
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md border border-border px-7 py-3.5 text-sm font-medium tracking-wide text-foreground/80 transition-colors duration-300 hover:border-foreground/40 hover:text-foreground"
            >
              {t("hero.cta2")}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="lg:col-span-4 lg:pl-10 lg:border-l border-border"
        >
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-8">
            {proofs.map((p) => (
              <div key={p.label}>
                <p className="text-2xl lg:text-3xl font-medium tracking-tight text-foreground">{p.value}</p>
                <p className="mt-1.5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {p.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
