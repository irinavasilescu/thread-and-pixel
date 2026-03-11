import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 60;
const CONNECT_DISTANCE = 120;

const HeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; r: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // Initialize particles
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouse.current = { x: -1000, y: -1000 };
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let animId: number;
    const loop = () => {
      const w = W();
      const h = H();
      ctx.clearRect(0, 0, w, h);

      const pts = particles.current;
      for (const p of pts) {
        // Mouse repulsion
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.8;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Wrap edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(175, 80%, 55%, 0.6)";
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `hsla(175, 70%, 45%, ${0.15 * (1 - dist / CONNECT_DISTANCE)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden snap-section bg-hero text-hero-foreground">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg-dark" />
      
      {/* Interactive particle network */}
      <HeroCanvas />

      {/* Glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: "hsl(175 80% 55% / 0.2)" }}
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ background: "hsl(210 80% 55% / 0.12)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Animated tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-primary"
          />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary">
            Digital Craft Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] mb-8"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            We weave
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-gradient-hero font-medium inline-block"
          >
            digital experiences
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            pixel by pixel
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
          style={{ color: "hsl(220 10% 65%)" }}
        >
          Crafting premium websites, e-commerce platforms, and digital strategies
          that elevate brands into the future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          <a
            href="#services"
            className="group relative font-mono text-xs tracking-wider uppercase px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-sm overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-white/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative">Explore Services</span>
          </a>
          <a
            href="#about"
            className="font-mono text-xs tracking-wider uppercase px-8 py-3 border border-hero-foreground/20 text-hero-foreground hover:border-primary/50 hover:text-primary transition-all duration-300 rounded-sm"
          >
            Learn More
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-20 flex items-center justify-center gap-12 md:gap-20"
        >
          {[
            { value: "50+", label: "Projects" },
            { value: "98%", label: "Satisfaction" },
            { value: "5+", label: "Years" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-light text-primary">{stat.value}</p>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: "hsl(220 10% 50%)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "hsl(220 10% 45%)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} style={{ color: "hsl(220 10% 45%)" }} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
};

export default HeroSection;
