import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

interface ProjectScreenshotsProps {
  screenshots: string[];
  title: string;
}

const ProjectScreenshots = ({ screenshots, title }: ProjectScreenshotsProps) => {
  if (!screenshots.length) return null;

  const heroShot = screenshots[0];
  const remaining = screenshots.slice(1);

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-3xl md:text-4xl font-light tracking-tight mb-16"
        >
          Project <span className="text-primary">Showcase</span>
        </motion.h2>

        {/* Hero screenshot — full width, clean */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-8"
        >
          <div className="relative group overflow-hidden rounded-lg border border-border/50 shadow-xl">
            <img
              src={heroShot}
              alt={`${title} — main view`}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>

        {/* Remaining screenshots — clean grid */}
        {remaining.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {remaining.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="relative group overflow-hidden rounded-lg border border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-500"
              >
                <img
                  src={src}
                  alt={`${title} — detail ${i + 1}`}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 font-mono text-[10px] tracking-widest uppercase text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-sm">
                  Screen {String(i + 2).padStart(2, "0")}
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
