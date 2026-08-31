import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingPixels from "@/components/FloatingPixels";

const ease = [0.22, 1, 0.36, 1] as const;

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
    <div className="min-h-screen bg-background relative">
      <FloatingPixels variant="dark" />
      <Navbar />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4"
          >
            {t("contact.label")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-6"
          >
            {t("contact.title1")}
            <br />
            {t("contact.title2")} <span className="text-primary">{t("contact.titleHighlight")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground font-light max-w-2xl"
          >
            {t("contact.subtitle")}
          </motion.p>
        </div>
      </section>

      <div className="glow-line" />

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <ArrowUpRight className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl font-light mb-3">{t("contact.success.title")}</h3>
                <p className="text-muted-foreground font-light">{t("contact.success.description")}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                      {t("contact.form.name")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-3 text-foreground font-light focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                      placeholder={t("contact.form.namePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                      {t("contact.form.email")} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-3 text-foreground font-light focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                      placeholder={t("contact.form.emailPlaceholder")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                      {t("contact.form.company")}
                    </label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-3 text-foreground font-light focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                      placeholder={t("contact.form.companyPlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                      {t("contact.form.service")}
                    </label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-3 text-foreground font-light focus:outline-none focus:border-primary transition-colors duration-300 cursor-pointer"
                    >
                      <option value="">{t("contact.form.servicePlaceholder")}</option>
                      {serviceKeys.map((slug) => (
                        <option key={slug} value={slug}>{t(`services.items.${slug}.title`)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                    {t("contact.form.message")} *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-light focus:outline-none focus:border-primary transition-colors duration-300 resize-none placeholder:text-muted-foreground/50"
                    placeholder={t("contact.form.messagePlaceholder")}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: sending ? 1 : 1.02 }}
                  whileTap={{ scale: sending ? 1 : 0.98 }}
                  className="inline-flex items-center gap-3 font-mono text-sm tracking-wider uppercase px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 rounded-sm mt-4 disabled:opacity-60"
                >
                  {sending ? t("contact.form.sending") : t("contact.form.send")} <ArrowUpRight size={16} />
                </motion.button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease }}
            className="lg:col-span-2 space-y-8"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="border border-border/50 p-6 rounded-sm hover:border-primary/30 transition-colors duration-500"
              >
                <item.icon size={18} className="text-primary mb-3" strokeWidth={1.5} />
                <p className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-foreground hover:text-primary transition-colors font-light">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-foreground font-light">{item.value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
