
import { useEffect, useRef, useState } from "react";
import { usePreferences } from "../preferences";

type CursorStyle =
  | "rocket"
  | "neon"
  | "crosshair"
  | "terminal"
  | "comet"
  | "pixel"
  | "default";

type TrailPoint = {
  x: number;
  y: number;
  time: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
};

type Shockwave = {
  x: number;
  y: number;
  start: number;
};

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
  "[contenteditable]",
].join(", ");

const IDLE_DELAY = 150;
const PINCH_ZOOM_THRESHOLD = 1.01;

// The press spin and contraction have identical durations.
const CROSSHAIR_PRESS_DURATION = 220;
const CROSSHAIR_PRESS_ROTATION = 540;

const TERMINAL_TRAIL_DURATION = 300;

const VALID_STYLES: CursorStyle[] = [
  "rocket",
  "neon",
  "crosshair",
  "terminal",
  "comet",
  "pixel",
  "default",
];

function isCursorStyle(value: unknown): value is CursorStyle {
  return VALID_STYLES.includes(value as CursorStyle);
}

function isPinchZoomed() {
  return (
    (window.visualViewport?.scale ?? 1) >
    PINCH_ZOOM_THRESHOLD
  );
}

function getSavedStyle(): CursorStyle {
  if (typeof window === "undefined") {
    return "default";
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (isCursorStyle(saved)) {
      return saved;
    }
  } catch {
    // Use the default.
  }

  return "default";
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/*
 * ROCKET
 * Existing artwork preserved.
 */
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
          <stop stopColor="#fef08a" stopOpacity=".8" />
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

      <ellipse
        className="rocket-engine-glow"
        cx="32"
        cy="88"
        rx="19"
        ry="23"
        fill="url(#cursor-engine-glow)"
      />

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

/*
 * PIXEL
 * Existing bitmap preserved.
 */
const PIXEL_BITMAP = [
  "1000000000",
  "1300000000",
  "1320000000",
  "1322000000",
  "1322200000",
  "1322220000",
  "1322222000",
  "1322222200",
  "1322211110",
  "1320110000",
  "1100110000",
  "1000011000",
  "0000001100",
];

function PixelArtwork() {
  return (
    <svg
      width="20"
      height="26"
      viewBox="0 0 20 26"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="pixel-artwork block overflow-visible"
    >
      {PIXEL_BITMAP.flatMap((row, y) =>
        [...row].map((value, x) => {
          if (value === "0") return null;

          const fill =
            value === "1"
              ? "#083516"
              : value === "3"
                ? "#dcfce7"
                : "#4ade80";

          return (
            <rect
              key={`${x}-${y}`}
              x={x * 2}
              y={y * 2}
              width="2"
              height="2"
              fill={fill}
            />
          );
        })
      )}
    </svg>
  );
}

/*
 * COMET
 * Existing layered tail preserved.
 */
function drawCometTail(
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  opacity: number,
  intensity: number
) {
  if (points.length < 2) return;

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const count = points.length - 1;

  for (let i = 0; i < count; i++) {
    const a = points[i];
    const b = points[i + 1];
    const progress = (i + 1) / count;
    const taper = progress * progress;

    const gradient = ctx.createLinearGradient(
      a.x,
      a.y,
      b.x,
      b.y
    );

    gradient.addColorStop(
      0,
      `rgba(14,165,233,${
        0.12 * progress * opacity
      })`
    );

    gradient.addColorStop(
      1,
      `rgba(125,211,252,${
        0.78 * progress * opacity
      })`
    );

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = (3 + taper * 13) * intensity;
    ctx.shadowColor = "#0284c7";
    ctx.shadowBlur = 19;
    ctx.globalAlpha = 0.35;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = (0.8 + taper * 4.5) * intensity;
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 10;
    ctx.globalAlpha = 0.9;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = `rgba(224,242,254,${
      taper * opacity
    })`;
    ctx.lineWidth = (0.3 + taper) * intensity;
    ctx.shadowColor = "#bae6fd";
    ctx.shadowBlur = 5;
    ctx.globalAlpha = 1;
    ctx.stroke();
  }

  ctx.restore();
}

function drawCometIons(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  now: number,
  idle: boolean,
  hovering: boolean
) {
  const time = now / 1000;
  const count = hovering ? 9 : idle ? 7 : 5;
  const tailLength = hovering
    ? 54
    : idle
      ? 40
      : 28;

  ctx.save();

  for (let i = 0; i < count; i++) {
    const phase =
      (time * (0.75 + i * 0.075) +
        i * 0.21) % 1;

    const distance = 4 + phase * tailLength;

    const spread =
      Math.sin(time * 5 + i * 2.4) *
      (1 + phase * 3.5);

    const px =
      x -
      Math.cos(angle) * distance -
      Math.sin(angle) * spread;

    const py =
      y -
      Math.sin(angle) * distance +
      Math.cos(angle) * spread;

    const alpha =
      Math.sin(Math.PI * phase) *
      (hovering ? 0.68 : idle ? 0.5 : 0.3);

    ctx.globalAlpha = alpha;
    ctx.fillStyle =
      i % 2 === 0 ? "#e0f2fe" : "#38bdf8";
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 6;

    ctx.beginPath();
    ctx.arc(
      px,
      py,
      i % 3 === 0 ? 0.9 : 0.55,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  ctx.restore();
}

/*
 * TERMINAL TRAIL
 *
 * A thin green trace with a few fading binary
 * characters. It disappears after movement stops.
 */
function drawTerminalTrail(
  ctx: CanvasRenderingContext2D,
  points: TrailPoint[],
  now: number
) {
  const fresh = points.filter(
    (point) =>
      now - point.time < TERMINAL_TRAIL_DURATION
  );

  if (fresh.length === 0) return;

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let i = 1; i < fresh.length; i++) {
    const a = fresh[i - 1];
    const b = fresh[i];

    const age = now - b.time;
    const fade = Math.max(
      0,
      1 - age / TERMINAL_TRAIL_DURATION
    );

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = `rgba(74,222,128,${
      fade * 0.38
    })`;
    ctx.lineWidth = 1;
    ctx.shadowColor = "#22c55e";
    ctx.shadowBlur = 5;
    ctx.stroke();
  }

  ctx.font = "bold 9px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Space the glyphs so the trail stays subtle.
  for (let i = 0; i < fresh.length; i += 3) {
    const point = fresh[i];
    const age = now - point.time;
    const fade = Math.max(
      0,
      1 - age / TERMINAL_TRAIL_DURATION
    );

    ctx.globalAlpha = fade * 0.65;
    ctx.fillStyle = "#86efac";
    ctx.shadowColor = "#4ade80";
    ctx.shadowBlur = 5;

    ctx.fillText(
      Math.floor(point.time / 40) % 2 === 0
        ? "1"
        : "0",
      point.x,
      point.y
    );
  }

  ctx.restore();
}

export default function CustomCursor() {
  const [style, setStyle] =
    useState<CursorStyle>(getSavedStyle);
  const { cursorEffects, motion } = usePreferences();

  const rocketRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const rotorRef = useRef<SVGGElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const cometRef = useRef<HTMLDivElement>(null);
  const pixelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    function handleCursorChange(event: Event) {
      const next = (
        event as CustomEvent<CursorStyle>
      ).detail;

      if (isCursorStyle(next)) {
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
    const crosshair = crosshairRef.current;
    const rotor = rotorRef.current;
    const terminal = terminalRef.current;
    const comet = cometRef.current;
    const pixel = pixelRef.current;
    const canvas = canvasRef.current;

    if (
      !rocket ||
      !dot ||
      !ring ||
      !crosshair ||
      !rotor ||
      !terminal ||
      !comet ||
      !pixel ||
      !canvas
    ) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const media = window.matchMedia(CURSOR_QUERY);
    const viewport = window.visualViewport;
    const root = document.documentElement;

    const cursors = {
      rocket,
      neon: dot,
      crosshair,
      terminal,
      comet,
      pixel,
    };

    let enabled = false;
    let visible = false;
    let hovering = false;
    let pressing = false;
    let textTarget = false;
    let gestureActive = false;

    let pointerX = 0;
    let pointerY = 0;

    // Neon tracking.
    let ringX = 0;
    let ringY = 0;
    let ringScale = 1;
    let desiredScale = 1;

    // Crosshair rotation.
    let rotation = 0;
    let rotationSpeed = 18;
    let movementSpeed = 0;

    // New: synchronize press spin with CSS contraction.
    let crosshairPressStart = -1;
    let crosshairPressRotation = 0;

    // Comet orientation.
    let currentCometAngle = Math.PI / 4;

    let frame = 0;
    let previousFrameTime = 0;
    let previousMoveTime = 0;
    let lastMoveTime = 0;

    let idleTimer:
      | ReturnType<typeof setTimeout>
      | null = null;

    let gestureTimer:
      | ReturnType<typeof setTimeout>
      | null = null;

    let terminalFlashTimer:
      | ReturnType<typeof setTimeout>
      | null = null;

    const cometTrail: TrailPoint[] = [];
    const terminalTrail: TrailPoint[] = [];
    const particles: Particle[] = [];
    const shockwaves: Shockwave[] = [];

    function resizeCanvas() {
      const ratio = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas!.width = Math.round(
        window.innerWidth * ratio
      );

      canvas!.height = Math.round(
        window.innerHeight * ratio
      );

      canvas!.style.width =
        `${window.innerWidth}px`;

      canvas!.style.height =
        `${window.innerHeight}px`;

      ctx!.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
      );
    }

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

    function clearTerminalFlashTimer() {
      if (terminalFlashTimer !== null) {
        clearTimeout(terminalFlashTimer);
        terminalFlashTimer = null;
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

    function stopFrame() {
      if (frame !== 0) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }

    function hideAll() {
      Object.values(cursors).forEach((element) => {
        element.style.opacity = "0";
      });

      ring!.style.opacity = "0";
      canvas!.style.opacity = "0";

      ctx!.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      cometTrail.length = 0;
      terminalTrail.length = 0;
      particles.length = 0;
      shockwaves.length = 0;

      visible = false;
      pressing = false;
      crosshairPressStart = -1;

      stopFrame();
      clearIdleTimer();
      clearTerminalFlashTimer();

      terminal!.classList.remove("terminal-flash");
      crosshair!.classList.remove("crosshair-pressed");
      setRocketMoving(false);
    }

    function updateVisibility() {
      const show =
        enabled && visible && !textTarget;

      Object.entries(cursors).forEach(
        ([key, element]) => {
          element.style.opacity =
            show && style === key ? "1" : "0";
        }
      );

      ring!.style.opacity =
        show && style === "neon" ? "1" : "0";

      canvas!.style.opacity =
        show &&
        (cursorEffects !== "off" && (style === "comet" ||
          style === "pixel" ||
          style === "terminal"))
          ? "1"
          : "0";
    }

    function updatePosition() {
      rocket!.style.transform =
        `translate3d(${pointerX - 15}px,` +
        `${pointerY - 4}px,0)`;

      dot!.style.transform =
        `translate3d(${pointerX - 2}px,` +
        `${pointerY - 2}px,0)`;

      // Crosshair stays centred during every animation.
      crosshair!.style.transform =
        `translate3d(${pointerX - 18}px,` +
        `${pointerY - 18}px,0)`;

      terminal!.style.transform =
        `translate3d(${pointerX + 5}px,` +
        `${pointerY + 5}px,0)`;

      comet!.style.transform =
        `translate3d(${pointerX - 4}px,` +
        `${pointerY - 4}px,0)`;

      pixel!.style.transform =
        `translate3d(${pointerX}px,` +
        `${pointerY}px,0)`;
    }

    function spawnPixelParticles(count: number) {
      for (let i = 0; i < count; i++) {
        const angle =
          Math.random() * Math.PI * 2;

        const speed =
          0.5 + Math.random() * 1.8;

        particles.push({
          x: pointerX,
          y: pointerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: Math.random() > 0.5 ? 2 : 3,
        });
      }
    }

    function spawnCometBurst(count: number) {
      for (let i = 0; i < count; i++) {
        const angle =
          (Math.PI * 2 * i) / count +
          Math.random() * 0.25;

        const speed =
          1.8 + Math.random() * 2.8;

        particles.push({
          x: pointerX,
          y: pointerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 0.8 + Math.random() * 1.5,
        });
      }
    }

    function drawParticles(delta: number) {
      for (
        let i = particles.length - 1;
        i >= 0;
        i--
      ) {
        const particle = particles[i];

        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        particle.life -=
          (style === "comet" ? 0.035 : 0.055) *
          delta;

        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx!.save();

        ctx!.globalAlpha = particle.life * 0.85;
        ctx!.fillStyle =
          style === "comet" ? "#bae6fd" : "#4ade80";
        ctx!.shadowColor =
          style === "comet" ? "#38bdf8" : "#22c55e";
        ctx!.shadowBlur =
          style === "comet" ? 9 : 4;

        if (style === "pixel") {
          ctx!.fillRect(
            Math.round(particle.x),
            Math.round(particle.y),
            particle.size,
            particle.size
          );
        } else {
          ctx!.beginPath();
          ctx!.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
          );
          ctx!.fill();
        }

        ctx!.restore();
      }
    }

    function drawShockwaves(now: number) {
      for (
        let i = shockwaves.length - 1;
        i >= 0;
        i--
      ) {
        const wave = shockwaves[i];
        const progress =
          (now - wave.start) / 460;

        if (progress >= 1) {
          shockwaves.splice(i, 1);
          continue;
        }

        const eased = easeOutCubic(progress);

        const radius = 3 + eased * 29;
        const alpha =
          Math.pow(1 - progress, 1.5);

        ctx!.save();

        ctx!.globalAlpha = alpha;
        ctx!.strokeStyle = "#67e8f9";
        ctx!.lineWidth =
          1.8 * (1 - progress) + 0.3;
        ctx!.shadowColor = "#38bdf8";
        ctx!.shadowBlur = 12;

        ctx!.beginPath();
        ctx!.arc(
          wave.x,
          wave.y,
          radius,
          0,
          Math.PI * 2
        );
        ctx!.stroke();

        ctx!.restore();
      }
    }

    function drawComet(now: number) {
      const age = now - lastMoveTime;
      const idle = age > 100;
      const time = now / 1000;

      const hoverBoost = hovering ? 1.35 : 1;
      const intensity = hovering ? 1.25 : 1;

      if (!idle) {
        while (
          cometTrail.length > 0 &&
          now - cometTrail[0].time >
            (hovering ? 290 : 230)
        ) {
          cometTrail.shift();
        }

        const points = cometTrail.map(
          ({ x, y }) => ({ x, y })
        );

        points.push({
          x: pointerX,
          y: pointerY,
        });

        if (cursorEffects !== "off" && points.length > 1) {
          drawCometTail(
            ctx!,
            points,
            1,
            intensity * (cursorEffects === "subtle" ? 0.56 : 1)
          );
        }

        if (cursorEffects === "full") drawCometIons(
          ctx!,
          pointerX,
          pointerY,
          currentCometAngle,
          now,
          false,
          hovering
        );
      } else {
        cometTrail.length = 0;

        const pulse =
          (Math.sin(time * 3.8) + 1) / 2;

        const length =
          (30 + pulse * 16) * hoverBoost;

        const points: {
          x: number;
          y: number;
        }[] = [];

        for (let i = 24; i >= 0; i--) {
          const t = i / 24;
          const distance = t * length;

          const wave =
            Math.sin(time * 8 - t * 11) *
            t *
            (2 + pulse * 2.5) *
            (hovering ? 1.25 : 1);

          const dx =
            -Math.cos(currentCometAngle) *
              distance -
            Math.sin(currentCometAngle) * wave;

          const dy =
            -Math.sin(currentCometAngle) *
              distance +
            Math.cos(currentCometAngle) * wave;

          points.push({
            x: pointerX + dx,
            y: pointerY + dy,
          });
        }

        if (cursorEffects !== "off") drawCometTail(
          ctx!,
          points,
          0.88 + pulse * 0.12,
          (1 + pulse * 0.2) * intensity * (cursorEffects === "subtle" ? 0.56 : 1)
        );

        if (cursorEffects === "full") drawCometIons(
          ctx!,
          pointerX,
          pointerY,
          currentCometAngle,
          now,
          true,
          hovering
        );
      }

      if (cursorEffects !== "off") drawShockwaves(now);
    }

    function animate(now: number) {
      frame = 0;

      if (!enabled || !visible || textTarget) {
        return;
      }

      const elapsed = previousFrameTime
        ? Math.min(now - previousFrameTime, 40)
        : 16.67;

      const delta = elapsed / 16.67;
      const seconds = elapsed / 1000;

      previousFrameTime = now;

      let needsAnotherFrame = false;

      /*
       * CROSSHAIR
       *
       * Idle: original 18°/second.
       * Moving: original speed-based rotation.
       * Hover: rotation pauses; CSS pulses.
       * Press: 540° spin ending at 220ms,
       * exactly with the CSS contraction.
       */
      if (style === "crosshair") {
        if (now - lastMoveTime > 50) {
          movementSpeed *= 0.78;
        }

        if (
          pressing &&
          crosshairPressStart >= 0
        ) {
          const progress = Math.min(
            (now - crosshairPressStart) /
              CROSSHAIR_PRESS_DURATION,
            1
          );

          rotation =
            crosshairPressRotation +
            CROSSHAIR_PRESS_ROTATION *
              easeOutCubic(progress);

          rotationSpeed = 0;
        } else {
          const moving =
            now - lastMoveTime < 90 &&
            movementSpeed > 25;

          const targetSpeed = hovering || motion === "minimal"
            ? 0
            : moving
              ? 85 +
                Math.min(
                  movementSpeed * 0.72,
                  950
                )
              : 18;

          if (hovering) {
            rotationSpeed = 0;
          } else {
            rotationSpeed +=
              (targetSpeed - rotationSpeed) * 0.23;
          }

          rotation += rotationSpeed * seconds;
        }

        rotor!.style.transform =
          `rotate(${rotation}deg)`;

        needsAnotherFrame = true;
      }

      /*
       * NEON — existing smooth tracking.
       */
      if (style === "neon") {
        ringX += (pointerX - ringX) * 0.2;
        ringY += (pointerY - ringY) * 0.2;

        ringScale +=
          (desiredScale - ringScale) * 0.2;

        ring!.style.transform =
          `translate3d(${ringX - 14}px,` +
          `${ringY - 14}px,0) ` +
          `scale(${ringScale})`;

        needsAnotherFrame =
          Math.abs(pointerX - ringX) > 0.15 ||
          Math.abs(pointerY - ringY) > 0.15 ||
          Math.abs(
            desiredScale - ringScale
          ) > 0.005;
      }

      /*
       * TERMINAL — new fading movement trail.
       */
      if (style === "terminal") {
        ctx!.clearRect(
          0,
          0,
          window.innerWidth,
          window.innerHeight
        );

        while (
          terminalTrail.length > 0 &&
          now - terminalTrail[0].time >
            TERMINAL_TRAIL_DURATION
        ) {
          terminalTrail.shift();
        }

        if (cursorEffects !== "off") drawTerminalTrail(
          ctx!,
          terminalTrail,
          now
        );

        needsAnotherFrame =
          cursorEffects !== "off" && terminalTrail.length > 0;
      }

      /*
       * COMET — existing tail and press effects.
       */
      if (style === "comet") {
        ctx!.clearRect(
          0,
          0,
          window.innerWidth,
          window.innerHeight
        );

        drawComet(now);
        if (cursorEffects !== "off") drawParticles(delta);

        needsAnotherFrame = cursorEffects !== "off";
      }

      /*
       * PIXEL — unchanged.
       */
      if (style === "pixel") {
        ctx!.clearRect(
          0,
          0,
          window.innerWidth,
          window.innerHeight
        );

        if (cursorEffects !== "off") drawParticles(delta);

        needsAnotherFrame =
          particles.length > 0;
      }

      if (needsAnotherFrame) {
        frame = requestAnimationFrame(animate);
      }
    }

    function requestFrame() {
      if (
        frame === 0 &&
        enabled &&
        visible &&
        !textTarget &&
        (
          style === "neon" ||
          style === "crosshair" ||
          style === "terminal" ||
          style === "comet" ||
          style === "pixel"
        )
      ) {
        frame = requestAnimationFrame(animate);
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

      crosshair!.classList.toggle(
        "crosshair-hover",
        hovering
      );

      crosshair!.classList.toggle(
        "crosshair-pressed",
        pressing
      );

      terminal!.classList.toggle(
        "terminal-hover",
        hovering
      );

      pixel!.classList.toggle(
        "pixel-hover",
        hovering
      );

      pixel!.classList.toggle(
        "pixel-pressed",
        pressing
      );

      comet!.classList.toggle(
        "comet-hover",
        hovering
      );

      comet!.classList.toggle(
        "comet-pressed",
        pressing
      );

      desiredScale = pressing
        ? 0.8
        : hovering
          ? 1.3
          : 1;

      ring!.style.borderColor =
        hovering
          ? "rgba(103,232,249,0.9)"
          : "rgba(96,165,250,0.6)";

      ring!.style.backgroundColor =
        hovering
          ? "rgba(34,211,238,0.07)"
          : "rgba(59,130,246,0.025)";

      requestFrame();
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

      if (textTarget) {
        stopFrame();
        cometTrail.length = 0;
        terminalTrail.length = 0;
        particles.length = 0;
        shockwaves.length = 0;
      }

      updateInteraction();
      updateVisibility();

      if (!textTarget) {
        requestFrame();
      }
    }

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

      const now = performance.now();

      const oldX = pointerX;
      const oldY = pointerY;

      pointerX = event.clientX;
      pointerY = event.clientY;

      const dx = pointerX - oldX;
      const dy = pointerY - oldY;

      const distance = Math.hypot(dx, dy);

      if (!visible) {
        ringX = pointerX;
        ringY = pointerY;
      } else {
        const dt = Math.max(
          now - previousMoveTime,
          1
        );

        const instantSpeed = Math.min(
          (distance / dt) * 1000,
          3000
        );

        movementSpeed =
          movementSpeed * 0.35 +
          instantSpeed * 0.65;
      }

      visible = true;
      lastMoveTime = now;
      previousMoveTime = now;

      if (style === "terminal" && cursorEffects !== "off") {
        if (distance > 150) {
          terminalTrail.length = 0;
        } else if (distance > 0.5) {
          terminalTrail.push({
            x: pointerX,
            y: pointerY,
            time: now,
          });
        }

        if (terminalTrail.length > 32) {
          terminalTrail.shift();
        }
      }

      if (style === "comet") {
        if (
          distance > 1 &&
          distance < 150
        ) {
          currentCometAngle =
            Math.atan2(dy, dx);
        }

        if (distance > 150) {
          cometTrail.length = 0;
        } else if (distance > 0.5) {
          cometTrail.push({
            x: oldX,
            y: oldY,
            time: now,
          });
        }

        if (cometTrail.length > 42) {
          cometTrail.shift();
        }
      }

      if (
        style === "pixel" &&
        cursorEffects === "full" &&
        distance > 5 &&
        Math.random() < 0.35
      ) {
        spawnPixelParticles(1);
      }

      updatePosition();
      updateTarget(event.target);

      if (style === "rocket") {
        scheduleIdle();
      }

      requestFrame();
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

      if (pressing) return;

      pressing = true;

      /*
       * Start the crosshair spin at the same
       * moment the CSS contraction begins.
       */
      if (style === "crosshair" && !textTarget) {
        crosshairPressStart = performance.now();
        crosshairPressRotation = rotation;
      }

      if (style === "pixel" && cursorEffects !== "off") {
        spawnPixelParticles(7);
      }

      if (style === "comet" && !textTarget && cursorEffects !== "off") {
        shockwaves.push({
          x: pointerX,
          y: pointerY,
          start: performance.now(),
        });

        spawnCometBurst(cursorEffects === "subtle" ? 5 : 12);
      }

      if (style === "terminal") {
        clearTerminalFlashTimer();

        terminal!.classList.remove(
          "terminal-flash"
        );

        void terminal!.offsetWidth;

        terminal!.classList.add(
          "terminal-flash"
        );

        terminalFlashTimer = setTimeout(
          () => {
            terminal!.classList.remove(
              "terminal-flash"
            );
            terminalFlashTimer = null;
          },
          220
        );
      }

      updateInteraction();
      requestFrame();
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

      /*
       * If released before 220ms, complete the
       * remaining rotation immediately so the
       * final orientation stays consistent.
       */
      if (
        style === "crosshair" &&
        crosshairPressStart >= 0
      ) {
        rotation =
          crosshairPressRotation +
          CROSSHAIR_PRESS_ROTATION;

        rotor!.style.transform =
          `rotate(${rotation}deg)`;

        crosshairPressStart = -1;
      }

      pressing = false;
      updateTarget(event.target);
    }

    function onPointerOut(event: PointerEvent) {
      if (!event.relatedTarget) {
        hideAll();
      }
    }

    function onBlur() {
      hideAll();
    }

    function onVisibilityChange() {
      if (document.hidden) {
        onBlur();
      }
    }

    resizeCanvas();
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
      "resize",
      resizeCanvas
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
        "resize",
        resizeCanvas
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
      clearTerminalFlashTimer();
      stopFrame();

      root.classList.remove(
        "portfolio-custom-cursor-enabled"
      );

      hideAll();
    };
  }, [style, cursorEffects, motion]);

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
              [contenteditable] {
              cursor: text !important;
            }
          }

          /* ROCKET — ORIGINAL */

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

          .rocket-cursor-object.rocket-moving:not(.rocket-boost)
            .rocket-artwork {
            animation: none;
          }

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

          .rocket-cursor-object.rocket-pressed
            .rocket-visual {
            animation: none;
            transform: scale(0.9);
          }

          .rocket-cursor-object.rocket-pressed
            .rocket-artwork {
            animation: none;
          }

          /* CROSSHAIR */

          .crosshair-artwork {
            overflow: visible;
            filter: drop-shadow(
              0 0 3px rgba(34,211,238,0.7)
            );
          }

          .crosshair-inner {
            width: 36px;
            height: 36px;
            transform-origin: 18px 18px;
            transition:
              transform 180ms ease-out,
              filter 140ms ease-out;
          }

          .crosshair-rotor {
            transform-origin: 18px 18px;
          }

          /*
           * NEW: hover pulse.
           * Rotation still pauses via JavaScript.
           */
          .crosshair-hover:not(.crosshair-pressed)
            .crosshair-inner {
            animation: crosshair-hover-pulse 1.35s
              ease-in-out infinite;
            filter: drop-shadow(
              0 0 6px rgba(34,211,238,0.9)
            );
          }

          @keyframes crosshair-hover-pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }

          /*
           * NEW: 220ms contraction.
           * JavaScript uses the same duration
           * for the press rotation.
           */
          .crosshair-pressed .crosshair-inner {
            animation: crosshair-press-contract 220ms
              cubic-bezier(0.22,1,0.36,1)
              forwards;
          }

          @keyframes crosshair-press-contract {
            from {
              transform: scale(1);
            }
            to {
              transform: scale(0.68);
            }
          }

          /* TERMINAL */

          .terminal-shell {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 20px;
            padding: 0 3px 1px;
            border: 1px solid rgba(74,222,128,0.36);
            border-radius: 4px;
            background:
              linear-gradient(
                140deg,
                rgba(8,32,20,0.96),
                rgba(2,13,9,0.96)
              );
            box-shadow:
              0 2px 8px rgba(0,0,0,0.35),
              0 0 7px rgba(34,197,94,0.12),
              inset 0 1px 0 rgba(187,247,208,0.08);
            transform-origin: 0 0;
            transition:
              border-color 160ms ease-out,
              box-shadow 160ms ease-out,
              transform 120ms ease-out;
          }

          .terminal-shell::before {
            content: "";
            position: absolute;
            top: 3px;
            right: 3px;
            width: 2px;
            height: 2px;
            border-radius: 50%;
            background: #4ade80;
            box-shadow: 0 0 4px #22c55e;
            opacity: 0.8;
          }

          .terminal-prompt {
            display: flex;
            align-items: baseline;
            justify-content: center;
            font-family:
              "SFMono-Regular",
              Consolas,
              "Liberation Mono",
              monospace;
            font-size: 13px;
            font-weight: 800;
            line-height: 1;
            letter-spacing: -1.4px;
            color: #a7f3d0;
            white-space: nowrap;
            text-shadow:
              0 0 4px rgba(74,222,128,0.75),
              0 0 9px rgba(34,197,94,0.25);
          }

          .terminal-chevron {
            display: inline-block;
            transform: translateY(-0.5px);
          }

          .terminal-caret {
            display: inline-block;
            margin-left: 1px;
            animation:
              terminal-blink 1.05s steps(1,end) infinite;
          }

          @keyframes terminal-blink {
            0%, 60% {
              opacity: 1;
            }
            61%, 100% {
              opacity: 0.12;
            }
          }

          .terminal-hover .terminal-shell {
            border-color: rgba(134,239,172,0.8);
            box-shadow:
              0 2px 8px rgba(0,0,0,0.35),
              0 0 11px rgba(34,197,94,0.35),
              inset 0 0 6px rgba(34,197,94,0.1);
          }

          .terminal-hover .terminal-prompt {
            color: #dcfce7;
          }

          .terminal-flash .terminal-shell {
            transform: scale(0.9);
            border-color: #bbf7d0;
            background: #14532d;
            box-shadow:
              0 0 14px rgba(74,222,128,0.8);
          }

          .terminal-flash .terminal-caret {
            animation: none;
            opacity: 1;
          }

          /* COMET — EXISTING EFFECTS */

          .comet-head {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #f8fdff;
            box-shadow:
              0 0 4px 1px #e0f2fe,
              0 0 10px 3px rgba(125,211,252,0.85),
              0 0 20px 5px rgba(14,165,233,0.38);
            animation:
              comet-nucleus-pulse 1.5s
              ease-in-out infinite;
            transition:
              background 150ms ease-out,
              box-shadow 150ms ease-out;
          }

          @keyframes comet-nucleus-pulse {
            0%, 100% {
              transform: scale(0.9);
              opacity: 0.9;
            }
            50% {
              transform: scale(1.2);
              opacity: 1;
            }
          }

          .comet-hover .comet-head {
            background: #ffffff;
            box-shadow:
              0 0 7px 2px #e0f2fe,
              0 0 17px 6px rgba(56,189,248,0.95),
              0 0 32px 10px rgba(14,165,233,0.5);
          }

          .comet-pressed .comet-head {
            animation: none;
            transform: scale(0.7);
            background: #ffffff;
            box-shadow:
              0 0 8px 2px #e0f2fe,
              0 0 15px 5px rgba(56,189,248,0.9);
          }

          /* PIXEL — UNCHANGED */

          .pixel-artwork {
            image-rendering: pixelated;
            filter: drop-shadow(
              0 0 3px rgba(74,222,128,0.6)
            );
          }

          .pixel-hover .pixel-artwork {
            filter: drop-shadow(0 0 5px #4ade80);
          }

          .pixel-pressed .pixel-artwork {
            transform: scale(0.9);
            transform-origin: 0 0;
          }

          @media (prefers-reduced-motion: reduce) {
            .rocket-artwork,
            .rocket-engine-glow,
            .rocket-flames,
            .rocket-flame-inner,
            .rocket-spark,
            .rocket-visual,
            .crosshair-inner,
            .terminal-caret,
            .terminal-shell,
            .comet-head {
              animation: none !important;
              transition: none !important;
            }
          }
        `}
      </style>

      {/* Rocket */}
      <div
        ref={rocketRef}
        aria-hidden="true"
        className="rocket-cursor-object pointer-events-none fixed left-0 top-0 z-[9999] opacity-0"
        style={{
          transform: "translate3d(-200px,-200px,0)",
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
          transform: "translate3d(-200px,-200px,0)",
        }}
      />

      {/* Neon ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-7 w-7 rounded-full border border-blue-400/60 bg-blue-400/[0.025] opacity-0 will-change-transform"
        style={{
          transform: "translate3d(-200px,-200px,0)",
        }}
      />

      {/* Cyber Crosshair */}
      <div
        ref={crosshairRef}
        aria-hidden="true"
        className="crosshair-cursor pointer-events-none fixed left-0 top-0 z-[9999] opacity-0"
        style={{
          transform: "translate3d(-200px,-200px,0)",
          willChange: "transform",
        }}
      >
        <div className="crosshair-inner">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            className="crosshair-artwork block overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            <g
              stroke="#a5f3fc"
              strokeWidth="1.15"
              strokeLinecap="round"
            >
              <path d="M18 0.5V9" />
              <path d="M18 27V35.5" />
              <path d="M0.5 18H9" />
              <path d="M27 18H35.5" />
            </g>

            <g fill="#67e8f9">
              <circle cx="18" cy="1.5" r="1.2" />
              <circle cx="18" cy="34.5" r="1.2" />
              <circle cx="1.5" cy="18" r="1.2" />
              <circle cx="34.5" cy="18" r="1.2" />
            </g>

            <circle
              cx="18"
              cy="18"
              r="8"
              stroke="#67e8f9"
              strokeWidth="1"
              opacity=".88"
            />

            <g
              ref={rotorRef}
              className="crosshair-rotor"
            >
              <circle
                cx="18"
                cy="18"
                r="12"
                stroke="#22d3ee"
                strokeWidth="1.2"
                strokeDasharray="12 7 3 8"
              />

              <circle
                cx="18"
                cy="18"
                r="5"
                stroke="#67e8f9"
                strokeWidth=".9"
                strokeDasharray="7 5"
              />
            </g>

            <circle
              cx="18"
              cy="18"
              r="1.7"
              fill="#ecfeff"
            />
          </svg>
        </div>
      </div>

      {/* Terminal */}
      <div
        ref={terminalRef}
        aria-hidden="true"
        className="terminal-cursor pointer-events-none fixed left-0 top-0 z-[9999] opacity-0"
        style={{
          transform: "translate3d(-200px,-200px,0)",
          willChange: "transform",
        }}
      >
        <div className="terminal-shell">
          <span className="terminal-prompt">
            <span className="terminal-chevron">
              &gt;
            </span>
            <span className="terminal-caret">
              _
            </span>
          </span>
        </div>
      </div>

      {/* Comet */}
      <div
        ref={cometRef}
        aria-hidden="true"
        className="comet-cursor pointer-events-none fixed left-0 top-0 z-[9999] opacity-0"
        style={{
          transform: "translate3d(-200px,-200px,0)",
          willChange: "transform",
        }}
      >
        <div className="comet-head" />
      </div>

      {/* Pixel */}
      <div
        ref={pixelRef}
        aria-hidden="true"
        className="pixel-cursor pointer-events-none fixed left-0 top-0 z-[9999] opacity-0"
        style={{
          transform: "translate3d(-200px,-200px,0)",
          willChange: "transform",
        }}
      >
        <PixelArtwork />
      </div>

      {/* Comet, Pixel and Terminal canvas effects */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] opacity-0"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />
    </>
  );
}
