
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

  const previousProject =
    projects[
      (currentIndex - 1 + projects.length) %
        projects.length
    ];

  const nextProject =
    projects[(currentIndex + 1) % projects.length];

  const navigationItems = [
    {
      project: previousProject,
      direction: "previous",
      label: "Previous Project",
    },
    {
      project: nextProject,
      direction: "next",
      label: "Next Project",
    },
  ] as const;

  return (
    <section
      aria-label="Explore more projects"
      className="border-t border-white/10 py-10 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Single continuous panel on desktop */}
        <div className="relative isolate grid overflow-hidden rounded-lg border border-white/10 bg-[#080c13] md:grid-cols-2">

          {navigationItems.map(
            ({ project, direction, label }) => {
              const isPrevious =
                direction === "previous";

              return (
                <Link
                  key={direction}
                  to={`/projects/${project.id}`}
                  aria-label={`${label}: ${project.title}`}
                  className={`group relative isolate flex min-h-[165px] min-w-0 items-center overflow-hidden px-6 py-7 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400 sm:px-8 md:min-h-[160px] ${
                    isPrevious
                      ? "justify-start text-left"
                      : "justify-end border-t border-white/10 text-right md:border-t-0"
                  }`}
                >
                  {/* Background image */}
                  <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
                    <img
                      src={projectImages[project.id]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-center opacity-65 transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                  </div>

                  {/* Directional cinematic fade */}
                  <div
                    className={`pointer-events-none absolute inset-0 -z-10 ${
                      isPrevious
                        ? "bg-gradient-to-r from-[#05070b]/75 via-[#05070b]/45 to-[#05070b]"
                        : "bg-gradient-to-l from-[#05070b]/75 via-[#05070b]/45 to-[#05070b]"
                    }`}
                  />

                  {/* Extra shading for legibility */}
                  <div className="pointer-events-none absolute inset-0 bg-[#05070b]/10 transition-colors duration-500 group-hover:bg-transparent" />

                  {/* Project information */}
                  <div className="relative z-10 min-w-0 max-w-[95%]">

                    {/* Navigation direction */}
                    <div
                      className={`mb-3 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-200 ${
                        isPrevious
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      {isPrevious && (
                        <span
                          aria-hidden="true"
                          className="text-base text-blue-300 transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transform-none"
                        >
                          ←
                        </span>
                      )}

                      {label}

                      {!isPrevious && (
                        <span
                          aria-hidden="true"
                          className="text-base text-blue-300 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                        >
                          →
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-blue-200 sm:text-2xl">
                      {project.title}
                    </h3>

                    {/* Category */}
                    <p className="mt-2 text-xs leading-5 text-slate-300 sm:text-sm">
                      {project.category}
                    </p>

                  </div>
                </Link>
              );
            }
          )}

          {/* Centre divider — desktop only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-5 left-1/2 z-20 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-500/40 to-transparent md:block"
          />

          {/* Diamond icon — desktop only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-30 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-600/50 bg-[#080c13] shadow-[0_0_25px_rgba(0,0,0,0.5)] md:flex"
          >
            <span className="text-xs text-blue-300">
              ◈
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
