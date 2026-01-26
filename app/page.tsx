"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "./components/Button";
import { ClientOnly } from "./components/ClientOnly";
import { Tooltip } from "./components/Tooltip";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sun,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Cloud,
  Server,
  Database,
  Layers,
  Gauge,
} from "lucide-react";
/**
 * ⚡ Modern Interactive Portfolio – Single-file React component
 * Framework target: Next.js (App Router) + Tailwind CSS + Framer Motion
 * Drop this component into /app/page.tsx in a Next.js project.
 * Tailwind: ensure `darkMode: 'class'` in tailwind.config.js and Inter/Poppins/Manrope fonts.
 * Icons: lucide-react. Animations: framer-motion. No external particle lib (custom lightweight particles below).
 * Dark is default; a toggle is included.
 *
 * IMPORTANT: Replace the RESUME_URL and GITHUB/LINKEDIN links with your real ones before shipping.
 */

// ✅ RESUME LINK (works locally & after deploy)
const RESUME_URL = "/laldasyash_Portfolio.pdf";
const GITHUB_URL = "https://github.com/YashKumarLalDas";
const LINKEDIN_URL = "http://www.linkedin.com/in/laldasyash";

// Utility: join class names
function cx(...c: (string | false | undefined | null)[]) {
  return c.filter(Boolean).join(" ");
}

// Global section wrapper with size presets
const Section: React.FC<{
  id: string;
  className?: string;
  size?: "hero" | "normal" | "compact";
  children: React.ReactNode;
}> = ({ id, className, size = "normal", children }) => {
  const spaces =
    size === "hero"
      ? "min-h-[60vh] pt-8 pb-8 md:pt-10 md:pb-12"   // reduced height and padding
      : size === "compact"
      ? "pt-6 pb-8 md:pt-8 md:pb-12"
      : "pt-10 pb-10 md:pt-12 md:pb-12";

  return (
    <section
      id={id}
      className={cx(
        "snap-start relative scroll-mt-[60px]",  // keep snapping but not full-screen, smooth scroll
        spaces,
        className
      )}
    >
      <div className="container mx-auto px-5 md:px-8 max-w-6xl w-full">
        {children}
      </div>
    </section>
  );
};

// Simple glass card
const GlassCard: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div
    className={cx(
      "backdrop-blur-xl bg-white/5 dark:bg-white/5 border border-white/10",
      "rounded-2xl shadow-[0_0_60px_-25px_rgba(0,180,216,0.5)]",
      className
    )}
  >
    {children}
  </div>
);

// Minimal particle background (GPU-friendly)
const ParticlesBG: React.FC = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random() * 0.4 + 0.2,
    }));

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      const { width: W, height: H } = canvas;
      // background gradient
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "rgba(14,22,40,0.9)");
      g.addColorStop(1, "rgba(6,12,24,0.9)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // glow dots + subtle links
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        const x = p.x * (W / dpr);
        const y = p.y * (H / dpr);
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,180,216,${p.a})`;
        ctx.shadowColor = "rgba(0,180,216,0.6)";
        ctx.shadowBlur = 8 * dpr;
        ctx.fill();
        ctx.shadowBlur = 0;
        // connect lines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = x - q.x * (W / dpr);
          const dy = y - q.y * (H / dpr);
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 85 * 85) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(q.x * (W / dpr), q.y * (H / dpr));
            ctx.strokeStyle = `rgba(0,180,216,${0.07})`;
            ctx.lineWidth = 1 * dpr;
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10 opacity-100"
      aria-hidden
    />
  );
};

// Scroll progress bar (top cyan line)
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 h-[3px] origin-left z-50 bg-cyan-400"
    />
  );
};

// Snap nav
const Nav: React.FC<{ theme: string; onToggle: () => void }> = ({ theme, onToggle }) => {
  const items = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40">
      <GlassCard className="px-4 py-2 flex items-center gap-2">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className="text-sm md:text-[0.95rem] text-gray-200 hover:text-white/90 px-3 py-1 rounded-full hover:bg-white/10 transition"
          >
            {it.label}
          </a>
        ))}
        <div className="ml-2 flex items-center gap-2 border-l border-white/10 pl-2">
          <a
            href="http://www.linkedin.com/in/laldasyash"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center justify-center rounded-full p-2 text-white hover:bg-white/10 transition"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://github.com/YashKumarLalDas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center justify-center rounded-full p-2 text-white hover:bg-white/10 transition"
          >
            <Github size={18} />
          </a>
        </div>
      </GlassCard>
    </nav>
  );
};

// Typewriter roles
const roles = [
  { text: "Cloud Engineer" },
  { text: "DevOps Engineer" },
  { text: "Site Reliability Engineer" },
  { text: "Infrastructure Automation Engineer" },
  { text: "Python Software Engineer" },
  { text: "Terraform & AWS Infrastructure Specialist" },
];

const useTypewriter = (items: { text: string }[], speed = 70, pause = 3000) => {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  useEffect(() => {
    const txt = items[index].text;
    const isDone = dir === 1 && sub === txt.length;
    const isGone = dir === -1 && sub === 0;
    const t = setTimeout(() => {
      if (isDone) {
        setDir(-1);
      } else if (isGone) {
        setDir(1);
        setIndex((i) => (i + 1) % items.length);
      } else {
        setSub((s) => s + dir);
      }
    }, isDone ? pause : speed);
    return () => clearTimeout(t);
  }, [items, index, sub, dir, speed, pause]);
  return items[index].text.slice(0, sub);
};

// RotatingRoles component
const RotatingRoles: React.FC = () => {
  const rolesList = [
    "Cloud Engineer",
    "DevOps Engineer",
    "Site Reliability Engineer",
    "Infrastructure Automation Engineer",
    "Python Software Engineer",
    "Terraform & AWS Infrastructure Specialist",
  ];
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (textRef.current) {
        textRef.current.textContent = rolesList[index];
        index = (index + 1) % rolesList.length;
      }
    }, 1500); // 1500ms interval

    return () => clearInterval(interval);
  }, []);

  return <span ref={textRef}>{rolesList[0]}</span>;
};

// ===== PROJECTS SECTION DATA =====
const projects = [
  {
    title: "AWS Serverless Activity Ingestion",
    description:
      "Serverless ingestion pipeline on AWS with fan-out writes to RDS (MySQL), DynamoDB, and S3; built for idempotency, observability, and least-privilege access.",
    link: "https://github.com/YashKumarLalDas/aws-serverless-activity-ingestion",
    additionalLink: {
      text: "AWS ARCHITECTURE Diagram",
      url: "https://github.com/YashKumarLalDas/aws-serverless-activity-ingestion/blob/main/docs/AWS%20SERVERLESS%20ACTIVITY%20INGESTION%20ARCHITECTURE.png"
    },
    tech: ["AWS Lambda", "Python", "RDS (MySQL)", "DynamoDB", "S3", "IAM", "VPC", "CloudWatch", "Serverless Architecture", "Event-Driven Design"]
  },
  {
    title: "Kubernetes Observability & Auto-Scaling Platform",
    description:
      "Kubernetes platform demonstrating metrics, dashboards, autoscaling, and self-healing validated via load tests and failure simulations.",
    link: "https://github.com/YashKumarLalDas/kubernetes-observability-reliability-platform",
    additionalLink: {
      text: "Prometheus Latency Graph",
      url: "https://github.com/YashKumarLalDas/kubernetes-observability-reliability-platform/blob/main/docs/03-prometheus-graph-latency.png"
    },
    tech: ["Kubernetes", "Docker", "Prometheus", "Grafana", "HPA", "Helm", "Linux", "Auto Scaling", "Metrics Monitoring", "Reliability Engineering"]
  },
  {
    title: "Secure AWS VPC 2-Tier Architecture",
    description:
      "Secure 2-tier VPC with public/private subnets, routing controls, and layered network security validated with reachability tests.",
    link: "https://github.com/YashKumarLalDas/VPC-Architecture-with-Public-and-Private-Subnets-2-Tier-Setup-",
    additionalLink: {
      text: "VPC Architecture Diagram",
      url: "https://raw.githubusercontent.com/YashKumarLalDas/VPC-Architecture-with-Public-and-Private-Subnets-2-Tier-Setup-/refs/heads/main/Screenshots/VPC%20INFRASTRUCTURE.png"
    },
    tech: ["VPC", "Subnets", "Route Tables", "IGW", "NAT", "Security Groups", "NACLs", "Network Isolation", "Secure Architecture"]
  },
  {
    title: "AI-Powered Project Planning Platform (PartyRock/Bedrock)",
    description:
      "AI-assisted workflow that generates structured project plans from user inputs with consistent formatting and validated sample outputs.",
    link: "https://github.com/YashKumarLalDas/projectflow-ai-pm",
    additionalLink: {
      text: "Live Demo",
      url: "https://partyrock.aws/u/YashKumar/E9mmmjXKi/ProjectFlow"
    },
    tech: ["Amazon Bedrock", "PartyRock", "Prompting", "Python", "GenAI Workflow"]
  },
  {
    title: "AWS S3 Static Website Hosting",
    description:
      "Static site hosted on S3 with CloudFront and Route 53; validated for availability and caching behavior with documented setup.",
    link: "https://github.com/YashKumarLalDas/AWS-S3-Static-Website-Hosting",
    additionalLink: {
      text: "Deployment Screenshot",
      url: "https://raw.githubusercontent.com/yashkumarunt/AWS-S3-Static-Website-Hosting/main/07-website-open.png"
    },
    tech: ["S3", "CloudFront", "Route 53", "IAM", "Static Hosting", "CDN (CloudFront)"]
  },
  {
    title: "Secure Windows EC2 Provisioning & RDP",
    description:
      "Hardened Windows EC2 provisioning with restricted RDP access and documented security controls for safe remote administration.",
    link: "https://github.com/YashKumarLalDas/aws-ec2-windows-rdp-lab",
    additionalLink: {
      text: "Windows Server Screenshot",
      url: "https://github.com/YashKumarLalDas/aws-ec2-windows-rdp-lab/blob/main/07-inside-windows-desktop.png"
    },
    tech: ["EC2", "Windows Server", "Security Groups", "IAM", "VPC", "Cloud Security", "Access Control"]
  },
];

// Skill groups
const skills: {
  group: string;
  items: { name: string; icon: React.ReactNode }[];
}[] = [
  {
    group: "Cloud & Infrastructure",
    items: [
      { name: "AWS (EC2, S3, VPC, Route 53, IAM)", icon: <Cloud className="w-4 h-4" /> },
      { name: "CloudFront", icon: <Cloud className="w-4 h-4" /> },
      { name: "Networking", icon: <Layers className="w-4 h-4" /> },
      { name: "DNS", icon: <Layers className="w-4 h-4" /> },
      { name: "Terraform (IaC)", icon: <Cpu className="w-4 h-4" /> },
      { name: "VPC Architecture", icon: <Layers className="w-4 h-4" /> },
      { name: "IAM Policies", icon: <Cloud className="w-4 h-4" /> },
      { name: "Network Security", icon: <Layers className="w-4 h-4" /> },
    ],
  },

  {
    group: "DevOps & Automation",
    items: [
      { name: "CI/CD (Jenkins, GitHub Actions)", icon: <Gauge className="w-4 h-4" /> },
      { name: "automation tooling", icon: <Terminal className="w-4 h-4" /> },
      { name: "repeatable deployments", icon: <Cpu className="w-4 h-4" /> },
      { name: "version control", icon: <Github className="w-4 h-4" /> },
      { name: "CI/CD Pipelines", icon: <Gauge className="w-4 h-4" /> },
      { name: "GitHub Actions", icon: <Github className="w-4 h-4" /> },
      { name: "Infrastructure Automation", icon: <Cpu className="w-4 h-4" /> },
    ],
  },

  {
    group: "Containers & Reliability",
    items: [
      { name: "Docker", icon: <Server className="w-4 h-4" /> },
      { name: "Kubernetes (EKS)", icon: <Layers className="w-4 h-4" /> },
      { name: "Helm", icon: <Gauge className="w-4 h-4" /> },
      { name: "autoscaling", icon: <Cloud className="w-4 h-4" /> },
      { name: "rolling updates", icon: <Terminal className="w-4 h-4" /> },
      { name: "deployment strategies", icon: <Cpu className="w-4 h-4" /> },
      { name: "High Availability", icon: <Server className="w-4 h-4" /> },
      { name: "Failure Recovery", icon: <ShieldCheck className="w-4 h-4" /> },
    ],
  },

  {
    group: "Observability & Operations",
    items: [
      { name: "CloudWatch", icon: <Gauge className="w-4 h-4" /> },
      { name: "Prometheus", icon: <Database className="w-4 h-4" /> },
      { name: "Grafana", icon: <Gauge className="w-4 h-4" /> },
      { name: "logging/alerting", icon: <Terminal className="w-4 h-4" /> },
      { name: "incident response", icon: <ShieldCheck className="w-4 h-4" /> },
      { name: "runbooks", icon: <Terminal className="w-4 h-4" /> },
      { name: "postmortems", icon: <Gauge className="w-4 h-4" /> },
      { name: "MTTR Reduction", icon: <Gauge className="w-4 h-4" /> },
      { name: "Alert Tuning", icon: <Terminal className="w-4 h-4" /> },
      { name: "SLA Monitoring", icon: <Gauge className="w-4 h-4" /> },
    ],
  },

  {
    group: "Software Engineering & Automation",
    items: [
      { name: "Python automation", icon: <Cpu className="w-4 h-4" /> },
      { name: "Bash scripting", icon: <Terminal className="w-4 h-4" /> },
      { name: "Git workflows", icon: <Github className="w-4 h-4" /> },
      { name: "production-grade tooling for operations and infrastructure", icon: <Server className="w-4 h-4" /> },
      { name: "Backend Automation", icon: <Cpu className="w-4 h-4" /> },
      { name: "Operational Tooling", icon: <Server className="w-4 h-4" /> },
    ],
  },
];

// Flip card
// --- DownArrowCTA (safe for SSR) ---
const DownArrowCTA: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false); // prevent SSR/client mismatch
  useEffect(() => setMounted(true), []);

  const goAbout = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="relative mt-10 flex items-center justify-center">
      <motion.button
        // IMPORTANT: don't animate from a different initial server value
        initial={false}
        whileHover={{ y: 4 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={goAbout}
        aria-label="Scroll to About section"
        className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md shadow-[0_0_30px_-10px_rgba(0,180,216,0.5)]"
      >
        <ChevronDown className="h-5 w-5 text-gray-100 group-hover:text-white" />
      </motion.button>

      {/* Tooltip: render only after mount to avoid hydration mismatch */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/60 px-3 py-1 text-xs text-gray-100"
          suppressHydrationWarning
        >
          Click to learn about me and my journey
        </motion.div>
      )}
    </div>
  );
};

const FlipCard: React.FC<{
  title: string;
  front: React.ReactNode;
  back: React.ReactNode;
}> = ({ title, front, back }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="[perspective:1200px] cursor-pointer"
      onClick={() => setFlipped((s) => !s)}
      onKeyDown={(e) => e.key === "Enter" && setFlipped((s) => !s)}
      role="button"
      tabIndex={0}
      aria-label={`${title} – click to flip`}
    >
      <div
        className={cx(
          "relative w-full h-full min-h-[220px] rounded-2xl transition-transform duration-500",
          "[transform-style:preserve-3d]",
          flipped ? "[transform:rotateY(180deg)]" : ""
        )}
      >
        <GlassCard
          className={cx(
            "absolute inset-0 p-5 md:p-6",
            "[backface-visibility:hidden]"
          )}
        >
          {front}
        </GlassCard>
        <GlassCard
          className={cx(
            "absolute inset-0 p-5 md:p-6 rotate-y-180",
            "[transform:rotateY(180deg)] [backface-visibility:hidden]"
          )}
        >
          {back}
        </GlassCard>
      </div>
    </div>
  );
};

// Strong, layered overlay for the hero background image
const HeroBgOverlay = () => (
  <motion.div
    className="absolute inset-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.2, ease: 'easeOut' }}
  >
    {/* background image layer */}
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        quality={85}
      />
    </div>
    {/* Stronger tint so text pops */}
    <div className="absolute inset-0 bg-[#0A0F1C]/60 backdrop-blur-[1px]" />
  </motion.div>
);

// Terminal Easter Egg
const TerminalOverlay: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [lines, setLines] = useState<string[]>([
    "portfolio> Press `help` to list commands",
  ]);
  const [cmd, setCmd] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) ref.current?.focus();
  }, [open]);

  const run = (c: string) => {
    const base = c.trim();
    const push = (s: string) => setLines((L) => [...L, s]);
    push(`portfolio> ${base}`);
    switch (base) {
      case "help":
        push("whoami – prints identity");
        push("aws services --list – sample AWS services");
        push("projects --open github – open GitHub");
        push("clear – clears screen");
        break;
      case "whoami":
        push("Yash Kumar Lal Das – Cloud/DevOps Engineer");
        break;
      case "aws services --list":
        push("EC2 S3 VPC IAM CloudWatch Lambda API-GW RDS DynamoDB Route53 ECR ECS EKS");
        break;
      case "projects --open github":
        window.open(GITHUB_URL, "_blank");
        push("Opening GitHub…");
        break;
      case "clear":
        setLines([]);
        break;
      default:
        push("Unknown command. Try `help`.");
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-xl border border-white/10 bg-[#0B1220] shadow-xl">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
          <div className="flex items-center gap-2 text-gray-200">
            <Terminal size={16} />
            <span className="text-sm">CLI Overlay</span>
          </div>
          <button
            className="text-gray-300 hover:text-white"
            onClick={onClose}
            aria-label="Close terminal"
          >
            ✕
          </button>
        </div>
        <div className="px-4 py-3 h-[360px] overflow-auto font-mono text-[13px] text-gray-200">
          {lines.map((l, i) => (
            <div key={i} className="leading-relaxed">
              {l}
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-white/10 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-sm">$</span>
          <input
            ref={ref}
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(cmd);
                setCmd("");
              }
            }}
            className="flex-1 bg-transparent outline-none text-gray-100 placeholder-gray-500"
            placeholder="Type a command (help)"
          />
        </div>
      </div>
    </div>
  );
};

// Projects display with show/hide toggle
const ProjectsDisplay: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        {displayedProjects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm hover:bg-white/10 transition"
          >
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">{p.title}</h3>
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">{p.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {p.tech.map((t, j) => (
                <span
                  key={j}
                  className="text-xs px-1.5 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 text-xs hover:underline"
              >
                View on GitHub →
              </a>
              <span className="text-gray-500 text-xs">|</span>
              <a
                href={p.additionalLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 text-xs hover:underline"
              >
                {p.additionalLink.text}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      {!showAll && projects.length > 4 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-5 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 hover:bg-cyan-500/30 transition text-sm font-medium"
          >
            Show More Projects ({projects.length - 4} more)
          </button>
        </div>
      )}
    </>
  );
};

export default function Portfolio() {
  // Accessibility: Skip to main content
  const skipToMain = (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md"
    >
      Skip to main content
    </a>
  );

  // Theme handling (default dark)
  const [theme, setTheme] = useState("dark");
  const [termOpen, setTermOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && (e.key === "t" || e.key === "T")) {
        setTermOpen((s) => !s);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      className={cx(
        "min-h-screen w-full text-gray-200",
        "bg-gradient-to-b from-[#0A0F1C] via-[#0B1220] to-[#0A0F1C]",
        "overflow-x-hidden",
        "snap-y snap-proximity",
        "pb-20 md:pb-24" // Added padding for footer
      )}
    >
      <ScrollProgress />
      <ParticlesBG />
      <Nav theme={theme} onToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />

      {/* HERO */}
      <Section id="home" size="hero" className="pt-24 md:pt-32 relative overflow-hidden">
        <HeroBgOverlay />
        <motion.div className="relative z-10 w-full">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-2 sm:gap-3">
            {/* Profile */}
            <div className="relative flex-shrink-0 mb-1">
              <Image
                src="/Profile Picture_Cropped.JPG"
                alt="Yash Kumar Lal Das"
                width={220}
                height={220}
                priority
                className="w-28 h-28 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-56 lg:h-56 rounded-full object-cover object-[50%_20%] border-2 border-white/20 shadow-[0_0_60px_-15px_rgba(0,180,216,0.6)]"
              />
              <div className="absolute -inset-3 sm:-inset-4 rounded-full blur-2xl bg-cyan-500/30 -z-10" />
            </div>

            {/* Centered hero text block */}
            <div className="w-full max-w-2xl rounded-2xl bg-black/20 backdrop-blur-sm ring-1 ring-white/10 p-2 sm:p-3 md:p-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              >
                Hi, I'm <span className="text-cyan-400">Yash</span>
              </motion.h1>

              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="mt-1 text-sm sm:text-base md:text-lg lg:text-xl font-mono text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
              >
                <RotatingRoles />
              </motion.div>

              <p className="mt-2 sm:mt-3 w-full max-w-xl mx-auto text-xs sm:text-sm md:text-base text-white font-semibold drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] leading-snug">
                I build and operate reliable cloud-native systems with automation, observability, and infrastructure as code. 3+ years in 24×7 production at TCS, plus hands-on systems and reporting work at UNT Libraries.
              </p>
            </div>

            <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full bg-cyan-500/20 border border-cyan-400/40 hover:bg-cyan-500/30 transition focus:outline-none focus:ring-2 focus:ring-cyan-400/50 whitespace-nowrap"
              >
                View Projects
                <ArrowRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition" />
              </a>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-cyan-400/50 whitespace-nowrap"
              >
                <Download size={14} className="sm:w-4 sm:h-4" />
                Resume
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-cyan-400/50 whitespace-nowrap"
              >
                Contact Me
                <ChevronDown size={14} className="sm:w-4 sm:h-4" />
              </a>
            </div>

            {/* Role Pills */}
            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
              {[
                "Software Engineer",
                "Python Developer",
                "Cloud Engineer (AWS)",
                "DevOps Engineer",
                "Site Reliability Engineer (SRE)",
                "Infrastructure Automation",
                "Terraform + AWS IaC",
                "Linux (Production)",
              ].map((role) => (
                <span key={role} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10">
                  {role}
                </span>
              ))}
            </div>

            <DownArrowCTA />
          </div>
        </motion.div>
      </Section>

      {/* ABOUT */}
      <Section id="about" size="compact" className="before:content-[''] before:absolute before:-top-8 before:left-0 before:right-0 before:h-8 before:bg-gradient-to-b before:from-transparent before:to-[#0A0F1C]/90">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-5">About</h2>
          <GlassCard className="p-4">
            <p className="text-gray-100 font-semibold text-sm leading-relaxed mb-3">
              I'm a Software Engineer with 3+ years of experience building and supporting production-grade systems using Python, cloud infrastructure, and DevOps practices.
            </p>
            <ul className="space-y-2 mb-3 text-gray-300 text-sm leading-snug">
              <li className="flex gap-2">
                <span className="text-cyan-400 flex-shrink-0 mt-0.5">•</span>
                <span>Supported 24×7 production systems for a global aviation client at TCS, triaging 150+ alerts/month, analyzing logs, and driving incident response in distributed Linux environments with ~98% SLA.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 flex-shrink-0 mt-0.5">•</span>
                <span>Built automation and reporting workflows at UNT Libraries using internal analytics tools, improving operational efficiency and data accuracy.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 flex-shrink-0 mt-0.5">•</span>
                <span>Developed hands-on engineering projects on GitHub including AWS serverless backends, Kubernetes observability platforms, and secure cloud architectures.</span>
              </li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              I'm seeking software engineering roles that combine backend development, cloud systems, and automation.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-sm text-cyan-400 font-semibold">Master of Science in Information Systems & Technologies</div>
                <div className="font-medium text-gray-100">University of North Texas</div>
                <div className="text-xs text-gray-400">Data Analyst · Denton, Texas, USA</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-sm text-cyan-400 font-semibold">Systems Engineer</div>
                <div className="font-medium text-gray-100">Tata Consultancy Services (TCS)</div>
                <div className="text-xs text-gray-400">24×7 Production Systems · Python Automation · Linux · Monitoring & Incident Response</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </Section>

      {/* ===== PROJECTS SECTION ===== */}
      <Section id="projects" size="normal">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold mb-6"
        >
          Projects
        </motion.h2>

        <ProjectsDisplay />
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" size="normal">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6">Experience</h2>

          {/* UNT Card */}
          <GlassCard className="p-4 mb-4">
            {/* Callout Box at Top */}
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-400/30 mb-3">
              <p className="text-cyan-200 text-sm">
                "Reduced manual processing effort by ~40% through automation, documentation, and standardized workflows."
              </p>
            </div>

            {/* Company & Details */}
            <h3 className="text-2xl font-bold mb-2">UNT — University of North Texas</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-1 text-gray-400 text-sm">
              <span>Data Analyst, Part-Time</span>
            </div>

            {/* Summary */}
            <p className="text-gray-300 mt-2 mb-3">
              Standardized reporting and data workflows for academic services with reliable, repeatable processes.
            </p>

            {/* Single Column Bullets */}
            <ul className="space-y-1.5 mb-3">
              {[
                "Automated reporting workflows using Excel + Ref Analytics, delivering 70+ reports/18 months and cutting turnaround ~40%.",
                "Produced 4 recurring reports/month by standardizing formats for 6 departments.",
                "Monitored web applications via Siteimprove, ensuring compliance and accessibility.",
                "Built dashboards tracking usage trends, improving visibility and reducing manual work.",
              ].map((t, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-2 text-sm text-gray-300"
                >
                  <span className="text-cyan-400 flex-shrink-0">•</span>
                  <span>{t}</span>
                </motion.li>
              ))}
            </ul>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
              {["Excel", "RefAnalytics", "Siteimprove", "DataWorkflows", "ReportingAutomation"].map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>

          {/* TCS Card */}
          <GlassCard className="p-4">
            {/* Callout Box at Top */}
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-400/30 mb-3">
              <p className="text-cyan-200 text-sm">
                "Improved incident response efficiency and system reliability by standardizing monitoring, automation, and operational procedures."
              </p>
            </div>

            {/* Company & Details */}
            <h3 className="text-2xl font-bold mb-2">TCS — Tata Consultancy Services</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-1 text-gray-400 text-sm">
              <span>Systems Engineer → Cloud & DevOps Engineer</span>
            </div>

            {/* Summary */}
            <p className="text-gray-300 mt-2 mb-3">
              Supported large-scale production systems focused on reliability and automation.
            </p>

            {/* Single Column Bullets */}
            <ul className="space-y-1.5 mb-3">
              {[
                "Supported 24×7 cloud production systems, maintaining ~98% SLA.",
                "Triaged 150+ alerts/month, reducing MTTR ~25%.",
                "Automated operational checks using Python, cutting investigation effort ~40%.",
                "Performed RCA documentation, contributing to ~15% fewer repeat issues.",
              ].map((t, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-2 text-sm text-gray-300"
                >
                  <span className="text-cyan-400 flex-shrink-0">•</span>
                  <span>{t}</span>
                </motion.li>
              ))}
            </ul>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
              {["AWS", "Python", "Linux", "IncidentResponse", "Observability", "RCA", "ProductionSupport"].map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" size="compact">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-3">Skills</h2>
          <div className="grid md:grid-cols-2 gap-2">
            {skills.map((g, i) => (
              <GlassCard key={i} className="p-2">
                <div className="text-xs text-gray-100 font-semibold mb-1.5 uppercase tracking-wide">{g.group}</div>
                <div className="flex flex-wrap gap-1">
                  {g.items.map((it) => (
                    <div key={it.name} className="group px-1.5 py-0.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition">
                      <div className="flex items-center gap-1 text-gray-300 text-xs">
                        <span className="opacity-80 group-hover:opacity-100 w-3 h-3">{it.icon}</span>
                        <span>{it.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" size="compact">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6">Contact</h2>
          <GlassCard className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3 text-gray-200 leading-relaxed">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Dallas, USA</div>
                <a href="mailto:laldasyash@gmail.com" className="flex items-center gap-2 hover:text-cyan-400 transition"><Mail className="w-4 h-4" /> laldasyash@gmail.com</a>
                <a href="tel:+19405971297" className="flex items-center gap-2 hover:text-cyan-400 transition"><Phone className="w-4 h-4" /> +1 9405971297</a>
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition"><Linkedin className="w-4 h-4" /> LinkedIn</a>
                <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition"><Github className="w-4 h-4" /> GitHub</a>
              </div>
              <div className="flex items-end md:items-center justify-center">
                <a
                  href={RESUME_URL}
                  download="Yash_Kumar_Lal_Das_Resume.pdf"
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/20 border border-cyan-400/40 hover:bg-cyan-500/30 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-6">© 2026 Yash Kumar Lal Das – Software Engineer | Cloud-Native & DevOps (Python)</div>
          </GlassCard>
        </motion.div>
      </Section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-[4.5rem] right-6 z-40 flex gap-3">
        {/* Back to Top Button with Tooltip */}
        <ClientOnly>
          <Tooltip text="Back to top">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-full p-3 bg-white/10 border border-white/20 hover:bg-white/20 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              aria-label="Back to top"
            >
              <ArrowUp />
            </button>
          </Tooltip>
        </ClientOnly>

        {/* Resume Download Button with Tooltip */}
        <ClientOnly>
          <Tooltip text="Download Resume">
            <a
              href={RESUME_URL}
              download="Yash_Kumar_Lal_Das_Resume.pdf"
              className="inline-block rounded-full p-3 bg-cyan-500/20 border border-cyan-400/40 hover:bg-cyan-500/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              aria-label="Download Resume"
            >
              <Download />
            </a>
          </Tooltip>
        </ClientOnly>
      </div>

      {/* Terminal overlay */}
      <TerminalOverlay open={termOpen} onClose={() => setTermOpen(false)} />

      {/* Sticky Footer with auto-hide */}
      <AutoHideFooter />
    </div>
  );
}

// Auto-hiding footer component
const AutoHideFooter = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > lastY && latest > 150) setVisible(false); // scrolling down
      else setVisible(true); // scrolling up
      setLastY(latest);
    });
  }, [lastY, scrollY]);

  return (
    <motion.footer
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : 100 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-white/10 bg-[#0A0F1C]/80 backdrop-blur-md shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.6)]"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-2 text-[13px] text-gray-300">
        <div className="flex items-center gap-3">
          <span>© {new Date().getFullYear()} Yash Kumar Lal Das</span>
          <span className="hidden md:inline text-gray-500">•</span>
          <button
            onClick={() => navigator.clipboard.writeText("laldasyash@gmail.com")}
            className="hover:text-cyan-400 transition"
            title="Click to copy email"
          >
            laldasyash@gmail.com 📋
          </button>
        </div>

        <div className="flex items-center gap-4 text-gray-500">
          <span>Updated {new Date().toLocaleDateString('en-US', { 
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timeZone: 'UTC'
          })}</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition"
          >
            <ArrowUp size={14} /> Top
          </button>
        </div>
      </div>
    </motion.footer>
  );
};

