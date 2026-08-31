import { motion } from "framer-motion";
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
    <motion.div
      className="theme-swiss fixed inset-0 z-[9999] bg-background text-foreground flex flex-col"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Top rule */}
      <div className="border-b border-border px-6 py-5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
          Thread &amp; Pixel
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Web design &amp; development
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-7xl border-x border-border px-6 md:px-10 py-16">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.85] tracking-tighter select-none">
            <span className="block">
              {letters.map((char, i) => (
                <motion.span
                  key={`t-${i}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: "0.3em" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                className="inline-block text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.35 }}
              >
                &amp;
              </motion.span>
            </span>
            <span className="block">
              {letters2.map((char, i) => (
                <motion.span
                  key={`p-${i}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: "0.3em" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.45 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Progress rule */}
          <div className="mt-10 h-[2px] w-full bg-border overflow-hidden">
            <motion.div
              className="h-full bg-primary origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.9, ease: "easeInOut" }}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Digital studio
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          {phase === "reveal" ? "Loading" : "Ready"}
        </span>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
