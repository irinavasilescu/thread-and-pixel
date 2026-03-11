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
  settled: boolean;
}

const PILL_H = 44;
const GRAVITY = 0.4;
const BOUNCE = 0.35;
const FRICTION = 0.98;
const FLOOR_FRICTION = 0.85;
const DRAG_HISTORY_SIZE = 5;
const SETTLE_THRESHOLD = 0.15;

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
      vx: (Math.random() - 0.5) * 1,
      vy: 0,
      rotation: 0,
      vr: 0,
      settled: false,
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

      let anyMoving = false;

      const updated = pillsRef.current.map((pill, i) => {
        if (i === draggingRef.current) return pill;

        // If settled, skip physics
        if (pill.settled) return pill;

        let { x, y, vx, vy, rotation, vr, width } = pill;

        vy += GRAVITY;
        x += vx;
        y += vy;
        vx *= FRICTION;
        rotation += vr;
        vr *= 0.94;

        // Floor
        if (y > H - PILL_H) {
          y = H - PILL_H;
          vy = -Math.abs(vy) * BOUNCE;
          vx *= FLOOR_FRICTION;
          vr *= 0.5;
          if (Math.abs(vy) < 1.2) vy = 0;
          if (Math.abs(vx) < 0.3) { vx = 0; vr = 0; }
        }

        // Walls
        if (x < 0) { x = 0; vx = Math.abs(vx) * BOUNCE; }
        if (x > W - width) { x = W - width; vx = -Math.abs(vx) * BOUNCE; }

        // Ceiling
        if (y < 0) { y = 0; vy = Math.abs(vy) * BOUNCE; }

        // Pill-pill collisions
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
          const minDist = (width + other.width) / 2 * 0.6;
          if (dist < minDist && dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;
            x += nx * overlap * 0.3;
            y += ny * overlap * 0.3;
            const relVx = vx - other.vx;
            const relVy = vy - other.vy;
            const dot = relVx * nx + relVy * ny;
            if (dot > 0) {
              vx -= dot * nx * 0.4;
              vy -= dot * ny * 0.4;
            }
          }
        }

        // Check if settled
        const speed = Math.sqrt(vx * vx + vy * vy);
        const isOnFloor = y >= H - PILL_H - 1;
        const settled = isOnFloor && speed < SETTLE_THRESHOLD && Math.abs(vr) < 0.05;

        if (!settled) anyMoving = true;

        // Snap rotation to 0 when nearly settled
        if (settled) {
          rotation = rotation * 0.8; // ease rotation toward 0
          if (Math.abs(rotation) < 0.5) rotation = 0;
          vr = 0;
          vx = 0;
          vy = 0;
        }

        return { ...pill, x, y, vx, vy, rotation, vr, settled };
      });

      pillsRef.current = updated;
      setPills([...updated]);

      // Always keep the loop running so dragging works
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
    dragOffset.current = { x: pointerX - pill.x, y: pointerY - pill.y };
    dragHistory.current = [{ x: pointerX, y: pointerY, time: Date.now() }];
    // Unsettle pill and zero velocity
    pillsRef.current[index] = { ...pill, vx: 0, vy: 0, vr: 0, settled: false };
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
      vx: 0, vy: 0, vr: 0, settled: false,
    };

    dragHistory.current.push({ x: pointerX, y: pointerY, time: Date.now() });
    if (dragHistory.current.length > DRAG_HISTORY_SIZE) {
      dragHistory.current.shift();
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (draggingRef.current === null) return;
    const history = dragHistory.current;

    if (history.length >= 2) {
      const oldest = history[0];
      const newest = history[history.length - 1];
      const dt = Math.max(1, newest.time - oldest.time);
      const vx = ((newest.x - oldest.x) / dt) * 16;
      const vy = ((newest.y - oldest.y) / dt) * 16;

      pillsRef.current[draggingRef.current] = {
        ...pillsRef.current[draggingRef.current],
        vx: Math.max(-20, Math.min(20, vx)),
        vy: Math.max(-20, Math.min(20, vy)),
        vr: vx * 0.1,
        settled: false,
      };
    }

    draggingRef.current = null;
    dragHistory.current = [];
  }, []);

  return (
    <section ref={ref} className="relative py-32 px-6 snap-section overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, hsl(var(--background)), hsl(175 15% 96%), hsl(var(--background)))",
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
            background: "hsl(0 0% 100% / 0.5)",
            border: "1px solid hsl(var(--border) / 0.3)",
            backdropFilter: "blur(4px)",
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
