import primeFinish1 from "@/assets/prime-finish-1.png.asset.json";
import primeFinish2 from "@/assets/prime-finish-2.png.asset.json";
import primeFinish3 from "@/assets/prime-finish-3.png.asset.json";
import primeFinish4 from "@/assets/prime-finish-4.png.asset.json";
import croseteleIrinei1 from "@/assets/crosetele-irinei-1.png.asset.json";
import croseteleIrinei2 from "@/assets/crosetele-irinei-2.png";
import croseteleIrinei3 from "@/assets/crosetele-irinei-3.png";
import croseteleIrinei4 from "@/assets/crosetele-irinei-4.png";
import tableTapMain from "@/assets/table-tap-1.png.asset.json";
import tableTap2 from "@/assets/table-tap-2.png.asset.json";
import tableTap3 from "@/assets/table-tap-3.png.asset.json";
import tableTap4 from "@/assets/table-tap-4.png.asset.json";
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
  year: string;
}

export const projects: Project[] = [
  {
    slug: "prime-finish",
    year: "2025",
    title: "Prime Finish",
    category: "Website Design & Development",
    tagline:
      "A robust digital presence for an independent European contractor specializing in industrial, civil and naval construction.",
    description:
      "We designed a high-autority interface focusing on technical mastery. By utilizing industrial-grade imagery and a structured service hierarchy (Industrial, Civil, Naval), we positioned the brand as a premier partner for multifaceted infrastructure projects.",
    clientExpectation:
      "Prime Finish operates across complex sectors, from structural steelwork to ship repair. They needed a digital presence that moved away from general renovation and instead communicated their capacity for large-scale, high-stakes industrial projects and European-wide logistics.",
    workDone: [
      "Global industrial brand alignment",
      "High-performance technical UI/UX",
      "Service inquiry & lead generation system",
      "Multi-device performance engineering",
      "European-wide SEO & technical optimization",
      "Multi-lingual localization",
    ],
    brandColors: [
      { name: "Blaze Orange", hex: "#FF5E14" },
      { name: "Deep Navy", hex: "#01165B" },
      { name: "Charcoal", hex: "#565656" },
      { name: "Platinum", hex: "#F3F4F5" },
    ],
    fonts: ["Poppins"],
    keyElements: [
      "Geometric precision",
      "High-contrast industrial tones",
      "Structured hierarchy",
      "Utility-driven design",
    ],
    screenshots: [primeFinish1.url, primeFinish2.url, primeFinish3.url, primeFinish4.url].map(
      (u) => `https://threadandpixel.lovable.app${u}`
    ),
    technologies: ["Wordpress", "TranslatePress", "Javascript", "HTML", "CSS"],
    previewImage: `https://threadandpixel.lovable.app${primeFinish1.url}`,
  },
  {
    slug: "crosetele-irinei",
    year: "2024",
    title: "Croșetele Irinei",
    category: "E-Commerce",
    tagline: "A bespoke e-commerce website for a sustainable, handmade crochet brand.",
    description:
      'Croșetele Irinei is a boutique brand centered on sustainability and the "slow-made" movement. The goal was to transition from a social-media-only sales model to a professional, high-performance digital storefront. We developed a platform that preserves the brand\'s identity, while delivering a modern shopping experience.',
    clientExpectation:
      'The brand needed to move away from the "clutter" of typical e-commerce. The primary challenge was balancing high-resolution imagery, essential for showing yarn textures, with high performance goals. Key objectives included reducing cart abandonment and creating a custom adoption flow for one-of-a-kind items.',
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
    keyElements: [
      "Texture-first visual design",
      "Speed-to-cart optimization",
      "Intuitive navigation",
      "Custom commision funnel",
      "Mobile-optimized adoption experience",
      "Eco-friendly performance",
    ],
    screenshots: [croseteleIrinei1.url, croseteleIrinei2, croseteleIrinei3, croseteleIrinei4],
    technologies: ["Shopify", "Javascript", "HTML", "CSS"],
    previewImage: croseteleIrinei1.url,
  },
  {
    slug: "table-tap",
    year: "2025",
    title: "Table Tap",
    category: "Queue Management & Guest Experience",
    tagline: "Eliminating physical queues with a smart, scan-to-wait digital ecosystem.",
    description: "We designed a high-efficiency waitlist interface that transforms the traditional 'waiting in line' experience. By replacing physical crowds with a virtual queue, we allow venues to manage guest flow seamlessly while giving customers the freedom to wait anywhere.",
    clientExpectation: "High-traffic venues were losing customers due to overcrowded entrances and long, visible queues. They needed a low-friction way for guests to check themselves in via QR code, track their position in real-time, and receive automated notifications without staff having to hover at the door.",
    "workDone": [
      "QR-based 'Scan-to-Join' virtual waitlist",
      "Real-time guest position tracking & live ETA",
      "Automated SMS & WhatsApp notification system",
      "Live management dashboard for queue orchestration",
      "Hardware-free check-in (BYOD - Bring Your Own Device)"
    ],
    brandColors: [
      { name: "Shadow Gray", hex: "#2E2321" },
      { name: "Ochre", hex: "#C5792C" },
      { name: "Seashell", hex: "#FFF7EF" },
      { name: "Desert Sand", hex: "#EDD28B" },
    ],
    fonts: ["DM Serif Display", "DM Sans"],
    keyElements: [
      "Virtual orchestration",
      "Frictionless check-in",
      "Real-time transparency",
      "Congestion relief"
    ],
    screenshots: [tableTapMain.url, tableTap2.url, tableTap3.url, tableTap4.url].map(
      (u) => `https://threadandpixel.lovable.app${u}`
    ),
    technologies: ["React", "Tailwind", "Node.js", "PostgreSQL"],
    previewImage: `https://threadandpixel.lovable.app${tableTapMain.url}`,
  },
  // {
  //   slug: "pulse-fintech",
  //   title: "Pulse Fintech",
  //   category: "Consulting & Development",
  //   tagline: "Transforming complex finance into an intuitive digital product.",
  //   description:
  //     "Pulse Fintech approached us to reimagine their consumer-facing investment platform. Through strategic consulting and iterative development, we simplified a complex financial product into an approachable, trust-building experience.",
  //   clientExpectation:
  //     "They needed to make finance feel accessible to younger demographics while maintaining the credibility expected by institutional investors. Speed and security were non-negotiable.",
  //   workDone: [
  //     "Product strategy and user research",
  //     "Information architecture redesign",
  //     "Interactive data visualization dashboards",
  //     "Security audit and compliance implementation",
  //     "Ongoing support and feature development",
  //   ],
  //   brandColors: [
  //     { name: "Deep Blue", hex: "#1A2B5F" },
  //     { name: "Ice", hex: "#E8EDF5" },
  //     { name: "Emerald", hex: "#00C48C" },
  //     { name: "Coral Alert", hex: "#FF6B6B" },
  //   ],
  //   fonts: ["Plus Jakarta Sans", "IBM Plex Mono"],
  //   keyElements: ["Data-rich dashboards", "Trust-building UI patterns", "Micro-animations on interactions", "Accessibility-first design"],
  //   screenshots: [pulseFintech1, pulseFintech2, pulseFintech3, pulseFintech4],
  //   technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
  //   previewImage: pulseFintech1,
  // },
];
