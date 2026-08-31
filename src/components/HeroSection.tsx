import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative border-b border-border pt-36 pb-20 md:pt-44 md:pb-28 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary border-b border-border pb-6 mb-12"
        >
          {t("hero.tag")}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 text-[2.75rem] leading-[0.98] sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold tracking-[-0.045em] text-foreground"
          >
            {t("hero.headline")}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 lg:pl-14 lg:border-l border-border"
          >
            <p className="text-base md:text-lg leading-relaxed text-foreground">
              {t("hero.subtitle")}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
