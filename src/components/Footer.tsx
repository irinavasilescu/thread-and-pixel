import { useTranslation } from "react-i18next";
import { Instagram } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border/50 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Thread<span className="text-primary">&</span>Pixel
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/thread.and.pixel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram size={16} strokeWidth={1.5} />
          </a>
          <p className="font-mono text-xs text-text-dim">
            © {new Date().getFullYear()} {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
