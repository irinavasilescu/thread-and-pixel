import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Split title into characters for staggered animation
  const chars = project.title.split("");

  return (
    <Link
      to={`/projects/${project.slug}`}
      ref={ref}
      className="group relative flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-[70vh] rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Background image */}
      <img
        src={project.previewImage}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
        {/* Category */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4"
          style={{ color: "hsl(175 70% 50%)" }}
        >
          {project.category}
        </motion.p>

        {/* Title with character reveal */}
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4 overflow-hidden">
          {chars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1 + i * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h3>

        {/* Minimal tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
          className="text-white/60 font-light text-sm md:text-base max-w-md leading-relaxed mb-6"
        >
          {project.tagline}
        </motion.p>

        {/* View project link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
          className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors duration-500"
        >
          <span className="font-mono text-xs tracking-wider uppercase">View project</span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </motion.div>
      </div>

      {/* Index number */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.15 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          className="font-mono text-7xl md:text-8xl font-bold text-white"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </div>
    </Link>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll to horizontal translation
  const totalCards = projects.length;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["1%", `${-((totalCards - 1) * 100) / totalCards}%`]
  );

  return (
    <div ref={containerRef} style={{ height: `${(totalCards + 1) * 100}vh` }}>
      <section
        id="projects"
        className="sticky top-0 h-screen overflow-hidden"
        ref={sectionRef}
      >
        {/* Background */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, hsl(210 20% 13%), hsl(200 25% 15%), hsl(175 30% 14%))",
        }} />

        {/* Header */}
        <div className="relative z-10 pt-16 md:pt-20 px-6 md:px-12 lg:px-20 mb-8">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "hsl(175 70% 50%)" }}
          >
            Selected work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-light tracking-tight text-white"
          >
            Projects
          </motion.h2>
        </div>

        {/* Horizontal scroll container */}
        <motion.div
          style={{ x }}
          className="relative z-10 flex gap-6 md:gap-8 px-6 md:px-12 lg:px-20 h-[calc(100vh-160px)] items-center"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}

          {/* End spacer with CTA */}
          <div className="flex-shrink-0 w-[40vw] h-[70vh] flex items-center justify-center">
            <motion.div className="text-center space-y-4">
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
                Want to see more?
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-mono text-sm tracking-wider uppercase"
              >
                Let's talk
                <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-8 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 z-10">
          <div className="h-px bg-white/10 w-full">
            <motion.div
              className="h-full bg-primary"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <span className="font-mono text-[10px] text-white/30 tracking-wider">SCROLL</span>
            <span className="font-mono text-[10px] text-white/30 tracking-wider">
              {String(projects.length).padStart(2, "0")} PROJECTS
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsSection;
