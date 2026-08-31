import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const active = projects[activeIndex];

  return (
    <section id="projects" className="border-b border-border py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-8 pb-12 md:pb-16">
          <div>
            <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-5">
              {t("projects.label")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.04em] text-foreground">
              {t("projects.title")}
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
          >
            {t("nav.portfolio")}
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Desktop: index list + sticky preview */}
        <div className="hidden lg:grid grid-cols-12 border-t border-l border-border">
          <div className="col-span-6 xl:col-span-5">
            {projects.map((p, i) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                onMouseEnter={() => setActiveIndex(i)}
                className={`group block border-r border-b border-border px-8 py-10 transition-colors duration-300 ${
                  i === activeIndex ? "bg-foreground text-background" : "text-foreground hover:bg-muted/40"
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className="font-mono text-[11px] tracking-[0.2em] pt-3 opacity-60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-3xl xl:text-4xl font-bold tracking-[-0.03em] leading-none">
                      {p.title}
                    </h3>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] opacity-70">
                      {t(`projects.items.${p.slug}.category`)} — {p.year}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="mt-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="col-span-6 xl:col-span-7 border-r border-b border-border bg-card relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.slug}
                src={active.previewImage}
                alt={`${active.title} website preview`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur px-6 py-4 flex flex-wrap gap-x-6 gap-y-1">
              {active.technologies.slice(0, 5).map((tech) => (
                <span key={tech} className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/80">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / tablet: stacked cards */}
        <div className="lg:hidden border-t border-l border-border">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              className="group block border-r border-b border-border"
            >
              <div className="aspect-[16/10] overflow-hidden bg-card">
                <img
                  src={p.previewImage}
                  alt={`${p.title} website preview`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="border-t border-border px-6 py-6 flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-foreground">{p.title}</h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/70">
                    {t(`projects.items.${p.slug}.category`)} — {p.year}
                  </p>
                </div>
                <ArrowUpRight size={18} className="text-foreground mt-1 shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
