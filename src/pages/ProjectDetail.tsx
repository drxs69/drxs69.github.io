
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { projects } from "../data/projects";

import ArchitectureDiagram from "../components/ArchitectureDiagram";
import ProjectGallery from "../components/ProjectGallery";
import ProjectNavigation from "../components/ProjectNavigation";

type SectionSelection = {
  projectId: number;
  value: string;
};

/*
 * Each case study gets a subtle accent.
 * The colors are decorative and do not change
 * the content or background readability.
 */
const projectAccents: Record<
  number,
  {
    glow: string;
    secondaryGlow: string;
    label: string;
  }
> = {
  1: {
    glow: "rgba(59,130,246,0.12)",
    secondaryGlow: "rgba(34,211,238,0.055)",
    label: "AI / SOFTWARE ENGINEERING",
  },
  2: {
    glow: "rgba(99,102,241,0.12)",
    secondaryGlow: "rgba(139,92,246,0.06)",
    label: "MACHINE LEARNING / DATA",
  },
  3: {
    glow: "rgba(34,211,238,0.10)",
    secondaryGlow: "rgba(59,130,246,0.06)",
    label: "GAME DEVELOPMENT / SOFTWARE",
  },
};

export default function ProjectDetail() {
  const { id } = useParams();

  const project = projects.find(
    (item) => item.id === Number(id)
  );

  const [selection, setSelection] =
    useState<SectionSelection | null>(null);

  const selectedSection =
    project && selection?.projectId === project.id
      ? selection.value
      : "";

  function scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);

    if (!element) return;

    const isDesktop = window.matchMedia(
      "(min-width: 1024px)"
    ).matches;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const navbarHeight = 80;

    const mobileNavigation =
      document.querySelector<HTMLElement>(
        '[aria-label="Mobile case study navigation"]'
      );

    const mobileNavigationHeight =
      !isDesktop && mobileNavigation
        ? mobileNavigation.getBoundingClientRect().height
        : 0;

    const gap = isDesktop ? 32 : 12;

    const offset =
      navbarHeight + mobileNavigationHeight + gap;

    const elementPosition =
      element.getBoundingClientRect().top +
      window.scrollY;

    window.scrollTo({
      top: Math.max(0, elementPosition - offset),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  function scrollToSection(index: number) {
    scrollToElement(`section-${index}`);
  }

  function scrollToGallery() {
    scrollToElement("project-gallery");
  }

  function handleMobileNavigation(value: string) {
    if (!project) return;

    setSelection({
      projectId: project.id,
      value,
    });

    if (value === "gallery") {
      scrollToGallery();
      return;
    }

    const index = Number(value);

    if (Number.isInteger(index)) {
      scrollToSection(index);
    }
  }

  if (!project) {
    return (
      <main className="mx-auto min-h-screen max-w-[1480px] px-6 pt-40 text-white lg:px-10 xl:px-12">
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Project not found.
        </h1>

        <Link
          to="/"
          className="mt-8 inline-block text-blue-400 transition-colors hover:text-blue-300"
        >
          ← Return Home
        </Link>
      </main>
    );
  }

  const accent =
    projectAccents[project.id] ?? projectAccents[1];

  return (
    <main className="min-h-screen overflow-x-clip bg-[#090b10] text-white">
      {/* PROJECT HEADER */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.07] pb-16 pt-32 sm:pb-24 sm:pt-36 lg:pb-28">
        {/* Subtle project-specific atmospheric background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div
            className="absolute -right-[15%] -top-[25%] h-[680px] w-[900px] max-w-none rounded-full"
            style={{
              background: `radial-gradient(
                ellipse at center,
                ${accent.glow} 0%,
                transparent 70%
              )`,
            }}
          />

          <div
            className="absolute -left-[18%] bottom-[-55%] h-[500px] w-[700px] rounded-full"
            style={{
              background: `radial-gradient(
                ellipse at center,
                ${accent.secondaryGlow} 0%,
                transparent 75%
              )`,
            }}
          />

          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#090b10] to-transparent" />
        </div>

        <div className="mx-auto w-full max-w-[1480px] px-6 lg:px-10 xl:px-12">
          {/* Return navigation */}
          <Link
            to="/"
            className="group inline-flex items-center gap-3 text-sm text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-1"
            >
              ←
            </span>
            Back to Home
          </Link>

          <div className="mt-12 max-w-[1120px] sm:mt-16">
            {/* Eyebrow */}
            <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="h-px w-9 bg-blue-400" />

              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-blue-400">
                Project{" "}
                {String(project.id).padStart(2, "0")}
                {" / "}
                {String(projects.length).padStart(
                  2,
                  "0"
                )}
              </p>

              <span className="text-[11px] text-slate-600">
                /
              </span>

              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                {accent.label}
              </span>
            </div>

            {/* Project title */}
            <h1 className="max-w-[1050px] text-4xl font-semibold leading-[1.09] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl xl:text-[68px]">
              {project.title}
            </h1>

            {/* Lead description */}
            <p className="mt-7 max-w-[850px] text-[17px] leading-[1.9] text-slate-300 sm:mt-9 sm:text-[19px]">
              {project.description}
            </p>

            {/* Project information */}
            <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 sm:mt-16 sm:grid-cols-3 sm:gap-10 sm:pt-9">
              <div>
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.17em] text-slate-500">
                  Project Type
                </p>

                <p className="text-[15px] font-medium leading-relaxed text-slate-100">
                  {project.type}
                </p>
              </div>

              <div>
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.17em] text-slate-500">
                  Category
                </p>

                <p className="text-[15px] font-medium leading-relaxed text-slate-100">
                  {project.category}
                </p>
              </div>

              <div>
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.17em] text-slate-500">
                  Status
                </p>

                <p className="text-[15px] font-medium leading-relaxed text-slate-100">
                  {project.status}
                </p>
              </div>
            </div>

            {/* Technology stack */}
            <div className="mt-10 flex flex-wrap gap-2 sm:mt-12">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-blue-300/[0.10] bg-white/[0.035] px-3.5 py-2 text-xs font-medium text-slate-300 transition-colors duration-200 hover:border-blue-400/30 hover:bg-blue-400/[0.07] hover:text-white"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Repository links */}
            <div className="mt-10 flex flex-wrap gap-3 sm:mt-12 sm:gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
                >
                  View Repository ↗
                </a>
              )}

              {project.originalRepository && (
                <a
                  href={project.originalRepository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:border-blue-400/60 hover:bg-white/[0.035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
                >
                  Original Team Repository ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY BODY */}
      <section className="relative pb-16 pt-8 sm:pb-24 sm:pt-12 lg:py-24">
        {/* Mobile / tablet section navigation */}
        <nav
          aria-label="Mobile case study navigation"
          className="sticky top-20 z-40 border-b border-white/10 bg-[#090b10]/95 py-4 backdrop-blur-md lg:hidden"
        >
          <div className="mx-auto w-full max-w-[1480px] px-6 lg:px-10 xl:px-12">
            <label
              htmlFor="mobile-case-study-section"
              className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500"
            >
              Jump to Section
            </label>

            <div className="relative">
              <select
                id="mobile-case-study-section"
                value={selectedSection}
                onChange={(event) =>
                  handleMobileNavigation(
                    event.target.value
                  )
                }
                className="w-full min-w-0 cursor-pointer appearance-none rounded-lg border border-white/15 bg-[#101823] px-4 py-3 pr-12 text-sm text-slate-200 outline-none transition-colors hover:border-white/30 focus-visible:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-400/30"
              >
                <option value="" disabled>
                  Select a section...
                </option>

                {project.sections.map(
                  (section, index) => (
                    <option
                      key={section.heading}
                      value={String(index)}
                    >
                      {section.heading}
                    </option>
                  )
                )}

                <option value="gallery">
                  Screenshots &amp; Visuals
                </option>
              </select>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-blue-400"
              >
                ▼
              </span>
            </div>
          </div>
        </nav>

        <div className="mx-auto w-full max-w-[1480px] px-6 lg:px-10 xl:px-12">
          <div className="grid min-w-0 gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-16">
            {/* Desktop table of contents */}
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <div className="border-l border-white/10 pl-5">
                  <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                    In this case study
                  </p>

                  <nav
                    aria-label="Case study sections"
                    className="flex flex-col gap-5"
                  >
                    {project.sections.map(
                      (section, index) => (
                        <button
                          key={section.heading}
                          type="button"
                          onClick={() =>
                            scrollToSection(index)
                          }
                          className="group flex cursor-pointer items-start gap-3 text-left text-[13px] leading-5 text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
                        >
                          <span className="font-mono text-[10px] text-blue-400/70 transition-colors group-hover:text-blue-400">
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </span>

                          <span>
                            {section.heading}
                          </span>
                        </button>
                      )
                    )}

                    <button
                      type="button"
                      onClick={scrollToGallery}
                      className="group flex cursor-pointer items-start gap-3 text-left text-[13px] leading-5 text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
                    >
                      <span className="font-mono text-[10px] text-blue-400/70 transition-colors group-hover:text-blue-400">
                        ↗
                      </span>

                      <span>
                        Screenshots &amp; Visuals
                      </span>
                    </button>
                  </nav>
                </div>
              </div>
            </aside>

            {/* Article content */}
            <div className="min-w-0 w-full max-w-[1050px] pt-8 lg:pt-0">
              {project.sections.map(
                (section, index) => {
                  const showDiagram =
                    (project.id === 1 &&
                      section.heading ===
                        "System Architecture") ||
                    (project.id === 2 &&
                      section.heading ===
                        "Machine Learning Pipeline") ||
                    (project.id === 3 &&
                      section.heading ===
                        "Software Architecture");

                  return (
                    <section
                      key={section.heading}
                      id={`section-${index}`}
                      className="border-b border-white/[0.07] pb-16 pt-6 first:pt-0 last:border-b-0 sm:pb-20 sm:pt-10"
                    >
                      {/* Number and accent line */}
                      <div className="mb-6 flex items-center gap-4 sm:mb-8">
                        <span className="font-mono text-xs font-medium text-blue-400">
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>

                        <span
                          aria-hidden="true"
                          className="h-px w-12 bg-gradient-to-r from-blue-400/70 to-transparent"
                        />
                      </div>

                      {/* Section heading */}
                      <h2 className="mb-8 max-w-[900px] text-3xl font-semibold leading-[1.16] tracking-[-0.035em] text-white sm:mb-10 sm:text-4xl xl:text-[42px]">
                        {section.heading}
                      </h2>

                      {/* Readable body text */}
                      <div className="max-w-[850px] space-y-6 sm:space-y-7">
                        {section.paragraphs.map(
                          (
                            paragraph,
                            paragraphIndex
                          ) => (
                            <p
                              key={paragraphIndex}
                              className="text-[16px] leading-[1.95] text-slate-400 sm:text-[17px]"
                            >
                              {paragraph}
                            </p>
                          )
                        )}
                      </div>

                      {/* Architecture diagram */}
                      {showDiagram && (
                        <div className="mt-8 sm:mt-10">
                          <ArchitectureDiagram
                            projectId={project.id}
                          />
                        </div>
                      )}
                    </section>
                  );
                }
              )}

              {/* Screenshots and visuals */}
              <div
                id="project-gallery"
                className="border-t border-white/[0.07] pb-8 pt-3"
              >
                <ProjectGallery
                  projectId={project.id}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Previous and next case studies */}
      <ProjectNavigation
        currentProjectId={project.id}
      />
    </main>
  );
}
