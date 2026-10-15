
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Section heading */}
        <div className="mb-10 sm:mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-blue-400"
            />

            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-400">
              Selected Work
            </p>
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Featured Projects
          </h2>

          <p className="mt-5 max-w-2xl text-[15px] leading-8 text-slate-400">
            A selection of academic and independent
            projects spanning artificial intelligence,
            software engineering and interactive systems.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
