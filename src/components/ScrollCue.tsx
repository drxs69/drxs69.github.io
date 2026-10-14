
import { motion, useReducedMotion } from "motion/react";

export default function ScrollCue() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3 select-none"
    >
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-slate-400">
        Scroll to explore
      </span>

      <div className="relative flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-2">
        <motion.span
          className="h-2 w-1 rounded-full bg-blue-400 shadow-[0_0_9px_rgba(96,165,250,0.55)]"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, 11, 0],
                  opacity: [1, 0.3, 1],
                }
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.span
        className="text-sm text-blue-400/75"
        animate={
          reduceMotion
            ? undefined
            : { y: [0, 5, 0] }
        }
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ↓
      </motion.span>
    </div>
  );
}
