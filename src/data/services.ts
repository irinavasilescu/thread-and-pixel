import { Globe, Search, ShoppingCart, MessageSquare, Palette, Wrench } from "lucide-react";

export interface ServiceDetail {
  slug: string;
  icon: typeof Globe;
  title: string;
  tagline: string;
  description: string;
  features: { title: string; description: string }[];
  process: string[];
  deliverables: string[];
}

export const servicesData: ServiceDetail[] = [
  {
    slug: "website-creation",
    icon: Globe,
    title: "Website Creation",
    tagline: "Bespoke websites engineered for performance and built to last.",
    description:
      "We don't build templates — we architect digital experiences. Every website we create is a custom-crafted solution designed around your brand, your audience, and your goals. From single-page portfolios to complex multi-language platforms, we deliver pixel-perfect results with clean, scalable code.",
    features: [
      { title: "Custom Development", description: "Hand-coded solutions tailored to your exact specifications — no cookie-cutter themes." },
      { title: "Responsive Design", description: "Flawless experiences across every device, from mobile to ultrawide displays." },
      { title: "Performance First", description: "Optimized load times with lazy loading, code splitting, and CDN delivery." },
      { title: "CMS Integration", description: "Easy content management so your team can update the site without touching code." },
    ],
    process: ["Discovery & Requirements", "Wireframing & Prototyping", "Visual Design", "Development & Testing", "Launch & Handoff"],
    deliverables: ["Fully responsive website", "Admin dashboard", "Documentation", "30-day post-launch support"],
  },
  {
    slug: "seo",
    icon: Search,
    title: "SEO",
    tagline: "Data-driven optimization that puts you at the top of search results.",
    description:
      "Visibility is everything. Our SEO strategies combine technical excellence with content intelligence to ensure your brand appears exactly where your audience is searching. We don't chase algorithms — we build sustainable organic growth.",
    features: [
      { title: "Technical SEO Audit", description: "Comprehensive analysis of site structure, speed, crawlability, and indexation." },
      { title: "Keyword Strategy", description: "Research-backed keyword mapping aligned with search intent and business objectives." },
      { title: "Content Optimization", description: "On-page optimization including meta tags, schema markup, and content structure." },
      { title: "Link Building", description: "Ethical, high-quality backlink strategies that build domain authority." },
    ],
    process: ["Site Audit", "Competitor Analysis", "Strategy Development", "Implementation", "Monitoring & Reporting"],
    deliverables: ["SEO audit report", "Keyword strategy document", "Monthly performance reports", "Optimization roadmap"],
  },
  {
    slug: "e-commerce",
    icon: ShoppingCart,
    title: "E-Commerce",
    tagline: "Conversion-focused storefronts that turn visitors into loyal customers.",
    description:
      "An online store should do more than display products — it should sell them. We build e-commerce experiences that reduce friction, build trust, and guide users from discovery to checkout with precision and delight.",
    features: [
      { title: "Custom Storefronts", description: "Unique shopping experiences that reflect your brand identity and product story." },
      { title: "Payment Integration", description: "Seamless checkout with Stripe, PayPal, and regional payment methods." },
      { title: "Inventory Management", description: "Real-time stock tracking, variant management, and automated alerts." },
      { title: "Analytics & CRO", description: "Conversion rate optimization through A/B testing, heatmaps, and funnel analysis." },
    ],
    process: ["Platform Selection", "UX Design & Flow Mapping", "Development & Integration", "Testing & QA", "Launch & Growth"],
    deliverables: ["Fully functional e-commerce platform", "Admin panel", "Payment setup", "Training documentation"],
  },
  {
    slug: "consulting",
    icon: MessageSquare,
    title: "Consulting",
    tagline: "Strategic digital guidance to align your online presence with business goals.",
    description:
      "Not every engagement starts with code. Sometimes you need a partner who can see the full picture — someone to audit what exists, identify opportunities, and chart the most efficient path forward. That's where our consulting practice shines.",
    features: [
      { title: "Digital Strategy", description: "Holistic assessment of your digital ecosystem with actionable recommendations." },
      { title: "Technology Audits", description: "Deep-dive evaluations of your current tech stack, performance, and security." },
      { title: "Product Roadmapping", description: "Prioritized feature planning based on user research and business impact." },
      { title: "Team Enablement", description: "Workshops and documentation to upskill your internal team." },
    ],
    process: ["Stakeholder Interviews", "Research & Analysis", "Strategy Formulation", "Presentation & Alignment", "Implementation Support"],
    deliverables: ["Strategy document", "Technical audit report", "Prioritized roadmap", "Workshop materials"],
  },
  {
    slug: "web-design",
    icon: Palette,
    title: "Web Design",
    tagline: "Striking visual identities and interfaces that captivate and convert.",
    description:
      "Design isn't decoration — it's communication. We create visual systems that tell your brand story, guide user behavior, and differentiate you from the noise. Every color, typeface, and interaction is intentional.",
    features: [
      { title: "Brand Identity", description: "Logo, color palette, typography, and visual language that define your brand." },
      { title: "UI/UX Design", description: "User-centered interface design with wireframes, prototypes, and usability testing." },
      { title: "Design Systems", description: "Scalable component libraries that ensure consistency across all touchpoints." },
      { title: "Motion Design", description: "Purposeful animations and micro-interactions that enhance the user experience." },
    ],
    process: ["Brand Discovery", "Moodboarding & Concepts", "Design Iteration", "Prototype & Testing", "Asset Delivery"],
    deliverables: ["Brand guidelines", "UI kit / design system", "Interactive prototypes", "Asset library"],
  },
  {
    slug: "support-maintenance",
    icon: Wrench,
    title: "Support & Maintenance",
    tagline: "Continuous care ensuring your digital assets perform flawlessly.",
    description:
      "A website launch is just the beginning. Technology evolves, content changes, and security threats emerge daily. Our support plans keep your digital presence running at peak performance so you can focus on your business.",
    features: [
      { title: "Uptime Monitoring", description: "24/7 monitoring with instant alerts and rapid incident response." },
      { title: "Security Updates", description: "Regular patching, vulnerability scanning, and security hardening." },
      { title: "Performance Tuning", description: "Ongoing optimization of speed, Core Web Vitals, and server resources." },
      { title: "Content Updates", description: "Regular content changes, feature additions, and design refinements." },
    ],
    process: ["Onboarding & Audit", "Monitoring Setup", "Scheduled Maintenance", "Issue Response", "Quarterly Reviews"],
    deliverables: ["Monthly status reports", "Uptime guarantees", "Priority support channel", "Quarterly performance reviews"],
  },
];
