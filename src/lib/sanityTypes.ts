export interface StatItem {
  number: string;
  label: string;
}

export interface HeroSection {
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  description: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  stats: StatItem[];
  backgroundImage?: string;
}

export interface AboutCard {
  title: string;
  description: string;
}

export interface AboutSection {
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  description: string;
  descriptionSecondary: string;
  cards: AboutCard[];
}

export interface ServiceItem {
  icon: string;
  title: string;
  desc: string;
}

export interface SanityImageAsset {
  url?: string;
}

export interface SanityImageRef {
  asset?: SanityImageAsset;
}

export interface PartnerItem {
  name: string;
  logo?: SanityImageRef | string | null;
  website?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address?: string;
  description?: string;
}

export interface FooterLinkItem {
  label: string;
  url: string;
}

export interface FooterNavSection {
  title: string;
  items: FooterLinkItem[];
}

export interface FooterSection {
  companyDescription: string;
  linkedinUrl?: string;
  navSections: FooterNavSection[];
  copyrightText: string;
  brandedTagline: string;
}

export interface SeoSection {
  title: string;
  description: string;
  ogImage?: unknown;
}

export interface ProjectItem {
  title: string;
  description: string;
  image?: unknown;
  url?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  photo?: unknown;
  linkedIn?: string;
}

export interface HomePageContent {
  hero: HeroSection;
  about: AboutSection;
  services: ServiceItem[];
  partners: PartnerItem[];
  projects: ProjectItem[];
  team: TeamMember[];
  contactInfo: ContactInfo;
  footer: FooterSection;
  seo: SeoSection;
}
