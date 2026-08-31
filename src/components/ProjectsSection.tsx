import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);

  const total = projects.length;
  const project = projects[index];

  const go = (delta: number) =>
    setState(([i]) => [(i + delta + total) % total, delta]);

  return (
    <section id="projects" className="border-b border-border py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-8 md:pb-10">
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

        {/* Carousel */}
        <div className="border border-border overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={project.slug}
              custom={dir}
              initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              className="grid grid-cols-1 lg:grid-cols-12 items-stretch touch-pan-y lg:h-[52vh] lg:min-h-[380px] lg:max-h-[540px]"
            >
              {/* Image */}
              <div className="lg:col-span-7 relative overflow-hidden bg-card lg:border-r border-b lg:border-b-0 border-border">
                <img
                  src={project.previewImage}
                  alt={`${project.title} website preview`}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full min-h-[200px] sm:min-h-[280px] lg:min-h-0 object-cover select-none"
                />
                <span className="absolute top-0 left-0 font-mono text-[10px] tracking-[0.24em] uppercase bg-background text-foreground border-r border-b border-border px-4 py-2">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>

              {/* Meta */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-8 xl:p-10 overflow-hidden">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">
                    {t(`projects.items.${project.slug}.category`)} — {project.year}
                  </p>
                  <h3 className="mt-4 text-2xl md:text-3xl xl:text-4xl font-bold tracking-[-0.04em] leading-[0.95] text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed line-clamp-3 text-muted-foreground max-w-md">
                    {t(`projects.items.${project.slug}.tagline`)}
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex flex-wrap gap-x-5 gap-y-2 pb-5">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] border-t border-border pt-4 w-full text-foreground hover:text-primary transition-colors"
                  >
                    {t("projects.viewProject")}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="grid grid-cols-2 border border-border mt-8">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous project"
              className="flex items-center justify-center gap-3 py-4 border-r border-border font-mono text-[11px] uppercase tracking-[0.2em] text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              <ArrowLeft size={15} />
              Prev
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next project"
              className="flex items-center justify-center gap-3 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              Next
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
