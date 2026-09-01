import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ProjectScreenshotsProps {
  screenshots: string[];
  title: string;
}

const ProjectScreenshots = ({ screenshots, title }: ProjectScreenshotsProps) => {
  const { t } = useTranslation();
  if (!screenshots.length) return null;

  const heroShot = screenshots[0];
  const remaining = screenshots.slice(1);

  return (
    <section className="border-b border-border py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="pb-12 md:pb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-foreground leading-[0.95]">
            {t("projectDetail.showcaseTitle")}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-border bg-card overflow-hidden"
        >
          <img
            src={heroShot}
            alt={`${title} — main view`}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </motion.div>

        {remaining.length > 0 && (
          <div className="mt-[-1px] grid grid-cols-1 md:grid-cols-3 border-l border-border">
            {remaining.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border-r border-b border-t border-border bg-card"
              >
                <img
                  src={src}
                  alt={`${title} — detail ${i + 1}`}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                <div className="border-t border-border px-5 py-3 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  {t("projectDetail.screen")} {String(i + 2).padStart(2, "0")}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectScreenshots;
