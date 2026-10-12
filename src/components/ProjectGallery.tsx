
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { galleries } from "../data/galleries";

type ProjectGalleryProps = {
  projectId: number;
};

type ActiveImage = {
  projectId: number;
  index: number;
};

export default function ProjectGallery({
  projectId,
}: ProjectGalleryProps) {
  const images = galleries[projectId] ?? [];

  // Associate the selected image with its project.
  const [activeImage, setActiveImage] =
    useState<ActiveImage | null>(null);

  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const dialogRef =
    useRef<HTMLDivElement>(null);

  const previousFocusRef =
    useRef<HTMLElement | null>(null);

  // An image selected in another project is ignored.
  const activeIndex =
    activeImage?.projectId === projectId
      ? activeImage.index
      : null;

  const selectedImage =
    activeIndex !== null
      ? images[activeIndex] ?? null
      : null;

  const isOpen = selectedImage !== null;

  function openImage(index: number) {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    setActiveImage({
      projectId,
      index,
    });
  }

  function closeImage() {
    setActiveImage(null);

    requestAnimationFrame(() => {
      previousFocusRef.current?.focus();
    });
  }

  function showNext() {
    setActiveImage((current) => {
      if (
        !current ||
        current.projectId !== projectId ||
        images.length === 0
      ) {
        return current;
      }

      return {
        projectId,
        index: (current.index + 1) % images.length,
      };
    });
  }

  function showPrevious() {
    setActiveImage((current) => {
      if (
        !current ||
        current.projectId !== projectId ||
        images.length === 0
      ) {
        return current;
      }

      return {
        projectId,
        index:
          (current.index - 1 + images.length) %
          images.length,
      };
    });
  }

  // Keyboard controls and background scroll locking.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();

        setActiveImage(null);

        requestAnimationFrame(() => {
          previousFocusRef.current?.focus();
        });

        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        setActiveImage((current) => {
          if (
            !current ||
            current.projectId !== projectId ||
            images.length === 0
          ) {
            return current;
          }

          return {
            projectId,
            index:
              (current.index + 1) % images.length,
          };
        });

        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        setActiveImage((current) => {
          if (
            !current ||
            current.projectId !== projectId ||
            images.length === 0
          ) {
            return current;
          }

          return {
            projectId,
            index:
              (current.index - 1 + images.length) %
              images.length,
          };
        });

        return;
      }

      // Keep keyboard focus inside the lightbox.
      if (event.key === "Tab") {
        const dialog = dialogRef.current;

        if (!dialog) return;

        const focusable = Array.from(
          dialog.querySelectorAll<HTMLButtonElement>(
            "button:not(:disabled)"
          )
        );

        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last =
          focusable[focusable.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        } else if (
          !dialog.contains(document.activeElement)
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, images.length, projectId]);

  return (
    <section
      aria-label="Project screenshots"
      className="mt-16 sm:mt-20"
    >
      {/* Gallery heading */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div className="max-w-2xl">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-blue-400">
            Project Media
          </p>

          <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Screenshots &amp; Visuals
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            A closer look at the project's
            implementation, interface and results.
          </p>
        </div>

        {images.length > 0 && (
          <p className="font-mono text-xs tracking-wider text-slate-500">
            {String(images.length).padStart(2, "0")}{" "}
            {images.length === 1
              ? "IMAGE"
              : "IMAGES"}
          </p>
        )}
      </div>

      {/* Empty gallery */}
      {images.length === 0 ? (
        <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-white/15 bg-[#10141c] px-6 py-10 text-center">
          <p className="font-medium text-slate-300">
            Project screenshots coming soon
          </p>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Real implementation screenshots and
            results will be added as they become
            available.
          </p>
        </div>
      ) : (
        /* Screenshot grid */
        <div className="grid gap-5 sm:grid-cols-2">
          {images.map((image, index) => (
            <button
              key={`${projectId}-${image.src}`}
              type="button"
              onClick={() => openImage(index)}
              aria-label={`Enlarge: ${image.alt}`}
              className="group min-w-0 cursor-zoom-in overflow-hidden rounded-lg border border-white/10 bg-[#10141c] text-left transition-colors duration-300 hover:border-white/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0b1018]">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#05070b]/40 to-transparent" />

                {/* Image counter */}
                <span className="absolute left-4 top-4 rounded-md border border-white/15 bg-[#080c13]/75 px-2.5 py-1 font-mono text-[11px] text-slate-200 backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                  <span className="mx-1 text-slate-500">
                    /
                  </span>
                  {String(images.length).padStart(2, "0")}
                </span>

                {/* Expand icon */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#080c13]/80 text-sm text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-blue-400/50 group-hover:bg-blue-400/15"
                >
                  ↗
                </span>
              </div>

              {/* Caption */}
              <div className="flex min-h-[78px] items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-6 text-slate-100 transition-colors duration-200 group-hover:text-white">
                    {image.caption}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Click to expand
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="shrink-0 text-xs text-slate-500"
                >
                  VIEW
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen image viewer */}
      {selectedImage &&
        createPortal(
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Project screenshot viewer"
            aria-describedby="gallery-instructions"
            className="fixed inset-0 z-[100] flex flex-col bg-[#05070b] p-4 text-white sm:p-6 lg:p-8"
          >
            {/* Toolbar */}
            <div className="mx-auto flex w-full max-w-7xl shrink-0 items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-blue-400">
                  Image Viewer
                </p>

                <p className="mt-1 font-mono text-sm text-slate-300">
                  {String(
                    (activeIndex ?? 0) + 1
                  ).padStart(2, "0")}{" "}
                  /{" "}
                  {String(images.length).padStart(
                    2,
                    "0"
                  )}
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeImage}
                aria-label="Close image viewer"
                className="cursor-pointer rounded-md border border-white/15 px-4 py-2.5 text-sm text-slate-200 transition-colors duration-200 hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
              >
                Close <span aria-hidden="true">✕</span>
              </button>
            </div>

            {/* Image and arrows */}
            <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 items-center justify-center gap-2 py-5 sm:gap-5 sm:py-8">
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous screenshot"
                  className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 text-xl text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 sm:h-12 sm:w-12"
                >
                  ←
                </button>
              )}

              <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center">
                <img
                  key={selectedImage.src}
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next screenshot"
                  className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 text-xl text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 sm:h-12 sm:w-12"
                >
                  →
                </button>
              )}
            </div>

            {/* Caption */}
            <div className="mx-auto w-full max-w-7xl shrink-0 border-t border-white/10 pt-4 text-center">
              <p className="text-sm font-medium text-slate-100">
                {selectedImage.caption}
              </p>

              <p
                id="gallery-instructions"
                className="mt-2 text-xs text-slate-500"
              >
                Arrow keys to navigate · Esc to close
              </p>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
