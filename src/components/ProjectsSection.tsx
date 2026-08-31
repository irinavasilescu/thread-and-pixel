import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "@/data/projects";

const ProjectSlide = ({ project }: { project: typeof projects[0] }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full"
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group grid grid-cols-1 lg:grid-cols-12 border-t border-l border-border"
      >
        <div className="lg:col-span-8 border-r border-b border-border overflow-hidden bg-card">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={project.previewImage}
              alt={`${t(`projects.items.${project.slug}.title`)} website preview`}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        </div>

        <div className="lg:col-span-4 border-r border-b border-border p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="border-b border-border pb-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                {t("projects.meta.client")}
              </p>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-[-0.03em] text-foreground">
                {project.title}
              </h3>
            </div>

            <div className="border-b border-border py-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                {t("projects.meta.year")}
              </p>
              <p className="mt-2 text-base font-medium text-foreground">{project.year}</p>
            </div>

            <div className="py-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                {t("projects.meta.scope")}
              </p>
              <p className="mt-2 text-base font-medium text-foreground">
                {t(`projects.items.${project.slug}.category`)}
              </p>
              <ul className="mt-4 space-y-1.5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <li key={tech} className="font-mono text-xs text-foreground/80">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <span className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground group-hover:text-primary transition-colors">
            {t("projects.viewProject")}
            <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = projects.length;

  const goTo = useCallback((idx: number) => {
    setActiveIndex(((idx % total) + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <section
      id="projects"
      className="border-b border-border py-24 md:py-32 px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
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
          <div className="flex items-center">
            <span className="font-mono text-xs text-foreground mr-6">
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={prev}
              aria-label="Previous project"
              className="w-11 h-11 border border-border flex items-center justify-center text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Next project"
              className="w-11 h-11 border border-border border-l-0 flex items-center justify-center text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <ProjectSlide key={projects[activeIndex].slug} project={projects[activeIndex]} />
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
