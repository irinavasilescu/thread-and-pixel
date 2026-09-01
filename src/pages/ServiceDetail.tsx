import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { servicesData } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.22, 1, 0.36, 1] as const;

const ServiceDetail = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="theme-swiss min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-[-0.03em] mb-4">{t("serviceDetail.notFound")}</h1>
          <Link to="/" className="font-mono text-xs uppercase tracking-[0.2em] text-primary hover:underline">
            {t("serviceDetail.backToHome")}
          </Link>
        </div>
      </div>
    );
  }

  const features = t(`services.items.${service.slug}.features`, { returnObjects: true }) as { title: string; description: string }[];
  const process = t(`services.items.${service.slug}.process`, { returnObjects: true }) as string[];
  const deliverables = t(`services.items.${service.slug}.deliverables`, { returnObjects: true }) as string[];

  return (
    <div className="theme-swiss min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero — Swiss grid lockup */}
      <section className="border-b border-border px-6 pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto border-x border-border">
          <div className="border-b border-border px-6 md:px-10 py-5 flex items-center justify-between">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Link
                to="/#services"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft size={14} /> {t("serviceDetail.allServices")}
              </Link>
            </motion.div>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary">
              {t("services.label")}
            </span>
          </div>

          <div className="px-6 md:px-10 py-14 md:py-20">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] uppercase leading-[0.95]"
            >
              {t(`services.items.${service.slug}.title`)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground"
            >
              {t(`services.items.${service.slug}.tagline`)}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="border-b border-border py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 font-mono text-[11px] tracking-[0.32em] uppercase text-primary"
          >
            {t(`services.items.${service.slug}.title`)}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8 text-xl md:text-2xl leading-relaxed text-foreground max-w-3xl"
          >
            {t(`services.items.${service.slug}.description`)}
          </motion.p>
        </div>
      </section>

      {/* What's included — bordered grid like landing services */}
      <section className="border-b border-border py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="pb-12 md:pb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-foreground leading-[0.95]">
              {t("serviceDetail.includedHighlight")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group border-r border-b border-border p-8 md:p-10 transition-colors duration-200 hover:bg-foreground hover:text-background"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-primary group-hover:text-background">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-lg md:text-xl font-bold tracking-[-0.02em]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-background/80">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process & deliverables — two-column structural grid */}
      <section className="border-b border-border py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 border-t border-l border-border">
          <div className="border-r border-b border-border">
            <div className="border-b border-border px-8 md:px-10 py-6">
              <h2 className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary">
                {t("serviceDetail.ourProcess")}
              </h2>
            </div>
            {process.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-5 px-8 md:px-10 py-6 border-b border-border last:border-b-0"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base text-foreground">{step}</p>
              </motion.div>
            ))}
          </div>

          <div className="border-r border-b border-border">
            <div className="border-b border-border px-8 md:px-10 py-6">
              <h2 className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary">
                {t("serviceDetail.deliverables")}
              </h2>
            </div>
            {deliverables.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-4 px-8 md:px-10 py-6 border-b border-border last:border-b-0"
              >
                <Check size={16} strokeWidth={2} className="shrink-0 text-primary" />
                <p className="text-base text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — high-contrast ink block */}
      <section className="bg-foreground text-background py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.95]">
              {t("serviceDetail.readyToStart")}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-background/70">
              {t("serviceDetail.ctaText", { service: t(`services.items.${service.slug}.title`).toLowerCase() })}
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase px-10 py-4 bg-primary text-primary-foreground transition-colors duration-200 hover:bg-background hover:text-foreground"
            >
              {t("serviceDetail.startConversation")} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
