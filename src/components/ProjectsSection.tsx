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
    <section id="projects" className="border-b border-border min-h-[calc(100vh-64px)] md:min-h-0 md:h-auto flex flex-col pt-16 pb-10 md:py-24 px-6">
      <div className="max-w-7xl mx-auto w-full h-full md:h-auto flex-1 md:flex-none flex flex-col justify-center md:justify-start">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-6 md:pb-10">
          <div>
            <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-foreground leading-[0.95]">
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

        {/* Folder carousel */}
        <div className="flex-1 md:flex-none flex items-center justify-center md:block">
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
              className="group relative touch-pan-y max-w-3xl mx-auto w-full pt-[90px] md:pt-[190px]"
            >
              {/* Showcase image — half inside the folder, slides out on hover */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[86%] h-[220px] md:h-[360px] z-0 transition-transform duration-500 ease-out group-hover:-translate-y-[70px] md:group-hover:-translate-y-[150px]">
                <img
                  src={project.previewImage}
                  alt={`${project.title} website preview`}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover object-top border border-border bg-card select-none"
                />
              </div>

              {/* Folder front */}
              <div className="relative z-10 border border-border bg-background h-[130px] md:h-[210px]">
                {/* Folder tab */}
                <div className="absolute -top-6 -left-2 h-6 w-44 border border-b-0 border-border bg-background flex items-center px-4">
                  <span className="font-mono text-[9px] tracking-[0.24em] uppercase text-muted-foreground">
                    {t("projects.title")} — {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>

                {/* Folder face content */}
                <div className="h-full flex flex-col justify-between p-5 md:p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.04em] leading-[0.95] text-foreground">
                      {project.title}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground whitespace-nowrap">
                      {t(`projects.items.${project.slug}.category`)} — {project.year}
                    </p>
                  </div>

                  {/* Revealed on hover (always visible on touch screens) */}
                  <div className="opacity-0 translate-y-2 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0 max-lg:opacity-100 max-lg:translate-y-0">
                    <div className="hidden md:flex flex-wrap gap-x-5 gap-y-1 pb-3">
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
                      className="group/link inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] border-t border-border pt-3 w-full text-foreground hover:text-primary transition-colors"
                    >
                      {t("projects.viewProject")}
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6 md:mt-10">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous project"
              className="flex items-center justify-center gap-3 px-6 md:px-8 py-3 border border-border font-mono text-[11px] uppercase tracking-[0.2em] text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              <ArrowLeft size={15} />
              Prev
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next project"
              className="flex items-center justify-center gap-3 px-6 md:px-8 py-3 border border-border font-mono text-[11px] uppercase tracking-[0.2em] text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              Next
              <ArrowRight size={15} />
            </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
