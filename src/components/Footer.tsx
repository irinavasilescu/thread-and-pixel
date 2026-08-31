const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Thread<span className="text-primary">&</span>Pixel
        </p>
        <p className="font-mono text-xs text-text-dim">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
