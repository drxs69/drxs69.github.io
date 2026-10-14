
import {
    motion,
    useReducedMotion,
  } from "motion/react";
  
  export default function ScrollCue() {
    const reduceMotion = Boolean(useReducedMotion());
  
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3 select-none"
      >
        {/* Animated label */}
        <motion.span
          className="whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-slate-300"
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.5, 1, 0.5],
                  y: [0, -2, 0],
                }
          }
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Scroll to explore
        </motion.span>
  
        {/* Mouse outline */}
        <div className="relative flex items-center justify-center">
          {/* Expanding halo */}
          {!reduceMotion && (
            <motion.div
              className="absolute inset-0 rounded-full border border-blue-400/60"
              animate={{
                scale: [1, 1.7, 1.7],
                opacity: [0.65, 0, 0],
              }}
              transition={{
                duration: 2.3,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
  
          {/* Mouse body */}
          <motion.div
            className="relative flex h-11 w-7 items-start justify-center rounded-full border border-blue-400/50 bg-blue-400/[0.035] pt-2"
            animate={
              reduceMotion
                ? undefined
                : {
                    borderColor: [
                      "rgba(96,165,250,0.4)",
                      "rgba(125,211,252,0.9)",
                      "rgba(96,165,250,0.4)",
                    ],
                    boxShadow: [
                      "0 0 4px rgba(96,165,250,0.05)",
                      "0 0 18px rgba(96,165,250,0.35)",
                      "0 0 4px rgba(96,165,250,0.05)",
                    ],
                  }
            }
            transition={{
              duration: 2.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Animated mouse wheel */}
            <motion.span
              className="h-2.5 w-1 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.85)]"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, 15, 15],
                      opacity: [1, 1, 0],
                      scaleY: [1, 0.8, 0.5],
                    }
              }
              transition={{
                duration: 1.65,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.65, 1],
                repeatDelay: 0.25,
              }}
            />
          </motion.div>
        </div>
  
        {/* More noticeable downward arrow */}
        <motion.span
          className="text-lg font-medium leading-none text-blue-400"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, 9, 0],
                  opacity: [0.45, 1, 0.45],
                }
          }
          transition={{
            duration: 1.65,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ↓
        </motion.span>
      </div>
    );
  }
  