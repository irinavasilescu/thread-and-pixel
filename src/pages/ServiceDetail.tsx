import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { servicesData } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import WaveDivider from "@/components/WaveDivider";
import WaveDecoration from "@/components/WaveDecoration";

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
  const accent = service.accent;

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navbar />

      {/* Hero — clean, accent-driven */}
      <section className="relative min-h-[70vh] flex items-end pb-20 px-6 overflow-hidden bg-background">
        {/* Accent glow orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[15%] w-[500px] h-[500px] rounded-full blur-[180px]"
          style={{ background: `hsl(${accent} / 0.2)` }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-[10%] w-[400px] h-[400px] rounded-full blur-[150px]"
          style={{ background: `hsl(${accent} / 0.15)` }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Decorative wave lines */}
        <WaveDecoration
          color={`hsl(${accent} / 0.1)`}
          className="top-[30%] left-0 right-0 h-[120px]"
        />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link
              to="/#services"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors mb-12"
            >
              <ArrowLeft size={14} /> All services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mb-8"
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{
              background: `hsl(${accent} / 0.12)`,
              border: `1px solid hsl(${accent} / 0.2)`,
            }}>
              <Icon size={36} strokeWidth={1} style={{ color: `hsl(${accent})` }} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-muted-foreground font-light max-w-3xl"
          >
            {service.tagline}
          </motion.p>
        </div>

        {/* Wave transition at bottom */}
        <div className="absolute -bottom-1 left-0 right-0 z-20">
          <WaveDivider fillColor="hsl(var(--background))" speed={8} />
        </div>
      </section>

      {/* Description */}
      <section className="py-24 px-6 relative overflow-hidden">
        <WaveDecoration
          color="hsl(var(--primary) / 0.04)"
          className="top-0 left-0 right-0 h-[60px]"
        />
        <div className="max-w-5xl mx-auto relative z-10">
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
      <section className="relative overflow-hidden">
        <WaveDivider fillColor="hsl(175 15% 96%)" speed={10} />
        <div className="relative py-24 px-6" style={{
          background: "linear-gradient(180deg, hsl(175 15% 96%), hsl(var(--background)))",
        }}>
          <div className="absolute inset-0 grid-bg opacity-20" />
          <WaveDecoration
            color={`hsl(${accent} / 0.06)`}
            className="bottom-8 left-0 right-0 h-[80px]"
          />
          <div className="relative z-10 max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="text-3xl md:text-4xl font-light tracking-tight mb-16"
            >
              What's <span style={{ color: `hsl(${accent})` }}>included</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  className="group p-8 rounded-lg bg-background/80 backdrop-blur-sm hover:shadow-lg transition-all duration-500"
                  style={{
                    border: "1px solid hsl(var(--border) / 0.5)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 32px hsl(${accent} / 0.1)`;
                    e.currentTarget.style.borderColor = `hsl(${accent} / 0.3)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "hsl(var(--border) / 0.5)";
                  }}
                >
                  <h3 className="text-lg font-medium mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process & Deliverables */}
      <section className="py-24 px-6 relative overflow-hidden">
        <WaveDecoration
          color="hsl(var(--primary) / 0.04)"
          className="top-16 left-0 right-0 h-[60px]"
        />
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase mb-8" style={{ color: `hsl(${accent})` }}>Our Process</h2>
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
                  <span className="font-mono text-xs w-6" style={{ color: `hsl(${accent} / 0.5)` }}>0{i + 1}</span>
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
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase mb-8" style={{ color: `hsl(${accent})` }}>Deliverables</h2>
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
                  <CheckCircle2 size={16} className="shrink-0" strokeWidth={1.5} style={{ color: `hsl(${accent})` }} />
                  <p className="text-sm font-light">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <WaveDivider fillColor="hsl(210 22% 12%)" speed={9} />
      <section className="relative py-24 px-6 text-center overflow-hidden" style={{
        background: "linear-gradient(180deg, hsl(210 22% 12%), hsl(175 20% 13%))",
      }}>
        <div className="absolute inset-0 grid-bg-dark opacity-20" />
        <WaveDecoration
          color="hsl(175 70% 50% / 0.08)"
          className="top-10 left-0 right-0 h-[80px]"
        />
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
            className="inline-flex items-center gap-3 font-mono text-sm tracking-wider uppercase px-10 py-4 text-white transition-colors duration-300 rounded-sm"
            style={{ background: `hsl(${accent})` }}
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
