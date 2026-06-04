"use client";

import { useState } from "react";

// Time reference: September 2021 = 0 months
// Total span plotted: 60 months (Sept 2021 → Sept 2026)
const SPAN = 60;

function mo(year: number, month: number): number {
  return (year - 2021) * 12 + (month - 9);
}

function top(months: number): string {
  return `${((months / SPAN) * 100).toFixed(3)}%`;
}

function height(start: number, end: number): string {
  return `${(((end - start) / SPAN) * 100).toFixed(3)}%`;
}

interface Entry {
  id: number;
  company: string;
  title: string;
  dateLabel: string;
  start: number;
  end: number | null; // null = ongoing
  desc: string;
  lane: 0 | 1 | 2 | 3;
}

const entries: Entry[] = [
  {
    id: 0,
    company: "University of Alberta",
    title: "BSc Computer Science",
    dateLabel: "Sept 2021 – April 2026",
    start: mo(2021, 9),  // 0
    end:   mo(2026, 4),  // 55
    desc: "Graduated with a degree in Computer Science from the University of Alberta.",
    lane: 0,
  },
  {
    id: 1,
    company: "Keyera",
    title: "IT Business Solutions Co-op",
    dateLabel: "May 2025 – Dec 2025",
    start: mo(2025, 5),  // 44
    end:   mo(2025, 12), // 51
    desc: "Co-op rotation supporting IT business solutions. Worked on internal data infrastructure and tooling projects within the Databricks environment.",
    lane: 1,
  },
  {
    id: 2,
    company: "Gibson Energy",
    title: "Information Services Analyst",
    dateLabel: "March 2026 – June 2026",
    start: mo(2026, 3),  // 54
    end:   mo(2026, 6),  // 57
    desc: "Supported daily IT operations across hardware, software, and network environments. Managed device lifecycle including imaging, provisioning, and onboarding/offboarding. Performed Windows 10 to 11 upgrades and assisted with MDM and application troubleshooting.",
    lane: 2,
  },
  {
    id: 3,
    company: "CNRL",
    title: "Technical Business Analyst",
    dateLabel: "June 2026 – Present",
    start: 57 + 22 / 30, // June 22, 2026 ≈ 57.73
    end:   null,
    desc: "Starting as a Technical BA bridging engineering and business stakeholders in the energy sector.",
    lane: 3,
  },
];

// January 1 of each year expressed as months from Sept 2021
const yearMarkers = [
  { label: "2021", months: 0 },
  { label: "2022", months: mo(2022, 1) }, //  4
  { label: "2023", months: mo(2023, 1) }, // 16
  { label: "2024", months: mo(2024, 1) }, // 28
  { label: "2025", months: mo(2025, 1) }, // 40
  { label: "2026", months: mo(2026, 1) }, // 52
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`tl-chevron${open ? " is-open" : ""}`}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 5l5 4.5L12 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Timeline() {
  const [openId, setOpenId] = useState<number | null>(null);
  const toggle = (id: number) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="page-section">
      <div className="section-label reveal">Experience</div>

      {/* ── Desktop: proportional branching canvas ─────────── */}
      <div className="tl-canvas-desktop reveal d-80">
        {/* Year labels */}
        <div className="tl-year-axis">
          {yearMarkers.map(({ label, months }) => (
            <span
              key={label}
              className="tl-year-mark"
              style={{ top: top(months) }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Trunk + branches */}
        <div className="tl-tracks">
          <div className="tl-trunk" aria-hidden="true" />

          {entries.map((entry) => {
            const isOpen = openId === entry.id;
            const ongoing = entry.end === null;
            // For ongoing entries use SPAN as visual end so branch reaches bottom
            const endMo = entry.end ?? SPAN;

            return (
              <div
                key={entry.id}
                className={`tl-branch-group tl-lane-${entry.lane}`}
                style={{
                  top: top(entry.start),
                  height: height(entry.start, endMo),
                }}
              >
                {/* Proportional branch line */}
                <div className="tl-branch-line" aria-hidden="true" />

                {/* Pulsing amber dot for CNRL */}
                {ongoing && (
                  <div className="tl-ongoing-indicator" aria-hidden="true">
                    <div className="tl-ongoing-dot" />
                  </div>
                )}

                {/* Card pinned to branch start */}
                <div
                  className={`tl-card glass${isOpen ? " is-open" : ""}`}
                  onClick={() => toggle(entry.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && toggle(entry.id)
                  }
                  aria-expanded={isOpen}
                >
                  <div className="tl-card-head">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="tl-company">{entry.company}</div>
                        <div className="tl-role">{entry.title}</div>
                      </div>
                      <Chevron open={isOpen} />
                    </div>
                  </div>
                  <div
                    className={`tl-card-body${isOpen ? " is-open" : ""}`}
                  >
                    <div className="tl-card-body-inner">
                      <p className="tl-card-desc">{entry.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile: simple vertical list ───────────────────── */}
      <div className="tl-list">
        {entries.map((entry) => {
          const isOpen = openId === entry.id;
          return (
            <div key={entry.id} className="tl-list-entry glass">
              <div
                className="tl-list-head"
                onClick={() => toggle(entry.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && toggle(entry.id)
                }
                aria-expanded={isOpen}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="tl-company">{entry.company}</span>
                  <span className="tl-role">{entry.title}</span>
                  <span className="tl-date-label">{entry.dateLabel}</span>
                </div>
                <Chevron open={isOpen} />
              </div>
              <div
                className={`tl-card-body${isOpen ? " is-open" : ""}`}
              >
                <div className="tl-card-body-inner">
                  <p className="tl-card-desc" style={{ paddingTop: 0 }}>
                    {entry.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
