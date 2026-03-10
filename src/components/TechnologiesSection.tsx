import { motion, useInView, useMotionValue, useTransform, animate, PanInfo } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const technologies = [
  { name: "React", color: "61 DAFB", bg: "220 20% 15%" },
  { name: "Angular", color: "0 100% 50%", bg: "0 70% 20%" },
  { name: "Shopify", color: "146 72% 44%", bg: "146 50% 15%" },
  { name: "WordPress", color: "204 25% 40%", bg: "204 30% 15%" },
  { name: "PHP", color: "240 40% 60%", bg: "240 30% 18%" },
  { name: "Go", color: "192 80% 50%", bg: "192 50% 15%" },
];

interface DraggableTechProps {
  tech: typeof technologies[0];
  index: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

const DraggableTech = ({ tech, index, containerRef }: DraggableTechProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      setIsDragging(false);
      // Bounce back with spring
      animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
      animate(y, 0, { type: "spring", stiffness: 300, damping: 20 });
    },
    [x, y]
  );

  // Lay them out in a scattered bowl-like arrangement
  const positions = [
    { tx: -120, ty: 20 },
    { tx: 60, ty: -30 },
    { tx: -40, ty: 60 },
    { tx: 140, ty: 10 },
    { tx: -160, ty: -20 },
    { tx: 100, ty: 50 },
  ];

  const pos = positions[index % positions.length];

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.3}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      style={{ x, y, rotate }}
      initial={{ opacity: 0, scale: 0, x: pos.tx, y: pos.ty }}
      whileInView={{ opacity: 1, scale: 1, x: pos.tx, y: pos.ty }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      className={`absolute cursor-grab active:cursor-grabbing select-none ${isDragging ? "z-20" : "z-10"}`}
    >
      <div
        className="px-6 py-4 rounded-lg border backdrop-blur-sm shadow-lg transition-shadow duration-300"
        style={{
          background: `hsl(${tech.bg} / 0.9)`,
          borderColor: `hsl(${tech.color} / 0.3)`,
          boxShadow: isDragging
            ? `0 20px 40px hsl(${tech.color} / 0.2), 0 0 20px hsl(${tech.color} / 0.1)`
            : `0 4px 12px hsl(${tech.color} / 0.1)`,
        }}
      >
        <span
          className="font-mono text-sm md:text-base font-medium tracking-wider whitespace-nowrap"
          style={{ color: `hsl(${tech.color})` }}
        >
          {tech.name}
        </span>
      </div>
    </motion.div>
  );
};

const TechnologiesSection = () => {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null!);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 snap-section overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div className="text-center mb-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4"
          >
            Our Toolkit
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-4"
          >
            Technologies We <span className="text-primary">Master</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground font-light text-sm"
          >
            Grab, toss, and scramble them around
          </motion.p>
        </motion.div>

        {/* Bowl container */}
        <div
          ref={containerRef}
          className="relative mx-auto w-full max-w-2xl h-[320px] md:h-[360px] flex items-center justify-center"
        >
          {/* Bowl shape background */}
          <div
            className="absolute inset-x-8 bottom-0 h-[280px] rounded-[50%_50%_50%_50%/0%_0%_100%_100%] border border-border/30"
            style={{
              background: "linear-gradient(180deg, hsl(var(--surface) / 0.3), hsl(var(--surface) / 0.8))",
            }}
          />

          {/* Tech chips */}
          <div className="relative w-full h-full flex items-center justify-center">
            {technologies.map((tech, i) => (
              <DraggableTech
                key={tech.name}
                tech={tech}
                index={i}
                containerRef={containerRef}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
