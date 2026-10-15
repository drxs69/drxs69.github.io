import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { galleries } from "../data/galleries";

type ProjectGalleryProps = { projectId: number };
type ActiveImage = { projectId: number; index: number };
type Position = { x: number; y: number };

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.35;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ProjectGallery({ projectId }: ProjectGalleryProps) {
  const images = galleries[projectId] ?? [];
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const gestureStartZoomRef = useRef(1);
  const zoomRef = useRef(1);
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);
  const dragRef = useRef<{ pointerId: number; x: number; y: number; originX: number; originY: number } | null>(null);

  const activeIndex = activeImage?.projectId === projectId ? activeImage.index : null;
  const selectedImage = activeIndex !== null ? images[activeIndex] ?? null : null;
  const isOpen = selectedImage !== null;

  function resetZoom() {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setDragging(false);
    dragRef.current = null;
  }

  function setImageZoom(next: number) {
    const nextZoom = clamp(next, MIN_ZOOM, MAX_ZOOM);
    setZoom(nextZoom);
    if (nextZoom <= 1) setPosition({ x: 0, y: 0 });
  }

  function openImage(index: number) {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    resetZoom();
    setActiveImage({ projectId, index });
  }

  function closeImage() {
    setActiveImage(null);
    resetZoom();
    requestAnimationFrame(() => previousFocusRef.current?.focus());
  }

  function moveImage(delta: number) {
    resetZoom();
    setActiveImage((current) => {
      if (!current || current.projectId !== projectId || images.length === 0) return current;
      return { projectId, index: (current.index + delta + images.length) % images.length };
    });
  }

  // Install non-passive handlers so Safari trackpad pinch zoom targets the
  // image, not the entire page. Also handle normal wheel zoom over the photo.
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const frame = frameRef.current;
    if (!dialog || !frame) return;

    document.documentElement.classList.add("portfolio-gallery-scroll-locked");
    closeButtonRef.current?.focus();

    function onWheel(event: WheelEvent) {
      event.preventDefault();
      // Trackpads frequently emit ctrlKey+wheel for pinch gestures.
      const change = -event.deltaY * (event.ctrlKey ? 0.012 : 0.004);
      setZoom((current) => {
        const next = clamp(current * Math.exp(change), MIN_ZOOM, MAX_ZOOM);
        if (next <= 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    }

    function onGestureStart(event: Event) {
      if (!dialog?.contains(event.target as Node)) return;
      if (event.cancelable) event.preventDefault();
      gestureStartZoomRef.current = zoomRef.current;
    }

    function onGestureChange(event: Event) {
      if (!dialog?.contains(event.target as Node)) return;
      if (event.cancelable) event.preventDefault();
      const gesture = event as Event & { scale?: number };
      const factor = typeof gesture.scale === "number" ? gesture.scale : 1;
      setImageZoom(gestureStartZoomRef.current * factor);
    }

    function onGestureEnd(event: Event) {
      if (dialog?.contains(event.target as Node) && event.cancelable) event.preventDefault();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveImage(null);
        resetZoom();
        requestAnimationFrame(() => previousFocusRef.current?.focus());
      } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        resetZoom();
        const delta = event.key === "ArrowRight" ? 1 : -1;
        setActiveImage((current) =>
          !current || current.projectId !== projectId || images.length === 0
            ? current
            : { projectId, index: (current.index + delta + images.length) % images.length }
        );
      } else if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        setZoom((current) => clamp(current + ZOOM_STEP, MIN_ZOOM, MAX_ZOOM));
      } else if (event.key === "-") {
        event.preventDefault();
        setZoom((current) => {
          const next = clamp(current - ZOOM_STEP, MIN_ZOOM, MAX_ZOOM);
          if (next === 1) setPosition({ x: 0, y: 0 });
          return next;
        });
      } else if (event.key === "0") {
        event.preventDefault();
        resetZoom();
      } else if (event.key === "Tab") {
        const currentDialog = dialogRef.current;
        if (!currentDialog) return;
        const focusable = Array.from(currentDialog.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"));
        if (!focusable.length) { event.preventDefault(); return; }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        } else if (!currentDialog.contains(document.activeElement)) {
          event.preventDefault(); first.focus();
        }
      }
    }

    frame.addEventListener("wheel", onWheel, { passive: false });
    // Safari's proprietary gesture events are intentionally subscribed
    // through addEventListener for TypeScript compatibility.
    document.addEventListener("gesturestart", onGestureStart, { passive: false, capture: true });
    document.addEventListener("gesturechange", onGestureChange, { passive: false, capture: true });
    document.addEventListener("gestureend", onGestureEnd, { passive: false, capture: true });
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.classList.remove("portfolio-gallery-scroll-locked");
      frame.removeEventListener("wheel", onWheel);
      document.removeEventListener("gesturestart", onGestureStart, true);
      document.removeEventListener("gesturechange", onGestureChange, true);
      document.removeEventListener("gestureend", onGestureEnd, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, images.length, projectId]);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (zoom <= 1 || event.button !== 0) return;
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      originX: position.x,
      originY: position.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const frame = frameRef.current;
    if (!frame) return;
    const limitX = (frame.clientWidth * (zoom - 1)) / 2;
    const limitY = (frame.clientHeight * (zoom - 1)) / 2;
    setPosition({
      x: clamp(drag.originX + event.clientX - drag.x, -limitX, limitX),
      y: clamp(drag.originY + event.clientY - drag.y, -limitY, limitY),
    });
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <section aria-label="Project screenshots" className="mt-16 sm:mt-20">
      <style>{`
        html.portfolio-gallery-scroll-locked { overflow: hidden !important; }
        /* Viewer-specific rules deliberately override older index.css rules
           that forced the modal to remain dark in light mode. */
        .portfolio-gallery-dialog { background: #05070b !important; color: #f8fafc !important; }
        .portfolio-gallery-dialog .gallery-header,
        .portfolio-gallery-dialog .gallery-footer { border-color: rgba(255,255,255,.13); }
        .portfolio-gallery-dialog .gallery-control { color: #e2e8f0 !important; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.2); }
        .portfolio-gallery-dialog .gallery-control:hover:not(:disabled) { background: rgba(255,255,255,.16); }
        .portfolio-gallery-dialog .gallery-title { color: #e2e8f0 !important; }
        .portfolio-gallery-dialog .gallery-muted { color: #94a3b8 !important; }
        .portfolio-gallery-dialog .gallery-stage { background: #0c111a; }
        .portfolio-gallery-dialog .gallery-stage-backdrop { opacity: .28; }

        :root[data-theme="light"] .portfolio-gallery-dialog {
          background: #f4f7fb !important;
          color: #172439 !important;
        }
        :root[data-theme="light"] .portfolio-gallery-dialog .gallery-header,
        :root[data-theme="light"] .portfolio-gallery-dialog .gallery-footer { border-color: #d1dbe7 !important; }
        :root[data-theme="light"] .portfolio-gallery-dialog .gallery-control {
          color: #21344b !important;
          background: #ffffff !important;
          border-color: #cbd6e5 !important;
          box-shadow: 0 2px 8px rgba(15,23,42,.07);
        }
        :root[data-theme="light"] .portfolio-gallery-dialog .gallery-control:hover:not(:disabled) { background: #e8eff8 !important; }
        :root[data-theme="light"] .portfolio-gallery-dialog .gallery-title { color: #172439 !important; }
        :root[data-theme="light"] .portfolio-gallery-dialog .gallery-muted { color: #526781 !important; }
        :root[data-theme="light"] .portfolio-gallery-dialog .gallery-stage { background: #e2eaf3 !important; }
        :root[data-theme="light"] .portfolio-gallery-dialog .gallery-stage-backdrop { opacity: .18; }
        :root[data-theme="light"] .portfolio-gallery-dialog .gallery-accent { color: var(--accent, #2563eb) !important; }
      `}</style>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div className="max-w-2xl">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-blue-400">Project Media</p>
          <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Screenshots &amp; Visuals</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">A closer look at the project's implementation, interface and results.</p>
        </div>
        {images.length > 0 && (
          <p className="font-mono text-xs tracking-wider text-slate-500">
            {String(images.length).padStart(2, "0")} {images.length === 1 ? "IMAGE" : "IMAGES"}
          </p>
        )}
      </div>

      {images.length === 0 ? (
        <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-white/15 bg-[#10141c] px-6 py-10 text-center">
          <p className="font-medium text-slate-300">Project screenshots coming soon</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">Real implementation screenshots and results will be added as they become available.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {images.map((image, index) => (
            <button
              key={`${projectId}-${image.src}`}
              type="button"
              onClick={() => openImage(index)}
              aria-label={`Enlarge: ${image.alt}`}
              className="group min-w-0 cursor-zoom-in overflow-hidden rounded-lg border border-white/10 bg-[#10141c] text-left transition-colors duration-300 hover:border-white/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
            >
              <div className="portfolio-gallery-frame relative aspect-[16/10] overflow-hidden bg-[#0b1018]">
                <img src={image.src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="portfolio-gallery-backdrop pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover blur-2xl" />
                <div aria-hidden="true" className="portfolio-gallery-veil pointer-events-none absolute inset-0" />
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="portfolio-gallery-image relative z-10 h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-[#05070b]/20 to-transparent" />
                <span className="absolute left-4 top-4 z-20 rounded-md border border-white/15 bg-[#080c13]/75 px-2.5 py-1 font-mono text-[11px] text-slate-200 backdrop-blur-sm">{String(index + 1).padStart(2, "0")} <span className="mx-1 text-slate-500">/</span> {String(images.length).padStart(2, "0")}</span>
                <span aria-hidden="true" className="absolute bottom-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#080c13]/80 text-sm text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-blue-400/50 group-hover:bg-blue-400/15">↗</span>
              </div>
              <div className="flex min-h-[78px] items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-6 text-slate-100 transition-colors duration-200 group-hover:text-white">{image.caption}</p>
                  <p className="mt-1 text-xs text-slate-500">Click to expand</p>
                </div>
                <span aria-hidden="true" className="shrink-0 text-xs text-slate-500">VIEW</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedImage && createPortal(
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Project screenshot viewer"
          aria-describedby="gallery-instructions"
          className="portfolio-gallery-dialog fixed inset-0 z-[100] flex flex-col p-4 sm:p-6 lg:p-8"
        >
          <div className="gallery-header mx-auto flex w-full max-w-7xl shrink-0 items-center justify-between gap-4 border-b pb-4">
            <div>
              <p className="gallery-accent text-[10px] font-medium uppercase tracking-[0.2em] text-blue-400">Image Viewer</p>
              <p className="gallery-muted mt-1 font-mono text-sm">{String((activeIndex ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Zoom out" title="Zoom out (−)" onClick={() => setImageZoom(zoom - ZOOM_STEP)} disabled={zoom <= 1} className="gallery-control flex h-10 w-10 items-center justify-center rounded-md text-xl disabled:opacity-40">−</button>
              <span className="gallery-muted min-w-11 text-center font-mono text-xs tabular-nums">{Math.round(zoom * 100)}%</span>
              <button type="button" aria-label="Zoom in" title="Zoom in (+)" onClick={() => setImageZoom(zoom + ZOOM_STEP)} disabled={zoom >= MAX_ZOOM} className="gallery-control flex h-10 w-10 items-center justify-center rounded-md text-xl disabled:opacity-40">+</button>
              <button type="button" onClick={resetZoom} className="gallery-control hidden h-10 items-center justify-center rounded-md px-3 text-xs sm:flex">Reset</button>
              <button ref={closeButtonRef} type="button" onClick={closeImage} aria-label="Close image viewer" className="gallery-control ml-1 rounded-md px-4 py-2.5 text-sm">Close ✕</button>
            </div>
          </div>

          <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 items-center justify-center gap-2 py-5 sm:gap-5 sm:py-8">
            {images.length > 1 && (
              <button type="button" onClick={() => moveImage(-1)} aria-label="Previous screenshot" className="gallery-control flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl sm:h-12 sm:w-12">←</button>
            )}
            <div
              ref={frameRef}
              className={`gallery-stage portfolio-gallery-expanded relative flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden rounded-lg ${zoom > 1 ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"}`}
              style={{ touchAction: "none" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onDoubleClick={() => setImageZoom(zoom === 1 ? 2 : 1)}
            >
              <img src={selectedImage.src} alt="" aria-hidden="true" className="gallery-stage-backdrop pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover blur-2xl" />
              <img
                key={selectedImage.src}
                src={selectedImage.src}
                alt={selectedImage.alt}
                draggable={false}
                className="pointer-events-none relative z-10 max-h-full max-w-full select-none object-contain"
                style={{
                  transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${zoom})`,
                  transition: dragging ? "none" : "transform 120ms ease-out",
                }}
              />
            </div>
            {images.length > 1 && (
              <button type="button" onClick={() => moveImage(1)} aria-label="Next screenshot" className="gallery-control flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl sm:h-12 sm:w-12">→</button>
            )}
          </div>

          <div className="gallery-footer mx-auto w-full max-w-7xl shrink-0 border-t pt-4 text-center">
            <p className="gallery-title text-sm font-medium">{selectedImage.caption}</p>
            <p id="gallery-instructions" className="gallery-muted mt-2 text-xs">
              Pinch or scroll over the image to zoom · Drag to pan · Double-click to toggle zoom · Arrow keys to navigate · Esc to close
            </p>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
