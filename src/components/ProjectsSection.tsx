import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "@/data/projects";
import FloatingPixels from "./FloatingPixels";

const ProjectCard = ({ project, direction }: { project: typeof projects[0]; direction: number }) => {
  const { t } = useTranslation();

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 flex items-center px-6 md:px-16 lg:px-24 pt-28 md:pt-32 pb-24"
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto"
      >
        <div className="relative overflow-hidden rounded-lg">
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={project.previewImage}
              alt={`${t(`projects.items.${project.slug}.title`)} preview`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="absolute bottom-4 left-4 flex gap-2">
            {project.brandColors.map((color) => (
              <div
                key={color.name}
                className="w-4 h-4 rounded-full border border-white/20 shadow-lg"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3 md:space-y-5">
          <p
            className="font-mono text-xs tracking-[0.2em] uppercase"
            style={{ color: "hsl(175 70% 50%)" }}
          >
            {t(`projects.items.${project.slug}.category`)}
          </p>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-white group-hover:text-primary transition-colors duration-300">
            {t(`projects.items.${project.slug}.title`)}
          </h3>
          <p className="text-white/50 font-light leading-relaxed text-sm md:text-lg max-w-lg hidden md:block">
            {t(`projects.items.${project.slug}.tagline`)}
          </p>
          <div className="hidden md:flex flex-wrap gap-2 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 rounded-full text-white/40 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-white/40 group-hover:text-primary transition-colors duration-300 pt-2 md:pt-4">
            <span className="font-mono text-xs tracking-wider uppercase">{t("projects.viewProject")}</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
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
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <section
      id="projects"
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative min-h-[85vh] md:min-h-screen overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, hsl(210 20% 13%), hsl(200 25% 15%), hsl(175 30% 14%))",
        }} />
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <FloatingPixels />

        {/* Header */}
        <div className="relative z-10 pt-16 md:pt-20 px-6 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto flex items-end justify-between">
            <div>
              <p
                className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
                style={{ color: "hsl(175 70% 50%)" }}
              >
                {t("projects.label")}
              </p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
                {t("projects.title")}
              </h2>
            </div>
            {/* Nav arrows */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Slides */}
        <div className="relative z-10" style={{ height: "calc(85vh - 120px)" }}>
          <AnimatePresence custom={direction} mode="popLayout">
            <ProjectCard
              key={projects[activeIndex].slug}
              project={projects[activeIndex]}
              direction={direction}
            />
          </AnimatePresence>
        </div>

        {/* Bottom indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-10 px-6 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-2 justify-center md:justify-start">
              {projects.map((p, i) => (
                <button
                  key={p.slug}
                  onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === activeIndex ? "w-8 bg-primary" : "w-4 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
