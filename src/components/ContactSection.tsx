import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-32 px-6 snap-section" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4"
        >
          Let's talk
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-light tracking-tight mb-8"
        >
          Ready to craft
          <br />
          something <span className="text-primary">extraordinary</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-lg max-w-xl mx-auto mb-12 font-light"
        >
          Tell us about your project and let's explore how we can bring your vision to life.
        </motion.p>

        <motion.a
          href="mailto:hello@threadandpixel.com"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 font-mono text-sm tracking-wider uppercase px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 rounded-sm"
        >
          Start a conversation
          <ArrowUpRight size={16} />
        </motion.a>
      </div>
    </section>
  );
};

export default ContactSection;
