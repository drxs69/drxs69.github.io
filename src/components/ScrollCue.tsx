
export default function ScrollCue() {
    return (
      <div
        aria-hidden="true"
        className="portfolio-scroll-cue pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3 select-none"
      >
        <style>
          {`
            /* Subtle breathing effect on the label */
            .portfolio-scroll-cue-label {
              animation: scroll-cue-label 2.4s
                ease-in-out infinite;
            }
  
            @keyframes scroll-cue-label {
              0%, 100% {
                opacity: 0.7;
              }
  
              50% {
                opacity: 1;
              }
            }
  
            /* Mouse outline gently pulses */
            .portfolio-scroll-cue-mouse {
              position: relative;
              width: 28px;
              height: 44px;
              border: 1px solid rgba(96, 165, 250, 0.55);
              border-radius: 9999px;
              background: rgba(59, 130, 246, 0.035);
  
              animation: scroll-cue-mouse-glow 2.4s
                ease-in-out infinite;
            }
  
            @keyframes scroll-cue-mouse-glow {
              0%, 100% {
                border-color: rgba(96, 165, 250, 0.45);
                box-shadow: 0 0 5px rgba(96, 165, 250, 0.08);
              }
  
              50% {
                border-color: rgba(125, 211, 252, 0.9);
                box-shadow: 0 0 16px rgba(96, 165, 250, 0.28);
              }
            }
  
            /* Soft expanding ring outside the mouse */
            .portfolio-scroll-cue-halo {
              position: absolute;
              inset: -1px;
              border: 1px solid rgba(96, 165, 250, 0.4);
              border-radius: 9999px;
  
              animation: scroll-cue-halo 2.4s
                ease-out infinite;
            }
  
            @keyframes scroll-cue-halo {
              0% {
                transform: scale(1);
                opacity: 0.45;
              }
  
              70%, 100% {
                transform: scale(1.45);
                opacity: 0;
              }
            }
  
            /*
             * Mouse wheel:
             *
             * Travels 8px instead of 15px.
             * Never disappears completely.
             */
            .portfolio-scroll-cue-wheel {
              position: absolute;
              top: 8px;
              left: 50%;
  
              width: 4px;
              height: 10px;
  
              margin-left: -2px;
              border-radius: 9999px;
              background: #67e8f9;
  
              box-shadow:
                0 0 10px rgba(103, 232, 249, 0.75);
  
              animation: scroll-cue-wheel 1.9s
                ease-in-out infinite;
            }
  
            @keyframes scroll-cue-wheel {
              0%, 100% {
                transform: translateY(0);
                opacity: 1;
              }
  
              55% {
                transform: translateY(8px);
                opacity: 0.55;
              }
            }
  
            /* Arrow gently bounces down */
            .portfolio-scroll-cue-arrow {
              display: block;
              color: #60a5fa;
              font-size: 18px;
              line-height: 1;
  
              animation: scroll-cue-arrow 1.9s
                ease-in-out infinite;
            }
  
            @keyframes scroll-cue-arrow {
              0%, 100% {
                transform: translateY(0);
                opacity: 0.6;
              }
  
              55% {
                transform: translateY(7px);
                opacity: 1;
              }
            }
  
            @media (prefers-reduced-motion: reduce) {
              .portfolio-scroll-cue-label,
              .portfolio-scroll-cue-mouse,
              .portfolio-scroll-cue-halo,
              .portfolio-scroll-cue-wheel,
              .portfolio-scroll-cue-arrow {
                animation: none !important;
              }
  
              .portfolio-scroll-cue-halo {
                display: none;
              }
            }
          `}
        </style>
  
        {/* Label */}
        <span className="portfolio-scroll-cue-label whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-slate-300">
          Scroll to Explore
        </span>
  
        {/* Mouse and pulsing halo */}
        <div className="relative">
          <span className="portfolio-scroll-cue-halo" />
  
          <div className="portfolio-scroll-cue-mouse">
            <span className="portfolio-scroll-cue-wheel" />
          </div>
        </div>
  
        {/* Downward arrow */}
        <span className="portfolio-scroll-cue-arrow">
          ↓
        </span>
      </div>
    );
  }
  