# drxs69 Portfolio

A personal developer portfolio showcasing my projects, technical skills, and experience in AI, data engineering, and software development.

Built with **React, TypeScript, Vite, Tailwind CSS, and Motion**, featuring a cinematic scrolling experience, interactive project case studies, personalised appearance settings, and custom animated cursors.

**Live Website:** https://drxs69.github.io/

**Repository:** https://github.com/drxs69/drxs69.github.io

## Features

### Cinematic Homepage

On supported desktop viewports, the homepage features:

- Four animated scenes: Home, Projects, About, and Skills
- Scroll-driven transitions between scenes
- Sticky full-screen layout
- Scroll snapping and a section progress indicator
- Animated atmospheric backgrounds unique to each section
- Animated scroll-to-explore indicator
- Smooth navigation between sections
- Responsive project cards and interactive content

Smaller viewports use a traditional scrolling layout.

Visitors can also manually switch between **Cinematic** and **Standard** scrolling through the Preferences panel.

### Personalisation Settings

The portfolio includes a Preferences panel that allows visitors to customise their browsing experience.

The panel can be accessed through the settings icon in the navigation bar.

| Setting | Available Options | Description |
|---|---|---|
| Accent Colour | Blue, Cyan, Purple, Green, Orange | Changes highlighted text, buttons, borders, and supported atmospheric effects |
| Animation Intensity | Full, Balanced, Minimal | Adjusts the intensity of animations and decorative visual effects |
| Display Mode | Cinematic, Standard | Switches between cinematic transitions and traditional scrolling |
| Cursor Style | Seven cursor styles | Changes the appearance and behaviour of the mouse pointer |
| Cursor Effects | Off, Subtle, Full | Controls custom cursor trails, particles, and additional effects |
| Theme | Dark, Light, System | Changes the website's overall appearance |

#### Default Preferences

| Setting | Default |
|---|---|
| Accent Colour | Blue |
| Animation Intensity | Full |
| Display Mode | Cinematic, where supported |
| Cursor Style | System Default |
| Cursor Effects | Full |
| Theme | Dark |

Preferences are saved automatically using the browser's `localStorage`.

Visitors can restore the original settings using the **Reset Defaults** option.

System-level accessibility preferences, including Reduced Motion, are respected.

### Custom Cursor Collection

Visitors can select from seven cursor styles:

| Cursor | Description |
|---|---|
| **System Default** | Native operating-system cursor |
| **Rocket** | Animated SVG rocket with floating, flame, hover, and click animations |
| **Neon Ring** | Glowing cursor with a smoothly trailing ring |
| **Cyber Crosshair** | Rotating targeting reticle with movement-based rotation, hover pulsing, and click contraction |
| **Terminal** | Command-line-inspired cursor with a blinking prompt and fading binary trail |
| **Comet** | Glowing nucleus with a flowing plasma tail, moving ions, and click shockwaves |
| **Pixel Cursor** | Retro pixel-art pointer with hover effects and particles |

The different cursor designs include combinations of:

- Idle animations
- Movement-responsive effects
- Hover feedback
- Click and press animations
- Trails, glow effects, and particles

Cursor preferences are saved locally in the browser.

Custom cursors are enabled only on supported devices with a precise pointer and hover capability, with Reduced Motion disabled.

The **System Default** cursor is selected by default.

#### Cursor Effects Settings

Visitors can independently adjust cursor effects:

| Mode | Behaviour |
|---|---|
| Full | Complete trails, particles, and decorative effects |
| Subtle | Reduced visual effects |
| Off | Disables additional decorative cursor effects |

The selected cursor design remains available where supported, independently of the effects setting.

### Light and Dark Themes

The portfolio supports three appearance options:

- **Dark:** The original dark cinematic interface
- **Light:** A lighter interface with adjusted surfaces, text, borders, and visual effects
- **System:** Automatically follows the operating system's appearance preference

Theme-aware styling applies to the homepage, navigation, project case studies, interactive components, and supported fullscreen viewers.

Custom cursors include adjustments intended to improve visibility against light and dark backgrounds.

### Animated Atmospheric Backgrounds

Each homepage section uses its own visual background.

| Section | Background |
|---|---|
| Home | Animated aurora with layered gradients |
| Projects | Grid, circuit traces, processor indicators, and scanning effects |
| About | Orbital rings, glowing core, waves, and ambient elements |
| Skills | Flowing data streams, moving particles, and atmospheric glows |

Atmospheric effects adapt to the selected appearance and animation-intensity settings.

### Project Case Studies

The portfolio features three projects:

**AI-Powered Defect Detection**

- Computer vision and defect detection system
- Microservice-based architecture
- Work involving the web/API, inference, training, storage, and system integration
- Containerisation and orchestration technologies

**ElderGuard Analytics**

- Machine learning project using environmental sensor data
- Data preprocessing, model training, and evaluation
- Classification-based analytics
- Model comparison and performance evaluation

**Train Survival**

- Multiplayer survival game developed using Roblox Studio and Luau
- Event-driven gameplay with threats such as bandit attacks, train fires, and environmental hazards
- Train health, damage, repair mechanics, and journey progression
- Modular gameplay systems and client-server communication

Project pages include:

- Project overviews and technical explanations
- Technologies and implementation details
- Architecture diagrams
- Technical challenges
- Screenshots and image galleries
- Development progress and results
- Previous and next project navigation

### Interactive Project Gallery

The portfolio includes an interactive screenshot gallery featuring:

- Responsive screenshot grid
- Fullscreen image viewer
- Theme-aware light and dark appearances
- Previous and next image navigation
- Keyboard arrow navigation
- Escape key to close
- Screenshot captions and image counters
- Background scroll locking and keyboard focus management
- Blurred image backgrounds to fill unused space around uncropped screenshots
- Image zoom controls
- Zoom percentage indicator
- Drag-to-pan functionality while zoomed
- Zoom reset when switching screenshots

The image viewer allows visitors to inspect project screenshots without needing to zoom the entire website.

Dedicated zoom controls are provided because browser and trackpad gesture handling can vary between browsers.

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
| Canvas API | Cursor trails, particles, and visual effects |
| localStorage | Browser-based preference persistence |
| GitHub Pages | Website hosting |

## Responsive Design

The homepage uses two layout modes depending on the browser's CSS viewport dimensions and motion preferences.

The selected Display Mode also affects which layout is used.

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

The recommendations above do not override the cinematic layout's technical requirements. For example, increasing browser zoom may reduce the available CSS viewport below the cinematic breakpoint, causing the website to switch to natural scrolling.

### Homepage Layout Breakpoints

**Cinematic mode requires all three conditions:**

- Viewport width ≥ 1280px
- Viewport height ≥ 850px
- `prefers-reduced-motion: no-preference`

Additionally:

- **Cinematic** must be selected as the Display Mode.
- The page must not be actively pinch-zoomed.

If any condition is not satisfied, the homepage switches to natural scrolling.

Visitors can select Standard Mode at any time to use traditional scrolling, even when their viewport supports cinematic mode.

### Example Viewport Resolutions

The following examples assume Cinematic is selected, Reduced Motion is disabled, and the browser is not pinch-zoomed.

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
| Theme preferences | Yes | Yes |
| Accent colour selection | Yes | Yes |
| Animation intensity settings | Yes | Yes |
| Custom cursor selection | Yes | Yes |

Some visual effects may be reduced or disabled depending on accessibility preferences or selected animation settings.

### Custom Cursor Availability

Custom cursors do not depend on the cinematic homepage resolution breakpoint.

They require:

- A device supporting hover and a precise pointer
- Reduced Motion disabled
- A custom cursor selected in Preferences

Supported custom cursor styles include:

- Rocket
- Neon Ring
- Cyber Crosshair
- Terminal
- Comet
- Pixel Cursor

Selecting **System Default** uses the browser's native pointer.

Touchscreen devices generally use their default touch interactions.

### Browser Zoom and Trackpad Pinch Zoom

The portfolio supports browser zoom and trackpad pinch-to-zoom without intentionally restricting magnification.

The cinematic homepage uses viewport-based layouts and scroll snapping, which can interfere with navigation during pinch zoom.

To address this:

- **Normal zoom:** Cinematic scrolling is enabled on supported desktop viewports (≥1280px wide and ≥850px tall), provided all other requirements are satisfied.
- **Pinch zoom:** The homepage temporarily switches to natural scrolling to avoid conflicts with sticky sections and mandatory scroll snapping.
- **Custom cursor:** Custom cursors are temporarily disabled during pinch zoom, restoring the browser's native pointer for accurate interaction.
- **Zoom reset:** Cinematic scrolling and the selected custom cursor automatically return when magnification returns to normal, provided their normal activation requirements are satisfied.

The implementation uses the **Visual Viewport API** to detect magnification, with additional Safari gesture handling for custom cursor behaviour.

This approach preserves browser zoom functionality while improving usability and accessibility.

#### Image Viewer Zoom

Project screenshots can also be enlarged independently through the fullscreen image viewer.

Available interactions include:

- Zoom in and zoom out controls
- Zoom reset
- Image panning while enlarged
- Keyboard navigation between images

Trackpad-based image zoom behaviour may differ by browser. The dedicated image zoom controls provide an alternative without requiring browser-level magnification.

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

Standard Display Mode also disables the cinematic scene layout and mandatory scroll snapping.

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

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

Open the local URL displayed by Vite, typically:

`http://localhost:5173/`

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

A successful production build may display a JavaScript chunk-size warning. This is a performance advisory rather than a build failure.

## Project Structure

```text
public/
├── images/
├── favicon.svg
├── icons.svg
└── rocket-cursor.png

src/
├── assets/
├── components/
│   ├── backgrounds/
│   │   ├── AuroraBackground.tsx
│   │   └── SectionAtmosphere.tsx
│   ├── About.tsx
│   ├── ArchitectureDiagram.tsx
│   ├── CustomCursor.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectGallery.tsx
│   ├── ProjectNavigation.tsx
│   ├── Projects.tsx
│   ├── ScrollCue.tsx
│   └── Skills.tsx
├── data/
├── pages/
│   ├── Home.tsx
│   └── ProjectDetail.tsx
├── types/
├── App.tsx
├── index.css
├── main.tsx
└── preferences.ts

eslint.config.js
index.html
package.json
tsconfig.json
vite.config.ts
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
- [ ] Standard Display Mode works on supported desktop viewports
- [ ] Project cards remain interactive
- [ ] Architecture diagrams remain readable in Light and Dark Mode
- [ ] Screenshot lightbox works with mouse and keyboard
- [ ] Screenshot zoom and pan controls work
- [ ] Image viewer appearance follows the selected theme
- [ ] Previous and next project images appear in both themes
- [ ] All seven cursor options work correctly
- [ ] Cursor effects settings work correctly
- [ ] Accent colour selection updates supported components
- [ ] Theme preferences work correctly
- [ ] System theme detection works
- [ ] Animation intensity settings work
- [ ] Preferences persist after refreshing the website
- [ ] Reset Defaults restores the initial preferences
- [ ] Reduced Motion preference is respected
- [ ] Browser zoom at 125%, 150%, and 200% remains usable
- [ ] Trackpad pinch zoom does not interfere with navigation
- [ ] Safari and Chrome behave consistently

## Accessibility

The portfolio includes accessibility-focused functionality such as:

- Keyboard-accessible navigation controls
- Visible focus indicators
- Reduced Motion support
- Natural scrolling as an alternative to cinematic transitions
- Native system cursor option
- Adjustable animation and cursor effects
- Theme and accent colour preferences
- Responsive layouts
- Keyboard-controlled image gallery

Accessibility, performance, and browser compatibility remain ongoing areas of improvement.

## Deployment

The website is hosted using GitHub Pages.

**Website:** https://drxs69.github.io/

**Repository:** https://github.com/drxs69/drxs69.github.io

## Maintenance

When updating responsive behaviour, visual settings, animations, or project content, review the relevant files below.

| File | Responsibility |
|---|---|
| `src/preferences.ts` | Preference types, defaults, persistence, and change events |
| `src/pages/Home.tsx` | Homepage layout modes and cinematic scrolling |
| `src/components/Navbar.tsx` | Navigation, Preferences panel, and cursor selection |
| `src/index.css` | Global styling, themes, accent colours, and animation settings |
| `src/components/CustomCursor.tsx` | Custom cursor rendering, animations, trails, and particles |
| `src/components/backgrounds/AuroraBackground.tsx` | Home atmospheric background |
| `src/components/backgrounds/SectionAtmosphere.tsx` | Projects, About, and Skills background visuals |
| `src/components/ScrollCue.tsx` | Cinematic scroll indicator |
| `src/components/ProjectGallery.tsx` | Project screenshots, fullscreen viewer, and image zoom |
| `src/components/ProjectNavigation.tsx` | Previous and next project navigation |
| `src/components/ArchitectureDiagram.tsx` | Architecture diagram rendering |
| `src/pages/ProjectDetail.tsx` | Project case-study layout |
| `src/App.tsx` | Application routing and overall layout |

The active application source is located in the `src/` directory.

Backup folders and update ZIP archives should be kept outside the active project directory where practical.

## Future Improvements

- Further optimisation of animations and rendering performance
- Expanded light-theme and accessibility refinements
- Additional performance improvements for custom cursors
- Optional UI sound effects, disabled by default
- Expanded technical demonstrations and project screenshots
- Additional project case studies

---

Built with React, TypeScript, and a focus on interactive frontend experiences.
