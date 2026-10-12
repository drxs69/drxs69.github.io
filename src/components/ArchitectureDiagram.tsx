
type ArchitectureDiagramProps = {
    projectId: number;
  };
  
  type DiagramNodeProps = {
    title: string;
    description: string;
    accent?: boolean;
  };
  
  function DiagramNode({
    title,
    description,
    accent = false,
  }: DiagramNodeProps) {
    return (
      <div
        className={`rounded-xl border p-5 text-center transition-colors duration-200 ${
          accent
            ? "border-blue-400/40 bg-blue-400/10"
            : "border-white/10 bg-[#151b26] hover:border-blue-400/30"
        }`}
      >
        <h4 className="text-sm font-semibold text-white">
          {title}
        </h4>
  
        <p className="mt-2 text-xs leading-5 text-slate-400">
          {description}
        </p>
      </div>
    );
  }
  
  function DownArrow() {
    return (
      <div
        aria-hidden="true"
        className="flex justify-center py-3 text-slate-500"
      >
        ↓
      </div>
    );
  }
  
  function DefectDetectionDiagram() {
    return (
      <div className="mx-auto max-w-2xl">
        <DiagramNode
          title="Browser / Webcam"
          description="Captures and submits inspection images"
          accent
        />
  
        <DownArrow />
  
        <DiagramNode
          title="Web / API Service"
          description="Flask API · Coordinates application requests"
        />
  
        <div className="grid grid-cols-2 gap-3 py-3 text-center text-slate-500">
          <span aria-hidden="true">↓</span>
          <span aria-hidden="true">↓</span>
        </div>
  
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DiagramNode
            title="Inference Service"
            description="TensorFlow · GOOD / BAD classification"
          />
  
          <DiagramNode
            title="Storage Service"
            description="SQLite · Inspection history and images"
          />
        </div>
  
        <div className="mt-8 border-t border-dashed border-white/15 pt-6">
          <DiagramNode
            title="Training Service"
            description="Model training and updates for inference"
          />
  
          <p className="mt-3 text-center text-xs leading-6 text-slate-500">
            The Training service maintains model artefacts
            that the Inference service can reload.
          </p>
        </div>
      </div>
    );
  }
  
  function ElderGuardDiagram() {
    const steps = [
      {
        title: "SQLite Database",
        description: "Environmental sensor measurements",
      },
      {
        title: "Data Preprocessing",
        description: "Cleaning, handling missing values and feature preparation",
      },
      {
        title: "Model Training",
        description: "Random Forest · Gradient Boosting · Logistic Regression",
      },
      {
        title: "Model Evaluation",
        description: "Accuracy · Macro F1 · Classification performance",
      },
      {
        title: "Saved Models",
        description: "Trained model artefacts for later use",
      },
    ];
  
    return (
      <div className="mx-auto max-w-lg">
        {steps.map((step, index) => (
          <div key={step.title}>
            {index > 0 && <DownArrow />}
  
            <DiagramNode
              title={step.title}
              description={step.description}
              accent={index === 0 || index === steps.length - 1}
            />
          </div>
        ))}
      </div>
    );
  }
  
  function TrainSurvivalDiagram() {
    const modules = [
      {
        title: "JourneyManager",
        description: "Travel and station phases",
      },
      {
        title: "EventManager",
        description: "Random event selection and timing",
      },
      {
        title: "TrainManager",
        description: "Train health, damage and repair",
      },
      {
        title: "Event Modules",
        description: "Bandits · Fires · Sandstorms",
      },
    ];
  
    return (
      <div className="mx-auto max-w-2xl">
        <DiagramNode
          title="Roblox Server"
          description="Authoritative gameplay and state management"
          accent
        />
  
        <DownArrow />
  
        <div className="grid gap-4 sm:grid-cols-2">
          {modules.map((module) => (
            <DiagramNode
              key={module.title}
              title={module.title}
              description={module.description}
            />
          ))}
        </div>
  
        <DownArrow />
  
        <DiagramNode
          title="ReplicatedStorage"
          description="Shared GameState values and RemoteEvents"
        />
  
        <DownArrow />
  
        <DiagramNode
          title="Player Clients"
          description="Journey timer · Event warnings · Game interfaces"
          accent
        />
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
  
    return (
      <div className="my-12 rounded-2xl border border-white/10 bg-[#10141c] p-5 sm:p-8">
        <div className="mb-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
            Technical Overview
          </p>
  
          <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {titles[projectId] ?? "System Architecture"}
          </h3>
  
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Simplified conceptual overview of the main
            components and their responsibilities.
          </p>
        </div>
  
        {projectId === 1 && <DefectDetectionDiagram />}
        {projectId === 2 && <ElderGuardDiagram />}
        {projectId === 3 && <TrainSurvivalDiagram />}
      </div>
    );
  }
  