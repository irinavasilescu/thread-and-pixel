import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "text" | "exit">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 600);
    const t2 = setTimeout(() => setPhase("exit"), 1800);
    const t3 = setTimeout(onComplete, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-hero"
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0, scale: 1.1 } : { opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ pointerEvents: phase === "exit" ? "none" : "auto" }}
      >
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg-dark opacity-30" />

        {/* Radiating pulse rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/20"
            initial={{ width: 0, height: 0, opacity: 0.6 }}
            animate={{ width: 600 + i * 200, height: 600 + i * 200, opacity: 0 }}
            transition={{ duration: 2, delay: 0.3 + i * 0.3, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        {/* Logo mark */}
        <div className="relative flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow behind logo */}
            <motion.div
              className="absolute inset-0 rounded-full blur-[40px]"
              style={{ background: "hsl(var(--primary) / 0.3)" }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Logo SVG — abstract thread & pixel mark */}
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="relative z-10">
              <motion.path
                d="M20 60 C20 35, 35 20, 40 20 C45 20, 60 35, 60 60"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              <motion.path
                d="M28 55 C28 38, 38 28, 40 28 C42 28, 52 38, 52 55"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
              />
              {/* Pixel dots */}
              {[
                [40, 16], [24, 48], [56, 48], [40, 40],
              ].map(([cx, cy], i) => (
                <motion.rect
                  key={i}
                  x={cx - 3}
                  y={cy - 3}
                  width={6}
                  height={6}
                  fill="hsl(var(--primary))"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                />
              ))}
            </svg>
          </motion.div>

          {/* Brand text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={phase === "text" || phase === "exit" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "hsl(var(--primary))" }}>
              Thread<span className="opacity-50">&</span>Pixel
            </p>
            <motion.div
              className="mt-4 h-[1px] bg-primary/30 mx-auto"
              initial={{ width: 0 }}
              animate={phase === "text" || phase === "exit" ? { width: 120 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
