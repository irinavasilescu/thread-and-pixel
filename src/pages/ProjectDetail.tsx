import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const ease = [0.22, 1, 0.36, 1];

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Project not found</h1>
          <Link to="/" className="text-primary font-mono text-sm uppercase tracking-wider hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft size={14} /> Back to projects
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4"
          >
            {project.category}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-6"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-muted-foreground font-light max-w-3xl"
          >
            {project.tagline}
          </motion.p>
        </div>
      </section>

      {/* Brand Colors Strip */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.4, ease }}
        className="origin-left"
      >
        <div className="flex h-16">
          {project.brandColors.map((color) => (
            <div key={color.name} className="flex-1 relative group" style={{ backgroundColor: color.hex }}>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-mono text-xs tracking-wider px-2 py-1 bg-background/80 rounded-sm backdrop-blur-sm">
                  {color.name} — {color.hex}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Description */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-6">The Project</h2>
            <p className="text-foreground leading-relaxed font-light text-lg">{project.description}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-6">Client Expectations</h2>
            <p className="text-muted-foreground leading-relaxed font-light">{project.clientExpectation}</p>
          </motion.div>
        </div>
      </section>

      <div className="glow-line" />

      {/* Brandbook */}
      <section className="py-24 px-6 bg-surface noise-bg">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-3xl md:text-4xl font-light tracking-tight mb-16"
          >
            Brand <span className="text-primary">Book</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Colors */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">Color Palette</h3>
              <div className="space-y-3">
                {project.brandColors.map((color) => (
                  <div key={color.name} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-sm border border-border/50 shadow-sm" style={{ backgroundColor: color.hex }} />
                    <div>
                      <p className="text-sm font-medium">{color.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">{color.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">Typography</h3>
              <div className="space-y-4">
                {project.fonts.map((font, i) => (
                  <div key={font} className="border border-border/50 p-5 rounded-sm">
                    <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-wider mb-2">
                      {i === 0 ? "Display" : "Body"}
                    </p>
                    <p className="text-2xl font-light">{font}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Key Elements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">Key Elements</h3>
              <div className="space-y-3">
                {project.keyElements.map((el) => (
                  <div key={el} className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <p className="text-sm font-light">{el}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="glow-line" />

      {/* Work Done */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-3xl md:text-4xl font-light tracking-tight mb-16"
          >
            What We <span className="text-primary">Delivered</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.workDone.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="flex items-start gap-4 p-6 border border-border/50 rounded-sm hover:border-primary/30 transition-colors duration-500"
              >
                <span className="font-mono text-xs text-primary mt-0.5">0{i + 1}</span>
                <p className="font-light">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">Technologies Used</p>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs tracking-wider uppercase px-5 py-2.5 border border-border/50 rounded-sm hover:border-primary/30 hover:text-primary transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-muted-foreground font-light mb-6">Interested in a similar project?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 font-mono text-sm tracking-wider uppercase px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 rounded-sm"
          >
            Start a conversation <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
