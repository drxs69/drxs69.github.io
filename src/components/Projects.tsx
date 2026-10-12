
import { motion, useReducedMotion } from "motion/react";

import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  // Animation settings
  const revealTransition = {
    duration: 0.55,
    ease: "easeOut" as const,
  };

  return (
    <section
      id="projects"
      className="scroll-mt-24 py-28"
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Section heading */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={revealTransition}
          className="mb-12"
        >
          <p className="mb-4 text-xs uppercase tracking-widest text-blue-400">
            Selected Work
          </p>

          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Featured Projects
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-slate-400">
            A selection of academic and independent projects
            spanning artificial intelligence, software
            engineering and interactive systems.
          </p>
        </motion.div>

        {/* Animated project cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="h-full"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 24 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.55,
                delay: shouldReduceMotion
                  ? 0
                  : index * 0.1,
                ease: "easeOut",
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
