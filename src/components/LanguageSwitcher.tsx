import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("ro") ? "ro" : "en";

  const toggle = () => {
    i18n.changeLanguage(currentLang === "en" ? "ro" : "en");
  };

  return (
    <button
      onClick={toggle}
      className="font-mono text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1.5 px-2 py-1 border border-border/40 rounded-sm hover:border-primary/30"
      aria-label="Switch language"
    >
      <span className={currentLang === "en" ? "text-primary" : ""}>EN</span>
      <span className="text-border">/</span>
      <span className={currentLang === "ro" ? "text-primary" : ""}>RO</span>
    </button>
  );
};

export default LanguageSwitcher;
