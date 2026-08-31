import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.22, 1, 0.36, 1] as const;

const fieldClass =
  "w-full bg-transparent border border-border px-4 py-3.5 text-foreground text-sm focus:outline-none focus:border-foreground transition-colors duration-200 placeholder:text-muted-foreground/60";

const labelClass =
  "font-mono text-[10px] tracking-[0.24em] uppercase text-primary mb-3 block";

const Contact = () => {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const contactInfo = [
    { icon: Mail, label: t("contact.info.email.label"), value: t("contact.info.email.value"), href: `mailto:${t("contact.info.email.value")}` },
    { icon: MapPin, label: t("contact.info.location.label"), value: t("contact.info.location.value"), href: null },
    { icon: Clock, label: t("contact.info.response.label"), value: t("contact.info.response.value"), href: null },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const templateParams = {
        to_email: "contact@threadandpixel.eu",
        from_name: formState.name,
        from_email: formState.email,
        company: formState.company,
        service: formState.service,
        message: formState.message,
      };
      await Promise.all([
        emailjs.send("service_elow43a", "template_mtnuz8e", templateParams, "wibDA9Q-rf5Zrxd51"),
        emailjs.send("service_elow43a", "template_4je3rch", templateParams, "wibDA9Q-rf5Zrxd51"),
      ]);
      setSubmitted(true);
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const serviceKeys = ["website-creation", "seo", "e-commerce", "consulting", "web-design", "support-maintenance"];

  return (
    <div className="theme-swiss min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero — Swiss grid lockup */}
      <section className="border-b border-border px-6 pt-28 md:pt-32 pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto border-x border-border">
          <div className="border-b border-border px-6 md:px-10 py-5 flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary">
              {t("contact.label")}
            </span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              contact@threadandpixel.eu
            </span>
          </div>

          <div className="px-6 md:px-10 py-14 md:py-20">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[-0.04em] leading-[0.95]"
            >
              {t("contact.title1")}
              <br />
              {t("contact.title2")} <span className="text-primary">{t("contact.titleHighlight")}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground"
            >
              {t("contact.subtitle")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Form + info grid */}
      <section className="border-b border-border py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 border-t border-l border-border">
          <div className="lg:col-span-8 border-r border-b border-border p-8 md:p-12">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 md:py-24"
              >
                <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary">01 / 01</span>
                <h2 className="mt-6 text-3xl md:text-4xl font-bold tracking-[-0.03em] uppercase">
                  {t("contact.success.title")}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                  {t("contact.success.description")}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>{t("contact.form.name")} *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className={fieldClass}
                      placeholder={t("contact.form.namePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t("contact.form.email")} *</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className={fieldClass}
                      placeholder={t("contact.form.emailPlaceholder")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>{t("contact.form.company")}</label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className={fieldClass}
                      placeholder={t("contact.form.companyPlaceholder")}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t("contact.form.service")}</label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className={`${fieldClass} cursor-pointer`}
                    >
                      <option value="">{t("contact.form.servicePlaceholder")}</option>
                      {serviceKeys.map((slug) => (
                        <option key={slug} value={slug}>{t(`services.items.${slug}.title`)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>{t("contact.form.message")} *</label>
                  <textarea
                    required
                    rows={6}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className={`${fieldClass} resize-none`}
                    placeholder={t("contact.form.messagePlaceholder")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex items-center gap-3 bg-foreground px-10 py-4 font-mono text-xs uppercase tracking-[0.2em] text-background transition-colors duration-200 hover:bg-primary disabled:opacity-60"
                >
                  {sending ? t("contact.form.sending") : t("contact.form.send")}
                  <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-4 border-r border-b border-border">
            {contactInfo.map((item, i) => (
              <div
                key={item.label}
                className="border-b border-border last:border-b-0 p-8 md:p-10"
              >
                <div className="flex items-center gap-3">
                  <item.icon size={14} className="text-primary" strokeWidth={2} />
                  <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-primary">{item.label}</p>
                </div>
                {item.href ? (
                  <a href={item.href} className="mt-4 block text-base font-medium text-foreground hover:text-primary transition-colors break-words">
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-4 text-base font-medium text-foreground">{item.value}</p>
                )}
                <span className="mt-6 block font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
