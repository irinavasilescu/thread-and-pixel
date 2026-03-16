import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const services = [
  { label: "Website Creation", slug: "website-creation" },
  { label: "SEO", slug: "seo" },
  { label: "E-Commerce", slug: "e-commerce" },
  { label: "Consulting", slug: "consulting" },
  { label: "Web Design", slug: "web-design" },
  { label: "Support & Maintenance", slug: "support-maintenance" },
];

const navItems = [
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Process", href: "/#process" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (isHome && href.startsWith("/#")) {
      const el = document.querySelector(href.replace("/", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/90 border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-mono text-sm tracking-widest uppercase text-foreground">
          Thread<span className="text-primary">&</span>Pixel
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {/* Services Dropdown */}
          <div ref={dropdownRef} className="relative">
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setServicesOpen(!servicesOpen)}
              className="font-mono text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1"
            >
              Services
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </motion.button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-3 w-56 bg-background/95 backdrop-blur-xl border border-border/50 rounded-sm shadow-xl overflow-hidden"
                >
                  {services.map((s, i) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      onClick={() => setServicesOpen(false)}
                      className="block px-5 py-3 font-mono text-xs tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 border-b border-border/20 last:border-0"
                    >
                      {s.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navItems.map((item, i) => {
            const isAnchor = item.href.startsWith("/#");
            return isHome && isAnchor ? (
              <motion.a
                key={item.label}
                href={item.href.replace("/", "")}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.4 }}
                className="font-mono text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </motion.a>
            ) : (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.4 }}
              >
                <Link
                  to={item.href}
                  className="font-mono text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/contact"
              className="font-mono text-xs tracking-wider uppercase px-4 py-2 border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 rounded-sm"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {/* Mobile Services Accordion */}
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="font-mono text-sm tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors flex items-center justify-between"
            >
              Services
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {mobileServicesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden pl-4 flex flex-col gap-3"
                >
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}
                      className="font-mono text-xs tracking-wider text-muted-foreground hover:text-primary transition-colors"
                    >
                      {s.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => handleNavClick(item.href)}
                className="font-mono text-sm tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="font-mono text-sm tracking-wider uppercase text-primary"
            >
              Get in touch
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
