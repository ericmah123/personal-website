import Image from "next/image";

const professionalCards = [
  {
    id: 1,
    name: "CN/CP Rail API Pipeline",
    label: "KEYERA",
    problem:
      "Rail reporting ran on stale Geometrix data, blocking real-time decision making.",
    solution:
      "Built a direct CN/CP API pipeline in Databricks using medallion architecture, giving analysts always-fresh query-ready tables. Replaced a manual infrequent refresh cycle entirely.",
  },
  {
    id: 2,
    name: "Data Storefront",
    label: "KEYERA",
    problem:
      "Accessing data products meant tracking down owners and manually requesting permissions.",
    solution:
      "Built a self-serve storefront where users browse data products, submit requests that auto-generate FreshService tickets, trigger approval workflows, and provision Active Directory access automatically.",
  },
];

const personalCards = [
  {
    id: 3,
    name: "MMA Predictor Model",
    description:
      "Analyzes MMA fight statistics and predicts likely winners using machine learning. Built with Flask, Python, and D3.js.",
    image: "/mma.png",
    github: "https://github.com/ericmah123/mma-predictor-model",
    demo: null,
  },
  {
    id: 4,
    name: "EmploiFirst",
    description:
      "Job application and management system with posting, tracking, and candidate communication. Built with React, Node.js, MySQL.",
    image: "/emploi.png",
    github: "https://github.com/UAlberta-CMPUT401/f24project-EmploiF1rst",
    demo: "https://www.emploif1rst.com/",
  },
  {
    id: 5,
    name: "Fit Planner",
    description:
      "AI-powered fitness app that generates personalized workout plans. Built with Django and vanilla JS.",
    image: "/fit.png",
    github: "https://github.com/josephhdu/Fit-Planner",
    demo: null,
  },
];

export default function Projects() {
  return (
    <section className="page-section">
      <div className="section-label reveal">Projects</div>

      {/* Top row — 2 large professional cards */}
      <div className="proj-grid-top reveal d-40">
        {professionalCards.map((card) => (
          <div key={card.id} className="proj-card glass">
            <div className="proj-card-body">
              <span className="proj-label">{card.label}</span>
              <h3 className="proj-name">{card.name}</h3>
              <div className="proj-desc-area">
                <p className="proj-problem">{card.problem}</p>
                <p className="proj-solution">{card.solution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row — 3 personal/school cards */}
      <div className="proj-grid-bottom reveal d-80">
        {personalCards.map((card) => (
          <div key={card.id} className="proj-card glass flex flex-col">
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
          </div>
        ))}
      </div>
    </section>
  );
}
