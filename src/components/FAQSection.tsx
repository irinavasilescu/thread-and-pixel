import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import AmbientAccents from "./AmbientAccents";

const FAQItem = ({ index, isOpen, onToggle }: {
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-8 py-6 text-left group"
      >
        <span className="text-base md:text-lg font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
          {t(`faq.items.${index}.q`)}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="mt-1 shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
        >
          <Plus size={18} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-7 pr-10 max-w-2xl leading-relaxed text-muted-foreground text-sm md:text-base">
          {t(`faq.items.${index}.a`)}
        </p>
      </motion.div>
    </div>
  );
};

const FAQSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqItems = t("faq.items", { returnObjects: true }) as { q: string; a: string }[];

  return (
    <section ref={ref} className="relative border-t border-border py-28 md:py-36 px-6 overflow-hidden">
      <AmbientAccents variant="right" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4"
        >
          <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-5">
            {t("faq.label")}
          </p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] text-foreground">
            {t("faq.title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="lg:col-span-8 border-t border-border"
        >
          {faqItems.map((_, i) => (
            <FAQItem
              key={i}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
