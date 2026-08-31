import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Search, ShoppingCart, MessageSquare, Palette, Wrench, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AmbientAccents from "./AmbientAccents";

const featured = { icon: Globe, slug: "website-creation" };

const secondary = [
  { icon: Palette, slug: "web-design" },
  { icon: ShoppingCart, slug: "e-commerce" },
  { icon: Search, slug: "seo" },
  { icon: MessageSquare, slug: "consulting" },
  { icon: Wrench, slug: "support-maintenance" },
];

const ServicesSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const FeaturedIcon = featured.icon;

  return (
    <section id="services" ref={ref} className="relative border-t border-border py-28 md:py-36 px-6 overflow-hidden">
      <AmbientAccents variant="left" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-5">
            {t("services.label")}
          </p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] text-foreground">
            {t("services.title")}
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            {t("services.intro")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured service */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <Link
              to={`/services/${featured.slug}`}
              className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-9 md:p-11 transition-colors duration-300 hover:border-primary/60"
            >
              <div>
                <div className="flex items-center justify-between">
                  <FeaturedIcon size={26} strokeWidth={1.4} className="text-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {t("services.featuredLabel")}
                  </span>
                </div>
                <h3 className="mt-10 text-2xl md:text-3xl font-medium tracking-tight text-card-foreground">
                  {t(`services.items.${featured.slug}.title`)}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                  {t(`services.items.${featured.slug}.tagline`)}
                </p>
              </div>
              <span className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-primary">
                {t("services.explore")}
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </motion.div>

          {/* Clean list rows */}
          <div className="lg:col-span-7 border-t border-border">
            {secondary.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
                >
                  <Link
                    to={`/services/${service.slug}`}
                    className="group flex items-center gap-5 border-b border-border py-6 md:py-7 transition-colors duration-300 hover:bg-foreground/[0.03] md:px-4"
                  >
                    <Icon size={18} strokeWidth={1.5} className="shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-medium tracking-tight text-foreground">
                        {t(`services.items.${service.slug}.title`)}
                      </h3>
                      <p className="mt-1 truncate text-sm text-muted-foreground">
                        {t(`services.items.${service.slug}.desc`)}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
