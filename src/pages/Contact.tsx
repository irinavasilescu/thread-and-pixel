import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Clock } from "lucide-react";
import emailjs from "@emailjs/browser";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FloatingPixels from "@/components/FloatingPixels";

const ease = [0.22, 1, 0.36, 1] as const;

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@threadandpixel.com", href: "mailto:hello@threadandpixel.com" },
  { icon: MapPin, label: "Location", value: "Remote-first, Worldwide", href: null },
  { icon: Clock, label: "Response Time", value: "Within 24 hours", href: null },
];

const Contact = () => {
  const [formState, setFormState] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingPixels variant="dark" />
      <CustomCursor />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4"
          >
            Get in touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-6"
          >
            Let's build
            <br />
            something <span className="text-primary">great</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground font-light max-w-2xl"
          >
            Tell us about your project, your timeline, and your ambitions. We'll get back to you with ideas.
          </motion.p>
        </div>
      </section>

      <div className="glow-line" />

      {/* Contact Content */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
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
                <h3 className="text-2xl font-light mb-3">Message sent</h3>
                <p className="text-muted-foreground font-light">We'll be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-3 text-foreground font-light focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-3 text-foreground font-light focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-3 text-foreground font-light focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                      Service Interested In
                    </label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-3 text-foreground font-light focus:outline-none focus:border-primary transition-colors duration-300 cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      <option value="website-creation">Website Creation</option>
                      <option value="seo">SEO</option>
                      <option value="e-commerce">E-Commerce</option>
                      <option value="consulting">Consulting</option>
                      <option value="web-design">Web Design</option>
                      <option value="support-maintenance">Support & Maintenance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-light focus:outline-none focus:border-primary transition-colors duration-300 resize-none placeholder:text-muted-foreground/50"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 font-mono text-sm tracking-wider uppercase px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 rounded-sm mt-4"
                >
                  Send message <ArrowUpRight size={16} />
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
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

            <div className="border border-border/50 p-6 rounded-sm bg-surface">
              <p className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-3">Prefer email?</p>
              <a
                href="mailto:hello@threadandpixel.com"
                className="text-primary hover:underline font-light text-sm"
              >
                hello@threadandpixel.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
