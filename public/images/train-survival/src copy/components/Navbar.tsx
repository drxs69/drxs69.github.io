
import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

type CursorStyle =
  | "rocket"
  | "neon"
  | "crosshair"
  | "terminal"
  | "comet"
  | "pixel"
  | "default";

const CURSOR_STORAGE_KEY = "drxs69-cursor-style";
const CURSOR_CHANGE_EVENT = "drxs69-cursor-change";

const navLinks = [
  { label: "Home", id: "page-home" },
  { label: "Projects", id: "page-projects" },
  { label: "About", id: "page-about" },
  { label: "Skills", id: "page-skills" },
];

const cursorOptions: {
  value: CursorStyle;
  label: string;
  description: string;
}[] = [
  {
    value: "rocket",
    label: "Rocket",
    description: "Animated rocket with idle floating",
  },
  {
    value: "neon",
    label: "Neon Ring",
    description: "Glowing dot and trailing ring",
  },
  {
    value: "crosshair",
    label: "Cyber Crosshair",
    description: "Rotating cyan targeting reticle",
  },
  {
    value: "terminal",
    label: "Terminal",
    description: "Blinking green command-line cursor",
  },
  {
    value: "comet",
    label: "Comet",
    description: "Glowing blue cursor with a light trail",
  },
  {
    value: "pixel",
    label: "Pixel Cursor",
    description: "Retro pixel-art pointer",
  },
  {
    value: "default",
    label: "System Default",
    description: "Your normal mouse pointer",
  },
];

function isCursorStyle(value: unknown): value is CursorStyle {
  return cursorOptions.some(
    (option) => option.value === value
  );
}

function getSavedCursorStyle(): CursorStyle {
  if (typeof window === "undefined") {
    return "rocket";
  }

  try {
    const saved = window.localStorage.getItem(
      CURSOR_STORAGE_KEY
    );

    if (isCursorStyle(saved)) {
      return saved;
    }
  } catch {
    // Keep the default if storage is unavailable.
  }

  return "rocket";
}

function scrollToTarget(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const destination =
    target.getBoundingClientRect().top +
    window.scrollY -
    80;

  window.scrollTo({
    top: Math.max(0, destination),
    behavior: prefersReducedMotion
      ? "auto"
      : "smooth",
  });
}

function SettingsIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 17h16" />
      <circle cx="9" cy="7" r="2" fill="#090b10" />
      <circle cx="15" cy="17" r="2" fill="#090b10" />
    </svg>
  );
}

function CursorOptionIcon({
  style,
}: {
  style: CursorStyle;
}) {
  if (style === "rocket") {
    return (
      <img
        src={`${import.meta.env.BASE_URL}rocket-cursor.png`}
        alt=""
        className="h-8 w-6 object-contain"
        draggable={false}
      />
    );
  }

  if (style === "neon") {
    return (
      <span className="relative flex h-7 w-7 items-center justify-center">
        <span className="absolute h-5 w-5 rounded-full border border-blue-400/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.7)]" />
      </span>
    );
  }

  if (style === "crosshair") {
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="14"
          cy="14"
          r="9"
          stroke="#22d3ee"
          strokeWidth="1.4"
          strokeDasharray="8 3"
        />
        <path
          d="M14 1V8M14 20V27M1 14H8M20 14H27"
          stroke="#a5f3fc"
          strokeWidth="1.5"
        />
        <circle cx="14" cy="14" r="2" fill="#ecfeff" />
      </svg>
    );
  }

  if (style === "terminal") {
    return (
      <span className="font-mono text-[24px] font-bold leading-none text-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.5)]">
        _
      </span>
    );
  }

  if (style === "comet") {
    return (
      <span className="relative flex h-7 w-7 items-center justify-center">
        <span className="absolute left-0.5 top-[15px] h-1 w-5 -rotate-45 rounded-full bg-gradient-to-r from-transparent to-sky-500/70 blur-[2px]" />
        <span className="absolute right-[5px] top-[5px] h-2 w-2 rounded-full bg-cyan-100 shadow-[0_0_10px_3px_rgba(56,189,248,0.65)]" />
      </span>
    );
  }

  if (style === "pixel") {
    return (
      <svg
        width="26"
        height="28"
        viewBox="0 0 18 20"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <path
          d="M1 1V17L5 13L8 19L11 18L8 12H16Z"
          fill="#a5f3fc"
          stroke="#0f172a"
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />
      </svg>
    );
  }

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-slate-300"
    >
      <path d="m4 3 15 9-7 1-3.5 7L4 3Z" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cursorStyle, setCursorStyle] =
    useState<CursorStyle>(getSavedCursorStyle);

  const settingsRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(
          event.target as Node
        )
      ) {
        setSettingsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSettingsOpen(false);
      }
    }

    document.addEventListener(
      "pointerdown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === CURSOR_STORAGE_KEY) {
        setCursorStyle(getSavedCursorStyle());
      }
    }

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  function changeCursorStyle(next: CursorStyle) {
    setCursorStyle(next);
    setSettingsOpen(false);

    try {
      window.localStorage.setItem(
        CURSOR_STORAGE_KEY,
        next
      );
    } catch {
      // The current session will still update.
    }

    window.dispatchEvent(
      new CustomEvent<CursorStyle>(
        CURSOR_CHANGE_EVENT,
        { detail: next }
      )
    );
  }

  function goToSection(id: string) {
    setMenuOpen(false);
    setSettingsOpen(false);

    if (location.pathname !== "/") {
      navigate("/", {
        state: {
          scrollTo: id,
        },
      });
      return;
    }

    scrollToTarget(id);
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
            goToSection("page-home");
          }}
          className="rounded-sm text-xl font-semibold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
        >
          drxs69
          <span className="text-blue-400">.</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => goToSection(link.id)}
              className="cursor-pointer rounded-sm text-sm text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right-side actions */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/drxs69"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-white/20 px-5 py-2 text-sm text-white transition-colors duration-200 hover:border-blue-400 hover:text-blue-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 md:inline-flex"
          >
            GitHub ↗
          </a>

          {/* Cursor settings */}
          <div
            ref={settingsRef}
            className="relative"
          >
            <button
              type="button"
              aria-label="Cursor settings"
              aria-haspopup="true"
              aria-expanded={settingsOpen}
              aria-controls="cursor-settings-menu"
              onClick={() => {
                setSettingsOpen((open) => !open);
                setMenuOpen(false);
              }}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 ${
                settingsOpen
                  ? "border-blue-400/60 bg-blue-400/10 text-blue-300"
                  : "border-white/20 text-slate-300 hover:border-blue-400/50 hover:bg-white/[0.05] hover:text-blue-300"
              }`}
            >
              <SettingsIcon />
            </button>

            {settingsOpen && (
              <div
                id="cursor-settings-menu"
                className="absolute right-0 top-[calc(100%+14px)] z-[80] flex max-h-[min(580px,calc(100dvh-110px))] w-[300px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-xl border border-white/[0.12] bg-[#101722] shadow-[0_22px_65px_rgba(0,0,0,0.5)]"
              >
                <div className="shrink-0 border-b border-white/[0.08] px-5 pb-3 pt-4">
                  <p className="text-sm font-semibold text-white">
                    Cursor Style
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Personalise how you explore.
                  </p>
                </div>

                <div
                  role="group"
                  aria-label="Choose cursor style"
                  className="min-h-0 space-y-1 overflow-y-auto overscroll-contain p-2"
                >
                  {cursorOptions.map((option) => {
                    const selected =
                      cursorStyle === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={selected}
                        onClick={() =>
                          changeCursorStyle(
                            option.value
                          )
                        }
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-400 ${
                          selected
                            ? "bg-blue-400/[0.10]"
                            : "hover:bg-white/[0.05]"
                        }`}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-[#0c111a]">
                          <CursorOptionIcon
                            style={option.value}
                          />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span
                            className={`block text-sm font-medium ${
                              selected
                                ? "text-blue-300"
                                : "text-slate-200"
                            }`}
                          >
                            {option.label}
                          </span>

                          <span className="mt-0.5 block text-[11px] leading-4 text-slate-500">
                            {option.description}
                          </span>
                        </span>

                        {selected && (
                          <span
                            aria-hidden="true"
                            className="text-blue-400"
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <p className="shrink-0 border-t border-white/[0.08] px-5 py-3 text-[11px] leading-5 text-slate-500">
                  Saved automatically. Custom cursors
                  are available with a mouse.
                </p>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={
              menuOpen ? "Close menu" : "Open menu"
            }
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((open) => !open);
              setSettingsOpen(false);
            }}
            className="cursor-pointer rounded-md border border-white/20 px-3 py-2 text-sm text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-[#090b10] px-6 py-5 md:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-w-6xl flex-col gap-5"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() =>
                  goToSection(link.id)
                }
                className="cursor-pointer text-left text-sm text-slate-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
              >
                {link.label}
              </button>
            ))}

            <a
              href="https://github.com/drxs69"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-blue-400"
            >
              GitHub ↗
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
