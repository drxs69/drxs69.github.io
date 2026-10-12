
import { Link } from "react-router-dom";
import type { Project } from "../types/project";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-white/10 bg-[#10141c] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40">
      {/* Project number */}
      <div className="mb-12 flex items-center justify-between">
        <span className="font-mono text-sm text-slate-500">
          0{project.id} / 03
        </span>

        <span className="text-slate-500 transition-colors group-hover:text-blue-400">
          ↗
        </span>
      </div>

      {/* Project category */}
      <p className="mb-3 text-xs uppercase tracking-widest text-blue-400">
        {project.category}
      </p>

      {/* Project title */}
      <h3 className="mb-4 text-2xl font-semibold tracking-tight text-white">
        {project.title}
      </h3>

      {/* Project description */}
      <p className="mb-8 flex-grow leading-7 text-slate-400">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="mb-8 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-white/10 px-3 py-1 text-xs text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Link to project detail page */}
      <div className="border-t border-white/10 pt-5">
        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-blue-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
        >
          View Project
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
