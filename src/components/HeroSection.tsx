import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative border-b border-border px-6 pt-16 min-h-screen flex flex-col"
    >
      <div className="max-w-7xl mx-auto border-x border-border flex-1 flex flex-col justify-between p-6 md:p-10 lg:p-12">
        {/* Top row: studio index + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-border pb-4 md:pb-6"
        >
          <div className="text-foreground font-bold tracking-tighter text-lg md:text-xl">
            {t("hero.studioLabel")}
          </div>
          <div className="max-w-xs">
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground leading-relaxed">
              {t("hero.tag")}
            </p>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col justify-center py-4 md:py-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[7rem] 2xl:text-[9rem] font-black leading-[0.85] tracking-tighter text-foreground uppercase">
            <span className="block">{t("hero.headline.line1")}</span>
            <span className="block">{t("hero.headline.line2")}</span>
            <span className="block">{t("hero.headline.line3")}</span>
          </h1>
        </motion.div>

        {/* Bottom row: CTAs + description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 md:pt-6 border-t border-border"
        >
          <div className="md:col-span-6 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-foreground px-6 py-3 md:px-8 md:py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors duration-200 hover:bg-primary"
            >
              {t("hero.cta1")}
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 md:px-8 md:py-4 text-xs font-bold uppercase tracking-widest text-foreground transition-colors duration-200 hover:border-foreground"
            >
              {t("hero.cta2")}
            </a>
          </div>
          <div className="md:col-span-6 flex items-end md:justify-end">
            <p className="text-[11px] text-foreground/50 max-w-[280px] leading-relaxed">
              {t("hero.description")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
