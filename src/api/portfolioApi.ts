
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export interface ApiProject {
  id: number;
  title: string;
  category: string;
}

export interface HealthResponse {
  status: string;
  service: string;
}

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return (await response.json()) as T;
}

export function getHealth(): Promise<HealthResponse> {
  return apiGet<HealthResponse>("/api/health");
}

export function getProjects(): Promise<ApiProject[]> {
  return apiGet<ApiProject[]>("/api/projects");
}

export function getProject(
  projectId: number
): Promise<ApiProject> {
  return apiGet<ApiProject>(`/api/projects/${projectId}`);
}
