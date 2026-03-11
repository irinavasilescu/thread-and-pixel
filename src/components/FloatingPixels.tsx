import { motion } from "framer-motion";
import { useMemo } from "react";

interface FloatingPixelsProps {
  /** Use "dark" for light backgrounds so pixels are more visible */
  variant?: "light" | "dark";
}

const FloatingPixels = ({ variant = "light" }: FloatingPixelsProps) => {
  const pixels = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {pixels.map((p) => {
        const baseOpacity = variant === "dark" ? p.opacity * 2.5 : p.opacity;
        const color = variant === "dark"
          ? `hsl(175 50% 30% / ${baseOpacity})`
          : `hsl(175 80% 55% / ${baseOpacity})`;
        return (
          <motion.div
            key={p.id}
            className="absolute rounded-sm"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: color,
            }}
            animate={{
              y: [0, -30, 10, -20, 0],
              x: [0, 15, -10, 20, 0],
              opacity: [baseOpacity, baseOpacity * 1.5, baseOpacity * 0.5, baseOpacity * 1.2, baseOpacity],
              scale: [1, 1.3, 0.8, 1.1, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingPixels;
