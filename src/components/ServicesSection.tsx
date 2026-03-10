import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Globe, Search, ShoppingCart, MessageSquare, Palette, Wrench } from "lucide-react";

const services = [
  { icon: Globe, title: "Website Creation", desc: "Bespoke websites engineered for performance, built with cutting-edge technology." },
  { icon: Search, title: "SEO", desc: "Data-driven optimization strategies that put you at the top of search results." },
  { icon: ShoppingCart, title: "E-Commerce", desc: "Conversion-focused storefronts that turn visitors into loyal customers." },
  { icon: MessageSquare, title: "Consulting", desc: "Strategic digital guidance to align your online presence with business goals." },
  { icon: Palette, title: "Web Design", desc: "Striking visual identities and interfaces that captivate and convert." },
  { icon: Wrench, title: "Support & Maintenance", desc: "Continuous care ensuring your digital assets perform flawlessly." },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-background p-10 hover:bg-surface transition-colors duration-500 cursor-default border border-transparent hover:border-primary/10"
    >
      <service.icon
        size={24}
        strokeWidth={1.5}
        className="text-primary mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
      />
      <h3 className="text-lg font-medium mb-3 tracking-tight">{service.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed font-light">{service.desc}</p>
      <div className="mt-6 h-px w-0 group-hover:w-full bg-primary/30 transition-all duration-700" />
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
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
