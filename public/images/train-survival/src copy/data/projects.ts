
import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Defect Detection",
    category: "AI / Software Engineering",
    description:
      "A microservices-based computer vision system for product image classification and inspection management.",
    technologies: [
      "Python",
      "TensorFlow",
      "Flask",
      "Docker",
      "Kubernetes",
      "SQLite",
    ],
    github:
      "https://github.com/drxs69/AI-Defect-Detection-Showcase",
    originalRepository:
      "https://github.com/JavierTanHL/EGT307_Project",
    status: "Academic Project",
    type: "Team Project",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "This academic final-year project explored how computer vision and microservices can be combined to create a modular product inspection system.",
          "The application allows users to capture images through a browser, classify them using a trained model, and manage inspection records through a web interface.",
          "The system performs whole-image GOOD/BAD classification rather than identifying the exact location of a defect.",
        ],
      },
      {
        heading: "My Contributions",
        paragraphs: [
          "I contributed extensively to the implementation, integration, debugging and testing of the Web/API, Inference and Storage services.",
          "My work involved helping connect the services through API communication, troubleshooting application behaviour and supporting the overall system integration.",
          "This was a collaborative project with formally assigned service responsibilities. The original team repository preserves the official contribution credits.",
        ],
      },
      {
        heading: "System Architecture",
        paragraphs: [
          "The application uses four services: Web/API, Inference, Storage and Training.",
          "The Web/API service handles browser interactions and coordinates requests. The Inference service processes images using a TensorFlow model. The Storage service maintains inspection data using SQLite. The Training service supports model training and updates.",
          "Docker Compose was used for containerised execution, while Kubernetes was explored for container orchestration and inference scaling.",
        ],
      },
      {
        heading: "Challenges & Lessons Learned",
        paragraphs: [
          "Integrating independently developed services required careful attention to API contracts, communication between containers and consistent application behaviour.",
          "Image classification reliability also depended on the quality of the training data and consistency of captured images.",
          "The project strengthened my understanding of microservices, REST APIs, containerisation, collaborative development and practical machine learning integration.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "ElderGuard Analytics",
    category: "Machine Learning / Data Engineering",
    description:
      "A machine learning pipeline for classifying activity levels using environmental sensor data.",
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "SQLite",
      "Docker",
    ],
    github: "https://github.com/drxs69/EGT309-Project",
    status: "Academic Project",
    type: "Team Project",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "ElderGuard Analytics is a machine learning project exploring the classification of activity levels using environmental sensor data.",
          "The project processes stored sensor measurements and predicts Low, Moderate or High activity levels through a structured machine learning pipeline.",
        ],
      },
      {
        heading: "Machine Learning Pipeline",
        paragraphs: [
          "The pipeline includes data ingestion from SQLite, preprocessing, feature preparation, model training and evaluation.",
          "Random Forest, Gradient Boosting and Logistic Regression were explored as classification approaches.",
          "The workflow emphasised reproducible data processing and evaluation rather than simply obtaining the highest possible accuracy.",
        ],
      },
      {
        heading: "Technical Challenges",
        paragraphs: [
          "One important challenge was class imbalance, with fewer examples of certain activity levels.",
          "This made overall accuracy insufficient as the only measure of model performance. Macro F1 was also considered to better understand performance across classes.",
          "Handling missing values, unusual sensor readings and feature preparation were important parts of producing meaningful model inputs.",
        ],
      },
      {
        heading: "Collaboration & Learning",
        paragraphs: [
          "This was a collaborative academic project involving data ingestion, exploratory analysis, preprocessing, model training, evaluation and pipeline integration.",
          "Individual responsibilities will be documented using the original team's contribution records to ensure accurate attribution.",
          "The project provided practical experience with the complete machine learning workflow, particularly data quality, imbalanced classification and model evaluation.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Train Survival",
    category: "Game Development / Software Engineering",
    description:
      "An independent multiplayer Roblox survival game featuring random events, enemy AI and modular gameplay systems.",
    technologies: [
      "Luau",
      "Roblox Studio",
      "Client-Server Architecture",
      "RemoteEvents",
      "Game Systems",
    ],
    status: "In Development",
    type: "Independent Project",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Train Survival is an independently developed multiplayer survival game built using Roblox Studio and Luau.",
          "Players travel aboard a train while encountering random events that threaten its survival. They must respond to hazards, defend the train and manage its health.",
          "The project is an ongoing exploration of modular game architecture, multiplayer state management and event-driven programming.",
        ],
      },
      {
        heading: "Gameplay Systems",
        paragraphs: [
          "The game uses journey and station phases to control gameplay progression.",
          "Random events include bandit attacks, train fires and sandstorms. Enemy AI targets the train, while players can interact with repair and fire-extinguishing mechanics.",
          "The train health system controls damage, repair and game-over behaviour.",
        ],
      },
      {
        heading: "Software Architecture",
        paragraphs: [
          "The game uses modular Luau scripts to separate responsibilities such as train health management, journey progression and random event execution.",
          "Key modules include TrainManager, JourneyManager, EventManager and TrainFire.",
          "ReplicatedStorage, RemoteEvents and shared game-state values support communication between the server and player interfaces.",
        ],
      },
      {
        heading: "Technical Challenges",
        paragraphs: [
          "A major challenge involved coordinating random events with the journey and station lifecycle.",
          "The fire system also required tracking individual fire points so multiple fires could exist simultaneously without repeatedly activating an already burning location.",
          "Developing these systems has strengthened my understanding of state management, asynchronous game logic, debugging and client-server programming.",
        ],
      },
      {
        heading: "Current Development",
        paragraphs: [
          "Train Survival remains in active development. Future improvements may include more event types, progression systems, balancing and additional interface refinements.",
          "The project will be updated as new mechanics are implemented and tested.",
        ],
      },
    ],
  },
];
