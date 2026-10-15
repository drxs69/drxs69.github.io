
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

type ProjectNavigationProps = {
  currentProjectId: number;
};

const projectImages: Record<number, string> = {
  1: "/images/defect-detection/overview.png",
  2: "/images/elderguard/overview.png",
  3: "/images/train-survival/overview.png",
};

export default function ProjectNavigation({
  currentProjectId,
}: ProjectNavigationProps) {
  const currentIndex = projects.findIndex(
    (project) => project.id === currentProjectId
  );

  if (currentIndex === -1 || projects.length < 2) {
    return null;
  }

  const items = [
    {
      project:
        projects[
          (currentIndex - 1 + projects.length) % projects.length
        ],
      previous: true,
      label: "Previous Project",
    },
    {
      project: projects[(currentIndex + 1) % projects.length],
      previous: false,
      label: "Next Project",
    },
  ];

  return (
    <section
      aria-label="Explore more projects"
      className="border-t border-white/10 py-10 sm:py-14"
    >
      <style>{`
        .portfolio-project-navigation-link {
          background-color: #080c13 !important;
        }

        .portfolio-project-navigation-link .portfolio-project-navigation-image {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: .76 !important;
          filter: none !important;
        }

        .portfolio-project-navigation-link .portfolio-project-navigation-fade {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 1 !important;
          background-color: transparent !important;
          background-image: linear-gradient(
            to right,
            rgba(3, 8, 17, .72),
            rgba(3, 8, 17, .37),
            rgba(3, 8, 17, .60)
          ) !important;
          transition: opacity 300ms ease;
        }

        .portfolio-project-navigation-link:hover .portfolio-project-navigation-fade {
          opacity: .72 !important;
        }

        .portfolio-project-navigation-link .portfolio-project-navigation-content {
          position: relative;
          z-index: 2;
        }

        .portfolio-project-navigation-link .portfolio-project-navigation-title {
          color: #ffffff !important;
        }

        .portfolio-project-navigation-link:hover .portfolio-project-navigation-title {
          color: #bfdbfe !important;
        }

        .portfolio-project-navigation-link .portfolio-project-navigation-label {
          color: #e2e8f0 !important;
        }

        .portfolio-project-navigation-link .portfolio-project-navigation-description {
          color: #cbd5e1 !important;
        }

        .portfolio-project-navigation-link .portfolio-project-navigation-arrow {
          color: #93c5fd !important;
        }

        :root[data-theme="light"] .portfolio-project-navigation {
          background-color: #080c13 !important;
        }

        :root[data-theme="light"] .portfolio-project-navigation-link .portfolio-project-navigation-fade {
          background-image: linear-gradient(
            to right,
            rgba(3, 8, 17, .72),
            rgba(3, 8, 17, .37),
            rgba(3, 8, 17, .60)
          ) !important;
        }

        :root[data-theme="light"] .portfolio-project-navigation-link .portfolio-project-navigation-title {
          color: #ffffff !important;
        }

        :root[data-theme="light"] .portfolio-project-navigation-link .portfolio-project-navigation-label {
          color: #e2e8f0 !important;
        }

        :root[data-theme="light"] .portfolio-project-navigation-link .portfolio-project-navigation-description {
          color: #cbd5e1 !important;
        }

        :root[data-theme="light"] .portfolio-project-navigation-link .portfolio-project-navigation-arrow {
          color: #93c5fd !important;
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-6">
        <div className="portfolio-project-navigation relative isolate grid overflow-hidden rounded-lg border border-white/10 bg-[#080c13] md:grid-cols-2">
          {items.map(({ project, previous, label }) => (
            <Link
              key={label}
              to={`/projects/${project.id}`}
              aria-label={`${label}: ${project.title}`}
              className={`portfolio-project-navigation-link group relative isolate flex min-h-[165px] min-w-0 items-center overflow-hidden px-6 py-7 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400 sm:px-8 md:min-h-[160px] ${
                previous
                  ? "justify-start text-left"
                  : "justify-end border-t border-white/10 text-right md:border-t-0"
              }`}
            >
              {/* Photo stays above the card background. */}
              <img
                src={projectImages[project.id]}
                alt=""
                loading="lazy"
                decoding="async"
                className="portfolio-project-navigation-image pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
              />

              {/* Translucent overlay for readable text. */}
              <div
                aria-hidden="true"
                className="portfolio-project-navigation-fade pointer-events-none absolute inset-0"
              />

              <div className="portfolio-project-navigation-content min-w-0 max-w-[95%]">
                <div
                  className={`portfolio-project-navigation-label mb-3 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] ${
                    previous ? "justify-start" : "justify-end"
                  }`}
                >
                  {previous && (
                    <span
                      aria-hidden="true"
                      className="portfolio-project-navigation-arrow text-base transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transform-none"
                    >
                      ←
                    </span>
                  )}

                  {label}

                  {!previous && (
                    <span
                      aria-hidden="true"
                      className="portfolio-project-navigation-arrow text-base transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                    >
                      →
                    </span>
                  )}
                </div>

                <h3 className="portfolio-project-navigation-title text-xl font-semibold leading-tight tracking-tight transition-colors duration-300 sm:text-2xl">
                  {project.title}
                </h3>

                <p className="portfolio-project-navigation-description mt-2 text-xs leading-5 sm:text-sm">
                  {project.category}
                </p>
              </div>
            </Link>
          ))}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-5 left-1/2 z-20 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-500/40 to-transparent md:block"
          />

          <div
            aria-hidden="true"
            className="portfolio-project-navigation-diamond pointer-events-none absolute left-1/2 top-1/2 z-30 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-600/50 bg-[#080c13] shadow-[0_0_25px_rgba(0,0,0,0.5)] md:flex"
          >
            <span className="text-xs text-blue-300">◈</span>
          </div>
        </div>
      </div>
    </section>
  );
}
