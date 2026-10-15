
export default function AuroraBackground() {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[760px] overflow-hidden sm:h-[850px] lg:h-[920px]"
      >
        {/* Fade the entire effect downward */}
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 45%, transparent 92%)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 45%, transparent 92%)",
          }}
        >
          {/* Keep the left side clean for text */}
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 8%, rgba(0,0,0,0.2) 35%, black 75%)",
              maskImage:
                "linear-gradient(to right, transparent 8%, rgba(0,0,0,0.2) 35%, black 75%)",
            }}
          >
            <svg
              className="absolute -right-[12%] top-0 h-[650px] w-[115%] sm:-right-[6%] sm:h-[760px] sm:w-[100%]"
              viewBox="0 0 1440 800"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="aurora-blue-band"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#2563eb"
                    stopOpacity="0"
                  />
                  <stop
                    offset="36%"
                    stopColor="#2563eb"
                    stopOpacity=".13"
                  />
                  <stop
                    offset="65%"
                    stopColor="#3b82f6"
                    stopOpacity=".34"
                  />
                  <stop
                    offset="100%"
                    stopColor="#60a5fa"
                    stopOpacity="0"
                  />
                </linearGradient>
  
                <linearGradient
                  id="aurora-violet-band"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#8b5cf6"
                    stopOpacity="0"
                  />
                  <stop
                    offset="45%"
                    stopColor="#7c3aed"
                    stopOpacity=".10"
                  />
                  <stop
                    offset="75%"
                    stopColor="#a78bfa"
                    stopOpacity=".25"
                  />
                  <stop
                    offset="100%"
                    stopColor="#6366f1"
                    stopOpacity="0"
                  />
                </linearGradient>
  
                <linearGradient
                  id="aurora-cyan-band"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#06b6d4"
                    stopOpacity="0"
                  />
                  <stop
                    offset="42%"
                    stopColor="#0891b2"
                    stopOpacity=".09"
                  />
                  <stop
                    offset="72%"
                    stopColor="#67e8f9"
                    stopOpacity=".23"
                  />
                  <stop
                    offset="100%"
                    stopColor="#22d3ee"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
  
              {/* Wide blue flowing band */}
              <g className="aurora-band aurora-band-blue">
                <path
                  d="
                    M 400 380
                    C 680 155, 865 255, 1050 190
                    C 1245 125, 1410 110, 1600 180
                    L 1600 370
                    C 1380 290, 1200 325, 1040 395
                    C 840 475, 650 350, 400 575
                    Z
                  "
                  fill="url(#aurora-blue-band)"
                />
              </g>
  
              {/* Violet band overlaps from below */}
              <g className="aurora-band aurora-band-violet">
                <path
                  d="
                    M 370 510
                    C 610 350, 780 515, 1000 325
                    C 1210 160, 1420 210, 1610 280
                    L 1610 455
                    C 1390 390, 1260 315, 1025 510
                    C 805 685, 630 520, 370 680
                    Z
                  "
                  fill="url(#aurora-violet-band)"
                />
              </g>
  
              {/* Thin cyan highlight band */}
              <g className="aurora-band aurora-band-cyan">
                <path
                  d="
                    M 530 330
                    C 740 160, 915 275, 1090 145
                    C 1260 45, 1450 95, 1620 155
                    L 1620 250
                    C 1420 185, 1300 155, 1110 275
                    C 925 395, 740 300, 530 445
                    Z
                  "
                  fill="url(#aurora-cyan-band)"
                />
              </g>
            </svg>
          </div>
        </div>
  
        <style>
          {`
            /*
             * Animations are intentionally noticeable:
             * larger travel distances and shorter cycles.
             */
  
            @keyframes aurora-blue-motion {
              0%, 100% {
                transform: translate3d(0, 0, 0) rotate(0deg);
              }
  
              50% {
                transform: translate3d(-85px, 55px, 0)
                  rotate(-4deg);
              }
            }
  
            @keyframes aurora-violet-motion {
              0%, 100% {
                transform: translate3d(0, 0, 0) rotate(0deg);
              }
  
              50% {
                transform: translate3d(65px, -65px, 0)
                  rotate(4deg);
              }
            }
  
            @keyframes aurora-cyan-motion {
              0%, 100% {
                transform: translate3d(0, 0, 0) rotate(0deg);
              }
  
              50% {
                transform: translate3d(-95px, 45px, 0)
                  rotate(-3deg);
              }
            }
  
            .aurora-band {
              transform-box: fill-box;
              transform-origin: center;
            }
  
            .aurora-band-blue {
              animation: aurora-blue-motion 8s
                ease-in-out infinite;
            }
  
            .aurora-band-violet {
              animation: aurora-violet-motion 11s
                ease-in-out infinite;
            }
  
            .aurora-band-cyan {
              animation: aurora-cyan-motion 9s
                ease-in-out infinite;
            }
  
            @media (max-width: 639px) {
              .aurora-band-violet {
                opacity: 0.7;
              }
  
              .aurora-band-cyan {
                opacity: 0.6;
              }
            }
  
            @media (prefers-reduced-motion: reduce) {
              .aurora-band {
                animation: none !important;
              }
            }
          `}
        </style>
      </div>
    );
  }
  