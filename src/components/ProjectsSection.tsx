import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const ProjectCard = ({
  project,
  index,
  isActive,
}: {
  project: (typeof projects)[0];
  index: number;
  isActive: boolean;
}) => {
  const chars = project.title.split("");

  return (
    <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-4 md:px-12 lg:px-20">
      <Link
        to={`/projects/${project.slug}`}
        className="group relative w-full max-w-[1200px] h-[75vh] rounded-2xl overflow-hidden cursor-pointer"
      >
        {/* Background image */}
        <img
          src={project.previewImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
          {/* Category */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4"
            style={{ color: "hsl(175 70% 50%)" }}
          >
            {project.category}
          </motion.p>

          {/* Title with character reveal */}
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-5 overflow-hidden">
            {chars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%", opacity: 0 }}
                animate={
                  isActive
                    ? { y: "0%", opacity: 1 }
                    : { y: "110%", opacity: 0 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.025,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
                style={{ whiteSpace: char === " " ? "pre" : undefined }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h3>

          {/* View project link */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors duration-500"
          >
            <span className="font-mono text-xs tracking-wider uppercase">
              View project
            </span>
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </motion.div>
        </div>

        {/* Index number */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 0.12 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-8xl md:text-9xl font-bold text-white"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
        </div>
      </Link>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = projects.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Each card gets one full screen of scroll. Map progress to active index.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(
      Math.floor(latest * totalCards),
      totalCards - 1
    );
    setActiveIndex(idx);
  });

  // Horizontal translation: snap one card-width per scroll step
  const x = useTransform(
    scrollYProgress,
    Array.from({ length: totalCards }, (_, i) => i / totalCards),
    Array.from({ length: totalCards }, (_, i) => `${-i * 100}vw`)
  );

  return (
    <div
      ref={containerRef}
      style={{ height: `${(totalCards + 1) * 100}vh` }}
    >
      <section
        id="projects"
        className="sticky top-0 h-screen overflow-hidden"
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(210 20% 13%), hsl(200 25% 15%), hsl(175 30% 14%))",
          }}
        />

        {/* Header */}
        <div className="relative z-10 pt-10 md:pt-14 px-6 md:px-12 lg:px-20 flex items-end justify-between">
          <div>
            <p
              className="font-mono text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: "hsl(175 70% 50%)" }}
            >
              Selected work
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              Projects
            </h2>
          </div>
          <span className="font-mono text-sm text-white/30 tracking-wider hidden md:block">
            {String(activeIndex + 1).padStart(2, "0")} / {String(totalCards).padStart(2, "0")}
          </span>
        </div>

        {/* Horizontal scroll container */}
        <motion.div
          style={{ x }}
          className="relative z-10 flex h-[calc(100vh-120px)] items-center"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              isActive={activeIndex === i}
            />
          ))}
        </motion.div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-6 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 z-10">
          <div className="h-px bg-white/10 w-full">
            <motion.div
              className="h-full"
              style={{
                scaleX: scrollYProgress,
                transformOrigin: "left",
                background: "hsl(175 70% 50%)",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsSection;
