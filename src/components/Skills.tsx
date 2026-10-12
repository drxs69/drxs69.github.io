
const skills = [
    "Python",
    "TypeScript",
    "SQL",
    "Luau",
    "React",
    "Linux",
    "Docker",
    "Kubernetes",
    "Git",
    "Machine Learning",
    "REST APIs",
    "Microservices",
  ];
  
  export default function Skills() {
    return (
      <section
        id="skills"
        className="scroll-mt-24 border-t border-white/10 py-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-xs uppercase tracking-widest text-blue-400">
            Technical Background
          </p>
  
          <h2 className="mb-10 text-4xl font-semibold tracking-tight text-white">
            Tools & Technologies
          </h2>
  
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-white/10 bg-[#10141c] px-5 py-3 text-sm text-slate-300 transition-colors hover:border-blue-400/40 hover:text-white"
              >
                {skill}
              </span>
            ))}
          </div>
  
          <div className="mt-12 border-l-2 border-blue-400 pl-6">
            <p className="text-sm text-slate-500">
              Certification
            </p>
  
            <h3 className="mt-2 text-xl font-semibold text-white">
              Linux Foundation Certified IT Associate
            </h3>
  
            <p className="mt-2 text-sm text-slate-400">
              LFCA · Linux Foundation
            </p>
          </div>
        </div>
      </section>
    );
  }
  