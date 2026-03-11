import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import FloatingPixels from "./FloatingPixels";

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex-shrink-0 w-[85vw] md:w-[600px] lg:w-[700px]"
    >
      <Link to={`/projects/${project.slug}`} className="group block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg mb-6">
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={project.previewImage}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          {/* Brand color dots */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            {project.brandColors.map((color) => (
              <div
                key={color.name}
                className="w-4 h-4 rounded-full border border-white/20 shadow-lg"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p
            className="font-mono text-xs tracking-[0.2em] uppercase"
            style={{ color: "hsl(175 70% 50%)" }}
          >
            {project.category}
          </p>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-white/50 font-light leading-relaxed line-clamp-2 max-w-lg">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 rounded-full text-white/40 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-white/40 group-hover:text-primary transition-colors duration-300 pt-2">
            <span className="font-mono text-xs tracking-wider uppercase">View project</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll to horizontal translation
  // We have N projects, each ~700px + gap. Total width minus viewport = how far to translate.
  const totalCards = projects.length;
  const x = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    ["0%", `-${(totalCards - 1) * 105}%`]
  );

  return (
    <section id="projects" ref={sectionRef} className="relative" style={{ height: `${totalCards * 100}vh` }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, hsl(210 20% 13%), hsl(200 25% 15%), hsl(175 30% 14%))",
        }} />
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <FloatingPixels />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full pt-24 pb-12 px-6">
          {/* Header */}
          <div ref={headerRef} className="max-w-7xl mx-auto w-full mb-10">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "hsl(175 70% 50%)" }}
            >
              Selected work
            </motion.p>
            <div className="flex items-end justify-between">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl font-light tracking-tight text-white"
              >
                Projects
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isHeaderInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
                className="font-mono text-xs text-white/30 tracking-wider uppercase hidden md:block"
              >
                Scroll to explore
              </motion.p>
            </div>
          </div>

          {/* Horizontal scroll track */}
          <div className="flex-1 flex items-center overflow-hidden">
            <motion.div
              className="flex gap-8 pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
              style={{ x }}
            >
              {projects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="max-w-7xl mx-auto w-full mt-8">
            <div className="h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              />
            </div>
            <div className="flex justify-between mt-3">
              {projects.map((p, i) => (
                <span key={p.slug} className="font-mono text-[10px] text-white/25 tracking-wider uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
