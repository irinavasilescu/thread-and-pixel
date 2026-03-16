import { useMemo } from "react";

interface FloatingPixelsProps {
  variant?: "light" | "dark";
}

const FloatingPixels = ({ variant = "light" }: FloatingPixelsProps) => {
  const pixels = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const opacity = Math.random() * 0.4 + 0.1;
      const baseOpacity = variant === "dark" ? opacity * 2.5 : opacity;
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 15 + 12,
        delay: Math.random() * 8,
        baseOpacity,
        color: variant === "dark"
          ? `hsl(175 50% 30% / ${baseOpacity})`
          : `hsl(175 80% 55% / ${baseOpacity})`,
      };
    });
  }, [variant]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {pixels.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm animate-floating-pixel"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPixels;
