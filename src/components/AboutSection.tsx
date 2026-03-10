import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5+", label: "Years of Craft" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">About us</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
              Where thread
              <br />
              meets <span className="text-primary">pixel</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 font-light">
              We are a digital studio obsessed with the intersection of design and technology.
              Every project is a tapestry — threads of strategy, design, and code woven into
              seamless digital experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed font-light">
              From startups to established brands, we partner with visionaries who believe
              their digital presence should be as refined as their product.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="border border-border/50 p-8 rounded-sm hover:border-primary/30 transition-colors duration-500"
              >
                <span className="text-4xl md:text-5xl font-light text-gradient">{stat.value}</span>
                <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
