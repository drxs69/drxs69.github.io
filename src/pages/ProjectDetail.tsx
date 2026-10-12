
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

export default function ProjectDetail() {
  const { id } = useParams();

  const project = projects.find(
    (item) => item.id === Number(id)
  );

  // Keep each selector value associated with its project.
  const [selection, setSelection] =
    useState<SectionSelection | null>(null);

  const selectedSection =
    project && selection?.projectId === project.id
      ? selection.value
      : "";

  // Scroll precisely to a section.
  function scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);

    if (!element) return;

    const isDesktop = window.matchMedia(
      "(min-width: 1024px)"
    ).matches;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Fixed Navbar is 80px tall.
    const navbarHeight = 80;

    // Measure the mobile sticky selector.
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

  // Invalid project ID.
  if (!project) {
    return (
      <main className="mx-auto min-h-screen max-w-6xl px-6 pt-40 text-white">
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

  return (
    <main className="min-h-screen bg-[#090b10] text-white">
      {/* PROJECT HEADER */}
      <section className="border-b border-white/10 pb-14 pt-32 sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
          >
            ← Back to Home
          </Link>

          <div className="mt-10 max-w-4xl sm:mt-16">
            {/* Project number */}
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 sm:mb-6">
              Project{" "}
              {String(project.id).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </p>

            {/* Title */}
            <h1 className="text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-400 sm:mt-8 sm:text-lg sm:leading-8">
              {project.description}
            </p>

            {/* Metadata */}
            <div className="mt-9 grid gap-6 border-t border-white/10 pt-7 sm:mt-12 sm:grid-cols-3 sm:gap-8 sm:pt-8">
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-slate-500">
                  Project Type
                </p>
                <p className="text-sm text-white">
                  {project.type}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-slate-500">
                  Category
                </p>
                <p className="text-sm text-white">
                  {project.category}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-slate-500">
                  Status
                </p>
                <p className="text-sm text-white">
                  {project.status}
                </p>
              </div>
            </div>

            {/* Technology tags */}
            <div className="mt-9 flex flex-wrap gap-2 sm:mt-12">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/10 bg-[#10141c] px-3 py-2 text-xs text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Repository links */}
            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
                >
                  View Repository ↗
                </a>
              )}

              {project.originalRepository && (
                <a
                  href={project.originalRepository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border border-white/20 px-6 py-3 text-sm text-white transition-colors hover:border-blue-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
                >
                  Original Team Repository ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY CONTENT */}
      <section className="pb-14 pt-10 sm:pb-20 sm:pt-14 lg:py-24">
        {/* STICKY MOBILE NAVIGATION */}
        <nav
          aria-label="Mobile case study navigation"
          className="sticky top-20 z-40 border-b border-white/10 bg-[#090b10]/95 py-4 backdrop-blur-md lg:hidden"
        >
          <div className="mx-auto max-w-6xl px-6">
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
                  handleMobileNavigation(event.target.value)
                }
                className="w-full min-w-0 cursor-pointer appearance-none rounded-lg border border-white/15 bg-[#101823] px-4 py-3 pr-12 text-sm text-slate-200 outline-none transition-colors hover:border-white/30 focus-visible:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-400/30"
              >
                <option value="" disabled>
                  Select a section...
                </option>

                {project.sections.map((section, index) => (
                  <option
                    key={section.heading}
                    value={String(index)}
                  >
                    {section.heading}
                  </option>
                ))}

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

        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
            {/* DESKTOP SIDEBAR */}
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <p className="mb-6 text-xs uppercase tracking-widest text-slate-500">
                  Case Study
                </p>

                <nav
                  aria-label="Case study sections"
                  className="flex flex-col gap-4"
                >
                  {project.sections.map((section, index) => (
                    <button
                      key={section.heading}
                      type="button"
                      onClick={() => scrollToSection(index)}
                      className="cursor-pointer text-left text-sm text-slate-400 transition-colors hover:text-blue-400 focus-visible:outline-2 focus-visible:outline-blue-400"
                    >
                      {section.heading}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={scrollToGallery}
                    className="cursor-pointer text-left text-sm text-slate-400 transition-colors hover:text-blue-400 focus-visible:outline-2 focus-visible:outline-blue-400"
                  >
                    Screenshots &amp; Visuals
                  </button>
                </nav>
              </div>
            </aside>

            {/* MAIN CASE STUDY */}
            <div className="min-w-0 max-w-3xl pt-8 lg:pt-0">
              {project.sections.map((section, index) => {
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
                    className="border-b border-white/10 pb-12 pt-4 first:pt-0 last:border-b-0 sm:pb-16"
                  >
                    {/* Section number */}
                    <p className="mb-4 font-mono text-xs text-blue-400 sm:mb-5">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    {/* Heading */}
                    <h2 className="mb-6 text-2xl font-semibold tracking-tight sm:mb-8 sm:text-4xl">
                      {section.heading}
                    </h2>

                    {/* Paragraphs */}
                    <div className="space-y-5 sm:space-y-6">
                      {section.paragraphs.map(
                        (paragraph, paragraphIndex) => (
                          <p
                            key={paragraphIndex}
                            className="text-base leading-8 text-slate-400"
                          >
                            {paragraph}
                          </p>
                        )
                      )}
                    </div>

                    {/* Architecture diagram */}
                    {showDiagram && (
                      <ArchitectureDiagram
                        projectId={project.id}
                      />
                    )}
                  </section>
                );
              })}

              {/* SCREENSHOT GALLERY */}
              <div
                id="project-gallery"
                className="border-t border-white/10 pb-8"
              >
                <ProjectGallery projectId={project.id} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREVIOUS / NEXT NAVIGATION */}
      <ProjectNavigation
        currentProjectId={project.id}
      />
    </main>
  );
}
