import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectScreenshots from "@/components/ProjectScreenshots";

const ease = [0.22, 1, 0.36, 1] as const;

const ProjectDetail = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="theme-swiss min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-[-0.03em] mb-4">Project not found</h1>
          <Link to="/portfolio" className="font-mono text-xs uppercase tracking-[0.2em] text-primary hover:underline">
            {t("notFound.link")}
          </Link>
        </div>
      </div>
    );
  }

  const workDone = t(`projects.items.${project.slug}.workDone`, { returnObjects: true }) as string[];
  const keyElements = t(`projects.items.${project.slug}.keyElements`, { returnObjects: true }) as string[];

  return (
    <div className="theme-swiss min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-border px-6 pt-28 md:pt-32 pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto border-x border-border">
          <div className="border-b border-border px-6 md:px-10 py-5 flex items-center justify-between">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={14} /> {t("projectDetail.backToProjects")}
            </Link>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary">
              {t(`projects.items.${project.slug}.category`)}
            </span>
          </div>

          <div className="px-6 md:px-10 py-14 md:py-20">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[-0.04em] leading-[0.95]"
            >
              {t(`projects.items.${project.slug}.title`)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground"
            >
              {t(`projects.items.${project.slug}.tagline`)}
            </motion.p>
          </div>

          {/* Meta bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-border">
            <div className="border-b sm:border-b-0 sm:border-r border-border px-6 md:px-10 py-6">
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-primary">{t("projects.meta.client")}</p>
              <p className="mt-2 text-base font-medium">{project.title}</p>
            </div>
            <div className="border-b sm:border-b-0 sm:border-r border-border px-6 md:px-10 py-6">
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-primary">{t("projects.meta.year")}</p>
              <p className="mt-2 text-base font-medium">{project.year}</p>
            </div>
            <div className="px-6 md:px-10 py-6">
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-primary">{t("projects.meta.scope")}</p>
              <p className="mt-2 text-base font-medium">{t(`projects.items.${project.slug}.category`)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="border-b border-border py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-6">
              {t("projectDetail.theProject")}
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-foreground">
              {t(`projects.items.${project.slug}.description`)}
            </p>
          </div>
          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-6">
              {t("projectDetail.clientExpectations")}
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t(`projects.items.${project.slug}.clientExpectation`)}
            </p>
          </div>
        </div>
      </section>

      {project.screenshots.length > 0 && (
        <ProjectScreenshots screenshots={project.screenshots} title={t(`projects.items.${project.slug}.title`)} />
      )}

      {/* Brand book */}
      <section className="border-b border-border py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="pb-12 md:pb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.95]">
              {t("projectDetail.brandBookHighlight")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-border">
            <div className="border-r border-b border-border p-8 md:p-10">
              <h3 className="font-mono text-[10px] tracking-[0.24em] uppercase text-muted-foreground mb-8">
                {t("projectDetail.colorPalette")}
              </h3>
              <div className="space-y-4">
                {project.brandColors.map((color) => (
                  <div key={color.name} className="flex items-center gap-4">
                    <div className="w-12 h-12 border border-border" style={{ backgroundColor: color.hex }} />
                    <div>
                      <p className="text-sm font-medium">{color.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">{color.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-r border-b border-border p-8 md:p-10">
              <h3 className="font-mono text-[10px] tracking-[0.24em] uppercase text-muted-foreground mb-8">
                {t("projectDetail.typography")}
              </h3>
              <div className="space-y-6">
                {project.fonts.map((font, i) => (
                  <div key={font} className="border-b border-border pb-5 last:border-b-0 last:pb-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-2">
                      {i === 0 ? t("projectDetail.display") : t("projectDetail.body")}
                    </p>
                    <p className="text-2xl font-bold tracking-[-0.02em]">{font}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-r border-b border-border p-8 md:p-10">
              <h3 className="font-mono text-[10px] tracking-[0.24em] uppercase text-muted-foreground mb-8">
                {t("projectDetail.keyElements")}
              </h3>
              <ul className="space-y-3">
                {keyElements.map((el) => (
                  <li key={el} className="border-b border-border pb-3 last:border-b-0 text-sm text-foreground">
                    {el}
                  </li>
                ))}
              </ul>
            </div>

            {/* Type specimen */}
            <div className="border-r border-b border-border p-8 md:p-10">
              <h3 className="font-mono text-[10px] tracking-[0.24em] uppercase text-muted-foreground mb-8">
                {t("projectDetail.typeSpecimen")}
              </h3>
              <p className="text-6xl md:text-7xl font-bold tracking-[-0.04em] leading-none mb-4">Aa</p>
              <p className="text-sm tracking-[0.06em] break-words text-foreground">
                AaBbCcDdEeFfGgHhIiJjKkLlMm
              </p>
              <p className="text-sm tracking-[0.06em] break-words text-foreground">
                NnOoPpQqRrSsTtUuVvWwXxYyZz
              </p>
              <p className="text-sm tracking-[0.06em] text-muted-foreground mt-2">
                0123456789 !@#$%&amp;*
              </p>
            </div>

            {/* UI elements */}
            <div className="border-r border-b border-border p-8 md:p-10">
              <h3 className="font-mono text-[10px] tracking-[0.24em] uppercase text-muted-foreground mb-8">
                {t("projectDetail.uiElements")}
              </h3>
              <div className="space-y-4">
                <button
                  className="w-full px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: project.brandColors[0]?.hex, color: "#FFFFFF" }}
                >
                  {t("projectDetail.primaryAction")}
                </button>
                <button
                  className="w-full px-5 py-3 text-sm font-medium border transition-colors"
                  style={{ borderColor: project.brandColors[0]?.hex, color: project.brandColors[0]?.hex }}
                >
                  {t("projectDetail.secondaryAction")}
                </button>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] tracking-[0.12em] uppercase border border-border px-3 py-1.5 text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Color usage */}
            <div className="border-r border-b border-border p-8 md:p-10">
              <h3 className="font-mono text-[10px] tracking-[0.24em] uppercase text-muted-foreground mb-8">
                {t("projectDetail.colorUsage")}
              </h3>
              <div className="flex h-10 border border-border overflow-hidden">
                {project.brandColors.map((color, i) => (
                  <div
                    key={color.name}
                    style={{
                      backgroundColor: color.hex,
                      flexGrow: [10, 6, 4, 3][i] ?? 2,
                    }}
                  />
                ))}
              </div>
              <ul className="mt-6 space-y-2">
                {project.brandColors.map((color, i) => (
                  <li key={color.name} className="flex items-center justify-between text-xs">
                    <span className="text-foreground">{color.name}</span>
                    <span className="font-mono text-muted-foreground">
                      {[40, 28, 18, 14][i] ?? 10}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Delivered */}
      <section className="border-b border-border py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="pb-12 md:pb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.95]">
              {t("projectDetail.deliveredHighlight")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
            {workDone.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group border-r border-b border-border p-8 md:p-10 transition-colors duration-200 hover:bg-foreground hover:text-background"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-primary group-hover:text-background">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-6 text-base leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="border-b border-border py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <p className="lg:col-span-4 font-mono text-[11px] tracking-[0.32em] uppercase text-primary">
            {t("projectDetail.technologiesUsed")}
          </p>
          <div className="lg:col-span-8 flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] tracking-[0.16em] uppercase px-5 py-2.5 border border-border text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.95]">
              {t("projectDetail.interestedCta")}
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

export default ProjectDetail;
