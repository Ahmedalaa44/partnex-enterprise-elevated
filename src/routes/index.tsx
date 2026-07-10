import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import heroImage from "../assets/hero-bg.jpg";
import { OptimizedImage } from "../components/OptimizedImage";
import { useSanityContent } from "../hooks/useSanityContent";
import {
  ArrowRight, ArrowUpRight, Check, Menu, X, Mail, Phone, MapPin, Linkedin,
  Building2, Landmark, Factory, HeartPulse, Hotel, Banknote, Plane, Briefcase,
  GraduationCap, Radio, Truck, Globe2, Sparkles, ShieldAlert, Zap, Handshake,
  Users, Target,
  type LucideIcon,
} from "lucide-react";
import { getIconByName } from "../lib/iconMapper";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "/favicon.svg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Partnex",
          slogan: "Build the Next",
          description:
            "Partnex is a next-generation system integrator delivering secure, scalable and intelligent enterprise technology solutions.",
          url: "/",
        }),
      },
    ],
  }),
  component: HomePage,
});

/* ---------------- Brand mark ---------------- */

function Mark({ className = "h-7 w-7" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      <img
        src="/favicon-.png"
        className={className}
        aria-hidden
        alt=""
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#0ea5e9" />
      <text x="12" y="16" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fill="#fff">P</text>
    </svg>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Mark className="h-8 w-8" />
      <span className="font-display text-xl font-semibold tracking-tight text-white">
        Partnex
      </span>
    </div>
  );
}

/* ---------------- Motion helpers ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function Reveal({
  children, delay = 0, className = "",
}: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={fadeUp}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow, title, description, align = "left",
}: {
  eyebrow: string; title: ReactNode; description?: string; align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-5 text-4xl font-semibold tracking-tight text-gradient-fade sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{description}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- Data (Hardcoded fallbacks, overridden by Sanity) ----------- */

// Services now loaded from Sanity via useSanityContent hook
// See src/data/defaultContent.ts for fallback services array

// Partner logos now loaded from Sanity via useSanityContent hook

const partnerLogoModules = import.meta.glob("../assets/partner-logos/*.{svg,png,jpg,jpeg}", { eager: true }) as Record<string, { default: string }>;
const partnerLogos: Record<string, string> = Object.fromEntries(
  Object.entries(partnerLogoModules).map(([filePath, mod]) => [filePath.split("/").pop()!.toLowerCase(), (mod as any).default]),
);

function findLogoForFile(fileName: string) {
  const exact = partnerLogos[fileName.toLowerCase()];
  if (exact) return exact;
  const base = fileName.replace(/\.[^.]+$/, "").toLowerCase();
  const key = Object.keys(partnerLogos).find((k) => k.replace(/\.[^.]+$/, "") === base);
  return key ? partnerLogos[key] : "";
}
const industries = [
  { icon: Landmark, name: "Government", desc: "Enabling digital transformation and secure public services." },
  { icon: Building2, name: "Real Estate", desc: "Powering smart infrastructure and seamless operations." },
  { icon: Factory, name: "Oil & Gas", desc: "Reliable, secure and scalable solutions for critical operations." },
  { icon: HeartPulse, name: "Healthcare", desc: "Secure, intelligent healthcare technology for better outcomes." },
  { icon: Hotel, name: "Hospitality", desc: "Elevating guest experiences with innovative technology." },
  { icon: Banknote, name: "Finance & Banking", desc: "Strengthening security, compliance and performance." },
  { icon: Plane, name: "Aviation", desc: "Efficiency, safety and connectivity in a fast-moving industry." },
  { icon: Briefcase, name: "Corporate", desc: "Optimizing operations and driving growth through technology." },
  { icon: GraduationCap, name: "Education", desc: "Empowering learning institutions with future-ready platforms." },
  { icon: Radio, name: "Telecom", desc: "Connectivity, agility and next-generation digital experiences." },
  { icon: Truck, name: "Transportation", desc: "Smarter, safer and more connected transport ecosystems." },
  { icon: Globe2, name: "Multinationals", desc: "Global-grade solutions delivered with local expertise." },
];

const whyPartnex = [
  { icon: ShieldAlert, title: "Secure & Reliable", desc: "Security, compliance and reliability are engineered into every engagement." },
  { icon: Target, title: "Measurable Impact", desc: "Solutions built to deliver efficiency, performance and tangible results." },
  { icon: Sparkles, title: "Innovation Driven", desc: "We leverage emerging technologies to future-proof your organization." },
  { icon: Users, title: "Expertise That Delivers", desc: "Certified professionals with deep, cross-domain technical mastery." },
  { icon: Handshake, title: "Trusted Partnerships", desc: "Strong alliances with the world's leading technology providers." },
  { icon: Zap, title: "Customer Centric", desc: "We listen, understand, and design solutions around real business needs." },
];

const process = [
  { n: "01", t: "Discover", d: "We understand your business, challenges and goals through in-depth consultation and current state review." },
  { n: "02", t: "Design", d: "We architect the right solution with the appropriate technology mix and a clear roadmap." },
  { n: "03", t: "Plan", d: "We build a clear execution plan covering resources, timelines and risk mitigation." },
  { n: "04", t: "Implement", d: "We deploy with precision — integration, configuration and rigorous quality assurance." },
  { n: "05", t: "Deliver", d: "We deliver on time with full performance testing and structured knowledge transfer." },
  { n: "06", t: "Enable", d: "We empower your teams with training, workshops and adoption support." },
  { n: "07", t: "Support", d: "Continuous support and proactive incident management for peace of mind." },
  { n: "08", t: "Optimize", d: "Ongoing optimization and an innovation roadmap that keeps you ahead." },
];

const faqs = [
  { q: "What does Partnex do?", a: "Partnex is a system integrator that designs, deploys and manages enterprise technology — spanning cloud, cybersecurity, data protection, infrastructure, modern workplace and managed services." },
  { q: "Which industries do you serve?", a: "We work with organizations across government, finance, healthcare, oil and gas, real estate, hospitality, aviation, telecom, transportation, education and multinational enterprises." },
  { q: "Are you certified with leading vendors?", a: "Yes. We hold active partnerships and certifications with Microsoft, Cisco, Fortinet, Veeam, VMware, Sophos, Huawei Cloud and other global technology leaders." },
  { q: "Do you offer 24/7 managed services?", a: "Yes. Our managed services team provides continuous monitoring, incident response and proactive optimization around the clock." },
  { q: "How do engagements typically start?", a: "Every engagement begins with a discovery session to understand your objectives, followed by a tailored solution design and a clear execution plan." },
];

/* ---------------- Sections ---------------- */

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const links = [
    { label: "Services", href: "#services", id: "services" },
    { label: "Solutions", href: "#solutions", id: "solutions" },
    { label: "Industries", href: "#industries", id: "industries" },
    { label: "Partners", href: "#partners", id: "partners" },
    { label: "Process", href: "#process", id: "process" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["top", ...links.map((link) => link.id)];
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-25% 0px -50% 0px", threshold: [0.2, 0.4, 0.6] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [links]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full border border-hairline px-4 py-2.5 shadow-[0_20px_70px_-35px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:px-6 ${scrolled ? "bg-background/80" : "bg-background/60"}`}>
        <a href="#top" className="flex items-center">
          <Logo />
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(({ label, href, id }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={href}
                href={href}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-all duration-300 ${isActive ? "bg-white/[0.09] text-white" : "text-muted-foreground hover:bg-white/[0.06] hover:text-white"}`}
              >
                {label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="group hidden items-center gap-1.5 rounded-full bg-white/[0.08] px-4 py-2 text-sm font-medium text-white ring-1 ring-inset ring-white/15 transition-all duration-300 hover:bg-white/[0.14] sm:inline-flex"
          >
            Talk to us <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            className="rounded-full border border-hairline bg-white/[0.04] p-2 text-white transition-colors hover:bg-white/[0.08] lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 max-w-7xl rounded-[1.5rem] border border-hairline bg-background/90 p-4 backdrop-blur-xl lg:hidden"
        >
          {links.map(({ label, href, id }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-3 py-2.5 text-sm transition-colors ${activeSection === id ? "bg-white/[0.08] text-white" : "text-muted-foreground hover:bg-white/[0.06] hover:text-white"}`}
            >
              {label}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-40 pb-32 sm:pt-48 sm:pb-40">
      <motion.div style={{ y, opacity }} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#7070E8] opacity-30 blur-[140px] animate-aurora" />
        <div className="absolute right-[10%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#C76CDD] opacity-25 blur-[120px] animate-float-slow" />
        <div className="absolute left-[5%] bottom-0 h-[380px] w-[380px] rounded-full bg-[#7070E8] opacity-20 blur-[120px]" />
      </motion.div>
      <div className="absolute inset-0 bg-cover bg-center opacity-[0.14]" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="absolute inset-0 grid-bg opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C76CDD] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C76CDD]" />
              </span>
              System Integration · Cloud · Cybersecurity
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[88px]">
              Build the{" "}
              <span className="relative inline-block">
                <span className="text-gradient-brand">Next</span>
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-brand"
                />
              </span>
              <br />
              enterprise of tomorrow.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Partnex helps organizations design, deploy and operate secure, scalable and intelligent IT environments. We connect business ambition with the right technology to accelerate transformation and drive sustainable growth.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <motion.a
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-medium text-white shadow-glow"
              >
                <span className="relative z-10">Start a conversation</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </motion.a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/[0.08]"
              >
                Explore capabilities
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.35}>
          <div className="relative mx-auto mt-24 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-hairline bg-hairline sm:grid-cols-4">
            {[
              ["20+", "Technology partners"],
              ["12", "Industries served"],
              ["24/7", "Managed operations"],
              ["100%", "Customer commitment"],
            ].map(([n, l]) => (
              <div key={l} className="bg-background/80 p-6 backdrop-blur-sm sm:p-8">
                <div className="font-display text-3xl font-semibold text-gradient-brand sm:text-4xl">{n}</div>
                <div className="mt-1 text-sm text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Who we are"
              title={<>A partner engineered for <span className="text-gradient-brand">what comes next.</span></>}
            />
          </div>
          <div className="lg:col-span-7 lg:pt-20">
            <Reveal>
              <p className="text-xl leading-relaxed text-muted-foreground">
                Our name is a union of <span className="text-white">Partner</span> and{" "}
                <span className="text-white">Next</span>. We connect business objectives with the
                right technology — from cloud infrastructure and cybersecurity to modern workplace,
                data protection and managed services.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                We combine proven experience with a customer-focused approach to deliver solutions
                that are effective, resilient and aligned with real business outcomes.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                { t: "Our Vision", d: "To be the region's leading technology partner, empowering organizations to build a smarter, safer and more connected tomorrow." },
                { t: "Our Mission", d: "Deliver innovative, reliable and future-ready solutions that help clients grow, operate efficiently and achieve their goals." },
              ].map((x, i) => (
                <Reveal key={x.t} delay={0.15 + i * 0.08}>
                  <div className="group relative overflow-hidden rounded-2xl border border-hairline bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]">
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity group-hover:opacity-30" />
                    <div className="relative">
                      <div className="text-xs font-medium uppercase tracking-widest text-gradient-brand">{x.t}</div>
                      <p className="mt-3 text-white/90">{x.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IconTile({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-70" />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-hairline bg-linear-to-br from-white/[0.08] to-white/[0.02] shadow-inner">
        <Icon className="h-6 w-6 text-white" strokeWidth={1.6} />
      </div>
    </div>
  );
}

function ServicesSection() {
  const { data: content } = useSanityContent();
  const services = content.services || [];

  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Our services"
            title={<>Full-stack capabilities <br /> for the modern enterprise.</>}
          />
          <Reveal>
            <p className="max-w-md text-muted-foreground">
              Eight tightly integrated practice areas, delivered by certified specialists and
              aligned to your business outcomes.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const IconComponent = getIconByName(s.icon);
            return (
              <Reveal key={s.title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-hairline bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]">
                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#C76CDD]/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <IconTile Icon={IconComponent} />
                  <h3 className="mt-6 text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-white/70 transition-colors group-hover:text-white">
                    Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SolutionsSection() {
  const items = [
    { t: "Secure Cloud Foundations", d: "Landing zones, migrations and cloud-native platforms across Azure and Huawei Cloud.", tags: ["Azure", "Huawei Cloud", "Migration"] },
    { t: "Zero Trust Security", d: "Identity, endpoint and network security modernized around Zero Trust principles.", tags: ["Fortinet", "Sophos", "Kaspersky"] },
    { t: "Cyber Resilience", d: "Backup, disaster recovery and immutable data protection engineered for continuity.", tags: ["Veeam", "Acronis", "Commvault"] },
    { t: "Modern Workplace", d: "Microsoft 365, collaboration and endpoint modernization for hybrid teams.", tags: ["Microsoft 365", "Intune", "Teams"] },
  ];
  return (
    <section id="solutions" className="relative py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.25] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Solutions"
          title={<>Outcome driven solutions, <span className="text-gradient-brand">purpose built.</span></>}
          description="Reference architectures and integrated solutions that combine best-in-class platforms with Partnex engineering."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {items.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.06}>
              <div className="group relative overflow-hidden rounded-3xl border border-hairline bg-linear-to-br from-white/[0.04] to-white/[0.01] p-8 transition-all hover:from-white/[0.06]">
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold text-white">{s.t}</h3>
                    <ArrowUpRight className="h-5 w-5 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                  <p className="mt-3 max-w-md text-muted-foreground">{s.d}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map(t => (
                      <span key={t} className="rounded-full border border-hairline bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section id="industries" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Industries"
          title={<>Trusted across <span className="text-gradient-brand">every sector.</span></>}
          description="Tailored technology solutions that address the unique challenges of each industry and deliver meaningful outcomes."
        />
        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.03}>
              <div className="group relative flex h-full items-start gap-4 rounded-2xl border border-hairline bg-white/[0.02] p-5 transition-all hover:-translate-y-0.5 hover:bg-white/[0.04]">
                <IconTile Icon={s.icon} />
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-white">{s.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  const { data: content } = useSanityContent();
  const partners = content.partners || [];
  
  // Map partners with logos
  const partnersWithLogos = partners.map((partner) => {
    const logo = findLogoForFile(partner.logo?.asset?.url || partner.name);
    return { ...partner, logoUrl: logo };
  }).filter((partner) => partner.logoUrl);

  return (
    <section id="partners" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Our Partners
          </h2>
        </div>
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {partnersWithLogos.map((partner) => (
            <div
              key={partner.name}
              className="group flex w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-0.75rem)] xl:w-[calc(20%-0.8rem)] 2xl:w-[calc(16.666%-0.8rem)] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.65)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_80px_-40px_rgba(0,0,0,0.55)]">
              <div className="flex h-24 w-full items-center justify-center overflow-hidden rounded-3xl bg-background/70 p-4">
                <OptimizedImage
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="max-h-16 max-w-full object-contain"
                  lazy
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function WhySection() {
  return (
    <section id="why" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Why Partnex"
          title={<>Beyond technology. <br /> <span className="text-gradient-brand">Measurable value.</span></>}
          description="We build lasting partnerships grounded in outcomes, expertise and trust."
        />
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyPartnex.map((x, i) => (
            <Reveal key={x.title} delay={i * 0.05}>
              <div className="group h-full rounded-3xl border border-hairline bg-white/[0.02] p-7 transition-all hover:bg-white/[0.04]">
                <IconTile Icon={x.icon} />
                <h3 className="mt-6 text-lg font-semibold text-white">{x.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Our process"
          title={<>From insight to impact, <br /> <span className="text-gradient-brand">we build the next.</span></>}
          description="A proven approach that ensures agility, clarity and results at every step."
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.04}>
              <div className="group relative h-full bg-background p-7 transition-colors hover:bg-white/[0.03]">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-medium text-gradient-brand">{p.n}</span>
                  <div className="h-px w-10 bg-linear-to-r from-white/20 to-transparent" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBanner() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-hairline bg-linear-to-br from-white/[0.04] to-white/[0.01] p-10 sm:p-16">
          <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#7070E8] opacity-25 blur-[120px]" />
          <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-[#C76CDD] opacity-25 blur-[120px]" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h3 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                Certified expertise. <br />
                <span className="text-gradient-brand">Enterprise-grade delivery.</span>
              </h3>
              <p className="mt-5 max-w-md text-muted-foreground">
                Partnex teams combine deep technical mastery with a rigorous delivery methodology to
                move complex programs from concept to production.
              </p>
            </Reveal>
            <div className="grid grid-cols-2 gap-6">
              {[
                ["20+", "Global technology alliances"],
                ["12", "Industries served"],
                ["8", "Practice areas"],
                ["24/7", "Managed operations"],
              ].map(([n, l]) => (
                <Reveal key={l}>
                  <div>
                    <div className="font-display text-4xl font-semibold text-white sm:text-5xl">{n}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{l}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="FAQ"
              title={<>Questions, <span className="text-gradient-brand">answered.</span></>}
              description="Everything you need to know about working with Partnex. Have another question? We're here."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="divide-y divide-hairline overflow-hidden rounded-3xl border border-hairline bg-white/[0.02]">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <button
                    key={f.q}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start justify-between gap-6 p-6 transition-colors hover:bg-white/[0.02] sm:p-7">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-medium text-white sm:text-lg">{f.q}</h3>
                        <motion.div
                          initial={false}
                          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                        </motion.div>
                      </div>
                      <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline transition-transform ${isOpen ? "rotate-45 bg-gradient-brand" : ""}`}>
                        <span className="text-lg leading-none text-white">+</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title={
                <>
                  Let's <span className="text-gradient-brand">build the next</span> together.
                </>
              }
              description="Tell us about your goals. Our team will get back within one business day with a tailored response."
            />
            <div className="mt-10 space-y-4">
              {[
                { Icon: Mail, l: "Info@partnex.net" },
                { Icon: Phone, l: "01285454459" },
              ].map(({ Icon, l }) => (
                <div key={l} className="flex items-center gap-4 rounded-[1.1rem] border border-hairline bg-white/[0.025] p-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-white/[0.03]">
                    <Icon className="h-5 w-5 text-white" strokeWidth={1.6} />
                  </div>
                  <span className="text-white/90">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="relative border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A next-generation technology partner helping organizations build secure, scalable and
              intelligent IT environments.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#" aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-white/[0.03] transition-colors hover:bg-white/[0.08]">
                <Linkedin className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-7 sm:grid-cols-3">
            {[
              ["Company", ["About", "#about"], ["Why Partnex", "#why"], ["Process", "#process"], ["Contact", "#contact"]],
              ["Capabilities", ["Services", "#services"], ["Solutions", "#solutions"], ["Industries", "#industries"], ["Partners", "#partners"]],
              ["Contact", ["Info@partnex.net", "mailto:Info@partnex.net"], ["01285454459", "tel:01285454459"]],
            ].map(([title, ...links]) => (
              <div key={title as string}>
                <div className="text-xs font-semibold uppercase tracking-widest text-white">{title as string}</div>
                <ul className="mt-4 space-y-2.5">
                  {(links as [string, string][]).map(([l, h]) => (
                    <li key={l}>
                      <a href={h} className="text-sm text-muted-foreground transition-colors hover:text-white">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Partnex. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Build the Next.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */

function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen overflow-hidden bg-background text-foreground"
    >
      <Nav />
      <Hero />
      <AboutSection />
      <PartnersSection />
      <ServicesSection />
      <SolutionsSection />
      <IndustriesSection />
      <WhySection />
      <StatsBanner />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </motion.main>
  );
}
