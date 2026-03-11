import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import FloatingPixels from "./FloatingPixels";

const ease = [0.22, 1, 0.36, 1] as const;

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const project = projects[current];

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + projects.length) % projects.length);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 600 : -600,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -600 : 600,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <FloatingPixels />
      {/* Colored background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, hsl(210 20% 13%), hsl(200 25% 15%), hsl(175 30% 14%))",
      }} />
      <div className="absolute inset-0 grid-bg-dark opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div className="mb-16 flex items-end justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "hsl(175 70% 50%)" }}
            >
              Selected work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-light tracking-tight text-white"
            >
              Projects
            </motion.h2>
          </div>

          {/* Navigation arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => navigate(-1)}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-300 hover:scale-105"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-mono text-xs text-white/40 min-w-[3rem] text-center">
              {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => navigate(1)}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-300 hover:scale-105"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </motion.div>

        {/* Project showcase */}
        <div className="relative min-h-[480px] md:min-h-[420px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={project.slug}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
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
                <div className="space-y-6">
                  <div>
                    <p className="font-mono text-xs tracking-[0.2em] uppercase mb-3"
                       style={{ color: "hsl(175 70% 50%)" }}>
                      {project.category}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-light tracking-tight text-white group-hover:text-primary transition-colors duration-300 mb-4">
                      {project.title}
                    </h3>
                    <p className="text-white/60 font-light leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 rounded-full text-white/50 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-white/40 group-hover:text-primary transition-colors duration-300">
                    <span className="font-mono text-xs tracking-wider uppercase">View project</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-12">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? "w-8 bg-primary" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
