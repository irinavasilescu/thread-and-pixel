import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"reveal" | "hold" | "exit">("reveal");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 1000);
    const t2 = setTimeout(() => setPhase("exit"), 1800);
    const t3 = setTimeout(onComplete, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const letters = "Thread".split("");
  const letters2 = "Pixel".split("");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: "hsl(210 25% 8%)" }}
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Subtle grid */}
        <div className="absolute inset-0 grid-bg-dark opacity-15" />

        {/* Horizontal glow line */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)" }}
          initial={{ width: 0 }}
          animate={{ width: phase === "reveal" ? "240px" : "300px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="relative font-mono text-2xl sm:text-3xl tracking-[0.3em] uppercase select-none">
          {/* Thread */}
          {letters.map((char, i) => (
            <motion.span
              key={`t-${i}`}
              className="inline-block text-white/90"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
            >
              {char}
            </motion.span>
          ))}

          {/* & */}
          <motion.span
            className="inline-block text-primary mx-[2px]"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            &amp;
          </motion.span>

          {/* Pixel */}
          {letters2.map((char, i) => (
            <motion.span
              key={`p-${i}`}
              className="inline-block text-white/90"
              initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.06, ease: "easeOut" }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.p
          className="absolute bottom-[45%] sm:bottom-[42%] mt-6 font-mono text-[10px] tracking-[0.4em] uppercase text-white/30"
          style={{ transform: "translateY(60px)" }}
          initial={{ opacity: 0 }}
          animate={phase !== "reveal" ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Digital Studio
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
