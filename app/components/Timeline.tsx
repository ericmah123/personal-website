"use client";

import { useState } from "react";

interface Entry {
  id: number;
  company: string;
  title: string;
  date: string;
  description: string;
}

const entries: Entry[] = [
  {
    id: 1,
    company: "CNRL",
    title: "Technical Business Analyst",
    date: "August 2025 – Present",
    description:
      "Starting as a Technical BA bridging engineering and business stakeholders in the energy sector.",
  },
  {
    id: 2,
    company: "Gibson Energy",
    title: "Information Services Analyst",
    date: "January 2025 – August 2025",
    description:
      "Supported internal systems and data initiatives across information services.",
  },
  {
    id: 3,
    company: "Keyera",
    title: "IT Business Solutions (Co-op)",
    date: "May 2024 – December 2024",
    description:
      "Built a direct CN/CP API pipeline in Databricks replacing stale Geometrix data with medallion architecture (bronze → silver → gold) tables. Also built a self-serve data storefront that automated access requests, FreshService ticketing, and Active Directory provisioning.",
  },
  {
    id: 4,
    company: "University of Alberta",
    title: "BSc Computer Science",
    date: "2021 – 2025",
    description: "Graduated with a degree in Computer Science.",
  },
];

export default function Timeline() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (id: number) =>
    setOpen((prev) => (prev === id ? null : id));

  return (
    <section className="page-section">
      <div className="section-label reveal">Experience</div>
      <div className="tl-section reveal d-80">
        <div className="tl-line" aria-hidden="true" />
        {entries.map((entry) => {
          const isOpen = open === entry.id;
          return (
            <div key={entry.id} className="tl-entry">
              <div className="tl-tick" aria-hidden="true" />
              <div
                className={`tl-card glass${isOpen ? " is-open" : ""}`}
                onClick={() => toggle(entry.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && toggle(entry.id)}
                aria-expanded={isOpen}
              >
                <div className="flex items-start justify-between gap-4 pb-5">
                  <div className="flex flex-col gap-1">
                    <span className="tl-company">{entry.company}</span>
                    <span className="tl-title">{entry.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 pt-0.5">
                    <span className="tl-date">{entry.date}</span>
                    <svg
                      className={`tl-chevron${isOpen ? " is-open" : ""}`}
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 6l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className={`tl-body${isOpen ? " is-open" : ""}`}>
                  <div className="tl-body-inner">
                    <p className="tl-desc">{entry.description}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
