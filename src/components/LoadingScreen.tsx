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
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: "hsl(210 25% 8%)", pointerEvents: phase === "exit" ? "none" : "auto" }}
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0, scale: 1.1 } : { opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 grid-bg-dark opacity-20" />

        {/* Radiating pulse rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/15"
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: 500 + i * 200, height: 500 + i * 200, opacity: 0 }}
            transition={{ duration: 2.5, delay: 0.3 + i * 0.4, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        <div className="relative flex flex-col items-center gap-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow behind logo */}
            <motion.div
              className="absolute -inset-8 rounded-full blur-[60px]"
              style={{ background: "hsl(var(--primary) / 0.25)" }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />

            {/* Logo — T&P monogram */}
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="relative z-10">
              {/* T letter */}
              <motion.line
                x1="20" y1="25" x2="50" y2="25"
                stroke="hsl(var(--primary))"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <motion.line
                x1="35" y1="25" x2="35" y2="55"
                stroke="hsl(var(--primary))"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
              />

              {/* & symbol — small */}
              <motion.path
                d="M44 42 C42 38, 46 35, 48 37 C50 39, 44 44, 44 44 C44 44, 52 48, 48 52 C46 54, 42 52, 44 48"
                stroke="hsl(0 0% 100% / 0.3)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
              />

              {/* P letter */}
              <motion.line
                x1="55" y1="25" x2="55" y2="55"
                stroke="hsl(var(--primary))"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
              />
              <motion.path
                d="M55 25 C55 25, 75 25, 75 37 C75 49, 55 49, 55 49"
                stroke="hsl(var(--primary))"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
              />

              {/* Pixel accents */}
              {[
                [22, 60], [30, 66], [38, 60], [58, 60], [66, 66], [74, 60],
              ].map(([cx, cy], i) => (
                <motion.rect
                  key={i}
                  x={cx - 2}
                  y={cy - 2}
                  width={4}
                  height={4}
                  fill="hsl(var(--primary))"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0.4], scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.08, duration: 0.4 }}
                />
              ))}
            </svg>
          </motion.div>

          {/* Brand text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={phase === "text" || phase === "exit" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/70">
              Thread<span className="text-primary">&</span>Pixel
            </p>
            <motion.div
              className="mt-4 h-[1px] mx-auto"
              style={{ background: "hsl(var(--primary) / 0.3)" }}
              initial={{ width: 0 }}
              animate={phase === "text" || phase === "exit" ? { width: 100 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
