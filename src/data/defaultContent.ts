import heroImage from "../assets/hero-bg.jpg";
import type { HomePageContent } from "../lib/sanityTypes";

const partnerLogoModules = import.meta.glob("../assets/partner-logos/*.{svg,png,jpg,jpeg}", { eager: true }) as Record<string, { default: string }>;
const partnerLogos = Object.fromEntries(
  Object.entries(partnerLogoModules).map(([filePath, mod]) => [filePath.split("/").pop()!.toLowerCase(), mod.default]),
);

function findLogo(fileName: string) {
  const key = fileName.toLowerCase();
  if (partnerLogos[key]) return partnerLogos[key];
  return partnerLogos[Object.keys(partnerLogos).find((k) => k.replace(/\.[^.]+$/, "") === fileName.replace(/\.[^.]+$/, "").toLowerCase())!];
}

export const defaultHomeContent: HomePageContent = {
  hero: {
    eyebrow: "System Integration · Cloud · Cybersecurity",
    title: "Build the Next enterprise of tomorrow.",
    titleHighlight: "Next",
    description: "Partnex helps organizations design, deploy and operate secure, scalable and intelligent IT environments. We connect business ambition with the right technology to accelerate transformation and drive sustainable growth.",
    primaryCtaText: "Start a conversation",
    primaryCtaUrl: "#contact",
    secondaryCtaText: "Explore capabilities",
    secondaryCtaUrl: "#services",
    stats: [
      { number: "20+", label: "Technology partners" },
      { number: "12", label: "Industries served" },
      { number: "24/7", label: "Managed operations" },
      { number: "100%", label: "Customer commitment" },
    ],
    backgroundImage: heroImage,
  },
  about: {
    eyebrow: "Who we are",
    title: "A partner engineered for what comes next.",
    titleHighlight: "what comes next.",
    description: "Our name is a union of Partner and Next. We connect business objectives with the right technology — from cloud infrastructure and cybersecurity to modern workplace, data protection and managed services.",
    descriptionSecondary: "We combine proven experience with a customer-focused approach to deliver solutions that are effective, resilient and aligned with real business outcomes.",
    cards: [
      {
        title: "Our Vision",
        description: "To be the region's leading technology partner, empowering organizations to build a smarter, safer and more connected tomorrow.",
      },
      {
        title: "Our Mission",
        description: "Deliver innovative, reliable and future-ready solutions that help clients grow, operate efficiently and achieve their goals.",
      },
    ],
  },
  services: [
    { icon: "Cloud", title: "Cloud Solutions", desc: "Scalable cloud architectures that accelerate innovation, agility and time to value." },
    { icon: "ShieldCheck", title: "Cybersecurity", desc: "Advanced security programs that reduce risk and protect what matters most." },
    { icon: "DatabaseBackup", title: "Data Protection", desc: "Backup, disaster recovery and resilience engineered for continuity." },
    { icon: "Server", title: "Infrastructure", desc: "Modern infrastructure designed for performance, reliability and scale." },
    { icon: "Laptop", title: "Modern Workplace", desc: "Empowering teams to collaborate and work smarter from anywhere." },
    { icon: "Activity", title: "Managed Services", desc: "Proactive 24/7 monitoring, management and continuous optimization." },
    { icon: "Network", title: "Networking & Communication", desc: "High-performance connectivity that keeps your operations ahead." },
    { icon: "Compass", title: "Consulting & Advisory", desc: "Expert guidance aligning technology decisions with your business goals." },
  ],
  partners: [
    { name: "Microsoft", website: "https://www.microsoft.com", logo: findLogo("microsoft.svg") },
    { name: "Huawei Cloud", website: "https://www.huawei.com", logo: findLogo("huawei-cloud.svg") },
    { name: "Odoo", website: "https://www.odoo.com", logo: findLogo("odoo.svg") },
    { name: "VMware", website: "https://www.vmware.com", logo: findLogo("vmware.svg") },
    { name: "Fortinet", website: "https://www.fortinet.com", logo: findLogo("fortinet.svg") },
    { name: "Sophos", website: "https://www.sophos.com", logo: findLogo("sophos.jpg") },
    { name: "Kaspersky", website: "https://www.kaspersky.com", logo: findLogo("kaspersky.svg") },
    { name: "Veeam", website: "https://www.veeam.com", logo: findLogo("veeam.svg") },
    { name: "Commvault", website: "https://www.commvault.com", logo: findLogo("commvault.jpg") },
    { name: "Veritas", website: "https://www.veritas.com", logo: findLogo("veritas.svg") },
    { name: "Adobe", website: "https://www.adobe.com", logo: findLogo("adobe.jpg") },
    { name: "Autodesk", website: "https://www.autodesk.com", logo: findLogo("autodesk.svg") },
    { name: "HP", website: "https://www.hp.com", logo: findLogo("hp.svg") },
    { name: "Dell", website: "https://www.dell.com", logo: findLogo("dell.svg") },
    { name: "Lenovo", website: "https://www.lenovo.com", logo: findLogo("lenovo.svg") },
    { name: "Cisco", website: "https://www.cisco.com", logo: findLogo("cisco.svg") },
    { name: "Hikvision", website: "https://www.hikvision.com", logo: findLogo("hikvision.jpg") },
  ],
  projects: [],
  team: [],
  contactInfo: {
    email: "Info@partnex.net",
    phone: "01285454459",
    address: "",
    description: "Tell us about your goals. Our team will get back within one business day with a tailored response.",
  },
  footer: {
    companyDescription: "A next-generation technology partner helping organizations build secure, scalable and intelligent IT environments.",
    linkedinUrl: "#",
    navSections: [
      {
        title: "Company",
        items: [
          { label: "About", url: "#about" },
          { label: "Why Partnex", url: "#why" },
          { label: "Process", url: "#process" },
          { label: "Contact", url: "#contact" },
        ],
      },
      {
        title: "Capabilities",
        items: [
          { label: "Services", url: "#services" },
          { label: "Solutions", url: "#solutions" },
          { label: "Industries", url: "#industries" },
          { label: "Partners", url: "#partners" },
        ],
      },
      {
        title: "Contact",
        items: [
          { label: "Info@partnex.net", url: "mailto:Info@partnex.net" },
          { label: "01285454459", url: "tel:01285454459" },
        ],
      },
    ],
    copyrightText: "© 2026 Partnex. All rights reserved.",
    brandedTagline: "Build the Next.",
  },
  seo: {
    title: "Partnex | System Integration & Digital Solutions",
    description: "Partnex is a next-generation system integrator delivering secure, scalable and intelligent cloud, cybersecurity, data protection and managed services that power your next.",
    ogImage: undefined,
  },
};
