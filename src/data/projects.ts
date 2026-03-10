export interface Project {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  clientExpectation: string;
  workDone: string[];
  brandColors: { name: string; hex: string }[];
  fonts: string[];
  keyElements: string[];
  screenshots: string[];
  technologies: string[];
}

export const projects: Project[] = [
  {
    slug: "aurora-wellness",
    title: "Aurora Wellness",
    category: "Website Design & Development",
    tagline: "A serene digital experience for a luxury wellness brand.",
    description:
      "Aurora Wellness needed a complete digital overhaul to match their premium in-person experience. We crafted an immersive website that blends calming aesthetics with intuitive booking functionality, resulting in a 40% increase in online reservations.",
    clientExpectation:
      "The client wanted a website that felt like stepping into their spa — tranquil, refined, and effortlessly navigable. They needed seamless booking integration and a design that conveyed luxury without excess.",
    workDone: [
      "Full brand identity refresh for digital presence",
      "Custom UI/UX design with micro-interactions",
      "Booking system integration with real-time availability",
      "Mobile-first responsive development",
      "SEO optimization for local search",
    ],
    brandColors: [
      { name: "Sage", hex: "#8FAE8B" },
      { name: "Cream", hex: "#F5F0E8" },
      { name: "Charcoal", hex: "#2D2D2D" },
      { name: "Gold Accent", hex: "#C9A96E" },
    ],
    fonts: ["Cormorant Garamond", "DM Sans"],
    keyElements: ["Organic shapes", "Soft gradients", "Generous whitespace", "Natural textures"],
    screenshots: [],
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Supabase"],
  },
  {
    slug: "neon-streetwear",
    title: "Neon Streetwear",
    category: "E-Commerce",
    tagline: "A bold e-commerce platform for an urban fashion brand.",
    description:
      "Neon Streetwear wanted to disrupt the online fashion space with a shopping experience as bold as their designs. We built a high-performance e-commerce platform with dynamic product showcases and seamless checkout, boosting conversion rates by 55%.",
    clientExpectation:
      "They needed a store that felt like a flagship retail experience — edgy, fast, and visually striking. Cart abandonment was a key concern they wanted addressed through UX improvements.",
    workDone: [
      "Custom e-commerce platform development",
      "Dynamic product filtering and search",
      "Stripe payment integration",
      "Inventory management dashboard",
      "Performance optimization achieving 95+ Lighthouse score",
    ],
    brandColors: [
      { name: "Electric Lime", hex: "#CCFF00" },
      { name: "Midnight", hex: "#0A0A0A" },
      { name: "Concrete", hex: "#B0B0B0" },
      { name: "Hot Pink", hex: "#FF2D7B" },
    ],
    fonts: ["Clash Display", "Space Mono"],
    keyElements: ["High-contrast typography", "Grid-breaking layouts", "Motion-heavy transitions", "Dark mode default"],
    screenshots: [],
    technologies: ["Next.js", "Stripe", "Sanity CMS", "Vercel"],
  },
  {
    slug: "terra-architecture",
    title: "Terra Architecture",
    category: "Web Design & SEO",
    tagline: "A portfolio that lets the architecture speak for itself.",
    description:
      "Terra Architecture required a digital portfolio that showcased their award-winning projects with the same precision they bring to their buildings. We delivered a minimalist, image-forward site that elevated their online presence and tripled organic traffic.",
    clientExpectation:
      "The firm wanted their projects to be the hero — no visual clutter, no distractions. They also needed improved search visibility for high-value commercial architecture keywords.",
    workDone: [
      "Minimalist portfolio design with fullscreen imagery",
      "Custom CMS for easy project management",
      "Comprehensive SEO strategy and implementation",
      "Image optimization and lazy loading",
      "Analytics dashboard setup",
    ],
    brandColors: [
      { name: "Warm White", hex: "#FAF7F2" },
      { name: "Graphite", hex: "#3A3A3A" },
      { name: "Terracotta", hex: "#C67A4B" },
      { name: "Slate", hex: "#6B7B8D" },
    ],
    fonts: ["Archivo", "Inter"],
    keyElements: ["Full-bleed photography", "Horizontal scroll galleries", "Subtle parallax", "Clean grid system"],
    screenshots: [],
    technologies: ["Astro", "Tailwind CSS", "Contentful", "Cloudflare"],
  },
  {
    slug: "pulse-fintech",
    title: "Pulse Fintech",
    category: "Consulting & Development",
    tagline: "Transforming complex finance into an intuitive digital product.",
    description:
      "Pulse Fintech approached us to reimagine their consumer-facing investment platform. Through strategic consulting and iterative development, we simplified a complex financial product into an approachable, trust-building experience.",
    clientExpectation:
      "They needed to make finance feel accessible to younger demographics while maintaining the credibility expected by institutional investors. Speed and security were non-negotiable.",
    workDone: [
      "Product strategy and user research",
      "Information architecture redesign",
      "Interactive data visualization dashboards",
      "Security audit and compliance implementation",
      "Ongoing support and feature development",
    ],
    brandColors: [
      { name: "Deep Blue", hex: "#1A2B5F" },
      { name: "Ice", hex: "#E8EDF5" },
      { name: "Emerald", hex: "#00C48C" },
      { name: "Coral Alert", hex: "#FF6B6B" },
    ],
    fonts: ["Plus Jakarta Sans", "IBM Plex Mono"],
    keyElements: ["Data-rich dashboards", "Trust-building UI patterns", "Micro-animations on interactions", "Accessibility-first design"],
    screenshots: [],
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
  },
];
