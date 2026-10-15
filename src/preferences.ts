import { useSyncExternalStore } from "react";

export type Accent = "blue" | "cyan" | "purple" | "green" | "orange";
export type MotionLevel = "full" | "balanced" | "minimal";
export type DisplayMode = "cinematic" | "standard";
export type CursorEffects = "off" | "subtle" | "full";
export type ThemeMode = "dark" | "light" | "system";

export type Preferences = {
  accent: Accent;
  motion: MotionLevel;
  display: DisplayMode;
  cursorEffects: CursorEffects;
  theme: ThemeMode;
};

export const DEFAULT_PREFERENCES: Preferences = {
  accent: "blue",
  motion: "full",
  display: "cinematic",
  cursorEffects: "full",
  theme: "dark",
};

const KEY = "drxs69-preferences-v1";
const listeners = new Set<() => void>();

function validate(value: unknown): Preferences {
  const object = value && typeof value === "object"
    ? value as Partial<Preferences>
    : {};
  return {
    accent: ["blue", "cyan", "purple", "green", "orange"].includes(object.accent ?? "")
      ? object.accent! : "blue",
    motion: ["full", "balanced", "minimal"].includes(object.motion ?? "")
      ? object.motion! : "full",
    display: ["cinematic", "standard"].includes(object.display ?? "")
      ? object.display! : "cinematic",
    cursorEffects: ["off", "subtle", "full"].includes(object.cursorEffects ?? "")
      ? object.cursorEffects! : "full",
    theme: ["dark", "light", "system"].includes(object.theme ?? "")
      ? object.theme! : "dark",
  };
}

function read(): Preferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  try {
    return validate(JSON.parse(localStorage.getItem(KEY) ?? "null"));
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

let current = read();
let systemLight = false;

export function getPreferences() { return current; }
export function subscribePreferences(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
export function usePreferences() {
  return useSyncExternalStore(subscribePreferences, getPreferences, () => DEFAULT_PREFERENCES);
}

function applyToDOM() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.accent = current.accent;
  root.dataset.motion = current.motion;
  root.dataset.display = current.display;
  root.dataset.cursorEffects = current.cursorEffects;
  root.dataset.theme = current.theme === "system"
    ? (systemLight ? "light" : "dark")
    : current.theme;
}

function broadcast() {
  applyToDOM();
  for (const listener of listeners) listener();
}

export function setPreference<K extends keyof Preferences>(key: K, value: Preferences[K]) {
  current = validate({ ...current, [key]: value });
  try { localStorage.setItem(KEY, JSON.stringify(current)); } catch { /* storage optional */ }
  broadcast();
}

export function resetPreferences() {
  current = { ...DEFAULT_PREFERENCES };
  try { localStorage.setItem(KEY, JSON.stringify(current)); } catch { /* optional */ }
  broadcast();
}

if (typeof window !== "undefined") {
  const media = window.matchMedia("(prefers-color-scheme: light)");
  systemLight = media.matches;
  media.addEventListener("change", () => {
    systemLight = media.matches;
    applyToDOM();
  });
  window.addEventListener("storage", (event) => {
    if (event.key === KEY) {
      current = read();
      broadcast();
    }
  });
  applyToDOM();
}
