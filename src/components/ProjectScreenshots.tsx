import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

interface ProjectScreenshotsProps {
  screenshots: string[];
  title: string;
}

const ProjectScreenshots = ({ screenshots, title }: ProjectScreenshotsProps) => {
  if (!screenshots.length) return null;

  // Split into rows for a staggered layout
  const heroShot = screenshots[0];
  const remaining = screenshots.slice(1);

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-3xl md:text-4xl font-light tracking-tight"
        >
          Project <span className="text-primary">Showcase</span>
        </motion.h2>
      </div>

      {/* Hero screenshot — full width, slight angle */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="relative mb-12"
      >
        <div
          className="py-8 -mx-6 px-6"
          style={{ transform: "rotate(-2deg) scale(1.02)", transformOrigin: "center center" }}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02, rotate: 0 }}
              transition={{ duration: 0.4 }}
              className="relative group"
            >
              <div className="overflow-hidden rounded-sm border border-border/50 shadow-2xl group-hover:shadow-primary/10 transition-shadow duration-500">
                <img
                  src={heroShot}
                  alt={`${title} — main view`}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute -bottom-3 left-4 font-mono text-[10px] tracking-widest uppercase text-muted-foreground bg-background px-3 py-1 border border-border/50 rounded-sm">
                Hero View
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Remaining screenshots — angled grid */}
      {remaining.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="relative"
        >
          <div
            className="py-12 -mx-6 px-6"
            style={{ transform: "rotate(2deg) scale(1.03)", transformOrigin: "center center" }}
          >
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              {remaining.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                  className="relative group"
                >
                  <div className="overflow-hidden rounded-sm border border-border/50 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                    <img
                      src={src}
                      alt={`${title} — detail ${i + 1}`}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute -bottom-3 left-4 font-mono text-[10px] tracking-widest uppercase text-muted-foreground bg-background px-3 py-1 border border-border/50 rounded-sm">
                    Screen {String(i + 2).padStart(2, "0")}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectScreenshots;
