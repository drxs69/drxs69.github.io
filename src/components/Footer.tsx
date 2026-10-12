
export default function Footer() {
    return (
      <footer className="border-t border-white/10 py-16">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 px-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Let's connect.
            </h2>
  
            <p className="mt-3 text-sm text-slate-400">
              Explore my projects and work on GitHub.
            </p>
          </div>
  
          <a
            href="https://github.com/drxs69"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white transition-colors hover:text-blue-400"
          >
            GitHub ↗
          </a>
        </div>
      </footer>
    );
  }
  