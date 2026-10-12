
export default function About() {
    return (
      <section
        id="about"
        className="scroll-mt-24 border-t border-white/10 py-28"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-blue-400">
              About Me
            </p>
  
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              Curious by nature.
              <br />
              Driven to build.
            </h2>
          </div>
  
          <div className="space-y-6 leading-8 text-slate-400">
            <p>
              My background in AI & Data Engineering has given
              me experience working with machine learning,
              software systems and development tools.
            </p>
  
            <p>
              I'm especially interested in software engineering,
              backend development and the infrastructure that
              supports modern applications.
            </p>
  
            <p>
              I enjoy learning by building projects, solving
              technical challenges and exploring technologies
              beyond the classroom.
            </p>
          </div>
        </div>
      </section>
    );
  }
  