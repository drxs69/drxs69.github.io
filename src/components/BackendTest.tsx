
import { useEffect, useState } from "react";
import {
  getHealth,
  getProjects,
  type ApiProject,
} from "../api/portfolioApi";

export default function BackendTest() {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [service, setService] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const [health, projectData] = await Promise.all([
          getHealth(),
          getProjects(),
        ]);

        if (cancelled) return;

        setService(health.service);
        setProjects(projectData);
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to connect to backend"
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mx-auto my-10 max-w-3xl rounded-xl border border-slate-500/30 p-6">
      <h2 className="mb-3 text-2xl font-bold">
        Backend Connection Test
      </h2>

      {loading && (
        <p>Connecting to FastAPI...</p>
      )}

      {error && (
        <p className="text-red-500">
          Connection failed: {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <p className="mb-4 text-green-500">
            Connected to {service}
          </p>

          <h3 className="mb-2 font-semibold">
            Projects from API:
          </h3>

          <ul className="list-inside list-disc space-y-1">
            {projects.map((project) => (
              <li key={project.id}>
                {project.title} — {project.category}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
