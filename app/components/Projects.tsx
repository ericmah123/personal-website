"use client";

import Image from "next/image";
import { useCallback } from "react";
import {
  SiPython,
  SiDatabricks,
  SiPostgresql,
  SiReact,
  SiNodedotjs,
  SiMysql,
  SiFlask,
  SiDjango,
  SiJavascript,
} from "react-icons/si";

/* ── Icon types ───────────────────────────────────────────────── */
type IconDef =
  | { kind: "si"; Icon: React.ComponentType<{ size?: number; color?: string }>; color: string; label: string }
  | { kind: "img"; src: string; label: string };

const ICONS: Record<string, IconDef> = {
  Python:     { kind: "si", Icon: SiPython,     color: "#3776ab", label: "Python" },
  Databricks: { kind: "si", Icon: SiDatabricks, color: "#e8a045", label: "Databricks" },
  SQL:        { kind: "si", Icon: SiPostgresql, color: "#336791", label: "SQL" },
  React:      { kind: "si", Icon: SiReact,      color: "#61dafb", label: "React" },
  "Node.js":  { kind: "si", Icon: SiNodedotjs,  color: "#339933", label: "Node.js" },
  MySQL:      { kind: "si", Icon: SiMysql,      color: "#4479a1", label: "MySQL" },
  Flask:      { kind: "si", Icon: SiFlask,      color: "#f5f5f5", label: "Flask" },
  Django:     { kind: "si", Icon: SiDjango,     color: "#44b78b", label: "Django" },
  JavaScript: { kind: "si", Icon: SiJavascript, color: "#f7df1e", label: "JavaScript" },
  "C#":       { kind: "img", src: "/Csharp_Logo.png",             label: "C#" },
};

function TechStack({ stack }: { stack: string[] }) {
  return (
    <div className="proj-tech-row">
      {stack.map((name) => {
        const def = ICONS[name];
        if (!def) return null;
        if (def.kind === "img") {
          return (
            <span key={name} className="proj-tech-icon" title={def.label}>
              <Image src={def.src} alt={def.label} width={28} height={28} className="object-contain" />
            </span>
          );
        }
        return (
          <span key={name} className="proj-tech-icon" title={def.label}>
            <def.Icon size={18} color={def.color} />
          </span>
        );
      })}
    </div>
  );
}

/* ── Laptop screen contents ───────────────────────────────────── */

function GridScreen() {
  return (
    <div className="laptop-grid-bg">
      <div className="laptop-grid-lines" />
      <div className="laptop-grid-glow" />
    </div>
  );
}

function CNScreen() {
  return (
    <div className="absolute inset-0 bg-white flex items-center justify-center">
      <div className="relative w-full h-full">
        <Image
          src="/030718-CN-CP-logos.jpg"
          alt="CN CP Rail logos"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

function StorefrontScreen() {
  return (
    <svg
      viewBox="0 0 320 180"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ display: "block" }}
    >
      {/* ── Background ── */}
      <rect width="320" height="180" fill="#0d0d0d" />

      {/* ── Top chrome bar ── */}
      <rect width="320" height="22" fill="#111111" />
      <line x1="0" y1="22" x2="320" y2="22" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
      {/* Window circles */}
      <circle cx="10" cy="11" r="3.5" fill="#e23838" opacity="0.9" />
      <circle cx="20" cy="11" r="3.5" fill="#e8a045" opacity="0.9" />
      <circle cx="30" cy="11" r="3.5" fill="#a3a3a3" opacity="0.4" />
      {/* Search bar */}
      <rect x="90" y="6" width="140" height="10" rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <text x="96" y="13" fontSize="5" fill="rgba(163,163,163,0.4)" fontFamily="monospace">Search data products...</text>
      {/* Avatar */}
      <circle cx="308" cy="11" r="6" fill="#222" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <line x1="304" y1="13" x2="312" y2="13" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round" />
      <line x1="305" y1="10" x2="311" y2="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round" />

      {/* ── Left sidebar ── */}
      <rect x="0" y="22" width="60" height="158" fill="#0f0f0f" />
      <line x1="60" y1="22" x2="60" y2="180" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

      {/* Dashboard (inactive) */}
      <circle cx="12" cy="34" r="3" fill="rgba(163,163,163,0.28)" />
      <rect x="20" y="32" width="26" height="2" rx="1" fill="rgba(163,163,163,0.32)" />
      <rect x="20" y="36" width="16" height="1.5" rx="0.75" fill="rgba(163,163,163,0.15)" />

      {/* Catalog (inactive) */}
      <circle cx="12" cy="54" r="3" fill="rgba(163,163,163,0.28)" />
      <rect x="20" y="52" width="24" height="2" rx="1" fill="rgba(163,163,163,0.32)" />
      <rect x="20" y="56" width="18" height="1.5" rx="0.75" fill="rgba(163,163,163,0.15)" />

      {/* Products (ACTIVE) */}
      <rect x="0" y="67" width="60" height="18" fill="rgba(226,56,56,0.10)" />
      <rect x="0" y="67" width="2.5" height="18" fill="#e23838" />
      <circle cx="13" cy="76" r="3" fill="rgba(226,56,56,0.45)" />
      <rect x="21" y="74" width="28" height="2" rx="1" fill="rgba(226,56,56,0.65)" />
      <rect x="21" y="78" width="16" height="1.5" rx="0.75" fill="rgba(226,56,56,0.32)" />

      {/* Requests (inactive) */}
      <circle cx="12" cy="96" r="3" fill="rgba(163,163,163,0.28)" />
      <rect x="20" y="94" width="30" height="2" rx="1" fill="rgba(163,163,163,0.32)" />
      <rect x="20" y="98" width="20" height="1.5" rx="0.75" fill="rgba(163,163,163,0.15)" />

      {/* Settings (inactive) */}
      <circle cx="12" cy="116" r="3" fill="rgba(163,163,163,0.28)" />
      <rect x="20" y="114" width="22" height="2" rx="1" fill="rgba(163,163,163,0.32)" />
      <rect x="20" y="118" width="14" height="1.5" rx="0.75" fill="rgba(163,163,163,0.15)" />

      {/* ── Main content area ── */}

      {/* Section label */}
      <text x="70" y="33" fontSize="6" fill="rgba(163,163,163,0.65)" fontFamily="monospace" letterSpacing="1" fontWeight="700">DATA PRODUCTS</text>

      {/* Column headers */}
      <text x="82" y="44" fontSize="4.5" fill="rgba(163,163,163,0.38)" fontFamily="monospace">NAME</text>
      <text x="202" y="44" fontSize="4.5" fill="rgba(163,163,163,0.38)" fontFamily="monospace">STATUS</text>
      <text x="262" y="44" fontSize="4.5" fill="rgba(163,163,163,0.38)" fontFamily="monospace">ACTION</text>
      <line x1="68" y1="47" x2="316" y2="47" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />

      {/* ── Row 1 (Active) ── */}
      <circle cx="76" cy="57" r="4.5" fill="rgba(226,56,56,0.14)" stroke="rgba(226,56,56,0.32)" strokeWidth="0.5" />
      <rect x="86" y="53.5" width="52" height="2.5" rx="1" fill="rgba(245,245,245,0.58)" />
      <rect x="86" y="58.5" width="36" height="2" rx="1" fill="rgba(163,163,163,0.2)" />
      {/* Status: Active */}
      <rect x="198" y="52.5" width="36" height="9" rx="4.5" fill="rgba(74,222,128,0.10)" stroke="rgba(74,222,128,0.32)" strokeWidth="0.5" />
      <text x="216" y="58.7" fontSize="4.5" fill="#4ade80" fontFamily="monospace" textAnchor="middle">● Active</text>
      {/* Action */}
      <rect x="256" y="52.5" width="46" height="9" rx="2" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.5" />
      <text x="279" y="58.7" fontSize="4" fill="rgba(245,245,245,0.40)" fontFamily="monospace" textAnchor="middle">REQUEST</text>
      <line x1="68" y1="66" x2="316" y2="66" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

      {/* ── Row 2 (Pending) ── */}
      <circle cx="76" cy="75" r="4.5" fill="rgba(232,160,69,0.14)" stroke="rgba(232,160,69,0.32)" strokeWidth="0.5" />
      <rect x="86" y="71.5" width="44" height="2.5" rx="1" fill="rgba(245,245,245,0.58)" />
      <rect x="86" y="76.5" width="30" height="2" rx="1" fill="rgba(163,163,163,0.2)" />
      {/* Status: Pending */}
      <rect x="198" y="70.5" width="36" height="9" rx="4.5" fill="rgba(232,160,69,0.10)" stroke="rgba(232,160,69,0.32)" strokeWidth="0.5" />
      <text x="216" y="76.7" fontSize="4.5" fill="#e8a045" fontFamily="monospace" textAnchor="middle">◎ Pending</text>
      {/* Action highlighted */}
      <rect x="256" y="70.5" width="46" height="9" rx="2" fill="rgba(226,56,56,0.12)" stroke="rgba(226,56,56,0.28)" strokeWidth="0.5" />
      <text x="279" y="76.7" fontSize="4" fill="rgba(226,56,56,0.75)" fontFamily="monospace" textAnchor="middle">REQUEST</text>
      <line x1="68" y1="84" x2="316" y2="84" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

      {/* ── Row 3 (Inactive) ── */}
      <circle cx="76" cy="93" r="4.5" fill="rgba(163,163,163,0.10)" stroke="rgba(163,163,163,0.22)" strokeWidth="0.5" />
      <rect x="86" y="89.5" width="58" height="2.5" rx="1" fill="rgba(245,245,245,0.58)" />
      <rect x="86" y="94.5" width="40" height="2" rx="1" fill="rgba(163,163,163,0.2)" />
      {/* Status: Inactive */}
      <rect x="198" y="88.5" width="36" height="9" rx="4.5" fill="rgba(163,163,163,0.07)" stroke="rgba(163,163,163,0.20)" strokeWidth="0.5" />
      <text x="216" y="94.7" fontSize="4.5" fill="#a3a3a3" fontFamily="monospace" textAnchor="middle">○ Inactive</text>
      {/* Action dimmed */}
      <rect x="256" y="88.5" width="46" height="9" rx="2" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="0.5" />
      <text x="279" y="94.7" fontSize="4" fill="rgba(245,245,245,0.22)" fontFamily="monospace" textAnchor="middle">REQUEST</text>
      <line x1="68" y1="102" x2="316" y2="102" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

      {/* ── Usage chart section ── */}
      <text x="70" y="116" fontSize="5.5" fill="rgba(163,163,163,0.45)" fontFamily="monospace" letterSpacing="0.8">USAGE</text>
      <line x1="68" y1="119" x2="316" y2="119" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

      {/* Baseline */}
      <line x1="90" y1="167" x2="260" y2="167" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />

      {/* 5 bars — bottoms at y=167 */}
      <rect x="100" y="139" width="20" height="28" rx="2" fill="rgba(226,56,56,0.50)" />
      <rect x="128" y="129" width="20" height="38" rx="2" fill="rgba(226,56,56,0.68)" />
      <rect x="156" y="147" width="20" height="20" rx="2" fill="rgba(232,160,69,0.52)" />
      <rect x="184" y="133" width="20" height="34" rx="2" fill="rgba(226,56,56,0.58)" />
      <rect x="212" y="141" width="20" height="26" rx="2" fill="rgba(232,160,69,0.52)" />
    </svg>
  );
}

/* ── Laptop frame wrapper ─────────────────────────────────────── */
function LaptopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="laptop-wrap">
      <div className="laptop-lid">
        <div className="laptop-screen">{children}</div>
      </div>
      <div className="laptop-base" />
    </div>
  );
}

/* ── Data ─────────────────────────────────────────────────────── */
const professionalCards = [
  {
    id: 1,
    name: "CN/CP Rail API Pipeline",
    screen: "cncp" as const,
    problem:
      "Rail reporting ran on stale Geometrix data, blocking real-time decision making.",
    solution:
      "Built a direct CN/CP API pipeline in Databricks using medallion architecture, giving analysts always-fresh query-ready tables. Replaced a manual infrequent refresh cycle entirely.",
    stack: ["Python", "Databricks", "SQL"],
  },
  {
    id: 2,
    name: "Data Storefront",
    screen: "storefront" as const,
    problem:
      "Accessing data products meant tracking down owners and manually requesting permissions.",
    solution:
      "Built a self-serve storefront where users browse data products, submit requests that auto-generate FreshService tickets, trigger approval workflows, and provision Active Directory access automatically.",
    stack: ["React", "C#"],
  },
];

const personalCards = [
  {
    id: 3,
    name: "MMA Predictor Model",
    description:
      "Analyzes MMA fight statistics and predicts likely winners using machine learning.",
    image: "/mma.png",
    github: "https://github.com/ericmah123/mma-predictor-model",
    demo: null,
    stack: ["Python", "Flask"],
  },
  {
    id: 4,
    name: "EmploiFirst",
    description:
      "Job application and management system with posting, tracking, and candidate communication.",
    image: "/emploi.png",
    github: "https://github.com/UAlberta-CMPUT401/f24project-EmploiF1rst",
    demo: "https://www.youtube.com/watch?v=z3FmimH-GF4",
    stack: ["React", "Node.js", "MySQL"],
  },
  {
    id: 5,
    name: "Fit Planner",
    description:
      "AI-powered fitness app that generates personalized workout plans.",
    image: "/fit.png",
    github: "https://github.com/josephhdu/Fit-Planner",
    demo: null,
    stack: ["Django", "JavaScript"],
  },
];

/* ── Spotlight hook ───────────────────────────────────────────── */
function useSpotlight() {
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }, []);

  const onMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--x", "-999px");
    e.currentTarget.style.setProperty("--y", "-999px");
  }, []);

  return { onMouseMove, onMouseLeave };
}

/* ── Component ────────────────────────────────────────────────── */
export default function Projects() {
  const spotlight = useSpotlight();

  return (
    <section id="projects" className="page-section">
      <div className="section-label reveal">Projects</div>

      {/* Top row — 2 large professional cards */}
      <div className="proj-grid-top reveal d-40">
        {professionalCards.map((card) => (
          <div key={card.id} className="proj-card glass flex flex-col" {...spotlight}>
            <LaptopFrame>
              {card.screen === "cncp" ? <CNScreen /> : <StorefrontScreen />}
            </LaptopFrame>
            <div className="proj-card-body">
              <h3 className="proj-name">{card.name}</h3>
              <div className="proj-desc-area">
                <p className="proj-problem">{card.problem}</p>
                <p className="proj-solution">{card.solution}</p>
              </div>
              <TechStack stack={card.stack} />
            </div>
            <div className="proj-spotlight" aria-hidden="true" />
          </div>
        ))}
      </div>

      {/* Bottom row — 3 personal/school cards */}
      <div className="proj-grid-bottom reveal d-80">
        {personalCards.map((card) => (
          <div key={card.id} className="proj-card glass flex flex-col" {...spotlight}>
            <div className="proj-img-wrap">
              <Image
                src={card.image}
                alt={card.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
              />
            </div>
            <div className="proj-personal-body">
              <h3 className="proj-name-sm">{card.name}</h3>
              <p className="proj-desc-sm">{card.description}</p>
              <TechStack stack={card.stack} />
              <div className="proj-links">
                {card.github && (
                  <a
                    href={card.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-link"
                  >
                    GitHub ↗
                  </a>
                )}
                {card.demo && (
                  <a
                    href={card.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-link"
                  >
                    Demo ↗
                  </a>
                )}
              </div>
            </div>
            <div className="proj-spotlight" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}
