
type ArchitectureDiagramProps = {
  projectId: number;
};

type Tone = "blue" | "cyan" | "violet" | "neutral";

type DiagramNodeProps = {
  title: string;
  description: string;
  number?: string;
  tone?: Tone;
  label?: string;
  className?: string;
};

const tones: Record<
  Tone,
  {
    border: string;
    glow: string;
    badge: string;
    dot: string;
  }
> = {
  blue: {
    border: "border-blue-400/35",
    glow: "from-blue-500/[0.12]",
    badge: "text-blue-300",
    dot: "bg-blue-400",
  },
  cyan: {
    border: "border-cyan-400/30",
    glow: "from-cyan-500/[0.10]",
    badge: "text-cyan-300",
    dot: "bg-cyan-400",
  },
  violet: {
    border: "border-violet-400/30",
    glow: "from-violet-500/[0.10]",
    badge: "text-violet-300",
    dot: "bg-violet-400",
  },
  neutral: {
    border: "border-white/[0.10]",
    glow: "from-slate-500/[0.05]",
    badge: "text-slate-400",
    dot: "bg-slate-400",
  },
};

function DiagramNode({
  title,
  description,
  number,
  tone = "neutral",
  label,
  className = "",
}: DiagramNodeProps) {
  const color = tones[tone];

  return (
    <div
      className={`group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-[#111824] p-4 transition-colors duration-300 hover:border-blue-400/40 sm:p-5 ${color.border} ${className}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${color.glow} via-transparent to-transparent`}
      />

      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${color.dot}`}
          />

          <span
            className={`font-mono text-[10px] font-medium uppercase tracking-[0.15em] ${color.badge}`}
          >
            {label ?? "Component"}
          </span>
        </div>

        {number && (
          <span className="font-mono text-[10px] text-slate-600">
            {number}
          </span>
        )}
      </div>

      <h4 className="relative z-10 mt-5 text-[15px] font-semibold leading-snug text-white">
        {title}
      </h4>

      <p className="relative z-10 mt-2 text-[13px] leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}

function VerticalConnector({
  label,
}: {
  label?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col items-center"
    >
      <div className="h-6 w-px bg-gradient-to-b from-blue-400/50 to-blue-400/20" />

      {label && (
        <span className="max-w-full px-3 py-1 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-slate-500">
          {label}
        </span>
      )}

      <div className="h-4 w-px bg-blue-400/25" />

      <div className="h-0 w-0 border-x-[4px] border-t-[6px] border-x-transparent border-t-blue-400/60" />
    </div>
  );
}

function DiagramCaption({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="mt-5 text-center text-xs leading-6 text-slate-500">
      {children}
    </p>
  );
}

function DefectDetectionDiagram() {
  return (
    <div className="mx-auto w-full max-w-[880px]">
      <div className="mx-auto max-w-[440px]">
        <DiagramNode
          title="Browser / Webcam"
          description="Captures inspection images and presents classification results."
          number="01"
          tone="blue"
          label="Client"
        />

        <VerticalConnector label="Image request / response" />

        <DiagramNode
          title="Web / API Service"
          description="Flask application coordinating requests between system services."
          number="02"
          tone="blue"
          label="Application"
        />
      </div>

      <VerticalConnector label="Service communication" />

      <div className="grid gap-4 sm:grid-cols-2">
        <DiagramNode
          title="Inference Service"
          description="Loads a trained TensorFlow model and performs whole-image GOOD / BAD classification."
          number="03"
          tone="cyan"
          label="Prediction"
        />

        <DiagramNode
          title="Storage Service"
          description="Manages inspection records, image data and SQLite storage."
          number="04"
          tone="violet"
          label="Persistence"
        />
      </div>

      <div className="mt-8 rounded-xl border border-dashed border-white/15 bg-white/[0.025] p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-6 bg-violet-400/60" />

          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.17em] text-violet-300">
            Offline model lifecycle
          </p>
        </div>

        <DiagramNode
          title="Training Service"
          description="Trains and updates model artefacts that can subsequently be loaded by the Inference service."
          number="05"
          tone="violet"
          label="Model preparation"
        />

        <div className="mt-4 flex items-center gap-2 text-xs leading-6 text-slate-400">
          <span
            aria-hidden="true"
            className="inline-block w-8 shrink-0 border-t border-dashed border-violet-400/60"
          />

          Model artefacts are prepared separately from live image requests.
        </div>
      </div>

      <DiagramCaption>
        Simplified logical architecture. Service connections
        represent communication responsibilities, not exact
        deployment topology.
      </DiagramCaption>
    </div>
  );
}

function ElderGuardDiagram() {
  const steps: {
    title: string;
    description: string;
    tone: Tone;
    label: string;
  }[] = [
    {
      title: "SQLite Database",
      description:
        "Environmental sensor measurements provide the source data.",
      tone: "blue",
      label: "Data source",
    },
    {
      title: "Data Preprocessing",
      description:
        "Handle missing values, clean features and prepare model inputs.",
      tone: "neutral",
      label: "Preparation",
    },
    {
      title: "Model Training",
      description:
        "Compare Random Forest, Gradient Boosting and Logistic Regression.",
      tone: "cyan",
      label: "Machine learning",
    },
    {
      title: "Model Evaluation",
      description:
        "Assess accuracy, macro F1 and classification performance.",
      tone: "neutral",
      label: "Validation",
    },
    {
      title: "Saved Models",
      description:
        "Store trained model artefacts for later use.",
      tone: "violet",
      label: "Output",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[680px]">
      {steps.map((step, index) => (
        <div key={step.title}>
          {index > 0 && <VerticalConnector />}

          <DiagramNode
            title={step.title}
            description={step.description}
            number={String(index + 1).padStart(2, "0")}
            tone={step.tone}
            label={step.label}
          />
        </div>
      ))}

      <DiagramCaption>
        A simplified view of the experimentation and model
        development workflow.
      </DiagramCaption>
    </div>
  );
}

function TrainSurvivalDiagram() {
  const modules = [
    {
      title: "JourneyManager",
      description: "Travel phases, stations and journey progression.",
    },
    {
      title: "EventManager",
      description: "Random event selection, scheduling and timing.",
    },
    {
      title: "TrainManager",
      description: "Train health, damage, repair and destruction state.",
    },
    {
      title: "Event Modules",
      description: "Bandit attacks, train fires and sandstorm events.",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[880px]">
      <div className="mx-auto max-w-[460px]">
        <DiagramNode
          title="Roblox Server"
          description="Runs authoritative gameplay logic and manages the shared game session."
          number="01"
          tone="blue"
          label="Server"
        />
      </div>

      <VerticalConnector label="Server-side systems" />

      <div className="grid gap-4 sm:grid-cols-2">
        {modules.map((module, index) => (
          <DiagramNode
            key={module.title}
            title={module.title}
            description={module.description}
            number={String(index + 2).padStart(2, "0")}
            tone={index === 3 ? "violet" : "neutral"}
            label="Gameplay logic"
          />
        ))}
      </div>

      <VerticalConnector label="Shared state / events" />

      <div className="mx-auto max-w-[460px]">
        <DiagramNode
          title="ReplicatedStorage"
          description="Shared GameState values and RemoteEvents available to the client-server system."
          number="06"
          tone="cyan"
          label="Communication"
        />

        <VerticalConnector label="State updates / notifications" />

        <DiagramNode
          title="Player Clients"
          description="Display journey timers, event announcements, health indicators and gameplay interfaces."
          number="07"
          tone="blue"
          label="Interface"
        />
      </div>

      <DiagramCaption>
        Conceptual server-client structure. This shows
        system responsibilities rather than every script
        or individual RemoteEvent.
      </DiagramCaption>
    </div>
  );
}

export default function ArchitectureDiagram({
  projectId,
}: ArchitectureDiagramProps) {
  const titles: Record<number, string> = {
    1: "Microservices Architecture",
    2: "Machine Learning Pipeline",
    3: "Gameplay System Architecture",
  };

  const subtitles: Record<number, string> = {
    1: "How image requests, prediction, storage and model preparation fit together.",
    2: "From environmental measurements to trained and evaluated models.",
    3: "How server systems coordinate events and communicate with players.",
  };

  return (
    <div className="relative my-12 overflow-hidden rounded-2xl border border-white/10 bg-[#0e131d] p-4 sm:p-8 lg:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-48 h-[420px] w-[520px] rounded-full bg-blue-600/[0.07] blur-3xl"
      />

      <div className="relative z-10 mb-9 border-b border-white/[0.08] pb-8 sm:mb-10">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.6)]" />

          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-blue-400">
            System Visualization
          </p>
        </div>

        <h3 className="text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
          {titles[projectId] ?? "System Architecture"}
        </h3>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          {subtitles[projectId] ??
            "Simplified overview of the system components and their responsibilities."}
        </p>
      </div>

      <div className="relative z-10">
        {projectId === 1 && <DefectDetectionDiagram />}
        {projectId === 2 && <ElderGuardDiagram />}
        {projectId === 3 && <TrainSurvivalDiagram />}
      </div>
    </div>
  );
}
