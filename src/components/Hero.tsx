
import {
  motion,
  useReducedMotion,
} from "motion/react";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = Boolean(shouldReduceMotion);

  function reveal(delay: number) {
    return {
      initial: reduceMotion
        ? false
        : { opacity: 0, y: 28 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: reduceMotion ? 0 : 0.65,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    };
  }

  function scrollToProjects() {
    const target = document.getElementById(
      "page-projects"
    );

    if (!target) return;

    const destination =
      target.getBoundingClientRect().top +
      window.scrollY -
      80;

    window.scrollTo({
      top: Math.max(0, destination),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <section
      id="home"
      className="flex scroll-mt-20 items-center pb-12 pt-32 sm:pb-16 sm:pt-36 lg:pb-20 lg:pt-40"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-4xl">
          <motion.p
            {...reveal(0.1)}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-blue-400"
          >
            AI &amp; Data Engineering Student
          </motion.p>

          <motion.h1
            {...reveal(0.4)}
            className="text-4xl font-semibold leading-[1.12] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl"
          >
            Building software
            <br />
            for{" "}
            <span className="text-blue-400">
              real-world impact.
            </span>
          </motion.h1>

          <motion.p
            {...reveal(0.8)}
            className="mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8"
          >
            I'm a Diploma in AI &amp; Data Engineering
            student and aspiring software engineer.
            I enjoy building practical solutions through
            software, artificial intelligence and
            interactive systems.
          </motion.p>

          <motion.div
            {...reveal(1.15)}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button
              type="button"
              onClick={scrollToProjects}
              className="cursor-pointer rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
            >
              Explore Projects ↓
            </button>

            <a
              href="https://github.com/drxs69"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
            >
              GitHub Profile ↗
            </a>
          </motion.div>

          <motion.div
            {...reveal(1.5)}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-7 sm:mt-14"
          >
            <div>
              <p className="text-2xl font-semibold text-white">03</p>
              <p className="mt-1 text-sm text-slate-500">
                Featured Projects
              </p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-white">
                LFCA
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Linux Certified
              </p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-white">
                AI + SWE
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Areas of Interest
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
