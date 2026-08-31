import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative border-b border-border pt-28 pb-16 md:pt-32 md:pb-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary border-b border-border pb-5 mb-8"
        >
          {t("hero.tag")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl text-[2.75rem] leading-[0.98] sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold tracking-[-0.045em] text-foreground"
        >
          {t("hero.headline")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 bg-foreground px-8 py-4 text-sm font-medium tracking-wide text-background transition-colors duration-200 hover:bg-primary"
          >
            {t("hero.cta1")}
            <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 border border-foreground px-8 py-4 text-sm font-medium tracking-wide text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
          >
            {t("hero.cta2")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
