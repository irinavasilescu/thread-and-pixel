import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">Let's talk</p>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">
            Ready to craft
            <br />
            something <span className="text-primary">extraordinary</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12 font-light">
            Tell us about your project and let's explore how we can bring your vision to life.
          </p>

          <motion.a
            href="mailto:hello@threadandpixel.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 font-mono text-sm tracking-wider uppercase px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 rounded-sm"
          >
            Start a conversation
            <ArrowUpRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
