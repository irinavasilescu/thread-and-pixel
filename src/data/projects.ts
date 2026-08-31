import primeFinishShowcase from "@/assets/prime-finish-showcase.png.asset.json";
import primeFinishHero from "@/assets/prime-finish-hero.png.asset.json";
import primeFinishAbout from "@/assets/prime-finish-about_us.png.asset.json";
import primeFinishWhy from "@/assets/prime-finish-why_choose_us.png.asset.json";
import primeFinishHow from "@/assets/prime-finish-how_we_work.png.asset.json";
import primeFinishContact from "@/assets/prime-finish-contact.png.asset.json";
import croseteleIrinei1 from "@/assets/crosetele-irinei-1.png";
import croseteleIrinei2 from "@/assets/crosetele-irinei-2.png";
import croseteleIrinei3 from "@/assets/crosetele-irinei-3.png";
import croseteleIrinei4 from "@/assets/crosetele-irinei-4.png";
import terraArchitecture1 from "@/assets/terra-architecture-1.jpg";
import terraArchitecture2 from "@/assets/terra-architecture-2.jpg";
import terraArchitecture3 from "@/assets/terra-architecture-3.jpg";
import terraArchitecture4 from "@/assets/terra-architecture-4.jpg";
import pulseFintech1 from "@/assets/pulse-fintech-1.jpg";
import pulseFintech2 from "@/assets/pulse-fintech-2.jpg";
import pulseFintech3 from "@/assets/pulse-fintech-3.jpg";
import pulseFintech4 from "@/assets/pulse-fintech-4.jpg";

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
  previewImage: string;
}

export const projects: Project[] = [
  {
    slug: "prime-finish",
    title: "Prime Finish",
    category: "Website Design & Development",
    tagline: "A robust digital presence for an independent European contractor specializing in industrial, civil and naval construction.",
    description: "We designed a high-autority interface focusing on technical mastery. By utilizing industrial-grade imagery and a structured service hierarchy (Industrial, Civil, Naval), we positioned the brand as a premier partner for multifaceted infrastructure projects.",
    clientExpectation: "Prime Finish operates across complex sectors, from structural steelwork to ship repair. They needed a digital presence that moved away from general renovation and instead communicated their capacity for large-scale, high-stakes industrial projects and European-wide logistics.",
    workDone: [
      "Global industrial brand alignment",
      "High-performance technical UI/UX",
      "Service inquiry & lead generation system",
      "Multi-device performance engineering",
      "European-wide SEO & technical optimization",
      "Multi-lingual localization"
    ],
    brandColors: [
      { name: "Blaze Orange", hex: "#FF5E14" },
      { name: "Deep Navy", hex: "#01165B" },
      { name: "Charcoal", hex: "#565656" },
      { name: "Platinum", hex: "#F3F4F5" },
    ],
    fonts: ["Poppins"],
    keyElements: ["Geometric precision", "High-contrast industrial tones", "Structured hierarchy", "Utility-driven design"],
    screenshots: [
      primeFinishShowcase.url,
      primeFinishHero.url,
      primeFinishAbout.url,
      primeFinishWhy.url,
      primeFinishHow.url,
      primeFinishContact.url,
    ],
    technologies: ["Wordpress", "TranslatePress"],
    previewImage: primeFinishShowcase.url,
  },
  {
    slug: "crosetele-irinei",
    title: "Croșetele Irinei",
    category: "E-Commerce",
    tagline: "A bespoke e-commerce website for a sustainable, handmade crochet brand.",
    description: "Croșetele Irinei is a boutique brand centered on sustainability and the \"slow-made\" movement. The goal was to transition from a social-media-only sales model to a professional, high-performance digital storefront. We developed a platform that preserves the brand's identity, while delivering a modern shopping experience.",
    clientExpectation: "The brand needed to move away from the \"clutter\" of typical e-commerce. The primary challenge was balancing high-resolution imagery, essential for showing yarn textures, with high performance goals. Key objectives included reducing cart abandonment and creating a custom adoption flow for one-of-a-kind items.",
    workDone: [
      "Custom Shopify architecture",
      "Enhanced product discovery",
      "Seamless secure payments",
      "Bespoke commission portal",
      "Performance & SEO optimization",
    ],
    brandColors: [
      { name: "Cinnabar", hex: "#FE3636" },
      { name: "Pastel Petal", hex: "#F8C9D3" },
      { name: "Snow", hex: "#FFF8FB" },
      { name: "Graphite", hex: "#373436" },
    ],
    fonts: ["Rubik Mono One", "Rubik"],
    keyElements: ["Texture-first visual design", "Speed-to-cart optimization", "Intuitive navigation", "Custom commision funnel", "Mobile-optimized adoption experience", "Eco-friendly performance"],
    screenshots: [croseteleIrinei1, croseteleIrinei2, croseteleIrinei3, croseteleIrinei4],
    technologies: ["Shopify"],
    previewImage: croseteleIrinei1,
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
    screenshots: [terraArchitecture1, terraArchitecture2, terraArchitecture3, terraArchitecture4],
    technologies: ["Astro", "Tailwind CSS", "Contentful", "Cloudflare"],
    previewImage: terraArchitecture1,
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
    screenshots: [pulseFintech1, pulseFintech2, pulseFintech3, pulseFintech4],
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
    previewImage: pulseFintech1,
  },
];
