import { motion, useInView } from "framer-motion";
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

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">What we do</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-background p-10 hover:bg-surface transition-colors duration-500 cursor-default"
            >
              <service.icon
                size={24}
                strokeWidth={1.5}
                className="text-primary mb-6 group-hover:scale-110 transition-transform duration-500"
              />
              <h3 className="text-lg font-medium mb-3 tracking-tight">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">{service.desc}</p>

              <div className="mt-6 h-px w-0 group-hover:w-full bg-primary/40 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
