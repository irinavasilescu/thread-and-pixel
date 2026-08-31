import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.22, 1, 0.36, 1] as const;

const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <div className="theme-swiss min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-border px-6 pt-28 md:pt-32 pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto border-x border-border">
          <div className="border-b border-border px-6 md:px-10 py-5 flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary">
              {t("portfolio.label")}
            </span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              {String(projects.length).padStart(2, "0")} {t("portfolio.projectsCount")}
            </span>
          </div>

          <div className="px-6 md:px-10 py-14 md:py-20">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[-0.04em] leading-[0.95]"
            >
              {t("portfolio.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground"
            >
              {t("portfolio.subtitle")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Project index list */}
      <section className="border-b border-border py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto border-t border-l border-border">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 border-b border-border"
              >
                <div className="lg:col-span-7 border-r border-border overflow-hidden bg-card">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={project.previewImage}
                      alt={`${t(`projects.items.${project.slug}.title`)} website preview`}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="lg:col-span-5 border-r border-border p-8 md:p-12 flex flex-col justify-between transition-colors duration-200 group-hover:bg-foreground group-hover:text-background">
                  <div>
                    <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] uppercase text-primary group-hover:text-background">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <span>{project.year}</span>
                    </div>

                    <h2 className="mt-6 text-3xl md:text-4xl font-bold uppercase tracking-[-0.03em]">
                      {t(`projects.items.${project.slug}.title`)}
                    </h2>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground group-hover:text-background/80">
                      {t(`projects.items.${project.slug}.tagline`)}
                    </p>

                    <div className="mt-8 pt-6 border-t border-border group-hover:border-background/30">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary group-hover:text-background">
                        {t("projects.meta.scope")}
                      </p>
                      <p className="mt-2 text-sm font-medium">
                        {t(`projects.items.${project.slug}.category`)}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="font-mono text-[11px] text-muted-foreground group-hover:text-background/70">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                    {t("projects.viewProject")}
                    <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-5">
              {t("portfolio.label")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.04em]">
              {t("portfolio.ctaTitle")}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase px-10 py-4 bg-primary text-primary-foreground transition-colors duration-200 hover:bg-background hover:text-foreground"
            >
              {t("projectDetail.startConversation")} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
