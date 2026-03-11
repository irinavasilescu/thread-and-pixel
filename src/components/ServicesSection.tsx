import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Globe, Search, ShoppingCart, MessageSquare, Palette, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import ServiceCardPixels from "./ServiceCardPixels";

const services = [
  { icon: Globe, title: "Website Creation", desc: "Bespoke websites engineered for performance, built with cutting-edge technology.", slug: "website-creation", accent: "175 70% 40%" },
  { icon: Search, title: "SEO", desc: "Data-driven optimization strategies that put you at the top of search results.", slug: "seo", accent: "45 90% 55%" },
  { icon: ShoppingCart, title: "E-Commerce", desc: "Conversion-focused storefronts that turn visitors into loyal customers.", slug: "e-commerce", accent: "280 60% 55%" },
  { icon: MessageSquare, title: "Consulting", desc: "Strategic digital guidance to align your online presence with business goals.", slug: "consulting", accent: "210 80% 55%" },
  { icon: Palette, title: "Web Design", desc: "Striking visual identities and interfaces that captivate and convert.", slug: "web-design", accent: "350 75% 55%" },
  { icon: Wrench, title: "Support & Maintenance", desc: "Continuous care ensuring your digital assets perform flawlessly.", slug: "support-maintenance", accent: "150 60% 40%" },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/services/${service.slug}`}
        className="group relative block p-10 h-full cursor-pointer overflow-hidden rounded-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered
            ? `linear-gradient(135deg, hsl(${service.accent} / 0.12), hsl(${service.accent} / 0.04))`
            : "hsl(var(--hero-bg))",
          border: `1px solid ${isHovered ? `hsl(${service.accent} / 0.3)` : "hsl(0 0% 100% / 0.08)"}`,
          transition: "all 0.5s ease",
        }}
      >
        {isHovered && <ServiceCardPixels />}
        <div className="relative z-10">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
            style={{
              background: `hsl(${service.accent} / 0.15)`,
            }}
          >
            <service.icon
              size={22}
              strokeWidth={1.5}
              style={{ color: `hsl(${service.accent})` }}
            />
          </div>
          <h3 className="text-lg font-medium mb-3 tracking-tight text-white/90 group-hover:text-white transition-colors">{service.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed font-light group-hover:text-white/65 transition-colors">{service.desc}</p>
          <div
            className="mt-6 h-px w-0 group-hover:w-full transition-all duration-700"
            style={{ background: `hsl(${service.accent} / 0.4)` }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-32 px-6 snap-section" ref={ref}>
      {/* Dark background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, hsl(var(--hero-bg)), hsl(210 25% 10%), hsl(var(--hero-bg)))",
      }} />
      <div className="absolute inset-0 grid-bg-dark" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4"
          >
            What we do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-light tracking-tight text-white/90"
          >
            Services
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
