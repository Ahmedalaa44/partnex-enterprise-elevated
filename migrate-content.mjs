import { createClient } from "@sanity/client";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const client = createClient({
  projectId: "tyse5kwx",
  dataset: "production",
  useCdn: false,
  apiVersion: "2026-07-01",
});

// Data extracted from website
const allDocuments = [
  // Hero Section
  {
    _type: "hero",
    eyebrow: "System Integration · Cloud · Cybersecurity",
    title: "Build the Next enterprise of tomorrow.",
    titleHighlight: "Next",
    description:
      "Partnex helps organizations design, deploy and operate secure, scalable and intelligent IT environments. We connect business ambition with the right technology to accelerate transformation and drive sustainable growth.",
    primaryCtaText: "Start a conversation",
    primaryCtaUrl: "#contact",
    secondaryCtaText: "Explore capabilities",
    secondaryCtaUrl: "#services",
    stats: [
      { label: "Technology partners", value: "20+" },
      { label: "Industries served", value: "12" },
      { label: "Managed operations", value: "24/7" },
      { label: "Customer commitment", value: "100%" },
    ],
  },
  // About Section
  {
    _type: "about",
    eyebrow: "WHO WE ARE",
    title: "A partner engineered for what comes next.",
    titleHighlight: "what comes next",
    description:
      "Our name is a union of Partner and Next. We connect business objectives with the right technology — from cloud infrastructure and cybersecurity to modern workplace, data protection and managed services.",
    descriptionSecondary:
      "We combine proven experience with a customer-focused approach to deliver solutions that are effective, resilient and aligned with real business outcomes.",
    cards: [
      {
        title: "Our Vision",
        description:
          "To be the region's leading technology partner, empowering organizations to build a smarter, safer and more connected tomorrow.",
      },
      {
        title: "Our Mission",
        description:
          "Deliver innovative, reliable and future-ready solutions that help clients grow, operate efficiently and achieve their goals.",
      },
    ],
  },
  // Services
  {
    _type: "service",
    title: "Cloud Solutions",
    desc: "Scalable cloud architectures that accelerate innovation, agility and time to value.",
    icon: "Cloud",
    order: 1,
  },
  {
    _type: "service",
    title: "Cybersecurity",
    desc: "Advanced security programs that reduce risk and protect what matters most.",
    icon: "ShieldCheck",
    order: 2,
  },
  {
    _type: "service",
    title: "Data Protection",
    desc: "Backup, disaster recovery and resilience engineered for continuity.",
    icon: "DatabaseBackup",
    order: 3,
  },
  {
    _type: "service",
    title: "Infrastructure",
    desc: "Modern infrastructure designed for performance, reliability and scale.",
    icon: "Server",
    order: 4,
  },
  {
    _type: "service",
    title: "Modern Workplace",
    desc: "Empowering teams to collaborate and work smarter from anywhere.",
    icon: "Laptop",
    order: 5,
  },
  {
    _type: "service",
    title: "Managed Services",
    desc: "Proactive 24/7 monitoring, management and continuous optimization.",
    icon: "Activity",
    order: 6,
  },
  {
    _type: "service",
    title: "Networking & Communication",
    desc: "High-performance connectivity that keeps your operations ahead.",
    icon: "Network",
    order: 7,
  },
  {
    _type: "service",
    title: "Consulting & Advisory",
    desc: "Expert guidance aligning technology decisions with your business goals.",
    icon: "Compass",
    order: 8,
  },
  // Partners
  { _type: "partner", name: "Microsoft", order: 1 },
  { _type: "partner", name: "Huawei Cloud", order: 2 },
  { _type: "partner", name: "Odoo", order: 3 },
  { _type: "partner", name: "VMware", order: 4 },
  { _type: "partner", name: "Fortinet", order: 5 },
  { _type: "partner", name: "Sophos", order: 6 },
  { _type: "partner", name: "Kaspersky", order: 7 },
  { _type: "partner", name: "Veeam", order: 8 },
  { _type: "partner", name: "Commvault", order: 9 },
  { _type: "partner", name: "Veritas", order: 10 },
  { _type: "partner", name: "Adobe", order: 11 },
  { _type: "partner", name: "Autodesk", order: 12 },
  { _type: "partner", name: "HP", order: 13 },
  { _type: "partner", name: "Dell", order: 14 },
  { _type: "partner", name: "Lenovo", order: 15 },
  { _type: "partner", name: "Cisco", order: 16 },
  { _type: "partner", name: "Hikvision", order: 17 },
  // Contact Info
  {
    _type: "contactInfo",
    email: "Info@partnex.net",
    phone: "01285454459",
    address: "Partnex",
    description:
      "A next-generation technology partner helping organizations build secure, scalable and intelligent IT environments.",
  },
  // Footer
  {
    _type: "footer",
    companyDescription:
      "Partnex\nA next-generation technology partner helping organizations build secure, scalable and intelligent IT environments.",
    linkedinUrl: "https://linkedin.com/company/partnex",
    navSections: [
      { title: "COMPANY", items: ["About", "Why Partnex", "Process", "Contact"] },
      { title: "CAPABILITIES", items: ["Services", "Solutions", "Industries", "Partners"] },
      { title: "CONTACT", items: ["Info@partnex.net", "01285454459"] },
    ],
    copyrightText: "© 2026 Partnex. All rights reserved.",
    brandedTagline: "Build the Next.",
  },
  // SEO
  {
    _type: "seo",
    title: "Partnex | System Integration & Digital Solutions",
    description:
      "Partnex helps organizations design, deploy and operate secure, scalable and intelligent IT environments.",
  },
];

async function migrate() {
  try {
    console.log("🚀 Starting content migration to Sanity...\n");

    for (const doc of allDocuments) {
      const docType = doc._type;
      const docTitle = doc.title || doc.name || docType;

      try {
        const created = await client.create(doc);
        console.log(`✅ ${docTitle} (${docType}) - ID: ${created._id}`);
      } catch (error) {
        if (error.statusCode === 409) {
          console.log(`⚠️  ${docTitle} already exists, skipping...`);
        } else {
          throw error;
        }
      }
    }

    console.log("\n✨ Migration completed successfully!");
    console.log("📊 Total documents created: " + allDocuments.length);
  } catch (error) {
    console.error("❌ Error during migration:", error.message);
    process.exit(1);
  }
}

migrate();
