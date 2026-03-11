import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import FloatingPixels from "./FloatingPixels";

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  return (
    <div className="flex-shrink-0 w-[100vw] h-full flex items-center px-6 md:px-16 lg:px-24">
      <Link
        to={`/projects/${project.slug}`}
        className="group grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto"
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg">
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
        <div className="space-y-5">
          <p
            className="font-mono text-xs tracking-[0.2em] uppercase"
            style={{ color: "hsl(175 70% 50%)" }}
          >
            {project.category}
          </p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-white/50 font-light leading-relaxed text-lg max-w-lg">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 rounded-full text-white/40 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-white/40 group-hover:text-primary transition-colors duration-300 pt-4">
            <span className="font-mono text-xs tracking-wider uppercase">View project</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = projects.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Each card takes exactly 1 screen width; translate by (n-1) * 100vw
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(totalCards - 1) * 100}vw`]
  );

  // Track active card index
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.round(v * (totalCards - 1));
    setActiveIndex(Math.min(idx, totalCards - 1));
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{ height: `${(totalCards + 0.5) * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, hsl(210 20% 13%), hsl(200 25% 15%), hsl(175 30% 14%))",
        }} />
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <FloatingPixels />

        {/* Header - fixed at top */}
        <div className="relative z-10 pt-16 md:pt-20 px-6 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto flex items-end justify-between">
            <div>
              <p
                className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
                style={{ color: "hsl(175 70% 50%)" }}
              >
                Selected work
              </p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
                Projects
              </h2>
            </div>
            <p className="font-mono text-xs text-white/30 tracking-wider uppercase hidden md:block">
              Scroll to explore
            </p>
          </div>
        </div>

        {/* Horizontal track */}
        <motion.div
          className="absolute inset-0 flex"
          style={{ x, width: `${totalCards * 100}vw` }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>

        {/* Bottom progress */}
        <div className="absolute bottom-8 left-0 right-0 z-10 px-6 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              />
            </div>
            <div className="flex justify-between mt-3">
              {projects.map((p, i) => (
                <span
                  key={p.slug}
                  className={`font-mono text-[10px] tracking-wider uppercase transition-colors duration-300 ${
                    i === activeIndex ? "text-primary" : "text-white/25"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")} — {p.title}
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
