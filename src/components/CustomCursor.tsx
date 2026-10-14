
import { useEffect, useRef, useState } from "react";

type CursorStyle = "rocket" | "neon" | "default";

const STORAGE_KEY = "drxs69-cursor-style";
const CHANGE_EVENT = "drxs69-cursor-change";

const CURSOR_QUERY =
  "(hover: hover) and (pointer: fine) and " +
  "(prefers-reduced-motion: no-preference)";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "select",
  "summary",
  "label",
  '[role="button"]',
  '[role="link"]',
].join(", ");

const TEXT_SELECTOR = [
  "input",
  "textarea",
  '[contenteditable="true"]',
].join(", ");

const IDLE_DELAY = 150;
const PINCH_ZOOM_THRESHOLD = 1.01;

function isPinchZoomed() {
  return (
    (window.visualViewport?.scale ?? 1) >
    PINCH_ZOOM_THRESHOLD
  );
}

function getSavedStyle(): CursorStyle {
  if (typeof window === "undefined") {
    return "rocket";
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (
      saved === "rocket" ||
      saved === "neon" ||
      saved === "default"
    ) {
      return saved;
    }
  } catch {
    // Keep the default if storage is unavailable.
  }

  return "rocket";
}

function RocketArtwork() {
  return (
    <svg
      viewBox="0 0 64 112"
      width="30"
      height="48"
      fill="none"
      aria-hidden="true"
      className="rocket-artwork block overflow-visible"
    >
      <defs>
        <linearGradient
          id="cursor-flame"
          x1="32"
          y1="76"
          x2="32"
          y2="109"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fde68a" />
          <stop offset=".38" stopColor="#fb923c" />
          <stop offset="1" stopColor="#ef4444" />
        </linearGradient>

        <linearGradient
          id="cursor-body-red"
          x1="32"
          y1="7"
          x2="46"
          y2="70"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fb7185" />
          <stop offset=".5" stopColor="#f04452" />
          <stop offset="1" stopColor="#dc3545" />
        </linearGradient>

        <radialGradient id="cursor-engine-glow">
          <stop
            stopColor="#fef08a"
            stopOpacity=".8"
          />
          <stop
            offset=".55"
            stopColor="#fb923c"
            stopOpacity=".3"
          />
          <stop
            offset="1"
            stopColor="#f97316"
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      {/* Engine glow */}
      <ellipse
        className="rocket-engine-glow"
        cx="32"
        cy="88"
        rx="19"
        ry="23"
        fill="url(#cursor-engine-glow)"
      />

      {/* Flames */}
      <g className="rocket-flames">
        <path
          className="rocket-flame-outer"
          d="M26 76 Q17 93 32 108 Q47 93 38 76Z"
          fill="url(#cursor-flame)"
        />
        <path
          className="rocket-flame-inner"
          d="M29 78 Q25 91 32 100 Q39 91 35 78Z"
          fill="#fff7c2"
        />
      </g>

      {/* Sparks */}
      <g className="rocket-sparks">
        <circle
          className="rocket-spark rocket-spark-one"
          cx="23"
          cy="89"
          r="2"
          fill="#facc15"
        />
        <circle
          className="rocket-spark rocket-spark-two"
          cx="41"
          cy="95"
          r="1.7"
          fill="#fb923c"
        />
        <circle
          className="rocket-spark rocket-spark-three"
          cx="32"
          cy="106"
          r="1.6"
          fill="#fde68a"
        />
      </g>

      {/* Rocket body */}
      <g className="rocket-body">
        <path
          d="M19 55 L9 71 L10 83 L25 72Z"
          fill="#dce7ef"
          stroke="#202e3b"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />

        <path
          d="M45 55 L55 71 L54 83 L39 72Z"
          fill="#dce7ef"
          stroke="#202e3b"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />

        <path
          d="M19 70 V39 Q19 20 32 7 Q45 20 45 39 V70Z"
          fill="#f8fafc"
          stroke="#202e3b"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        <path
          d="M32 7 Q45 20 45 39 V70 H32Z"
          fill="url(#cursor-body-red)"
        />

        <circle
          cx="32"
          cy="42"
          r="10.5"
          fill="#ffffff"
          stroke="#202e3b"
          strokeWidth="2.5"
        />

        <circle
          cx="32"
          cy="42"
          r="7.5"
          fill="#16b7d6"
        />

        <path
          d="M28 39 Q29 37 32 37"
          stroke="#d6faff"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M24 70 H40 L38 78 H26Z"
          fill="#cbdbe6"
          stroke="#202e3b"
          strokeWidth="2.7"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default function CustomCursor() {
  const [style, setStyle] =
    useState<CursorStyle>(getSavedStyle);

  const rocketRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleCursorChange(event: Event) {
      const next = (
        event as CustomEvent<CursorStyle>
      ).detail;

      if (
        next === "rocket" ||
        next === "neon" ||
        next === "default"
      ) {
        setStyle(next);
      }
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        setStyle(getSavedStyle());
      }
    }

    window.addEventListener(
      CHANGE_EVENT,
      handleCursorChange
    );

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        CHANGE_EVENT,
        handleCursorChange
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  useEffect(() => {
    const rocket = rocketRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!rocket || !dot || !ring) return;

    const media = window.matchMedia(CURSOR_QUERY);
    const viewport = window.visualViewport;
    const root = document.documentElement;

    let enabled = false;
    let visible = false;
    let hovering = false;
    let pressing = false;
    let textTarget = false;
    let gestureActive = false;

    let pointerX = 0;
    let pointerY = 0;

    let ringX = 0;
    let ringY = 0;
    let ringScale = 1;
    let desiredScale = 1;

    let frame = 0;

    let idleTimer: ReturnType<typeof setTimeout> | null =
      null;

    let gestureTimer:
      | ReturnType<typeof setTimeout>
      | null = null;

    function clearIdleTimer() {
      if (idleTimer !== null) {
        clearTimeout(idleTimer);
        idleTimer = null;
      }
    }

    function clearGestureTimer() {
      if (gestureTimer !== null) {
        clearTimeout(gestureTimer);
        gestureTimer = null;
      }
    }

    function setRocketMoving(moving: boolean) {
      rocket!.classList.toggle(
        "rocket-moving",
        moving
      );
    }

    function scheduleIdle() {
      clearIdleTimer();
      setRocketMoving(true);

      idleTimer = setTimeout(() => {
        setRocketMoving(false);
        idleTimer = null;
      }, IDLE_DELAY);
    }

    function hideAll() {
      rocket!.style.opacity = "0";
      dot!.style.opacity = "0";
      ring!.style.opacity = "0";

      visible = false;

      clearIdleTimer();
      setRocketMoving(false);
    }

    function updateVisibility() {
      const show =
        enabled && visible && !textTarget;

      rocket!.style.opacity =
        show && style === "rocket" ? "1" : "0";

      dot!.style.opacity =
        show && style === "neon" ? "1" : "0";

      ring!.style.opacity =
        show && style === "neon" ? "1" : "0";
    }

    function animateRing() {
      frame = 0;

      if (!enabled || style !== "neon") {
        return;
      }

      ringX += (pointerX - ringX) * 0.2;
      ringY += (pointerY - ringY) * 0.2;

      ringScale +=
        (desiredScale - ringScale) * 0.2;

      ring!.style.transform =
        `translate3d(${ringX - 14}px, ` +
        `${ringY - 14}px, 0) ` +
        `scale(${ringScale})`;

      const settled =
        Math.abs(pointerX - ringX) < 0.15 &&
        Math.abs(pointerY - ringY) < 0.15 &&
        Math.abs(desiredScale - ringScale) <
          0.005;

      if (!settled) {
        frame = requestAnimationFrame(
          animateRing
        );
      }
    }

    function requestRingAnimation() {
      if (
        frame === 0 &&
        enabled &&
        style === "neon"
      ) {
        frame = requestAnimationFrame(
          animateRing
        );
      }
    }

    function updateInteraction() {
      rocket!.classList.toggle(
        "rocket-boost",
        hovering && !pressing
      );

      rocket!.classList.toggle(
        "rocket-pressed",
        pressing
      );

      desiredScale = pressing
        ? 0.8
        : hovering
          ? 1.3
          : 1;

      ring!.style.borderColor = hovering
        ? "rgba(103,232,249,0.9)"
        : "rgba(96,165,250,0.6)";

      ring!.style.backgroundColor = hovering
        ? "rgba(34,211,238,0.07)"
        : "rgba(59,130,246,0.025)";

      requestRingAnimation();
    }

    function updateTarget(
      target: EventTarget | null
    ) {
      if (target instanceof Element) {
        textTarget = Boolean(
          target.closest(TEXT_SELECTOR)
        );

        hovering =
          !textTarget &&
          Boolean(
            target.closest(
              INTERACTIVE_SELECTOR
            )
          );
      } else {
        textTarget = false;
        hovering = false;
      }

      updateInteraction();
      updateVisibility();
    }

    /*
     * Hide custom cursors during Safari pinch zoom.
     *
     * Removing the root class restores Safari's
     * native cursor immediately.
     */
    function updateEnabled() {
      enabled =
        media.matches &&
        style !== "default" &&
        !isPinchZoomed() &&
        !gestureActive;

      root.classList.toggle(
        "portfolio-custom-cursor-enabled",
        enabled
      );

      if (!enabled) {
        hideAll();
      } else {
        updateVisibility();
      }
    }

    function onGestureStart() {
      clearGestureTimer();

      gestureActive = true;
      updateEnabled();
    }

    function onGestureChange() {
      clearGestureTimer();

      gestureActive = true;
      updateEnabled();
    }

    function onGestureEnd() {
      clearGestureTimer();

      /*
       * Wait briefly for visualViewport.scale
       * to settle after Safari ends the gesture.
       */
      gestureTimer = setTimeout(() => {
        gestureActive = false;
        gestureTimer = null;
        updateEnabled();
      }, 100);
    }

    function onPointerMove(
      event: PointerEvent
    ) {
      if (
        !enabled ||
        event.pointerType !== "mouse"
      ) {
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!visible) {
        ringX = pointerX;
        ringY = pointerY;
      }

      visible = true;

      rocket!.style.transform =
        `translate3d(${pointerX - 15}px, ` +
        `${pointerY - 4}px, 0)`;

      dot!.style.transform =
        `translate3d(${pointerX - 2}px, ` +
        `${pointerY - 2}px, 0)`;

      updateTarget(event.target);

      if (style === "rocket") {
        scheduleIdle();
      }

      requestRingAnimation();
    }

    function onPointerOver(
      event: PointerEvent
    ) {
      if (
        enabled &&
        event.pointerType === "mouse"
      ) {
        updateTarget(event.target);
      }
    }

    function onPointerDown(
      event: PointerEvent
    ) {
      if (
        !enabled ||
        event.pointerType !== "mouse"
      ) {
        return;
      }

      pressing = true;
      updateInteraction();
    }

    function onPointerUp(
      event: PointerEvent
    ) {
      if (
        !enabled ||
        event.pointerType !== "mouse"
      ) {
        return;
      }

      pressing = false;
      updateTarget(event.target);
    }

    function onPointerOut(
      event: PointerEvent
    ) {
      if (!event.relatedTarget) {
        hideAll();
      }
    }

    function onBlur() {
      pressing = false;
      hideAll();
    }

    function onVisibilityChange() {
      if (document.hidden) {
        onBlur();
      }
    }

    updateEnabled();

    media.addEventListener(
      "change",
      updateEnabled
    );

    viewport?.addEventListener(
      "resize",
      updateEnabled
    );

    viewport?.addEventListener(
      "scroll",
      updateEnabled
    );

    window.addEventListener(
      "gesturestart",
      onGestureStart
    );

    window.addEventListener(
      "gesturechange",
      onGestureChange
    );

    window.addEventListener(
      "gestureend",
      onGestureEnd
    );

    window.addEventListener(
      "pointermove",
      onPointerMove,
      { passive: true }
    );

    window.addEventListener(
      "pointerover",
      onPointerOver,
      { passive: true }
    );

    window.addEventListener(
      "pointerdown",
      onPointerDown
    );

    window.addEventListener(
      "pointerup",
      onPointerUp
    );

    document.addEventListener(
      "pointerout",
      onPointerOut
    );

    window.addEventListener(
      "blur",
      onBlur
    );

    document.addEventListener(
      "visibilitychange",
      onVisibilityChange
    );

    return () => {
      media.removeEventListener(
        "change",
        updateEnabled
      );

      viewport?.removeEventListener(
        "resize",
        updateEnabled
      );

      viewport?.removeEventListener(
        "scroll",
        updateEnabled
      );

      window.removeEventListener(
        "gesturestart",
        onGestureStart
      );

      window.removeEventListener(
        "gesturechange",
        onGestureChange
      );

      window.removeEventListener(
        "gestureend",
        onGestureEnd
      );

      window.removeEventListener(
        "pointermove",
        onPointerMove
      );

      window.removeEventListener(
        "pointerover",
        onPointerOver
      );

      window.removeEventListener(
        "pointerdown",
        onPointerDown
      );

      window.removeEventListener(
        "pointerup",
        onPointerUp
      );

      document.removeEventListener(
        "pointerout",
        onPointerOut
      );

      window.removeEventListener(
        "blur",
        onBlur
      );

      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );

      clearIdleTimer();
      clearGestureTimer();

      cancelAnimationFrame(frame);

      root.classList.remove(
        "portfolio-custom-cursor-enabled"
      );

      hideAll();
    };
  }, [style]);

  return (
    <>
      <style>
        {`
          @media (hover: hover) and (pointer: fine)
            and (prefers-reduced-motion: no-preference) {
            html.portfolio-custom-cursor-enabled,
            html.portfolio-custom-cursor-enabled * {
              cursor: none !important;
            }

            html.portfolio-custom-cursor-enabled input,
            html.portfolio-custom-cursor-enabled textarea,
            html.portfolio-custom-cursor-enabled
              [contenteditable="true"] {
              cursor: text !important;
            }
          }

          /*
           * IDLE: smooth 2.2-second vertical bob.
           */
          .rocket-artwork {
            animation: rocket-idle-bob 2.2s
              cubic-bezier(0.45, 0.05, 0.55, 0.95)
              infinite;

            transform-origin: 50% 38%;
          }

          @keyframes rocket-idle-bob {
            0%, 100% {
              transform: translateY(4px);
            }

            50% {
              transform: translateY(-6px);
            }
          }

          /*
           * MOVING: rocket follows directly.
           */
          .rocket-cursor-object.rocket-moving:not(.rocket-boost)
            .rocket-artwork {
            animation: none;
          }

          /*
           * IDLE ENGINE GLOW.
           */
          .rocket-engine-glow {
            transform-box: fill-box;
            transform-origin: center;

            animation: rocket-glow-bob 2.2s
              cubic-bezier(0.45, 0.05, 0.55, 0.95)
              infinite;
          }

          @keyframes rocket-glow-bob {
            0%, 100% {
              transform: scale(0.9);
              opacity: 0.35;
            }

            50% {
              transform: scale(1.15);
              opacity: 0.75;
            }
          }

          /*
           * IDLE FLAMES:
           * stronger up, weaker down.
           */
          .rocket-flames {
            transform-box: fill-box;
            transform-origin: 50% 0%;

            animation: rocket-flame-bob 2.2s
              cubic-bezier(0.45, 0.05, 0.55, 0.95)
              infinite;
          }

          @keyframes rocket-flame-bob {
            0%, 100% {
              transform: scaleY(0.82) scaleX(0.94);
              opacity: 0.82;
            }

            25% {
              transform: scaleY(1) scaleX(0.98);
              opacity: 0.9;
            }

            50% {
              transform: scaleY(1.15) scaleX(1.04);
              opacity: 1;
            }

            75% {
              transform: scaleY(0.95) scaleX(0.97);
              opacity: 0.88;
            }
          }

          .rocket-flame-inner {
            transform-box: fill-box;
            transform-origin: 50% 0%;

            animation: rocket-inner-bob 2.2s
              cubic-bezier(0.45, 0.05, 0.55, 0.95)
              infinite;
          }

          @keyframes rocket-inner-bob {
            0%, 100% {
              transform: scaleY(0.78);
              opacity: 0.72;
            }

            50% {
              transform: scaleY(1.08);
              opacity: 1;
            }
          }

          /*
           * Moving and hover flame flicker.
           */
          .rocket-cursor-object.rocket-moving
            .rocket-flames,
          .rocket-cursor-object.rocket-boost
            .rocket-flames {
            animation: rocket-flame-flicker 0.28s
              ease-in-out infinite alternate;
          }

          .rocket-cursor-object.rocket-moving
            .rocket-flame-inner,
          .rocket-cursor-object.rocket-boost
            .rocket-flame-inner {
            animation: rocket-inner-flicker 0.19s
              ease-in-out infinite alternate-reverse;
          }

          .rocket-cursor-object.rocket-moving
            .rocket-engine-glow,
          .rocket-cursor-object.rocket-boost
            .rocket-engine-glow {
            animation: rocket-glow-flicker 0.5s
              ease-in-out infinite alternate;
          }

          @keyframes rocket-flame-flicker {
            from {
              transform: scaleY(0.88) scaleX(0.96);
              opacity: 0.85;
            }

            to {
              transform: scaleY(1.1) scaleX(1.03);
              opacity: 1;
            }
          }

          @keyframes rocket-inner-flicker {
            from {
              transform: scaleY(0.85);
              opacity: 0.75;
            }

            to {
              transform: scaleY(1.05);
              opacity: 1;
            }
          }

          @keyframes rocket-glow-flicker {
            from {
              transform: scale(0.95);
              opacity: 0.4;
            }

            to {
              transform: scale(1.1);
              opacity: 0.65;
            }
          }

          /*
           * Sparks.
           */
          .rocket-spark {
            transform-box: fill-box;
            transform-origin: center;
            opacity: 0;
          }

          .rocket-spark-one {
            animation: rocket-spark-left 0.9s
              ease-out infinite;
          }

          .rocket-spark-two {
            animation: rocket-spark-right 0.75s
              ease-out infinite 0.2s;
          }

          .rocket-spark-three {
            animation: rocket-spark-down 0.8s
              ease-out infinite 0.4s;
          }

          @keyframes rocket-spark-left {
            0% {
              transform: translate(0, 0) scale(0.7);
              opacity: 0;
            }

            20% {
              opacity: 1;
            }

            100% {
              transform: translate(-10px, 18px) scale(0);
              opacity: 0;
            }
          }

          @keyframes rocket-spark-right {
            0% {
              transform: translate(0, 0) scale(0.7);
              opacity: 0;
            }

            20% {
              opacity: 1;
            }

            100% {
              transform: translate(10px, 18px) scale(0);
              opacity: 0;
            }
          }

          @keyframes rocket-spark-down {
            0% {
              transform: translate(0, 0) scale(0.8);
              opacity: 0;
            }

            25% {
              opacity: 1;
            }

            100% {
              transform: translate(0, 22px) scale(0);
              opacity: 0;
            }
          }

          /*
           * Hover: original smooth ±15° sway.
           */
          .rocket-visual {
            transform-origin: 15px 4px;
            transition: transform 180ms ease-out;
          }

          .rocket-cursor-object.rocket-boost
            .rocket-visual {
            animation: rocket-hover-sway 2s
              ease-in-out infinite;
          }

          @keyframes rocket-hover-sway {
            0%, 100% {
              transform: rotate(-15deg);
            }

            50% {
              transform: rotate(15deg);
            }
          }

          .rocket-cursor-object.rocket-boost
            .rocket-artwork {
            animation: none;
          }

          /*
           * Click compression.
           */
          .rocket-cursor-object.rocket-pressed
            .rocket-visual {
            animation: none;
            transform: scale(0.9);
          }

          .rocket-cursor-object.rocket-pressed
            .rocket-artwork {
            animation: none;
          }

          /*
           * Reduced Motion.
           */
          @media (prefers-reduced-motion: reduce) {
            .rocket-artwork,
            .rocket-engine-glow,
            .rocket-flames,
            .rocket-flame-inner,
            .rocket-spark,
            .rocket-visual {
              animation: none !important;
              transition: none !important;
            }
          }
        `}
      </style>

      {/* Animated rocket */}
      <div
        ref={rocketRef}
        aria-hidden="true"
        className="rocket-cursor-object pointer-events-none fixed left-0 top-0 z-[9999] opacity-0"
        style={{
          transform:
            "translate3d(-200px,-200px,0)",
          willChange: "transform",
        }}
      >
        <div className="rocket-visual">
          <RocketArtwork />
        </div>
      </div>

      {/* Neon centre dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1 w-1 rounded-full bg-cyan-200 opacity-0 shadow-[0_0_9px_rgba(103,232,249,0.8)]"
        style={{
          transform:
            "translate3d(-200px,-200px,0)",
        }}
      />

      {/* Neon trailing ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-7 w-7 rounded-full border border-blue-400/60 bg-blue-400/[0.025] opacity-0 will-change-transform"
        style={{
          transform:
            "translate3d(-200px,-200px,0)",
        }}
      />
    </>
  );
}
