
const API_BASE_URL = (
    import.meta.env.VITE_API_URL ||
    (
      import.meta.env.DEV
        ? "http://127.0.0.1:8000"
        : "https://drxs69-portfolio-api.onrender.com"
    )
  ).replace(/\/+$/, "");
  
  export interface ApiProject {
    id: number;
    title: string;
    category: string;
  }
  
  export interface HealthResponse {
    status: string;
    service: string;
    database?: string;
  }
  
  async function apiGet<T>(
    path: string,
    timeoutMs = 30000
  ): Promise<T> {
    const controller = new AbortController();
  
    const timeout = setTimeout(() => {
      controller.abort();
    }, timeoutMs);
  
    try {
      const response = await fetch(
        `${API_BASE_URL}${path}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        }
      );
  
      if (!response.ok) {
        throw new Error(
          `API request failed: HTTP ${response.status}`
        );
      }
  
      return (await response.json()) as T;
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === "AbortError"
      ) {
        throw new Error(
          "The backend took too long to respond.",
          { cause: error }
        );
      }
  
      throw error;
    } finally {
      clearTimeout(timeout);
    }
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
    return apiGet<ApiProject>(
      `/api/projects/${projectId}`
    );
  }
  