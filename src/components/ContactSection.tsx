import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FloatingPixels from "./FloatingPixels";

const ContactSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <FloatingPixels />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, hsl(210 25% 10%), hsl(210 20% 12%))",
      }} />
      <div className="absolute inset-0 grid-bg-dark opacity-10" />
      
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px]"
        style={{ background: "hsl(175 70% 40%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "hsl(175 70% 50%)" }}
        >
          {t("contactSection.label")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-light tracking-tight mb-8 text-white/90"
        >
          {t("contactSection.title1")}
          <br />
          {t("contactSection.title2")} <span style={{ color: "hsl(175 70% 50%)" }}>{t("contactSection.titleHighlight")}</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/50 text-lg max-w-xl mx-auto mb-12 font-light"
        >
          {t("contactSection.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 font-mono text-sm tracking-wider uppercase px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 rounded-sm"
          >
            {t("contactSection.cta")}
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
