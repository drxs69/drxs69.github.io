
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import type { ReactNode } from "react";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

import Hero from "../components/Hero";
import Projects from "../components/Projects";
import About from "../components/About";
import Skills from "../components/Skills";
import ScrollCue from "../components/ScrollCue";

import AuroraBackground from "../components/backgrounds/AuroraBackground";
import SectionAtmosphere from "../components/backgrounds/SectionAtmosphere";

type Atmosphere = "projects" | "about" | "skills";

type Scene = {
  id: string;
  label: string;
  content: ReactNode;
  atmosphere?: Atmosphere;
};

const scenes: Scene[] = [
  {
    id: "page-home",
    label: "Home",
    content: <Hero />,
  },
  {
    id: "page-projects",
    label: "Projects",
    content: <Projects />,
    atmosphere: "projects",
  },
  {
    id: "page-about",
    label: "About",
    content: <About />,
    atmosphere: "about",
  },
  {
    id: "page-skills",
    label: "Skills",
    content: <Skills />,
    atmosphere: "skills",
  },
];

const desktopQuery =
  "(min-width: 1280px) and " +
  "(min-height: 850px) and " +
  "(prefers-reduced-motion: no-preference)";

const NAVBAR_HEIGHT = "5rem";
const NAVBAR_HEIGHT_PX = 80;
const TRANSITION_DISTANCE = "70svh";

// Allow a tiny tolerance for browser rounding.
const PINCH_ZOOM_THRESHOLD = 1.01;

function isPinchZoomed(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    (window.visualViewport?.scale ?? 1) >
    PINCH_ZOOM_THRESHOLD
  );
}

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(value: number) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function sceneOpacity(
  index: number,
  position: number
) {
  const distance = Math.abs(position - index);

  if (distance >= 1) return 0;

  return 1 - smoothstep(distance);
}

function SceneBackground({
  atmosphere,
}: {
  atmosphere?: Atmosphere;
}) {
  if (!atmosphere) {
    return <AuroraBackground />;
  }

  return (
    <SectionAtmosphere variant={atmosphere} />
  );
}

type ScenePanelProps = {
  scene: Scene;
  index: number;
  activeIndex: number;
  progress: ReturnType<
    typeof useScroll
  >["scrollYProgress"];
};

function ScenePanel({
  scene,
  index,
  activeIndex,
  progress,
}: ScenePanelProps) {
  const opacity = useTransform(progress, (value) => {
    return sceneOpacity(index, value * 3);
  });

  const y = useTransform(progress, (value) => {
    const position = value * 3;

    return Math.max(
      -40,
      Math.min(40, (index - position) * 40)
    );
  });

  const active = activeIndex === index;

  return (
    <motion.section
      aria-label={scene.label}
      aria-hidden={!active}
      inert={!active}
      className="pointer-events-none absolute inset-0 isolate overflow-hidden bg-[#090b10]"
      style={{
        opacity,
        zIndex: index + 1,
      }}
    >
      <SceneBackground
        atmosphere={scene.atmosphere}
      />

      <motion.div
        className="relative z-10 flex h-full w-full items-center"
        style={{
          y,
          pointerEvents: active ? "auto" : "none",
        }}
      >
        <div className="w-full portfolio-scene-content">
          {scene.content}
        </div>
      </motion.div>

      {index === 0 && <ScrollCue />}
    </motion.section>
  );
}

/*
 * Find the currently visible scene before switching
 * between cinematic and natural layouts.
 */
function getCurrentSceneIndex(
  isCinematic: boolean
): number {
  if (isCinematic) {
    const track = document.querySelector<HTMLElement>(
      '[data-cinematic-track="true"]'
    );

    if (!track) return 0;

    const trackTop =
      track.getBoundingClientRect().top +
      window.scrollY;

    const scrollRange =
      track.offsetHeight - window.innerHeight;

    if (scrollRange <= 0) return 0;

    const progress = clamp(
      (window.scrollY - trackTop) / scrollRange
    );

    return Math.min(
      scenes.length - 1,
      Math.round(progress * (scenes.length - 1))
    );
  }

  let nearestIndex = 0;
  let nearestDistance = Infinity;

  scenes.forEach((scene, index) => {
    const section = document.getElementById(
      scene.id
    );

    if (!section) return;

    const distance = Math.abs(
      section.getBoundingClientRect().top -
        NAVBAR_HEIGHT_PX
    );

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  });

  return nearestIndex;
}

/*
 * This hook observes:
 *
 * - Desktop breakpoint changes
 * - Reduced Motion preference changes
 * - Safari visual viewport scale changes
 *
 * It saves the current scene before changing modes.
 */
function useCinematicMode(
  pendingSceneRef: React.RefObject<number | null>
) {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return (
      window.matchMedia(desktopQuery).matches &&
      !isPinchZoomed()
    );
  });

  const enabledRef = useRef(enabled);

  useEffect(() => {
    const media = window.matchMedia(desktopQuery);
    const viewport = window.visualViewport;

    function update() {
      const next =
        media.matches && !isPinchZoomed();

      if (next === enabledRef.current) {
        return;
      }

      const current = enabledRef.current;

      pendingSceneRef.current =
        getCurrentSceneIndex(current);

      enabledRef.current = next;
      setEnabled(next);
    }

    update();

    media.addEventListener("change", update);

    viewport?.addEventListener("resize", update);
    viewport?.addEventListener("scroll", update);

    window.addEventListener("resize", update);

    return () => {
      media.removeEventListener("change", update);

      viewport?.removeEventListener(
        "resize",
        update
      );

      viewport?.removeEventListener(
        "scroll",
        update
      );

      window.removeEventListener("resize", update);
    };
  }, [pendingSceneRef]);

  return enabled;
}

function CinematicHome() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /*
   * Mandatory snapping exists only in cinematic mode.
   * It is restored to its previous value on unmount.
   */
  useLayoutEffect(() => {
    const root = document.documentElement;

    const previousSnapType =
      root.style.scrollSnapType;

    const previousSnapPadding =
      root.style.scrollPaddingTop;

    root.style.scrollSnapType = "y mandatory";
    root.style.scrollPaddingTop = NAVBAR_HEIGHT;

    return () => {
      root.style.scrollSnapType =
        previousSnapType;

      root.style.scrollPaddingTop =
        previousSnapPadding;
    };
  }, []);

  /*
   * Original shared cinematic scroll timeline:
   *
   * 310svh track
   * 210svh total transition range
   * 70svh per scene transition
   */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (value) => {
      const next = Math.max(
        0,
        Math.min(
          scenes.length - 1,
          Math.round(value * 3)
        )
      );

      setActiveIndex((current) =>
        current === next ? current : next
      );
    }
  );

  return (
    <main className="w-full bg-[#090b10]">
      <style>
        {`
          .portfolio-snap-target {
            scroll-snap-align: start;
            scroll-snap-stop: normal;
          }

          body footer {
            scroll-snap-align: start;
            scroll-margin-top: 5rem;
          }

          .portfolio-scene-content section,
          .portfolio-natural-section,
          .portfolio-natural-section > div > section {
            border-top: none !important;
            border-bottom: none !important;
          }
        `}
      </style>

      <div
        ref={trackRef}
        data-cinematic-track="true"
        className="relative w-full"
        style={{
          height: "310svh",
          paddingTop: NAVBAR_HEIGHT,
        }}
      >
        {/* Shared sticky viewport */}
        <div className="sticky top-20 z-10 h-[calc(100svh-5rem)] w-full overflow-hidden bg-[#090b10]">
          {scenes.map((scene, index) => (
            <ScenePanel
              key={scene.id}
              scene={scene}
              index={index}
              activeIndex={activeIndex}
              progress={scrollYProgress}
            />
          ))}

          {/* Section progress indicator */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 right-6 z-20 flex items-center gap-2"
          >
            {scenes.map((scene, index) => (
              <span
                key={scene.id}
                className={`h-1 rounded-full transition-all duration-200 ${
                  index === activeIndex
                    ? "w-8 bg-blue-400"
                    : "w-2 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Original snap and navigation targets */}
        {scenes.map((scene, index) => (
          <div
            key={scene.id}
            id={scene.id}
            aria-hidden="true"
            className="portfolio-snap-target pointer-events-none absolute left-0 h-px w-px"
            style={{
              top: `calc(${NAVBAR_HEIGHT} + ${index} * ${TRANSITION_DISTANCE})`,
            }}
          />
        ))}
      </div>
    </main>
  );
}

/*
 * Regular vertical layout:
 *
 * - Smaller screens
 * - Reduced Motion
 * - Safari pinch zoom
 *
 * No mandatory scroll snapping.
 */
function NaturalHome() {
  return (
    <main className="w-full bg-[#090b10]">
      {scenes.map((scene) => (
        <section
          key={scene.id}
          id={scene.id}
          className="portfolio-natural-section relative isolate flex min-h-[calc(100svh-5rem)] w-full min-w-0 items-center overflow-hidden bg-[#090b10]"
        >
          <SceneBackground
            atmosphere={scene.atmosphere}
          />

          <div className="relative z-10 w-full">
            {scene.content}
          </div>
        </section>
      ))}

      <style>
        {`
          .portfolio-natural-section,
          .portfolio-natural-section > div > section {
            border-top: none !important;
            border-bottom: none !important;
          }
        `}
      </style>
    </main>
  );
}

export default function Home() {
  const pendingSceneRef = useRef<number | null>(
    null
  );

  const cinematic = useCinematicMode(
    pendingSceneRef
  );

  /*
   * Once the new layout is mounted, restore the
   * corresponding section without smooth scrolling.
   */
  useLayoutEffect(() => {
    const index = pendingSceneRef.current;

    if (index === null) return;

    pendingSceneRef.current = null;

    const scene = scenes[index];

    if (!scene) return;

    const target = document.getElementById(
      scene.id
    );

    if (!target) return;

    const root = document.documentElement;

    const oldScrollBehavior =
      root.style.scrollBehavior;

    const oldScrollSnapType =
      root.style.scrollSnapType;

    root.style.scrollBehavior = "auto";
    root.style.scrollSnapType = "none";

    const targetTop =
      target.getBoundingClientRect().top +
      window.scrollY;

    window.scrollTo({
      top: Math.max(
        0,
        targetTop - NAVBAR_HEIGHT_PX
      ),
      behavior: "instant",
    });

    root.style.scrollSnapType = cinematic
      ? "y mandatory"
      : oldScrollSnapType;

    root.style.scrollBehavior =
      oldScrollBehavior;
  }, [cinematic]);

  return cinematic ? (
    <CinematicHome />
  ) : (
    <NaturalHome />
  );
}
