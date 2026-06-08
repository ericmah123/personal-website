"use client";

import FlipCard from "./FlipCard";

interface Entry {
  id: number;
  company: string;
  title: string;
  dateLabel: string;
  desc: string;
  ongoing: boolean;
  logoSrc: string;
  logoClass?: string;
}

const entries: Entry[] = [
  {
    id: 0,
    company: "University of Alberta",
    title: "BSc Computer Science",
    dateLabel: "Sept 2021 – April 2026",
    desc: "Graduated with a degree in Computer Science from the University of Alberta.",
    ongoing: false,
    logoSrc: "/Uofa_logo.png",
  },
  {
    id: 1,
    company: "Keyera",
    title: "IT Business Solutions Co-op",
    dateLabel: "May 2025 – Dec 2025",
    desc: "Co-op rotation supporting IT business solutions. Worked on internal data infrastructure and tooling projects within the Databricks environment.",
    ongoing: false,
    logoSrc: "/keyera_logo.png",
  },
  {
    id: 2,
    company: "Gibson Energy",
    title: "Information Services Analyst",
    dateLabel: "March 2026 – June 2026",
    desc: "Supported daily IT operations across hardware, software, and network environments. Managed device lifecycle including imaging, provisioning, and onboarding/offboarding. Performed Windows 10 to 11 upgrades and assisted with MDM and application troubleshooting.",
    ongoing: false,
    logoSrc: "/Gibson_Energy_logo.png",
    logoClass: "tl-logo-wide",
  },
  {
    id: 3,
    company: "CNRL",
    title: "Technical Business Analyst",
    dateLabel: "June 2026 – Present",
    desc: "Starting as a Technical BA bridging engineering and business stakeholders in the energy sector.",
    ongoing: true,
    logoSrc: "/cnrl-icon.png",
  },
];

function EntryCard({ entry }: { entry: Entry }) {
  const front = (
    <div className="tl-card-head">
      <div className={`tl-card-logo${entry.logoClass ? ` ${entry.logoClass}` : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={entry.logoSrc} alt={entry.company} />
      </div>
      <div className="tl-card-info">
        <div className="tl-company">{entry.company}</div>
        <div className="tl-role">{entry.title}</div>
        <div className="tl-date">{entry.dateLabel}</div>
      </div>
    </div>
  );

  const back = <p className="tl-card-desc">{entry.desc}</p>;

  return (
    <div className="tl-flip-wrap">
      <FlipCard
        frontContent={front}
        backContent={back}
        flipTrigger="click"
        flipDirection="horizontal"
        animationDuration={0.6}
        easingFunction="easeInOut"
        perspective={1000}
        ongoing={entry.ongoing}
        style={{ height: "100%" }}
      />
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="experience" className="page-section">
      <div className="section-label reveal">Experience</div>

      {/* ── Desktop: centered alternating timeline ─────────── */}
      <div className="tl-center reveal d-80">
        <div className="tl-spine" aria-hidden="true" />

        {entries.map((entry, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          return (
            <div key={entry.id} className="tl-row">
              <div className="tl-side tl-side-left">
                {side === "left" && <EntryCard entry={entry} />}
              </div>
              <div className="tl-node" aria-hidden="true">
                <div
                  className={`tl-dot${entry.ongoing ? " tl-dot-ongoing" : ""}`}
                />
              </div>
              <div className="tl-side tl-side-right">
                {side === "right" && <EntryCard entry={entry} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile: vertical list, same EntryCard component ── */}
      <div className="tl-list">
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
