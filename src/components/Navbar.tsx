import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Process", href: "/#process" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-mono text-sm tracking-widest uppercase text-foreground">
          Thread<span className="text-primary">&</span>Pixel
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => {
            const isAnchor = item.href.startsWith("/#");
            return isHome && isAnchor ? (
              <motion.a
                key={item.label}
                href={item.href.replace("/", "")}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                className="font-mono text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </motion.a>
            ) : (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
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
