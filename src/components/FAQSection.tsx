import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import WaveDecoration from "./WaveDecoration";
import FloatingPixels from "./FloatingPixels";

const faqs = [
  {
    q: "What is your typical project timeline?",
    a: "Most projects take 4–8 weeks depending on scope. A simple website can be delivered in 3–4 weeks, while complex e-commerce or custom platforms may take 8–12 weeks. We'll give you a clear timeline during our discovery phase.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Absolutely. Every project includes 30 days of post-launch support. Beyond that, we offer monthly maintenance plans covering security updates, performance monitoring, content changes, and feature additions.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "We work with modern frameworks like React, Next.js, and Angular for front-end, paired with Node.js, Go, or PHP for back-end. For e-commerce, we're experts in Shopify and WooCommerce. We always choose the best tool for the job.",
  },
  {
    q: "How does your pricing work?",
    a: "We offer project-based pricing with clear milestones and deliverables — no hourly surprises. After our discovery session, you'll receive a detailed proposal with transparent costs. We also offer flexible payment schedules.",
  },
  {
    q: "Can you work with our existing brand guidelines?",
    a: "Of course. We love working within established brand systems and extending them into digital. If you don't have brand guidelines yet, we can create them as part of our design process.",
  },
  {
    q: "What makes Thread & Pixel different from other agencies?",
    a: "We blend strategic thinking with obsessive attention to craft. Every pixel is intentional, every line of code is clean. We're small enough to care deeply, skilled enough to deliver at the highest level.",
  },
];

const FAQItem = ({ faq, index, isOpen, onToggle }: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-border/50"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-base md:text-lg font-medium tracking-tight pr-8 group-hover:text-primary transition-colors duration-300">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-muted-foreground font-light leading-relaxed text-sm md:text-base">
          {faq.a}
        </p>
      </motion.div>
    </motion.div>
  );
};

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Light background matching services */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, hsl(var(--background)), hsl(175 15% 96%), hsl(var(--background)))",
      }} />
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Decorative wave lines */}
      <WaveDecoration
        color="hsl(var(--primary) / 0.05)"
        className="bottom-10 left-0 right-0 h-[80px]"
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div className="mb-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4"
          >
            Common Questions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-light tracking-tight"
          >
            FAQ
          </motion.h2>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
