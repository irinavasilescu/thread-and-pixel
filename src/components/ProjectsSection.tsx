import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group block relative overflow-hidden border border-border/50 rounded-sm hover:border-primary/30 transition-all duration-500"
      >
        {/* Color strip preview */}
        <div className="flex h-2">
          {project.brandColors.map((color) => (
            <div
              key={color.name}
              className="flex-1 transition-all duration-500 group-hover:h-3"
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>

        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-2">
                {project.category}
              </p>
              <h3 className="text-2xl md:text-3xl font-light tracking-tight group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
            </div>
            <motion.div
              className="mt-2 text-muted-foreground group-hover:text-primary transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </motion.div>
          </div>

          <p className="text-muted-foreground font-light leading-relaxed mb-6">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 bg-surface text-muted-foreground rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Hover line */}
        <div className="h-px w-0 group-hover:w-full bg-primary/40 transition-all duration-700" />
      </Link>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="projects" className="relative py-32 px-6 snap-section noise-bg bg-surface" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div style={{ y: headerY }} className="mb-20">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4"
          >
            Selected work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-light tracking-tight"
          >
            Projects
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
