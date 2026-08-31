import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  const { t } = useTranslation();

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

        <div className="border-t border-border">
          {projects.map((p, i) => {
            const flipped = i % 2 === 1;
            return (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="border-b border-border"
              >
                <Link
                  to={`/projects/${p.slug}`}
                  className="group grid grid-cols-1 lg:grid-cols-12 items-stretch"
                >
                  {/* Image */}
                  <div
                    className={`lg:col-span-7 relative overflow-hidden bg-card border-border ${
                      flipped ? "lg:order-2 lg:border-l" : "lg:border-r"
                    }`}
                  >
                    <img
                      src={p.previewImage}
                      alt={`${p.title} website preview`}
                      loading="lazy"
                      className="w-full h-full min-h-[260px] md:min-h-[420px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-0 left-0 font-mono text-[10px] tracking-[0.24em] uppercase bg-background text-foreground border-r border-b border-border px-4 py-2">
                      {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Meta */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-between p-7 md:p-10 transition-colors duration-300 group-hover:bg-foreground group-hover:text-background ${
                      flipped ? "lg:order-1" : ""
                    }`}
                  >
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">
                        {t(`projects.items.${p.slug}.category`)} — {p.year}
                      </p>
                      <h3 className="mt-5 text-3xl md:text-4xl xl:text-5xl font-bold tracking-[-0.04em] leading-[0.95]">
                        {p.title}
                      </h3>
                      <p className="mt-5 text-sm md:text-base leading-relaxed opacity-80 max-w-md">
                        {t(`projects.items.${p.slug}.tagline`)}
                      </p>
                    </div>

                    <div className="mt-8">
                      <div className="flex flex-wrap gap-x-5 gap-y-2 pb-6">
                        {p.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] border-t border-current/20 pt-5 w-full">
                        {t("projects.viewProject")}
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
