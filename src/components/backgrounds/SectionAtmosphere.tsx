
type SectionAtmosphereProps = {
    variant: "projects" | "about" | "skills";
  };
  
  const dataLines = [
    "M -100 120 C 220 20, 460 260, 800 130 S 1320 40, 1650 160",
    "M -100 250 C 250 370, 430 80, 820 250 S 1350 380, 1650 210",
    "M -100 390 C 280 260, 520 490, 840 340 S 1340 190, 1650 420",
    "M -100 530 C 260 660, 570 360, 920 540 S 1330 690, 1650 520",
  ];
  
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
            <div className="atmosphere-grid absolute inset-0" />
  
            <div className="atmosphere-project-glow absolute -right-[20%] top-[5%] h-[65%] w-[80%] rounded-full bg-blue-600/10 blur-3xl" />
  
            <div className="atmosphere-scan absolute left-[12%] right-[12%] top-[15%] h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
  
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
                      r={col % 5 === 0 && row % 4 === 0 ? 1.65 : 0.8}
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
  
            <div className="atmosphere-fade absolute inset-0" />
          </>
        )}
  
        {variant === "about" && (
          <>
            <div className="atmosphere-about-glow absolute -left-[15%] top-[4%] h-[80%] w-[70%] rounded-full bg-indigo-600/10 blur-3xl" />
  
            <div className="atmosphere-orbit-system absolute -left-36 top-1/2 h-[620px] w-[620px] -translate-y-1/2 opacity-55 md:left-[3%] lg:left-[8%]">
              <div className="atmosphere-orbit atmosphere-orbit-outer absolute inset-0 rounded-full border border-blue-400/15">
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_18px_4px_rgba(59,130,246,0.55)]" />
              </div>
  
              <div className="atmosphere-orbit atmosphere-orbit-middle absolute inset-[15%] rounded-full border border-violet-400/20">
                <span className="absolute right-[8%] top-[13%] h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_16px_3px_rgba(167,139,250,0.45)]" />
              </div>
  
              <div className="atmosphere-orbit atmosphere-orbit-inner absolute inset-[31%] rounded-full border border-cyan-400/20">
                <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_3px_rgba(103,232,249,0.4)]" />
              </div>
  
              <div className="absolute inset-[43%] rounded-full border border-blue-300/10 bg-blue-500/5" />
            </div>
  
            <div className="atmosphere-fade absolute inset-0" />
          </>
        )}
  
        {variant === "skills" && (
          <>
            <div className="atmosphere-skills-glow absolute -right-[15%] top-[15%] h-[70%] w-[75%] rounded-full bg-cyan-600/10 blur-3xl" />
  
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
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
                  <stop offset="35%" stopColor="#3b82f6" stopOpacity=".14" />
                  <stop offset="65%" stopColor="#22d3ee" stopOpacity=".4" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
  
              {dataLines.map((path, index) => (
                <g key={index}>
                  <path
                    d={path}
                    fill="none"
                    stroke="url(#skills-stream-gradient)"
                    strokeWidth="1.5"
                    opacity=".7"
                  />
  
                  <path
                    d={path}
                    fill="none"
                    stroke="#67e8f9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="16 650"
                    className={`atmosphere-stream atmosphere-stream-${index}`}
                  />
                </g>
              ))}
            </svg>
  
            <div className="atmosphere-fade absolute inset-0" />
          </>
        )}
  
        <style>
          {`
            .atmosphere-grid {
              background-image:
                linear-gradient(rgba(96,165,250,.045) 1px, transparent 1px),
                linear-gradient(90deg, rgba(96,165,250,.045) 1px, transparent 1px);
              background-size: 64px 64px;
              -webkit-mask-image:
                radial-gradient(ellipse at 58% 50%, black, transparent 78%);
              mask-image:
                radial-gradient(ellipse at 58% 50%, black, transparent 78%);
              animation: atmosphere-grid-drift 24s linear infinite;
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
              animation: atmosphere-glow-drift 12s ease-in-out infinite alternate;
            }
  
            .atmosphere-about-glow {
              animation: atmosphere-glow-drift 18s ease-in-out infinite alternate-reverse;
            }
  
            .atmosphere-skills-glow {
              animation: atmosphere-glow-drift 14s ease-in-out infinite alternate;
            }
  
            .atmosphere-scan {
              box-shadow: 0 0 28px 3px rgba(34,211,238,.12);
              animation: atmosphere-scan-travel 11s ease-in-out infinite;
            }
  
            .atmosphere-orbit-outer {
              animation: atmosphere-orbit-spin 45s linear infinite;
            }
  
            .atmosphere-orbit-middle {
              animation: atmosphere-orbit-spin 33s linear infinite reverse;
            }
  
            .atmosphere-orbit-inner {
              animation: atmosphere-orbit-spin 23s linear infinite;
            }
  
            .atmosphere-stream {
              animation: atmosphere-stream-flow 12s linear infinite;
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
                transform: translate3d(-5%, -4%, 0);
              }
              to {
                transform: translate3d(8%, 7%, 0);
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
  
            @keyframes atmosphere-orbit-spin {
              to {
                transform: rotate(360deg);
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
            }
  
            @media (prefers-reduced-motion: reduce) {
              .atmosphere-grid,
              .atmosphere-project-glow,
              .atmosphere-about-glow,
              .atmosphere-skills-glow,
              .atmosphere-scan,
              .atmosphere-orbit,
              .atmosphere-stream {
                animation: none !important;
              }
            }
          `}
        </style>
      </div>
    );
  }
  