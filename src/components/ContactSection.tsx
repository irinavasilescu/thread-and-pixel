import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="border-b border-border py-24 md:py-32 px-6">

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="border border-border bg-card px-8 py-14 md:px-16 md:py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-5">
                {t("contactSection.label")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.04em] text-card-foreground max-w-2xl">
                {t("contactSection.title1")} {t("contactSection.title2")} {t("contactSection.titleHighlight")}?
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed text-foreground">
                {t("contactSection.description")}
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-foreground px-8 py-4 text-sm font-medium tracking-wide text-background transition-colors duration-200 hover:bg-primary"
              >
                {t("contactSection.cta")}
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
