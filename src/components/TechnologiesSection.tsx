import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

const technologies = [
  { name: "React", color: "191 97% 77%", bg: "191 60% 85%" },
  { name: "Angular", color: "0 80% 55%", bg: "0 70% 88%" },
  { name: "Shopify", color: "146 55% 50%", bg: "146 45% 85%" },
  { name: "WordPress", color: "204 30% 50%", bg: "204 25% 85%" },
  { name: "PHP", color: "240 40% 55%", bg: "240 30% 87%" },
  { name: "Go", color: "192 70% 45%", bg: "192 50% 85%" },
  { name: "TypeScript", color: "211 60% 48%", bg: "211 50% 87%" },
  { name: "Node.js", color: "120 35% 45%", bg: "120 30% 85%" },
  { name: "Tailwind", color: "198 80% 50%", bg: "198 60% 87%" },
  { name: "Next.js", color: "0 0% 25%", bg: "0 0% 88%" },
];

interface Pill {
  name: string;
  color: string;
  bg: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;
  width: number;
}

const PILL_H = 44;
const GRAVITY = 0.35;
const BOUNCE = 0.5;
const FRICTION = 0.99;
const FLOOR_FRICTION = 0.92;
const DRAG_HISTORY_SIZE = 5;

const TechnologiesSection = () => {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const animRef = useRef<number>(0);
  const pillsRef = useRef<Pill[]>([]);
  const [pills, setPills] = useState<Pill[]>([]);
  const draggingRef = useRef<number | null>(null);
  const dragHistory = useRef<{ x: number; y: number; time: number }[]>([]);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasDropped, setHasDropped] = useState(false);
  const sectionInView = useInView(ref, { once: true, margin: "-200px" });

  const measureRef = useRef<HTMLDivElement>(null);
  const [pillWidths, setPillWidths] = useState<number[]>([]);

  useEffect(() => {
    if (measureRef.current) {
      const spans = measureRef.current.querySelectorAll("span");
      const widths = Array.from(spans).map((s) => s.offsetWidth + 48);
      setPillWidths(widths);
    }
  }, []);

  // Drop pills when section comes into view
  useEffect(() => {
    if (!sectionInView || hasDropped || pillWidths.length === 0) return;
    const container = containerRef.current;
    if (!container) return;
    const W = container.offsetWidth;

    const initial: Pill[] = technologies.map((tech, i) => ({
      ...tech,
      width: pillWidths[i] || 120,
      x: 30 + ((W - 160) / (technologies.length - 1)) * i,
      y: -60 - Math.random() * 200,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 2 + 1,
      rotation: (Math.random() - 0.5) * 20,
      vr: (Math.random() - 0.5) * 2,
    }));
    pillsRef.current = initial;
    setPills([...initial]);
    setHasDropped(true);
  }, [sectionInView, hasDropped, pillWidths]);

  // Physics loop
  useEffect(() => {
    if (!hasDropped) return;

    const step = () => {
      const container = containerRef.current;
      if (!container) {
        animRef.current = requestAnimationFrame(step);
        return;
      }
      const W = container.offsetWidth;
      const H = container.offsetHeight;

      const updated = pillsRef.current.map((pill, i) => {
        if (i === draggingRef.current) return pill;

        let { x, y, vx, vy, rotation, vr, width } = pill;

        vy += GRAVITY;
        x += vx;
        y += vy;
        vx *= FRICTION;
        rotation += vr;
        vr *= 0.96;

        // Floor
        if (y > H - PILL_H) {
          y = H - PILL_H;
          vy = -Math.abs(vy) * BOUNCE;
          vx *= FLOOR_FRICTION;
          vr *= 0.7;
          if (Math.abs(vy) < 0.8) vy = 0;
          // Slow rotation to stop on floor
          if (Math.abs(vx) < 0.5) vr *= 0.5;
        }

        // Walls
        if (x < 0) { x = 0; vx = Math.abs(vx) * BOUNCE; vr += vx * 0.1; }
        if (x > W - width) { x = W - width; vx = -Math.abs(vx) * BOUNCE; vr -= Math.abs(vx) * 0.1; }

        // Ceiling
        if (y < 0) { y = 0; vy = Math.abs(vy) * BOUNCE; }

        // Pill-pill collisions (simple push-apart)
        for (let j = 0; j < pillsRef.current.length; j++) {
          if (j === i) continue;
          const other = pillsRef.current[j];
          const cx1 = x + width / 2;
          const cy1 = y + PILL_H / 2;
          const cx2 = other.x + other.width / 2;
          const cy2 = other.y + PILL_H / 2;
          const dx = cx1 - cx2;
          const dy = cy1 - cy2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = (width + other.width) / 2 * 0.65;
          if (dist < minDist && dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;
            x += nx * overlap * 0.4;
            y += ny * overlap * 0.4;
            // Transfer some velocity
            const relVx = vx - other.vx;
            const relVy = vy - other.vy;
            const dotProduct = relVx * nx + relVy * ny;
            if (dotProduct > 0) {
              vx -= dotProduct * nx * 0.5;
              vy -= dotProduct * ny * 0.5;
            }
            vr += (Math.random() - 0.5) * 1.5;
          }
        }

        return { ...pill, x, y, vx, vy, rotation, vr };
      });

      pillsRef.current = updated;
      setPills([...updated]);
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [hasDropped]);

  const handlePointerDown = useCallback((e: React.PointerEvent, index: number) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    draggingRef.current = index;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pill = pillsRef.current[index];
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;
    // Store offset from pill origin to pointer
    dragOffset.current = { x: pointerX - pill.x, y: pointerY - pill.y };
    dragHistory.current = [{ x: pointerX, y: pointerY, time: Date.now() }];
    // Zero velocity while grabbing
    pillsRef.current[index] = { ...pill, vx: 0, vy: 0, vr: 0 };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (draggingRef.current === null) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;
    const pill = pillsRef.current[draggingRef.current];
    const x = pointerX - dragOffset.current.x;
    const y = pointerY - dragOffset.current.y;

    pillsRef.current[draggingRef.current] = {
      ...pill,
      x: Math.max(0, Math.min(x, rect.width - pill.width)),
      y: Math.max(0, Math.min(y, rect.height - PILL_H)),
      vx: 0, vy: 0, vr: 0,
    };

    // Track history for velocity calculation
    dragHistory.current.push({ x: pointerX, y: pointerY, time: Date.now() });
    if (dragHistory.current.length > DRAG_HISTORY_SIZE) {
      dragHistory.current.shift();
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (draggingRef.current === null) return;
    const history = dragHistory.current;

    if (history.length >= 2) {
      // Use the oldest and newest positions in history for velocity
      const oldest = history[0];
      const newest = history[history.length - 1];
      const dt = Math.max(1, newest.time - oldest.time);
      const vx = ((newest.x - oldest.x) / dt) * 16; // convert to per-frame
      const vy = ((newest.y - oldest.y) / dt) * 16;

      pillsRef.current[draggingRef.current] = {
        ...pillsRef.current[draggingRef.current],
        vx: Math.max(-25, Math.min(25, vx)),
        vy: Math.max(-25, Math.min(25, vy)),
        vr: vx * 0.15,
      };
    }

    draggingRef.current = null;
    dragHistory.current = [];
  }, []);

  return (
    <section ref={ref} className="relative py-32 px-6 snap-section overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, hsl(var(--background)), hsl(45 30% 96%), hsl(var(--background)))",
      }} />

      <div className="relative z-10 max-w-5xl mx-auto">
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

        {/* Hidden measure container */}
        <div ref={measureRef} className="absolute opacity-0 pointer-events-none flex gap-2" aria-hidden>
          {technologies.map((t) => (
            <span key={t.name} className="font-sans text-sm md:text-base font-medium px-6 py-2.5 whitespace-nowrap">
              {t.name}
            </span>
          ))}
        </div>

        <div
          ref={containerRef}
          className="relative mx-auto w-full max-w-3xl h-[300px] md:h-[350px] rounded-3xl overflow-hidden touch-none select-none"
          style={{
            background: "hsl(40 20% 96%)",
            border: "1px solid hsl(var(--border) / 0.3)",
          }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {pills.map((pill, i) => (
            <div
              key={pill.name}
              onPointerDown={(e) => handlePointerDown(e, i)}
              className={`absolute cursor-grab active:cursor-grabbing ${draggingRef.current === i ? "z-20" : "z-10"}`}
              style={{
                transform: `translate(${pill.x}px, ${pill.y}px) rotate(${pill.rotation}deg)`,
                willChange: "transform",
              }}
            >
              <div
                className="px-6 py-2.5 rounded-full shadow-md transition-shadow duration-200"
                style={{
                  background: `hsl(${pill.bg})`,
                  boxShadow: draggingRef.current === i
                    ? `0 12px 30px hsl(${pill.color} / 0.25)`
                    : `0 2px 8px hsl(0 0% 0% / 0.06)`,
                }}
              >
                <span
                  className="font-sans text-sm md:text-base font-medium whitespace-nowrap"
                  style={{ color: `hsl(${pill.color})` }}
                >
                  {pill.name}
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
