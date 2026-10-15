
export type ProjectSection = {
  heading: string;
  paragraphs: string[];
};

export type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  github?: string;
  originalRepository?: string;
  status: string;
  type: string;
  sections: ProjectSection[];
};
