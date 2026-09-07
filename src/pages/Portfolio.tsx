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
      <section className="border-b border-border px-6 py-24 md:py-36 lg:py-44">
        <div className="mx-auto flex max-w-6xl flex-col gap-28 md:gap-44 lg:gap-56">
          {projects.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group block"
              >
                <div className={`grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-12 lg:gap-16 ${i % 2 === 1 ? "" : ""}`}>
                  <div className={`overflow-hidden border border-border bg-card lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={project.previewImage}
                      alt={`${t(`projects.items.${project.slug}.title`)} website preview`}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      loading="lazy"
                    />
                    </div>
                  </div>

                  <div className={`flex flex-col lg:col-span-5 ${i % 2 === 1 ? "lg:order-1 lg:items-end lg:text-right" : ""}`}>
                    <div className="flex w-full items-center justify-between border-b border-border pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <span>{project.year}</span>
                    </div>

                    <h2 className="mt-7 text-3xl font-bold uppercase leading-none md:text-5xl lg:text-6xl">
                      {t(`projects.items.${project.slug}.title`)}
                    </h2>

                    <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                      {t(`projects.items.${project.slug}.tagline`)}
                    </p>

                    <div className={`mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground ${i % 2 === 1 ? "lg:justify-end" : ""}`}>
                      <span className="text-primary">
                        {t(`projects.items.${project.slug}.category`)}
                      </span>
                      <span aria-hidden="true">/</span>
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>

                    <span className="mt-10 inline-flex w-fit items-center gap-2 border-b border-foreground pb-1 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors group-hover:border-primary group-hover:text-primary">
                    {t("projects.viewProject")}
                    <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.95]">
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
