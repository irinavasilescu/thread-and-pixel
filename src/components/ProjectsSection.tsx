import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "@/data/projects";
import AmbientAccents from "./AmbientAccents";

const DeviceMockup = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative rounded-xl border border-border bg-card/60 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] overflow-hidden">
    <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
      <span className="w-2 h-2 rounded-full bg-foreground/15" />
      <span className="w-2 h-2 rounded-full bg-foreground/15" />
      <span className="w-2 h-2 rounded-full bg-foreground/15" />
      <span className="ml-3 h-4 flex-1 max-w-[220px] rounded-full bg-foreground/[0.06]" />
    </div>
    <div className="aspect-[16/10] overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        loading="lazy"
      />
    </div>
  </div>
);

const ProjectSlide = ({ project, direction }: { project: typeof projects[0]; direction: number }) => {
  const { t } = useTranslation();

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
      >
        <div className="lg:col-span-7">
          <DeviceMockup
            src={project.previewImage}
            alt={`${t(`projects.items.${project.slug}.title`)} preview`}
          />
        </div>

        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-primary">
            {t(`projects.items.${project.slug}.category`)}
          </p>
          <h3 className="mt-4 text-2xl md:text-4xl font-medium tracking-[-0.02em] text-foreground">
            {t(`projects.items.${project.slug}.title`)}
          </h3>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
            {t(`projects.items.${project.slug}.tagline`)}
          </p>
          <div className="mt-6 hidden md:flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary">
            {t("projects.viewProject")}
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const totalCards = projects.length;

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setActiveIndex(((idx % totalCards) + totalCards) % totalCards);
  }, [totalCards]);

  const next = useCallback(() => goTo(activeIndex + 1, 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1, -1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <section
      id="projects"
      className="relative border-t border-border py-28 md:py-36 px-6 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AmbientAccents variant="center" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-14 md:mb-20 flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-5">
              {t("projects.label")}
            </p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] text-foreground">
              {t("projects.title")}
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous project"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next project"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence custom={direction} mode="wait">
            <ProjectSlide
              key={projects[activeIndex].slug}
              project={projects[activeIndex]}
              direction={direction}
            />
          </AnimatePresence>
        </div>

        <div className="mt-12 flex gap-2">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              aria-label={`Go to project ${i + 1}`}
              onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === activeIndex ? "w-10 bg-primary" : "w-5 bg-foreground/15 hover:bg-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
