import { motion } from "framer-motion";

const keywords = [
  "WEB DESIGN",
  "BRANDING",
  "E-COMMERCE",
  "SEO",
  "CONSULTING",
  "UI/UX",
  "DEVELOPMENT",
  "STRATEGY",
  "SUPPORT",
  "PERFORMANCE",
];

const MarqueeBanner = ({
  speed = 25,
  reverse = false,
  className = "",
}: {
  speed?: number;
  reverse?: boolean;
  className?: string;
}) => {
  const items = [...keywords, ...keywords]; // duplicate for seamless loop

  return (
    <div className={`overflow-hidden py-5 ${className}`}>
      <motion.div
        className="flex whitespace-nowrap gap-0"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {items.map((word, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-mono text-sm md:text-base tracking-[0.15em] uppercase text-foreground/70 px-6">
              {word}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeBanner;
