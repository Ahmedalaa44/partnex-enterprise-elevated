import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'tyse5kwx',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need to set this
  apiVersion: '2026-07-01',
});

// Hero Section
const heroData = {
  _type: 'hero',
  eyebrow: 'System Integration · Cloud · Cybersecurity',
  title: 'Build the ',
  titleHighlight: 'Next',
  titleEnd: 'enterprise of tomorrow.',
  description: 'Partnex helps organizations design, deploy and operate secure, scalable and intelligent IT environments. We connect business ambition with the right technology to accelerate transformation and drive sustainable growth.',
  primaryCtaText: 'Start a conversation',
  primaryCtaUrl: '#contact',
  secondaryCtaText: 'Explore capabilities',
  secondaryCtaUrl: '#services',
  stats: [
    { label: 'Technology partners', value: '20+' },
    { label: 'Industries served', value: '12' },
    { label: 'Managed operations', value: '24/7' },
    { label: 'Customer commitment', value: '100%' },
  ],
};

// About Section
const aboutData = {
  _type: 'about',
  eyebrow: 'WHO WE ARE',
  title: 'A partner engineered for ',
  titleHighlight: 'what comes next.',
  description: 'Our name is a union of Partner and Next. We connect business objectives with the right technology — from cloud infrastructure and cybersecurity to modern workplace, data protection and managed services.',
  descriptionSecondary: 'We combine proven experience with a customer-focused approach to deliver solutions that are effective, resilient and aligned with real business outcomes.',
  cards: [
    {
      title: 'Our Vision',
      description: 'To be the region\'s leading technology partner, empowering organizations to build a smarter, safer and more connected tomorrow.',
    },
    {
      title: 'Our Mission',
      description: 'Deliver innovative, reliable and future-ready solutions that help clients grow, operate efficiently and achieve their goals.',
    },
  ],
};

// Services (8 items)
const servicesData = [
  {
    _type: 'service',
    title: 'Cloud Solutions',
    desc: 'Scalable cloud architectures that accelerate innovation, agility and time to value.',
    icon: 'Cloud',
    order: 1,
  },
  {
    _type: 'service',
    title: 'Cybersecurity',
    desc: 'Advanced security programs that reduce risk and protect what matters most.',
    icon: 'ShieldCheck',
    order: 2,
  },
  {
    _type: 'service',
    title: 'Data Protection',
    desc: 'Backup, disaster recovery and resilience engineered for continuity.',
    icon: 'DatabaseBackup',
    order: 3,
  },
  {
    _type: 'service',
    title: 'Infrastructure',
    desc: 'Modern infrastructure designed for performance, reliability and scale.',
    icon: 'Server',
    order: 4,
  },
  {
    _type: 'service',
    title: 'Modern Workplace',
    desc: 'Empowering teams to collaborate and work smarter from anywhere.',
    icon: 'Laptop',
    order: 5,
  },
  {
    _type: 'service',
    title: 'Managed Services',
    desc: 'Proactive 24/7 monitoring, management and continuous optimization.',
    icon: 'Activity',
    order: 6,
  },
  {
    _type: 'service',
    title: 'Networking & Communication',
    desc: 'High-performance connectivity that keeps your operations ahead.',
    icon: 'Network',
    order: 7,
  },
  {
    _type: 'service',
    title: 'Consulting & Advisory',
    desc: 'Expert guidance aligning technology decisions with your business goals.',
    icon: 'Compass',
    order: 8,
  },
];

// Partners (17 items)
const partnersData = [
  { _type: 'partner', name: 'Microsoft', order: 1 },
  { _type: 'partner', name: 'Huawei Cloud', order: 2 },
  { _type: 'partner', name: 'Odoo', order: 3 },
  { _type: 'partner', name: 'VMware', order: 4 },
  { _type: 'partner', name: 'Fortinet', order: 5 },
  { _type: 'partner', name: 'Sophos', order: 6 },
  { _type: 'partner', name: 'Kaspersky', order: 7 },
  { _type: 'partner', name: 'Veeam', order: 8 },
  { _type: 'partner', name: 'Commvault', order: 9 },
  { _type: 'partner', name: 'Veritas', order: 10 },
  { _type: 'partner', name: 'Adobe', order: 11 },
  { _type: 'partner', name: 'Autodesk', order: 12 },
  { _type: 'partner', name: 'HP', order: 13 },
  { _type: 'partner', name: 'Dell', order: 14 },
  { _type: 'partner', name: 'Lenovo', order: 15 },
  { _type: 'partner', name: 'Cisco', order: 16 },
  { _type: 'partner', name: 'Hikvision', order: 17 },
];

// Contact Info
const contactData = {
  _type: 'contactInfo',
  email: 'Info@partnex.net',
  phone: '01285454459',
  address: 'Partnex',
  description: 'A next-generation technology partner helping organizations build secure, scalable and intelligent IT environments.',
};

// Footer Section
const footerData = {
  _type: 'footer',
  companyDescription: 'Partnex\nA next-generation technology partner helping organizations build secure, scalable and intelligent IT environments.',
  linkedinUrl: 'https://linkedin.com/company/partnex',
  navSections: [
    {
      title: 'COMPANY',
      items: ['About', 'Why Partnex', 'Process', 'Contact'],
    },
    {
      title: 'CAPABILITIES',
      items: ['Services', 'Solutions', 'Industries', 'Partners'],
    },
    {
      title: 'CONTACT',
      items: ['Info@partnex.net', '01285454459'],
    },
  ],
  copyrightText: '© 2026 Partnex. All rights reserved.',
  brandedTagline: 'Build the Next.',
};

// SEO Section
const seoData = {
  _type: 'seo',
  title: 'Partnex | System Integration & Digital Solutions',
  description: 'Partnex helps organizations design, deploy and operate secure, scalable and intelligent IT environments.',
};

async function migrateContent() {
  try {
    console.log('🚀 Starting content migration...\n');

    // Create Hero Section
    console.log('📝 Creating Hero Section...');
    const hero = await client.create(heroData);
    console.log('✅ Hero Section created:', hero._id);

    // Create About Section
    console.log('📝 Creating About Section...');
    const about = await client.create(aboutData);
    console.log('✅ About Section created:', about._id);

    // Create Services
    console.log('📝 Creating Services...');
    for (const service of servicesData) {
      const created = await client.create(service);
      console.log(`  ✅ ${service.title}`);
    }

    // Create Partners
    console.log('📝 Creating Partners...');
    for (const partner of partnersData) {
      const created = await client.create(partner);
      console.log(`  ✅ ${partner.name}`);
    }

    // Create Contact Info
    console.log('📝 Creating Contact Info...');
    const contact = await client.create(contactData);
    console.log('✅ Contact Info created:', contact._id);

    // Create Footer
    console.log('📝 Creating Footer Section...');
    const footer = await client.create(footerData);
    console.log('✅ Footer Section created:', footer._id);

    // Create SEO
    console.log('📝 Creating SEO Metadata...');
    const seo = await client.create(seoData);
    console.log('✅ SEO Metadata created:', seo._id);

    console.log('\n✨ Content migration completed successfully!');
    console.log('All documents have been published to Sanity.');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migration
migrateContent();
