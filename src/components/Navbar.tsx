
import { useEffect, useRef, useState } from "react";
import { resetPreferences, setPreference, usePreferences } from "../preferences";
import type { Preferences } from "../preferences";
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
    return "default";
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

  return "default";
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
      <circle cx="9" cy="7" r="2" fill="var(--portfolio-surface, #090b10)" />
      <circle cx="15" cy="17" r="2" fill="var(--portfolio-surface, #090b10)" />
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
      <svg width="30" height="30" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <g stroke="#67e8f9" strokeWidth="1.35" strokeLinecap="round">
          <path d="M18 1V9M18 27V35M1 18H9M27 18H35" />
        </g>
        <circle cx="18" cy="18" r="11.5" stroke="#22d3ee" strokeWidth="1.6" strokeDasharray="11 6 3 7"/>
        <circle cx="18" cy="18" r="7.8" stroke="#a5f3fc" strokeWidth="1.2" />
        <circle cx="18" cy="18" r="2" fill="#efffff" />
      </svg>
    );
  }

  if (style === "terminal") {
    return (
      <svg width="30" height="26" viewBox="0 0 30 26" fill="none" aria-hidden="true">
        <rect x="1" y="3" width="28" height="20" rx="4" fill="#081b14" stroke="#4ade80" strokeOpacity=".85"/>
        <path d="M6 9L11 13L6 17" stroke="#86efac" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 18H22" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="25" cy="7" r="1.3" fill="#4ade80"/>
      </svg>
    );
  }

  if (style === "comet") {
    return (
      <svg width="31" height="30" viewBox="0 0 32 30" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="prefs-comet-trail" x1="2" y1="26" x2="25" y2="7" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0284c7" stopOpacity="0"/>
            <stop offset=".65" stopColor="#22d3ee" stopOpacity=".65"/>
            <stop offset="1" stopColor="#e0f2fe"/>
          </linearGradient>
        </defs>
        <path d="M2 27Q12 23 23 9" stroke="url(#prefs-comet-trail)" strokeWidth="7" strokeLinecap="round"/>
        <path d="M8 25Q16 18 24 8" stroke="#bae6fd" strokeOpacity=".7" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="8" r="4.5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.7"/>
        <circle cx="8" cy="17" r="1" fill="#38bdf8"/>
        <circle cx="16" cy="26" r=".8" fill="#67e8f9"/>
      </svg>
    );
  }

  if (style === "pixel") {
    return (
      <svg width="24" height="28" viewBox="0 0 20 26" fill="none" shapeRendering="crispEdges" aria-hidden="true">
        <path d="M0 0H2V2H4V4H6V6H8V8H10V10H12V12H14V14H16V16H18V18H12V20H14V22H16V26H12V24H10V20H8V18H6V22H4V24H2V26H0Z" fill="#052e16"/>
        <path d="M2 3H4V5H6V7H8V9H10V11H12V13H14V15H16V16H10V18H8V16H6V19H4V22H2Z" fill="#4ade80"/>
        <path d="M2 4V10H4V8H6V6H4V4Z" fill="#dcfce7"/>
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
  const preferences = usePreferences();

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
    // Keep settings open while visitors experiment.

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
              aria-label="Website settings"
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
              <div id="cursor-settings-menu" role="dialog" aria-label="Website preferences"
                className="portfolio-settings-panel absolute right-0 top-[calc(100%+14px)] z-[80] flex max-h-[min(78dvh,700px)] w-[350px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-xl border border-white/15 bg-[#101722] shadow-[0_22px_65px_rgba(0,0,0,0.5)]">
                <div className="flex shrink-0 items-center gap-2.5 border-b border-white/10 px-5 py-4">
                  <SettingsIcon />
                  <p className="text-base font-semibold text-white">Preferences</p>
                </div>
                <div className="min-h-0 space-y-5 overflow-y-auto overscroll-contain p-4">
                  <p className="text-xs text-slate-400">Personalise your experience. For the best experience, use dark mode.</p>
                  <fieldset className="space-y-2">
                    <legend className="text-xs font-semibold text-slate-200">Accent colour</legend>
                    <div className="flex flex-wrap gap-3">
                      {(["blue", "cyan", "purple", "green", "orange"] as const).map((color) => (
                        <button key={color} type="button" title={color} aria-label={`${color} accent`}
                          aria-pressed={preferences.accent === color}
                          onClick={() => setPreference("accent", color)}
                          className={`portfolio-swatch portfolio-swatch-${color} h-8 w-8 rounded-full border-2 ${preferences.accent === color ? "border-white scale-110" : "border-transparent"}`}
                        >{preferences.accent === color && <span aria-hidden="true" className="text-xs font-bold text-white">✓</span>}</button>
                      ))}
                    </div>
                  </fieldset>
                  {([
                    { key: "motion", label: "Animation intensity", options: [["full", "Full"], ["balanced", "Balanced"], ["minimal", "Minimal"]] },
                    { key: "display", label: "Display mode", options: [["cinematic", "Cinematic"], ["standard", "Standard"]] },
                    { key: "cursorEffects", label: "Cursor effects", options: [["off", "Off"], ["subtle", "Subtle"], ["full", "Full"]] },
                    { key: "theme", label: "Theme", options: [["dark", "Dark"], ["light", "Light"], ["system", "System"]] },
                  ] as const).map((group) => (
                    <fieldset key={group.key} className="space-y-2">
                      <legend className="text-xs font-semibold text-slate-200">{group.label}</legend>
                      <div className="flex gap-1 rounded-lg border border-white/10 bg-white/[0.04] p-1">
                        {group.options.map(([value, label]) => (
                          <button type="button" key={value} aria-pressed={preferences[group.key] === value}
                            onClick={() => setPreference(group.key, value as Preferences[typeof group.key])}
                            className={`flex-1 rounded-md px-2 py-2 text-[11px] font-medium transition-colors ${preferences[group.key] === value ? "portfolio-setting-selected text-white" : "text-slate-400 hover:bg-white/10 hover:text-white"}`}
                          >{label}</button>
                        ))}
                      </div>
                    </fieldset>
                  ))}
                  <fieldset className="space-y-2">
                    <legend className="text-xs font-semibold text-slate-200">Cursor style</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {cursorOptions.map((option) => (
                        <button type="button" key={option.value} aria-pressed={cursorStyle === option.value}
                          onClick={() => changeCursorStyle(option.value)}
                          className={`flex items-center gap-2 rounded-lg border px-2 py-2 text-left text-xs transition-colors ${cursorStyle === option.value ? "portfolio-setting-selected border-white/30 text-white" : "border-white/10 text-slate-300 hover:bg-white/10"}`}
                        ><span className="flex h-7 w-7 shrink-0 items-center justify-center"><CursorOptionIcon style={option.value}/></span>
                          <span>{option.label}</span></button>
                      ))}
                    </div>
                  </fieldset>
                </div>
                <div className="flex shrink-0 items-center justify-between border-t border-white/10 px-4 py-3">
                  <span className="text-[11px] text-slate-400">Saved automatically</span>
                  <button type="button" onClick={() => { resetPreferences(); changeCursorStyle("default"); }}
                    className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/10">Reset defaults</button>
                </div>
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
