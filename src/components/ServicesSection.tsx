import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Globe, Search, ShoppingCart, MessageSquare, Palette, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import ServiceCardPixels from "./ServiceCardPixels";

const services = [
  { icon: Globe, title: "Website Creation", desc: "Bespoke websites engineered for performance, built with cutting-edge technology.", slug: "website-creation" },
  { icon: Search, title: "SEO", desc: "Data-driven optimization strategies that put you at the top of search results.", slug: "seo" },
  { icon: ShoppingCart, title: "E-Commerce", desc: "Conversion-focused storefronts that turn visitors into loyal customers.", slug: "e-commerce" },
  { icon: MessageSquare, title: "Consulting", desc: "Strategic digital guidance to align your online presence with business goals.", slug: "consulting" },
  { icon: Palette, title: "Web Design", desc: "Striking visual identities and interfaces that captivate and convert.", slug: "web-design" },
  { icon: Wrench, title: "Support & Maintenance", desc: "Continuous care ensuring your digital assets perform flawlessly.", slug: "support-maintenance" },
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
        className="group relative block p-10 h-full cursor-pointer border border-border/30 hover:border-primary/20 transition-colors duration-500 overflow-hidden rounded-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered
            ? "hsl(175 40% 97%)"
            : "hsl(0 0% 100% / 0.6)",
          transition: "background 0.5s ease",
        }}
      >
        {isHovered && <ServiceCardPixels />}
        <div className="relative z-10">
          <service.icon
            size={24}
            strokeWidth={1.5}
            className="text-primary mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
          />
          <h3 className="text-lg font-medium mb-3 tracking-tight">{service.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed font-light">{service.desc}</p>
          <div className="mt-6 h-px w-0 group-hover:w-full bg-primary/30 transition-all duration-700" />
        </div>
      </Link>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="services" className="relative py-32 px-6 snap-section" ref={ref}>
      {/* Subtle warm tint */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, hsl(var(--background)), hsl(45 20% 97%), hsl(var(--background)))",
      }} />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div style={{ y: headerY }} className="mb-20">
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
            className="text-4xl md:text-5xl font-light tracking-tight"
          >
            Services
          </motion.h2>
        </motion.div>

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
