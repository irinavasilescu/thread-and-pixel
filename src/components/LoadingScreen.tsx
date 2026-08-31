import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import wordmark from "@/assets/thread-and-pixel-wordmark.png";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"reveal" | "hold" | "exit">("reveal");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 1000);
    const t2 = setTimeout(() => setPhase("exit"), 1800);
    const t3 = setTimeout(onComplete, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center gap-8 px-6">
        <motion.img
          src={wordmark}
          alt="Thread & Pixel"
          className="h-10 w-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="w-48 h-[3px] bg-border overflow-hidden">
          <motion.div
            className="h-full bg-[#1D4FD8] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
