import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const MarqueeBanner = ({
  speed = 25,
  reverse = false,
  className = "",
}: {
  speed?: number;
  reverse?: boolean;
  className?: string;
}) => {
  const { t } = useTranslation();
  const keywords = t("marquee.items", { returnObjects: true }) as string[];
  const items = [...keywords, ...keywords];

  return (
    <div className={`overflow-hidden py-5 ${className}`}>
      <motion.div
        className="flex whitespace-nowrap gap-0"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {items.map((word, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-mono text-sm md:text-base tracking-[0.15em] uppercase text-foreground px-6">
              {word}
            </span>
            <span className="w-1 h-1 bg-primary shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeBanner;
