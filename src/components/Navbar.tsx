
import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { label: "Home", section: "home" },
    { label: "Projects", section: "projects" },
    { label: "About", section: "about" },
    { label: "Skills", section: "skills" },
  ];

  function scrollToSection(section: string) {
    setMenuOpen(false);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (location.pathname !== "/") {
      // The new homepage handles scrolling
      // after the route transition.
      navigate("/", {
        state: { scrollTo: section },
      });
      return;
    }

    // Already on the homepage:
    // scroll without changing routes.
    document
      .getElementById(section)
      ?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090b10]/95 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6"
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("home");
          }}
          className="text-xl font-semibold tracking-tight text-white"
        >
          drxs69<span className="text-blue-400">.</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => scrollToSection(link.section)}
              className="cursor-pointer text-sm text-slate-400 transition-colors duration-200 hover:text-white focus-visible:text-white"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* GitHub */}
        <a
          href="https://github.com/drxs69"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full border border-white/20 px-5 py-2 text-sm text-white transition-colors duration-200 hover:border-blue-400 md:inline-flex"
        >
          GitHub ↗
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="cursor-pointer rounded-md border border-white/20 px-3 py-2 text-sm text-white md:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-[#090b10] px-6 py-5 md:hidden"
        >
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => scrollToSection(link.section)}
                className="cursor-pointer text-left text-slate-300 transition-colors hover:text-white"
              >
                {link.label}
              </button>
            ))}

            <a
              href="https://github.com/drxs69"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="text-blue-400"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
