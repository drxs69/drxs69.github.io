
import type { PointerEvent } from "react";

import { Link } from "react-router-dom";
import type { Project } from "../types/project";

type ProjectCardProps = {
  project: Project;
};

const accentColors: Record<number, string> = {
  1: "rgba(59,130,246,0.18)",
  2: "rgba(139,92,246,0.16)",
  3: "rgba(34,211,238,0.14)",
};

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  const accent =
    accentColors[project.id] ??
    "rgba(59,130,246,0.16)";

  function handlePointerMove(
    event: PointerEvent<HTMLElement>
  ) {
    // Ignore touch input and reduced-motion preferences.
    if (event.pointerType !== "mouse") return;

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();

    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    element.style.setProperty(
      "--spotlight-x",
      `${x}px`
    );

    element.style.setProperty(
      "--spotlight-y",
      `${y}px`
    );
  }

  return (
    <article
      onPointerMove={handlePointerMove}
      className="project-interactive-card group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.10] bg-[#10141c] p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1.5 hover:border-blue-400/35 hover:shadow-[0_22px_70px_-30px_rgba(37,99,235,0.28)] focus-within:border-blue-400/50 focus-within:shadow-[0_22px_70px_-30px_rgba(37,99,235,0.25)] sm:p-7"
      style={
        {
          "--spotlight-x": "50%",
          "--spotlight-y": "50%",
          "--spotlight-color": accent,
        } as React.CSSProperties
      }
    >
      {/* Cursor-following ambient light */}
      <div
        aria-hidden="true"
        className="project-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--spotlight-x) var(--spotlight-y), var(--spotlight-color), transparent 65%)",
        }}
      />

      {/* Faint upper highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/0 to-transparent transition-all duration-300 group-hover:via-blue-300/50 group-focus-within:via-blue-300/50"
      />

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-12 flex items-center justify-between gap-3">
          <span className="font-mono text-xs tracking-[0.15em] text-slate-500">
            {String(project.id).padStart(2, "0")} / 03
          </span>

          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-lg text-slate-400 transition-[color,border-color,background-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-blue-400/35 group-hover:bg-blue-400/10 group-hover:text-blue-300 group-focus-within:border-blue-400/35 group-focus-within:text-blue-300"
          >
            ↗
          </span>
        </div>

        <p className="mb-4 text-[11px] font-medium uppercase leading-5 tracking-[0.15em] text-blue-400">
          {project.category}
        </p>

        <h3 className="mb-4 text-[23px] font-semibold leading-[1.2] tracking-[-0.035em] text-white sm:text-2xl">
          {project.title}
        </h3>

        <p className="mb-9 flex-grow text-[14px] leading-[1.8] text-slate-400">
          {project.description}
        </p>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 text-[11px] text-slate-300 transition-colors duration-200 group-hover:border-white/[0.13]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="border-t border-white/10 pt-5 transition-colors duration-300 group-hover:border-blue-400/20">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-white transition-colors duration-200 hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
            aria-label={`View ${project.title} case study`}
          >
            View Case Study

            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1"
            >
              ↗
            </span>
          </Link>
        </div>
      </div>

      <style>
        {`
          @media (hover: none) {
            .project-interactive-card {
              transform: none !important;
            }

            .project-spotlight {
              opacity: 0 !important;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .project-interactive-card,
            .project-interactive-card * {
              transition-duration: 0.01ms !important;
              animation: none !important;
            }

            .project-interactive-card {
              transform: none !important;
            }

            .project-spotlight {
              opacity: 0 !important;
            }
          }
        `}
      </style>
    </article>
  );
}
