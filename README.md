# drxs69 Portfolio

A personal developer portfolio showcasing my projects, technical skills, and experience in AI, data engineering, and software development.

Built with **React, TypeScript, Vite, Tailwind CSS, and Motion**, featuring a cinematic scrolling experience, interactive project case studies, and custom animated cursors.

**Live Website:** https://drxs69.github.io/

## Features

### Cinematic Homepage

On supported desktop viewports, the homepage features:

- Four animated scenes: Home, Projects, About, and Skills
- Scroll-driven transitions between scenes
- Sticky full-screen layout
- Scroll snapping and a section progress indicator
- Animated atmospheric backgrounds
- Animated scroll-to-explore indicator

Smaller viewports use a traditional scrolling layout.

### Project Case Studies

The portfolio features three projects:

**AI-Powered Defect Detection**
- Computer vision and defect detection system
- Microservice-based architecture
- Work involving the web/API, inference, storage, and system integration

**ElderGuard Analytics**
- Machine learning project using sensor data
- Data preprocessing, model training, and evaluation
- Classification-based analytics

**Train Survival**
- Multiplayer survival game developed using Roblox Studio and Luau
- Event-driven gameplay with threats such as bandit attacks and train fires
- Train health, repair mechanics, and journey progression

Project pages include technical explanations, architecture diagrams, screenshots, and image galleries.

### Interactive Project Gallery

- Responsive screenshot grid
- Fullscreen image viewer
- Previous and next image navigation
- Keyboard arrow navigation
- Escape key to close
- Screenshot captions
- Background scroll locking and keyboard focus management

### Custom Cursor

Users can select between three cursor styles:

- **Rocket:** Animated SVG rocket with floating, flame, hover, and click animations
- **Neon Ring:** Glowing cursor with a trailing ring
- **Default:** Native browser cursor

Cursor preferences are saved locally in the browser.

Custom cursors are enabled only on supported devices with a precise pointer and hover capability, with Reduced Motion disabled.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| TypeScript | Type-safe application development |
| Vite | Development server and production build |
| Tailwind CSS | Styling and responsive design |
| Motion | Animated transitions and interactions |
| React Router | Page navigation |
| SVG and CSS | Graphics and cursor animations |
| GitHub Pages | Website hosting |

## Responsive Design

The homepage uses two layout modes depending on the browser's CSS viewport dimensions and motion preferences.

### Recommended Viewing Experience

For the best visual experience, the following browser zoom levels are recommended:

| Display Type | Recommended Browser Zoom |
|---|---|
| Larger desktop screens and high-resolution monitors | **125%–150%** |
| Typical laptops | **100%–115%** |
| Tablets and mobile devices | Default zoom (100%) |

These are visual recommendations rather than technical requirements. The portfolio remains responsive across different viewport sizes and browser zoom levels.

**Note:** Browser zoom affects the effective CSS viewport dimensions. Cinematic scrolling is enabled only when the viewport is at least **1280 × 850 CSS pixels**, Reduced Motion is disabled, and the page is not pinch-zoomed.

Users can and should adjust their browser zoom according to their screen size and personal preference for the best experience.

### Homepage Layout Breakpoints

**Cinematic mode requires all three conditions:**

- Viewport width ≥ 1280px
- Viewport height ≥ 850px
- `prefers-reduced-motion: no-preference`

If any condition is not satisfied, the homepage switches to natural scrolling.

### Example Viewport Resolutions

| Viewport Resolution | Homepage Layout |
|---|---|
| 2560 × 1440 | Cinematic |
| 1920 × 1080 | Cinematic |
| 1728 × 1117 | Cinematic |
| 1536 × 864 | Cinematic |
| 1440 × 900 | Cinematic |
| 1366 × 768 | Natural |
| 1280 × 850 | Cinematic |
| 1280 × 800 | Natural |
| 1280 × 720 | Natural |
| 1024 × 768 | Natural |
| 768 × 1024 | Natural |
| 390 × 844 | Natural |

These dimensions refer to the **CSS viewport**, not necessarily the physical screen resolution.

### Feature Availability by Layout

| Feature | Cinematic | Natural |
|---|---|---|
| Fullscreen cinematic scenes | Yes | No |
| Scroll-driven scene transitions | Yes | No |
| Mandatory scroll snapping | Yes | No |
| Section progress indicator | Yes | No |
| Scroll-to-explore indicator | Yes | No |
| Animated atmospheric backgrounds | Yes | Yes |
| Projects, About, and Skills | Yes | Yes |
| Interactive project cards | Yes | Yes |
| Project case studies | Yes | Yes |
| Architecture diagrams | Yes | Yes |
| Screenshot galleries | Yes | Yes |
| Navbar and Footer | Yes | Yes |

### Custom Cursor Availability

Custom cursors do not depend on the cinematic homepage resolution breakpoint.

They require:

- A device supporting hover and a precise pointer
- Reduced Motion disabled
- Rocket or Neon Ring selected in cursor settings

Touchscreen devices generally use their default touch interactions.

### Browser Zoom and Trackpad Pinch Zoom

The portfolio supports browser zoom and trackpad pinch-to-zoom
without intentionally restricting magnification.

The cinematic homepage uses viewport-based layouts and scroll
snapping, which can interfere with navigation during pinch zoom.

To address this:

- **Normal zoom:** Cinematic scrolling is enabled on supported
  desktop viewports (≥1280px wide and ≥850px tall).
- **Pinch zoom:** The homepage temporarily switches to natural
  scrolling to avoid conflicts with sticky sections and
  mandatory scroll snapping.
- **Custom cursor:** The Rocket and Neon Ring cursors are
  temporarily disabled during pinch zoom, restoring the
  browser's native pointer for accurate interaction.
- **Zoom reset:** Cinematic scrolling and the selected custom
  cursor automatically return when magnification returns
  to normal, provided the usual activation requirements
  are satisfied.

The implementation uses the Visual Viewport API to detect
magnification, with additional Safari gesture handling
for the custom cursor.

This approach preserves browser zoom functionality while
improving usability and accessibility.

## Cinematic Scrolling Configuration

The cinematic homepage currently uses the following layout values:

| Configuration | Value |
|---|---|
| Navigation height | 5rem (80px) |
| Scroll track height | 310svh |
| Scene transition distance | 70svh |
| Sticky viewport height | calc(100svh - 5rem) |
| Scroll snapping | y mandatory |
| Number of scenes | 4 |

The homepage switches to natural scrolling when its cinematic-mode requirements are not satisfied.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/drxs69/drxs69.github.io.git
```

Enter the project directory:

```bash
cd drxs69.github.io
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite.

### Quality Checks

Run ESLint:

```bash
npm run lint
```

Build the production application:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Responsive Testing Checklist

Recommended viewports:

- 1920 × 1080 — Full HD desktop
- 1440 × 900 — Laptop
- 1280 × 850 — Exact cinematic breakpoint
- 1280 × 720 — Natural layout
- 1024 × 768 — Smaller viewport
- 768 × 1024 — Portrait tablet
- 390 × 844 — Mobile
- 320 × 568 — Narrow mobile viewport

### Checklist

- [ ] Navigation works at all screen sizes
- [ ] No unwanted horizontal scrolling
- [ ] Text and buttons remain visible
- [ ] Cinematic transitions work above the breakpoint
- [ ] Natural scrolling works below the breakpoint
- [ ] Project cards remain interactive
- [ ] Screenshot lightbox works with mouse and keyboard
- [ ] Cursor settings work correctly
- [ ] Reduced Motion preference is respected
- [ ] Browser zoom at 125%, 150%, and 200% remains usable
- [ ] Trackpad pinch zoom does not interfere with navigation
- [ ] Safari and Chrome behave consistently

## Certifications

- **Linux Foundation Certified IT Associate (LFCA)**

## Deployment

The website is hosted using GitHub Pages.

**Website:** https://drxs69.github.io/

**Repository:** https://github.com/drxs69/drxs69.github.io

## Maintenance

When updating responsive behaviour, review the following files:

| File | Responsibility |
|---|---|
| `src/pages/Home.tsx` | Homepage layout modes and cinematic scrolling |
| `src/components/Navbar.tsx` | Navigation and cursor preferences |
| `src/components/CustomCursor.tsx` | Custom cursor rendering and animations |
| `src/components/ScrollCue.tsx` | Cinematic scroll indicator |
| `src/components/ProjectGallery.tsx` | Project screenshots and lightbox |
| `src/components/ProjectDetail.tsx` | Project case-study layout |

---

Built with React, TypeScript, and a focus on interactive frontend experiences.
