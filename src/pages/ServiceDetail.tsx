import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { servicesData } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FloatingPixels from "@/components/FloatingPixels";

const ease = [0.22, 1, 0.36, 1] as const;

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Service not found</h1>
          <Link to="/" className="text-primary font-mono text-sm uppercase tracking-wider hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navbar />

      {/* Hero - Dark creative hero */}
      <section className="relative min-h-[70vh] flex items-end pb-20 px-6 overflow-hidden" style={{
        background: "linear-gradient(135deg, hsl(210 25% 10%), hsl(200 20% 14%), hsl(175 25% 12%))",
      }}>
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <FloatingPixels />
        
        {/* Large glow */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{ background: "hsl(175 80% 50% / 0.15)" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link
              to="/#services"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-white/40 hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft size={14} /> All services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mb-8"
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{
              background: "hsl(175 70% 40% / 0.15)",
              border: "1px solid hsl(175 70% 40% / 0.2)",
            }}>
              <Icon size={36} strokeWidth={1} style={{ color: "hsl(175 70% 50%)" }} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 text-white/90"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-white/50 font-light max-w-3xl"
          >
            {service.tagline}
          </motion.p>
        </div>

        {/* Bottom fade to light */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* Description */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-lg md:text-xl text-foreground font-light leading-relaxed max-w-4xl"
          >
            {service.description}
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, hsl(var(--background)), hsl(175 15% 96%), hsl(var(--background)))",
        }} />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-3xl md:text-4xl font-light tracking-tight mb-16"
          >
            What's <span className="text-primary">included</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="group p-8 rounded-lg bg-background/80 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
                style={{ border: "1px solid hsl(var(--border) / 0.5)" }}
              >
                <h3 className="text-lg font-medium mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="glow-line" />

      {/* Process & Deliverables */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-8">Our Process</h2>
            <div className="space-y-0">
              {service.process.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                  className="flex items-center gap-4 py-5 border-b border-border/30 last:border-0"
                >
                  <span className="font-mono text-xs text-primary/60 w-6">0{i + 1}</span>
                  <p className="font-light">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-8">Deliverables</h2>
            <div className="space-y-4">
              {service.deliverables.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                  className="flex items-center gap-3 p-4 border border-border/50 rounded-sm"
                >
                  <CheckCircle2 size={16} className="text-primary shrink-0" strokeWidth={1.5} />
                  <p className="text-sm font-light">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 text-center overflow-hidden" style={{
        background: "linear-gradient(135deg, hsl(210 25% 11%), hsl(175 20% 13%))",
      }}>
        <div className="absolute inset-0 grid-bg-dark opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4 text-white/90">
            Ready to get started?
          </h2>
          <p className="text-white/50 font-light mb-10 max-w-xl mx-auto">
            Let's discuss how our {service.title.toLowerCase()} service can help elevate your brand.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 font-mono text-sm tracking-wider uppercase px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 rounded-sm"
          >
            Start a conversation <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
