import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);

  const total = projects.length;
  const project = projects[index];

  const go = (delta: number) => setState(([i]) => [(i + delta + total) % total, delta]);

  return (
    <section
      id="projects"
      className="border-b border-border min-h-[calc(100vh-64px)] md:min-h-0 flex flex-col px-6 py-14 md:py-24"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-8 md:pb-12">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-normal text-foreground leading-[0.95]">
            {t("projects.title")}
          </h2>
          <Link
            to="/portfolio"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
          >
            {t("nav.portfolio")}
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="border-y border-border">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={project.slug}
              custom={direction}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              className="group grid min-h-[430px] touch-pan-y grid-cols-1 md:min-h-0 md:grid-cols-12"
            >
              <Link
                to={`/projects/${project.slug}`}
                className="block min-h-0 overflow-hidden bg-card md:col-span-8 md:border-r md:border-border"
              >
                <div className="aspect-[16/10] h-full max-h-[58vh] min-h-[220px] overflow-hidden md:aspect-auto md:min-h-[430px]">
                <img
                  src={project.previewImage}
                  alt={`${t(`projects.items.${project.slug}.title`)} website preview`}
                  loading="lazy"
                  draggable={false}
                    className="h-full w-full select-none object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                />
              </div>
              </Link>

              <div className="flex flex-col justify-between border-t border-border px-5 py-6 md:col-span-4 md:border-t-0 md:px-8 md:py-8 lg:px-10 lg:py-10">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                    <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold leading-none tracking-normal text-foreground md:mt-8 md:text-4xl">
                    {t(`projects.items.${project.slug}.title`)}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:mt-6 md:text-base">
                    {t(`projects.items.${project.slug}.tagline`)}
                  </p>
                </div>

                <Link
                  to={`/projects/${project.slug}`}
                  className="mt-8 inline-flex w-full items-center justify-between border-t border-border pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground transition-colors hover:text-primary"
                >
                  {t("projects.viewProject")}
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-7 flex items-center justify-between md:mt-9">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {t(`projects.items.${project.slug}.category`)}
          </span>
          <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous project"
              className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            <ArrowLeft size={15} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next project"
              className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            <ArrowRight size={15} />
          </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
