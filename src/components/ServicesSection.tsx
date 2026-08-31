import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const services = [
  "website-creation",
  "web-design",
  "e-commerce",
  "seo",
  "consulting",
  "support-maintenance",
];

const ServicesSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="border-b border-border py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-5">
              {t("services.label")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.04em] text-foreground">
              {t("services.title")}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 lg:pt-2 max-w-2xl text-base md:text-lg leading-relaxed text-foreground"
          >
            {t("services.intro")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
          {services.map((slug, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="border-r border-b border-border"
            >
              <Link
                to={`/services/${slug}`}
                className="group flex h-full flex-col justify-between p-8 md:p-10 transition-colors duration-200 hover:bg-foreground hover:text-background"
              >
                <div>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-primary group-hover:text-background">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 text-xl md:text-2xl font-bold tracking-[-0.02em]">
                    {t(`services.items.${slug}.title`)}
                  </h3>
                  <p className="mt-4 text-sm md:text-base leading-relaxed text-foreground group-hover:text-background/80">
                    {t(`services.items.${slug}.desc`)}
                  </p>
                </div>
                <span className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                  {t("services.explore")}
                  <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
