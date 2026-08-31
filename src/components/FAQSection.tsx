import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import WaveDecoration from "./WaveDecoration";
import FloatingPixels from "./FloatingPixels";

const FAQItem = ({ index, isOpen, onToggle }: {
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-border/50"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-base md:text-lg font-medium tracking-tight pr-8 group-hover:text-primary transition-colors duration-300">
          {t(`faq.items.${index}.q`)}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-muted-foreground font-light leading-relaxed text-sm md:text-base">
          {t(`faq.items.${index}.a`)}
        </p>
      </motion.div>
    </motion.div>
  );
};

const FAQSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqItems = t("faq.items", { returnObjects: true }) as { q: string; a: string }[];

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <FloatingPixels />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, hsl(var(--background)), hsl(175 15% 96%), hsl(var(--background)))",
      }} />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <WaveDecoration
        color="hsl(var(--primary) / 0.05)"
        className="bottom-10 left-0 right-0 h-[80px]"
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div className="mb-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4"
          >
            {t("faq.label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-light tracking-tight"
          >
            {t("faq.title")}
          </motion.h2>
        </motion.div>

        <div>
          {faqItems.map((_, i) => (
            <FAQItem
              key={i}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
