
export type GalleryImage = {
    src: string;
    alt: string;
    caption: string;
  };
  
  export const galleries: Record<number, GalleryImage[]> = {
    // AI-Powered Defect Detection
    1: [
      {
        src: "/images/defect-detection/overview.png",
        alt: "Concept mockup of an AI defect detection interface",
        caption: "Prediction interface — conceptual placeholder",
      },
      {
        src: "/images/defect-detection/details.png",
        alt: "Concept mockup of inspection history",
        caption: "Inspection history — conceptual placeholder",
      },
    ],
  
    // ElderGuard Analytics
    2: [
      {
        src: "/images/elderguard/overview.png",
        alt: "Concept mockup of an analytics dashboard",
        caption: "Analytics dashboard — conceptual placeholder",
      },
      {
        src: "/images/elderguard/details.png",
        alt: "Illustrative machine learning performance charts",
        caption: "Model evaluation — illustrative placeholder",
      },
    ],
  
    // Train Survival
    3: [
      {
        src: "/images/train-survival/overview.png",
        alt: "Concept artwork of Train Survival gameplay",
        caption: "Train journey — concept art placeholder",
      },
      {
        src: "/images/train-survival/details.png",
        alt: "Concept artwork of a Train Survival bandit attack",
        caption: "Bandit attack — concept art placeholder",
      },
    ],
  };
  