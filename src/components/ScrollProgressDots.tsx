import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

const ScrollProgressDots = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let current = 0;
      sections.forEach((section, i) => {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPos) {
          current = i;
        }
      });
      setActiveIndex(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
      style={{ opacity }}
    >
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className="group relative flex items-center"
          aria-label={section.label}
        >
          {/* Tooltip */}
          <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-mono text-[10px] tracking-wider uppercase text-muted-foreground whitespace-nowrap">
            {section.label}
          </span>
          <motion.div
            className="rounded-full transition-all duration-300"
            animate={{
              width: activeIndex === i ? 10 : 6,
              height: activeIndex === i ? 10 : 6,
              backgroundColor: activeIndex === i ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.3)",
            }}
          />
        </button>
      ))}
    </motion.div>
  );
};

export default ScrollProgressDots;
