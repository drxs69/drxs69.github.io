
type SectionAtmosphereProps = {
    variant: "projects" | "about" | "skills";
  };
  
  const dataLines = [
    "M -100 120 C 220 20, 460 260, 800 130 S 1320 40, 1650 160",
    "M -100 250 C 250 370, 430 80, 820 250 S 1350 380, 1650 210",
    "M -100 390 C 280 260, 520 490, 840 340 S 1340 190, 1650 420",
    "M -100 530 C 260 660, 570 360, 920 540 S 1330 690, 1650 520",
  ];
  
  // Straight, circuit-board style traces.
  // Deliberately different from Skills' flowing curves.
  const circuitPaths = [
    "M 0 155 H 165 V 225 H 350",
    "M 1200 125 H 1050 V 205 H 885",
    "M 0 520 H 155 V 435 H 320",
    "M 1200 535 H 1060 V 455 H 895",
    "M 235 700 V 580 H 370 V 520",
    "M 1000 0 V 95 H 835 V 160",
  ];
  
  const circuitNodes = [
    [165, 155],
    [165, 225],
    [350, 225],
    [1050, 125],
    [1050, 205],
    [885, 205],
    [155, 520],
    [155, 435],
    [320, 435],
    [1060, 535],
    [1060, 455],
    [895, 455],
    [235, 580],
    [370, 580],
    [835, 95],
  ] as const;
  
  export default function SectionAtmosphere({
    variant,
  }: SectionAtmosphereProps) {
    return (
      <div
        aria-hidden="true"
        className={`atmosphere atmosphere-${variant} pointer-events-none absolute inset-0 z-0 overflow-hidden`}
      >
        {variant === "projects" && (
          <>
            {/* Original grid */}
            <div className="atmosphere-grid absolute inset-0" />
  
            {/* Original blue glow */}
            <div className="atmosphere-project-glow absolute -right-[20%] top-[5%] h-[65%] w-[80%] rounded-full bg-blue-600/10 blur-3xl" />
  
            {/* Original scanning line */}
            <div className="atmosphere-scan absolute left-[12%] right-[12%] top-[15%] h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
  
            {/* Original dotted field */}
            <svg
              viewBox="0 0 1200 700"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
            >
              <g fill="#60a5fa">
                {Array.from({ length: 16 }, (_, row) =>
                  Array.from({ length: 28 }, (_, col) => (
                    <circle
                      key={`${row}-${col}`}
                      cx={col * 46 + 10}
                      cy={row * 46 + 8}
                      r={
                        col % 5 === 0 && row % 4 === 0
                          ? 1.65
                          : 0.8
                      }
                      opacity={
                        col % 5 === 0 && row % 4 === 0
                          ? 0.45
                          : 0.12
                      }
                    />
                  ))
                )}
              </g>
            </svg>
  
            {/* NEW: Angular circuit traces */}
            <svg
              viewBox="0 0 1200 700"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient
                  id="project-circuit-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor="#3b82f6"
                    stopOpacity=".04"
                  />
                  <stop
                    offset="50%"
                    stopColor="#38bdf8"
                    stopOpacity=".23"
                  />
                  <stop
                    offset="100%"
                    stopColor="#22d3ee"
                    stopOpacity=".05"
                  />
                </linearGradient>
              </defs>
  
              {circuitPaths.map((path, index) => (
                <g key={index}>
                  <path
                    d={path}
                    fill="none"
                    stroke="url(#project-circuit-gradient)"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
  
                  <path
                    d={path}
                    fill="none"
                    stroke="#67e8f9"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeDasharray="12 1100"
                    className={`atmosphere-circuit-pulse atmosphere-circuit-pulse-${index}`}
                  />
                </g>
              ))}
  
              {circuitNodes.map(([x, y], index) => (
                <g key={index}>
                  <rect
                    x={x - 3}
                    y={y - 3}
                    width="6"
                    height="6"
                    rx="1"
                    fill="#38bdf8"
                    opacity=".4"
                    className={`atmosphere-circuit-node atmosphere-circuit-node-${index % 4}`}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="9"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth=".65"
                    opacity=".15"
                  />
                </g>
              ))}
            </svg>
  
            {/* NEW: Independent processor-style indicators */}
            <div className="absolute left-[6%] top-[35%] hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/35 xl:flex">
              <span className="atmosphere-status-dot h-1.5 w-1.5 rounded-full bg-cyan-400" />
              SYSTEMS ONLINE
            </div>
  
            <div className="absolute bottom-[24%] right-[6%] hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300/35 xl:flex">
              PROCESSING
              <span className="atmosphere-processing-bars flex h-3 items-end gap-[3px]">
                <i className="h-1 w-[3px] bg-blue-400" />
                <i className="h-2 w-[3px] bg-cyan-400" />
                <i className="h-3 w-[3px] bg-blue-400" />
                <i className="h-1.5 w-[3px] bg-cyan-400" />
              </span>
            </div>
  
            {/* Original edge fade */}
            <div className="atmosphere-fade absolute inset-0" />
          </>
        )}
  
        {variant === "about" && (
          <>
            {/* Existing atmospheric glow */}
            <div className="atmosphere-about-glow absolute -left-[15%] top-[4%] h-[80%] w-[70%] rounded-full bg-indigo-600/10 blur-3xl" />
  
            <div className="atmosphere-about-aura absolute left-[1%] top-1/2 h-[680px] w-[680px] -translate-y-1/2 rounded-full" />
  
            {/* Existing enhanced orbital system */}
            <div className="atmosphere-orbit-system absolute -left-36 top-1/2 h-[620px] w-[620px] -translate-y-1/2 opacity-55 md:left-[3%] lg:left-[8%]">
              <div className="absolute inset-[4%] rounded-full border border-dashed border-blue-400/[0.075]" />
  
              <div className="absolute left-1/2 top-[8%] h-[84%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-blue-300/[0.07] to-transparent" />
  
              <div className="absolute left-[8%] top-1/2 h-px w-[84%] -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-300/[0.07] to-transparent" />
  
              <div className="atmosphere-orbit atmosphere-orbit-outer absolute inset-0 rounded-full border border-blue-400/15">
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_18px_4px_rgba(59,130,246,0.55)]" />
  
                <span className="absolute bottom-[14%] right-[14%] h-1 w-1 rounded-full bg-blue-300/80 shadow-[0_0_12px_3px_rgba(96,165,250,0.4)]" />
  
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 h-full w-full"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="49.7"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth=".24"
                    strokeLinecap="round"
                    strokeDasharray="17 296"
                    opacity=".7"
                  />
                </svg>
              </div>
  
              <div className="atmosphere-orbit atmosphere-orbit-middle absolute inset-[15%] rounded-full border border-violet-400/20">
                <span className="absolute right-[8%] top-[13%] h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_16px_3px_rgba(167,139,250,0.45)]" />
  
                <span className="absolute bottom-[8%] left-[18%] h-1 w-1 rounded-full bg-violet-300/80 shadow-[0_0_10px_2px_rgba(167,139,250,0.35)]" />
  
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 h-full w-full"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="49.7"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth=".32"
                    strokeLinecap="round"
                    strokeDasharray="11 302"
                    opacity=".65"
                  />
                </svg>
              </div>
  
              <div className="atmosphere-orbit atmosphere-orbit-inner absolute inset-[31%] rounded-full border border-cyan-400/20">
                <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_3px_rgba(103,232,249,0.4)]" />
  
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 h-full w-full"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="49.7"
                    fill="none"
                    stroke="#67e8f9"
                    strokeWidth=".45"
                    strokeLinecap="round"
                    strokeDasharray="22 292"
                    opacity=".6"
                  />
                </svg>
              </div>
  
              <div className="atmosphere-core-wave atmosphere-core-wave-one absolute left-1/2 top-1/2 h-[14%] w-[14%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/30" />
  
              <div className="atmosphere-core-wave atmosphere-core-wave-two absolute left-1/2 top-1/2 h-[14%] w-[14%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/25" />
  
              <div className="atmosphere-core absolute inset-[43%] rounded-full border border-blue-300/15 bg-blue-500/5">
                <div className="absolute inset-[22%] rounded-full bg-cyan-400/10 blur-md" />
  
                <div className="absolute inset-[38%] rounded-full bg-cyan-200/50 shadow-[0_0_20px_5px_rgba(34,211,238,0.25)]" />
              </div>
  
              <span className="atmosphere-orbit-label absolute left-[11%] top-[20%] font-mono text-[10px] tracking-[0.18em] text-blue-300/45">
                AI / DATA
              </span>
  
              <span className="atmosphere-orbit-label atmosphere-orbit-label-two absolute right-[4%] top-[37%] font-mono text-[10px] tracking-[0.18em] text-violet-300/45">
                SYSTEMS
              </span>
  
              <span className="atmosphere-orbit-label atmosphere-orbit-label-three absolute bottom-[13%] left-[15%] font-mono text-[10px] tracking-[0.18em] text-cyan-300/45">
                SOFTWARE
              </span>
            </div>
  
            <div className="atmosphere-fade absolute inset-0" />
          </>
        )}
  
        {variant === "skills" && (
          <>
            {/* Original cyan atmospheric glow */}
            <div className="atmosphere-skills-glow absolute -right-[15%] top-[15%] h-[70%] w-[75%] rounded-full bg-cyan-600/10 blur-3xl" />
  
            {/* NEW: Second subtle indigo glow */}
            <div className="atmosphere-skills-secondary-glow absolute -left-[20%] bottom-[-30%] h-[70%] w-[70%] rounded-full bg-indigo-600/[0.055] blur-3xl" />
  
            {/* Original flowing streams, now with light trails */}
            <svg
              viewBox="0 0 1440 720"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient
                  id="skills-stream-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor="#2563eb"
                    stopOpacity="0"
                  />
                  <stop
                    offset="35%"
                    stopColor="#3b82f6"
                    stopOpacity=".14"
                  />
                  <stop
                    offset="65%"
                    stopColor="#22d3ee"
                    stopOpacity=".4"
                  />
                  <stop
                    offset="100%"
                    stopColor="#8b5cf6"
                    stopOpacity="0"
                  />
                </linearGradient>
  
                <radialGradient id="skills-particle-glow">
                  <stop
                    offset="0%"
                    stopColor="#67e8f9"
                    stopOpacity=".45"
                  />
                  <stop
                    offset="100%"
                    stopColor="#67e8f9"
                    stopOpacity="0"
                  />
                </radialGradient>
              </defs>
  
              {dataLines.map((path, index) => (
                <g key={index}>
                  {/* Original stream */}
                  <path
                    d={path}
                    fill="none"
                    stroke="url(#skills-stream-gradient)"
                    strokeWidth="1.5"
                    opacity=".7"
                  />
  
                  {/* Original moving dash */}
                  <path
                    d={path}
                    fill="none"
                    stroke="#67e8f9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="16 650"
                    className={`atmosphere-stream atmosphere-stream-${index}`}
                  />
  
                  {/* NEW: Smooth moving light point */}
                  <g
                    className={`atmosphere-skills-particle atmosphere-skills-particle-${index}`}
                  >
                    <circle
                      r="20"
                      fill="url(#skills-particle-glow)"
                    />
                    <circle
                      r="2.5"
                      fill="#a5f3fc"
                      opacity=".85"
                    />
  
                    <animateMotion
                      dur={`${14 + index * 3}s`}
                      begin={`-${index * 3}s`}
                      repeatCount="indefinite"
                      path={path}
                    />
                  </g>
                </g>
              ))}
            </svg>
  
            {/* NEW: Tiny ambient floating points */}
            <div className="atmosphere-skills-speck absolute left-[22%] top-[30%] h-1 w-1 rounded-full bg-cyan-300/50" />
  
            <div className="atmosphere-skills-speck atmosphere-skills-speck-two absolute right-[18%] top-[22%] h-1.5 w-1.5 rounded-full bg-blue-300/40" />
  
            <div className="atmosphere-skills-speck atmosphere-skills-speck-three absolute bottom-[24%] left-[47%] h-1 w-1 rounded-full bg-violet-300/50" />
  
            <div className="atmosphere-fade absolute inset-0" />
          </>
        )}
  
        <style>
          {`
            .atmosphere-grid {
              background-image:
                linear-gradient(
                  rgba(96,165,250,.045) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(96,165,250,.045) 1px,
                  transparent 1px
                );
  
              background-size: 64px 64px;
  
              -webkit-mask-image:
                radial-gradient(
                  ellipse at 58% 50%,
                  black,
                  transparent 78%
                );
  
              mask-image:
                radial-gradient(
                  ellipse at 58% 50%,
                  black,
                  transparent 78%
                );
  
              animation:
                atmosphere-grid-drift 24s linear infinite;
            }
  
            .atmosphere-fade {
              background:
                linear-gradient(
                  to bottom,
                  #090b10 0%,
                  transparent 22%,
                  transparent 76%,
                  #090b10 100%
                );
            }
  
            .atmosphere-project-glow {
              animation:
                atmosphere-glow-drift 12s
                ease-in-out infinite alternate;
            }
  
            .atmosphere-about-glow {
              animation:
                atmosphere-glow-drift 18s
                ease-in-out infinite alternate-reverse;
            }
  
            .atmosphere-skills-glow {
              animation:
                atmosphere-glow-drift 14s
                ease-in-out infinite alternate;
            }
  
            .atmosphere-skills-secondary-glow {
              animation:
                atmosphere-glow-drift 19s
                ease-in-out infinite alternate-reverse;
            }
  
            .atmosphere-scan {
              box-shadow:
                0 0 28px 3px rgba(34,211,238,.12);
  
              animation:
                atmosphere-scan-travel 11s
                ease-in-out infinite;
            }
  
            /*
             * PROJECTS: angular circuit signal movement
             */
            .atmosphere-circuit-pulse {
              animation:
                atmosphere-circuit-travel 12s
                linear infinite;
            }
  
            .atmosphere-circuit-pulse-1 {
              animation-duration: 16s;
              animation-delay: -4s;
            }
  
            .atmosphere-circuit-pulse-2 {
              animation-duration: 14s;
              animation-delay: -8s;
            }
  
            .atmosphere-circuit-pulse-3 {
              animation-duration: 18s;
              animation-delay: -6s;
            }
  
            .atmosphere-circuit-pulse-4 {
              animation-duration: 15s;
              animation-delay: -10s;
            }
  
            .atmosphere-circuit-pulse-5 {
              animation-duration: 17s;
              animation-delay: -2s;
            }
  
            .atmosphere-circuit-node {
              animation:
                atmosphere-node-blink 5s
                ease-in-out infinite;
            }
  
            .atmosphere-circuit-node-1 {
              animation-delay: -1.5s;
            }
  
            .atmosphere-circuit-node-2 {
              animation-delay: -3s;
            }
  
            .atmosphere-circuit-node-3 {
              animation-delay: -4s;
            }
  
            .atmosphere-status-dot {
              animation:
                atmosphere-status-pulse 2.8s
                ease-in-out infinite;
            }
  
            .atmosphere-processing-bars i {
              animation:
                atmosphere-processing 1.4s
                ease-in-out infinite alternate;
              transform-origin: bottom;
            }
  
            .atmosphere-processing-bars i:nth-child(2) {
              animation-delay: -.4s;
            }
  
            .atmosphere-processing-bars i:nth-child(3) {
              animation-delay: -.9s;
            }
  
            .atmosphere-processing-bars i:nth-child(4) {
              animation-delay: -.6s;
            }
  
            /*
             * ABOUT: existing orbit enhancements
             */
            .atmosphere-orbit-outer {
              animation:
                atmosphere-orbit-spin 45s
                linear infinite;
            }
  
            .atmosphere-orbit-middle {
              animation:
                atmosphere-orbit-spin 33s
                linear infinite reverse;
            }
  
            .atmosphere-orbit-inner {
              animation:
                atmosphere-orbit-spin 23s
                linear infinite;
            }
  
            .atmosphere-about-aura {
              background:
                radial-gradient(
                  circle,
                  rgba(34,211,238,.065) 0%,
                  rgba(79,70,229,.035) 32%,
                  transparent 69%
                );
  
              animation:
                atmosphere-aura-breathe 9s
                ease-in-out infinite;
            }
  
            .atmosphere-core-wave {
              opacity: 0;
  
              animation:
                atmosphere-core-ripple 5s
                ease-out infinite;
            }
  
            .atmosphere-core-wave-two {
              animation-delay: -2.5s;
            }
  
            .atmosphere-core {
              animation:
                atmosphere-core-breathe 4s
                ease-in-out infinite;
            }
  
            .atmosphere-orbit-label {
              animation:
                atmosphere-label-breathe 7s
                ease-in-out infinite;
            }
  
            .atmosphere-orbit-label-two {
              animation-delay: -2.2s;
            }
  
            .atmosphere-orbit-label-three {
              animation-delay: -4.4s;
            }
  
            /*
             * SKILLS: original flowing streams
             */
            .atmosphere-stream {
              animation:
                atmosphere-stream-flow 12s
                linear infinite;
            }
  
            .atmosphere-stream-1 {
              animation-delay: -3s;
              animation-duration: 15s;
            }
  
            .atmosphere-stream-2 {
              animation-delay: -7s;
              animation-duration: 13s;
            }
  
            .atmosphere-stream-3 {
              animation-delay: -10s;
              animation-duration: 17s;
            }
  
            .atmosphere-skills-speck {
              animation:
                atmosphere-speck-float 8s
                ease-in-out infinite;
            }
  
            .atmosphere-skills-speck-two {
              animation-delay: -3s;
            }
  
            .atmosphere-skills-speck-three {
              animation-delay: -5s;
            }
  
            /*
             * KEYFRAMES
             */
            @keyframes atmosphere-grid-drift {
              from {
                background-position: 0 0;
              }
  
              to {
                background-position: 64px 64px;
              }
            }
  
            @keyframes atmosphere-glow-drift {
              from {
                transform:
                  translate3d(-5%, -4%, 0);
              }
  
              to {
                transform:
                  translate3d(8%, 7%, 0);
              }
            }
  
            @keyframes atmosphere-scan-travel {
              0%, 100% {
                transform: translateY(-90px);
                opacity: 0;
              }
  
              20% {
                opacity: .7;
              }
  
              75% {
                opacity: .5;
              }
  
              90% {
                transform: translateY(460px);
                opacity: 0;
              }
            }
  
            @keyframes atmosphere-circuit-travel {
              from {
                stroke-dashoffset: 1112;
              }
  
              to {
                stroke-dashoffset: -1112;
              }
            }
  
            @keyframes atmosphere-node-blink {
              0%, 100% {
                opacity: .24;
              }
  
              40% {
                opacity: .65;
              }
  
              65% {
                opacity: .35;
              }
            }
  
            @keyframes atmosphere-status-pulse {
              0%, 100% {
                opacity: .35;
                box-shadow:
                  0 0 0 rgba(34,211,238,0);
              }
  
              50% {
                opacity: 1;
                box-shadow:
                  0 0 12px rgba(34,211,238,.7);
              }
            }
  
            @keyframes atmosphere-processing {
              from {
                transform: scaleY(.45);
                opacity: .4;
              }
  
              to {
                transform: scaleY(1.15);
                opacity: 1;
              }
            }
  
            @keyframes atmosphere-orbit-spin {
              to {
                transform: rotate(360deg);
              }
            }
  
            @keyframes atmosphere-aura-breathe {
              0%, 100% {
                transform: scale(.92);
                opacity: .55;
              }
  
              50% {
                transform: scale(1.1);
                opacity: 1;
              }
            }
  
            @keyframes atmosphere-core-ripple {
              0% {
                transform:
                  translate(-50%, -50%)
                  scale(.8);
                opacity: .65;
              }
  
              80% {
                opacity: .08;
              }
  
              100% {
                transform:
                  translate(-50%, -50%)
                  scale(5.5);
                opacity: 0;
              }
            }
  
            @keyframes atmosphere-core-breathe {
              0%, 100% {
                box-shadow:
                  0 0 15px rgba(34,211,238,.04);
  
                background-color:
                  rgba(59,130,246,.05);
              }
  
              50% {
                box-shadow:
                  0 0 34px rgba(34,211,238,.17);
  
                background-color:
                  rgba(59,130,246,.11);
              }
            }
  
            @keyframes atmosphere-label-breathe {
              0%, 100% {
                opacity: .45;
              }
  
              50% {
                opacity: 1;
              }
            }
  
            @keyframes atmosphere-stream-flow {
              from {
                stroke-dashoffset: 666;
              }
  
              to {
                stroke-dashoffset: -666;
              }
            }
  
            @keyframes atmosphere-speck-float {
              0%, 100% {
                transform: translate3d(0, 0, 0);
                opacity: .25;
              }
  
              50% {
                transform: translate3d(12px, -22px, 0);
                opacity: .9;
              }
            }
  
            /*
             * MOBILE
             */
            @media (max-width: 639px) {
              .atmosphere-orbit-system {
                opacity: .24;
                scale: .7;
              }
  
              .atmosphere-project-glow,
              .atmosphere-about-glow,
              .atmosphere-skills-glow {
                opacity: .6;
              }
  
              .atmosphere-scan {
                opacity: .3;
              }
  
              .atmosphere-about-aura {
                opacity: .35;
              }
  
              .atmosphere-orbit-label {
                display: none;
              }
            }
  
            /*
             * REDUCED MOTION
             */
            @media (prefers-reduced-motion: reduce) {
              .atmosphere-grid,
              .atmosphere-project-glow,
              .atmosphere-about-glow,
              .atmosphere-skills-glow,
              .atmosphere-skills-secondary-glow,
              .atmosphere-scan,
              .atmosphere-circuit-pulse,
              .atmosphere-circuit-node,
              .atmosphere-status-dot,
              .atmosphere-processing-bars i,
              .atmosphere-orbit,
              .atmosphere-about-aura,
              .atmosphere-core,
              .atmosphere-core-wave,
              .atmosphere-orbit-label,
              .atmosphere-stream,
              .atmosphere-skills-speck {
                animation: none !important;
              }
  
              .atmosphere-skills-particle {
                display: none;
              }
  
              .atmosphere-core-wave {
                opacity: 0;
              }
            }
          `}
        </style>
      </div>
    );
  }
  