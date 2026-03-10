import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

const technologies = [
  { name: "React", color: "61 DAFB", bg: "220 20% 15%" },
  { name: "Angular", color: "0 100% 50%", bg: "0 70% 20%" },
  { name: "Shopify", color: "146 72% 44%", bg: "146 50% 15%" },
  { name: "WordPress", color: "204 25% 40%", bg: "204 30% 15%" },
  { name: "PHP", color: "240 40% 60%", bg: "240 30% 18%" },
  { name: "Go", color: "192 80% 50%", bg: "192 50% 15%" },
];

interface Chip {
  name: string;
  color: string;
  bg: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const TechnologiesSection = () => {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const animRef = useRef<number>(0);
  const chipsRef = useRef<Chip[]>([]);
  const [chips, setChips] = useState<Chip[]>([]);
  const draggingRef = useRef<number | null>(null);
  const dragStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastDragPos = useRef<{ x: number; y: number; time: number } | null>(null);

  // Initialize chip positions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    const initial: Chip[] = technologies.map((tech, i) => ({
      ...tech,
      x: 40 + ((w - 160) / (technologies.length - 1)) * i,
      y: 60 + Math.sin(i * 1.8) * (h * 0.25),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    chipsRef.current = initial;
    setChips([...initial]);
  }, []);

  // Physics loop
  useEffect(() => {
    const CHIP_W = 120;
    const CHIP_H = 48;
    const DAMPING = 0.995;
    const BOUNCE = 0.7;

    const step = () => {
      const container = containerRef.current;
      if (!container) {
        animRef.current = requestAnimationFrame(step);
        return;
      }
      const W = container.offsetWidth;
      const H = container.offsetHeight;

      const updated = chipsRef.current.map((chip, i) => {
        if (i === draggingRef.current) return chip;

        let { x, y, vx, vy } = chip;
        x += vx;
        y += vy;
        vx *= DAMPING;
        vy *= DAMPING;

        // Bounce off walls
        if (x < 0) { x = 0; vx = Math.abs(vx) * BOUNCE; }
        if (x > W - CHIP_W) { x = W - CHIP_W; vx = -Math.abs(vx) * BOUNCE; }
        if (y < 0) { y = 0; vy = Math.abs(vy) * BOUNCE; }
        if (y > H - CHIP_H) { y = H - CHIP_H; vy = -Math.abs(vy) * BOUNCE; }

        // Chip-chip collision (simple push)
        chipsRef.current.forEach((other, j) => {
          if (j === i) return;
          const dx = x - other.x;
          const dy = y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CHIP_W * 0.8 && dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = CHIP_W * 0.8 - dist;
            x += nx * overlap * 0.5;
            y += ny * overlap * 0.5;
            vx += nx * 0.3;
            vy += ny * 0.3;
          }
        });

        return { ...chip, x, y, vx, vy };
      });

      chipsRef.current = updated;
      setChips([...updated]);
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent, index: number) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    draggingRef.current = index;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top, time: Date.now() };
    dragStartRef.current = pos;
    lastDragPos.current = pos;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (draggingRef.current === null) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - 60;
    const y = e.clientY - rect.top - 24;
    const now = Date.now();

    chipsRef.current[draggingRef.current] = {
      ...chipsRef.current[draggingRef.current],
      x: Math.max(0, Math.min(x, rect.width - 120)),
      y: Math.max(0, Math.min(y, rect.height - 48)),
      vx: 0,
      vy: 0,
    };
    lastDragPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, time: now };
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (draggingRef.current === null) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect && lastDragPos.current && dragStartRef.current) {
      const dt = Math.max(1, Date.now() - lastDragPos.current.time) / 16;
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      const vx = (currentX - lastDragPos.current.x) / dt * 2;
      const vy = (currentY - lastDragPos.current.y) / dt * 2;

      chipsRef.current[draggingRef.current] = {
        ...chipsRef.current[draggingRef.current],
        vx: Math.max(-15, Math.min(15, vx)),
        vy: Math.max(-15, Math.min(15, vy)),
      };
    }
    draggingRef.current = null;
    dragStartRef.current = null;
    lastDragPos.current = null;
  }, []);

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
            Grab and toss them around
          </motion.p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative mx-auto w-full max-w-2xl h-[320px] md:h-[360px] rounded-2xl border border-border/20 overflow-hidden touch-none select-none"
          style={{
            background: "linear-gradient(180deg, hsl(var(--surface) / 0.2), hsl(var(--surface) / 0.5))",
          }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {chips.map((chip, i) => (
            <div
              key={chip.name}
              onPointerDown={(e) => handlePointerDown(e, i)}
              className={`absolute cursor-grab active:cursor-grabbing ${draggingRef.current === i ? "z-20" : "z-10"}`}
              style={{
                transform: `translate(${chip.x}px, ${chip.y}px)`,
                willChange: "transform",
              }}
            >
              <div
                className="px-6 py-3 rounded-lg border backdrop-blur-sm shadow-lg transition-shadow duration-300"
                style={{
                  background: `hsl(${chip.bg} / 0.9)`,
                  borderColor: `hsl(${chip.color} / 0.3)`,
                  boxShadow: draggingRef.current === i
                    ? `0 20px 40px hsl(${chip.color} / 0.2), 0 0 20px hsl(${chip.color} / 0.1)`
                    : `0 4px 12px hsl(${chip.color} / 0.1)`,
                }}
              >
                <span
                  className="font-mono text-sm md:text-base font-medium tracking-wider whitespace-nowrap"
                  style={{ color: `hsl(${chip.color})` }}
                >
                  {chip.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
