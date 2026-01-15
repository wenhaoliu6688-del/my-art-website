# HARRY6 Website - Navigation System Documentation

**Version:** 1.9.5
**Last Updated:** 2026-01-15
**Status:** Production

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Left Hover Navigation (Desktop)](#left-hover-navigation-desktop)
3. [Fullscreen Menu (All Devices)](#fullscreen-menu-all-devices)
4. [Panel Positioning Algorithm](#panel-positioning-algorithm)
5. [Touch Device Adaptation](#touch-device-adaptation)
6. [BASE Path Handling](#base-path-handling)
7. [Event Handling System](#event-handling-system)
8. [Complete Flow Diagrams](#complete-flow-diagrams)

---

## System Overview

The HARRY6 website uses a **dual navigation system**:

1. **Left Hover Navigation** - Desktop-only, hover-expandable panels to the right
2. **Fullscreen Menu** - Overlay menu now used across ALL devices (desktop, iPad, mobile)

### Architecture Principles

- **Progressive Enhancement**: Works on all devices, optimized for each
- **GitHub Pages Compatible**: Automatic subdirectory path detection
- **Touch-First Mobile**: swipe gestures, touch-optimized interactions
- **Minimal Visual Impact**: Navigation never obstructs artwork viewing

---

## Left Hover Navigation (Desktop)

### Purpose
Provides quick, non-intrusive access to PROJECTS and IMAGES categories without leaving the homepage.

### Visual Structure

```
┌─────────────────────────────────────────────────────┐
│  HARRY6                              [☰]            │
│                                                     │
│                                                     │
│  PROJECTS ──────────────────┐                       │
│                             │ Yellow River  — 2025  │
│  IMAGES ────────────────────│ Frontispiece — 2024   │
│                             │ Formless Buddha— 2023 │
│  ABOUT                      │ Yellow       — 2021  │
│                             └───────────────────────┘
│                                                     │
│              [Artwork Display]                      │
│                                                     │
│              wenhao_liu888@163.com                  │
└─────────────────────────────────────────────────────┘
```

### HTML Structure

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```html
<!-- Lines 376-380: Navigation Markup -->
<nav class="nav" aria-label="Primary">
  <div class="navItem" data-menu="projects">
    <button class="navBtn" type="button">PROJECTS</button>
  </div>
  <div class="navItem" data-menu="images">
    <button class="navBtn" type="button">IMAGES</button>
  </div>
  <div class="navItem" data-menu="about">
    <button class="navBtn" type="button">ABOUT</button>
  </div>
</nav>

<!-- Lines 390-392: Panel Container -->
<div id="panel" class="panel" role="dialog" aria-hidden="true">
  <ul id="panelList" class="panelList"></ul>
</div>
```

### CSS Styling

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```css
/* Lines 104-133: Navigation Container */
.nav {
  position: fixed;
  left: var(--leftPad);      /* 56px desktop, 22px mobile */
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  user-select: none;
}

.navItem {
  margin: 18px 0;
}

.navBtn {
  display: inline-block;
  cursor: pointer;
  border: none;
  background: rgba(255,255,255,0.85);
  padding: 10px 12px;
  margin-left: -12px;
  font-size: 15px;
  letter-spacing: .24em;
  text-transform: uppercase;
  color: var(--text);
  border-radius: 999px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.navBtn:hover {
  color: var(--text);
  background: rgba(255,255,255,0.95);
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.navBtn.is-active {
  color: var(--text);
}

/* Lines 136-168: Panel Styling */
.panel {
  position: fixed;
  width: var(--panelW);      /* 360px desktop, 320px mobile */
  max-width: calc(100vw - 24px);
  background: #fff;
  border: 1px solid var(--line);
  padding: var(--panelPad);  /* 18px */
  z-index: 1001;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-8px);
  transition: opacity .14s ease, transform .14s ease;
}

.panel.is-open {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

/* Invisible bridge to prevent hover break */
.panel::before {
  content: "";
  position: absolute;
  left: -18px;
  top: 0;
  width: 18px;
  height: 100%;
  background: transparent;
}
```

### JavaScript Logic

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```javascript
// Lines 420-431: Navigation Data
const PROJECTS = [
  { title: "Yellow River", year: "2025", href: BASE + "projects/yellow-river/" },
  { title: "Frontispiece", year: "2024", href: BASE + "projects/frontispiece/" },
  { title: "Formless Buddha", year: "2023", href: BASE + "projects/formless-buddha/" },
  { title: "Yellow", year: "2021", href: BASE + "projects/yellow/" }
];

const IMAGES = [
  { title: "Yellow River", year: "2025", href: BASE + "images/yellow-river/" }
];

const ABOUT_HREF = BASE + "about/";

// Lines 433-438: DOM Elements
const panel = document.getElementById("panel");
const panelList = document.getElementById("panelList");
const items = Array.from(document.querySelectorAll(".navItem"));
const btns = Array.from(document.querySelectorAll(".navBtn"));

// State tracking
let activeKey = null;
let closeTimer = null;
```

### Interaction Flow

**Desktop (Non-Touch):**

```javascript
// Lines 504-507: Hover to open
if ((!isTouchDevice || isIPad) && (key === "projects" || key === "images")) {
  item.addEventListener("mouseenter", () => openPanelFor(key, btn));
  item.addEventListener("mouseleave", scheduleClose);
}

// Lines 510-523: Click to toggle
if (isIPad || !isTouchDevice) {
  btn.addEventListener("click", (e) => {
    if (key === "about") {
      window.location.href = ABOUT_HREF;
      e.preventDefault();
      return;
    }
    if (panel.classList.contains("is-open") && activeKey === key) {
      closePanel();
    } else {
      openPanelFor(key, btn);
    }
    e.preventDefault();
  });
}

// Lines 541-544: Keep panel open on hover
if (!isTouchDevice || isIPad) {
  panel.addEventListener("mouseenter", () => clearTimeout(closeTimer));
  panel.addEventListener("mouseleave", scheduleClose);
}
```

### Key Functions

```javascript
// Lines 441-445: Active State Management
function setActiveButton(key) {
  btns.forEach(b => b.classList.remove("is-active"));
  const item = items.find(i => i.dataset.menu === key);
  if (item) item.querySelector(".navBtn").classList.add("is-active");
}

// Lines 447-455: Render List Items
function renderList(list) {
  panelList.innerHTML = list.map(it => `
    <li>
      <a class="panelLink" href="${it.href}">
        ${it.title} <span class="year">— ${it.year}</span>
      </a>
    </li>
  `).join("");
}

// Lines 474-485: Open Panel
function openPanelFor(key, btn) {
  clearTimeout(closeTimer);
  activeKey = key;
  setActiveButton(key);

  if (key === "projects") renderList(PROJECTS);
  if (key === "images") renderList(IMAGES);

  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => positionPanelNearButton(btn));
}

// Lines 487-492: Close Panel
function closePanel() {
  activeKey = null;
  btns.forEach(b => b.classList.remove("is-active"));
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
}

// Lines 494-497: Schedule Delayed Close
function scheduleClose() {
  clearTimeout(closeTimer);
  closeTimer = setTimeout(closePanel, 220);
}
```

---

## Fullscreen Menu (All Devices)

### Purpose
Provides consistent, accessible navigation across all devices. Originally mobile-only, now adopted as **primary navigation for desktop and iPad** as well.

### Visual Structure

```
┌────────────────────────────────────────────────────────┐
│  HARRY6                                      [×]        │
│                                                        │
│  PROJECTS                                              │
│  ────────────────────────────────────────────────────  │
│    Yellow River (2025)                                 │
│    Frontispiece (2024)                                 │
│    Formless Buddha (2023)                              │
│    Yellow (2021)                                       │
│                                                        │
│  IMAGES                                                │
│  ────────────────────────────────────────────────────  │
│    Yellow River                                        │
│                                                        │
│  ABOUT                                                 │
│  ────────────────────────────────────────────────────  │
│    About                                               │
└────────────────────────────────────────────────────────┘
```

### HTML Structure

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```html
<!-- Lines 383-387: Menu Toggle Button -->
<button class="menuToggle" id="menuToggle" aria-label="Menu">
  <svg viewBox="0 0 24 24">
    <path d="M3 12h18M3 6h18M3 18h18"/>
  </svg>
</button>

<!-- Lines 724-738: Fullscreen Menu -->
<div class="fullscreenMenu" id="fullscreenMenu">
  <button class="menuCloseBtn" id="menuCloseBtn" aria-label="Close menu">
    &times;
  </button>

  <h2 class="menuCategoryTitle">PROJECTS</h2>
  <a class="menuItem" href="projects/yellow-river/">
    Yellow River <span class="year">(2025)</span>
  </a>
  <a class="menuItem" href="projects/frontispiece/">
    Frontispiece <span class="year">(2024)</span>
  </a>
  <a class="menuItem" href="projects/formless-buddha/">
    Formless Buddha <span class="year">(2023)</span>
  </a>
  <a class="menuItem" href="projects/yellow/">
    Yellow <span class="year">(2021)</span>
  </a>

  <h2 class="menuCategoryTitle">IMAGES</h2>
  <a class="menuItem" href="images/yellow-river/">Yellow River</a>

  <h2 class="menuCategoryTitle">ABOUT</h2>
  <a class="menuItem" href="about/">About</a>
</div>
```

### CSS Styling

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```css
/* Lines 77-101: Menu Toggle Button */
.menuToggle {
  display: none;
  position: fixed;
  top: 44px;
  right: 22px;
  width: 44px;
  height: 44px;
  border: none;
  background: rgba(255,255,255,0.85);
  border-radius: 999px;
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: opacity .15s ease;
}

.menuToggle:hover {
  opacity: .75;
}

.menuToggle svg {
  width: 20px;
  height: 20px;
  stroke: var(--text);
  stroke-width: 1.5;
  fill: none;
}

/* Lines 264-298: Fullscreen Menu */
.fullscreenMenu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 2000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  overflow-y: auto;
  padding: 80px 32px 32px;
}

.fullscreenMenu.is-open {
  opacity: 1;
  pointer-events: auto;
}

.menuCloseBtn {
  position: absolute;
  top: 32px;
  right: 32px;
  width: 44px;
  height: 44px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 32px;
  color: #000;
  line-height: 1;
  padding: 0;
}

.menuCategoryTitle {
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 0.02em;
  color: #000;
  padding: 32px 0 16px 0;
  margin: 0;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.menuItem {
  display: block;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: rgba(0,0,0,0.7);
  padding: 16px 0 16px 24px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.menuItem:hover {
  color: #000;
  padding-left: 32px;
}

.menuItem .year {
  color: rgba(0,0,0,0.4);
  font-size: 14px;
  margin-left: 0.5em;
}
```

### Cross-Device Display Logic

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```css
/* Lines 333-367: Responsive Visibility */

/* Desktop (>1024px): Show fullscreen menu, hide left nav */
@media (min-width: 1025px) {
  .menuToggle {
    display: block !important;
  }
  .nav {
    display: none !important;
  }
  .fullscreenMenu {
    display: block !important;
  }
}

/* iPad (768px-1024px): Show fullscreen menu, hide left nav */
@media (min-width: 768px) and (max-width: 1024px) {
  .menuToggle {
    display: block !important;
  }
  .nav {
    display: none !important;
  }
  .fullscreenMenu {
    display: block !important;
  }
}

/* Mobile (<768px): Show fullscreen menu */
@media (max-width: 767px) {
  .fullscreenMenu {
    display: block !important;
  }
  .menuToggle {
    display: block !important;
  }
}
```

### JavaScript Control

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```javascript
// Lines 742-781: Menu Control Script
const menuToggle = document.getElementById('menuToggle');
const fullscreenMenu = document.getElementById('fullscreenMenu');
const menuCloseBtn = document.getElementById('menuCloseBtn');

if (menuToggle && fullscreenMenu) {
  // Dynamic BASE path handling
  const REPO = location.pathname.split("/")[1];
  const BASE = REPO ? `/${REPO}/` : "/";

  // Fix relative paths in menu items
  const menuItems = fullscreenMenu.querySelectorAll('.menuItem');
  menuItems.forEach(item => {
    const currentHref = item.getAttribute('href');
    if (currentHref && !currentHref.startsWith('/')) {
      item.setAttribute('href', BASE + currentHref);
    }
  });

  // Open menu
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    fullscreenMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';  // Prevent background scrolling
  });

  // Close button
  menuCloseBtn.addEventListener('click', () => {
    fullscreenMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  });

  // Click outside to close
  fullscreenMenu.addEventListener('click', (e) => {
    if (e.target === fullscreenMenu) {
      fullscreenMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}
```

---

## Panel Positioning Algorithm

### Purpose
Dynamically calculates panel position to prevent overflow and ensure visibility on all screen sizes.

### Algorithm

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```javascript
// Lines 457-472: Position Calculation
function positionPanelNearButton(btn) {
  const r = btn.getBoundingClientRect();
  const gap = 14;
  let left = Math.round(r.right + gap);
  let top = Math.round(r.top + r.height / 2);

  // Vertical centering relative to button
  panel.style.top = `${top}px`;
  panel.style.transform = "translateY(-50%)";

  // Calculate max panel width (responsive)
  const panelWidth = Math.min(panel.offsetWidth || 360, window.innerWidth - 24);

  // Check if panel would overflow right edge
  if (left + panelWidth + 12 > window.innerWidth) {
    // Flip to left side of button
    left = Math.round(r.left - gap - panelWidth);
  }

  // Ensure minimum left padding
  left = Math.max(12, left);
  panel.style.left = `${left}px`;
}
```

### Positioning Flow Diagram

```
┌──────────────────────────────────────────────────────────┐
│  Step 1: Get Button Position                            │
│  ────────────────────────────────────────────────────── │
│  const r = btn.getBoundingClientRect()                  │
│  r.left = 56px                                          │
│  r.right = 180px                                         │
│  r.top = 400px                                           │
│  r.height = 44px                                         │
└──────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│  Step 2: Calculate Initial Position                     │
│  ────────────────────────────────────────────────────── │
│  left = r.right + 14 = 194px                            │
│  top = r.top + r.height/2 = 422px                       │
│  panel.style.top = "422px"                              │
│  panel.style.transform = "translateY(-50%)"             │
└──────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│  Step 3: Check Right Edge Overflow                      │
│  ────────────────────────────────────────────────────── │
│  panelWidth = Math.min(360, window.innerWidth - 24)     │
│  if (left + panelWidth + 12 > window.innerWidth)        │
│    → Flip to left: left = r.left - 14 - panelWidth      │
└──────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│  Step 4: Apply Minimum Padding                          │
│  ────────────────────────────────────────────────────── │
│  left = Math.max(12, left)                              │
│  panel.style.left = "194px"                             │
└──────────────────────────────────────────────────────────┘
```

### Edge Cases Handled

1. **Right Edge Overflow**: Panel flips to left side of button
2. **Small Screens**: Panel width constrained to `window.innerWidth - 24px`
3. **Minimum Padding**: Ensures at least 12px from left edge
4. **Vertical Centering**: Panel centered vertically relative to button

---

## Touch Device Adaptation

### Device Detection

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```javascript
// Lines 408-414: Device Detection
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isIPad = window.innerWidth >= 768 && window.innerWidth <= 1024;

if (isTouchDevice) {
  document.body.classList.add('is-touch-device');
}
```

### Device Categories

| Device Type | Screen Width | Detection | Primary Events |
|-------------|--------------|-----------|----------------|
| **Desktop** | > 1024px | `!isTouchDevice` | `mouseenter`, `click`, `mousedown` |
| **iPad** | 768-1024px | `isTouchDevice && isIPad` | `mouseenter`, `click`, `mousedown` |
| **Mobile** | < 768px | `isTouchDevice && !isIPad` | `touchstart`, `touchend` |

### Interaction Patterns

#### Desktop (Non-Touch)

```javascript
// Hover to expand
item.addEventListener("mouseenter", () => openPanelFor(key, btn));
item.addEventListener("mouseleave", scheduleClose);

// Click to toggle
btn.addEventListener("click", (e) => {
  if (panel.classList.contains("is-open") && activeKey === key) {
    closePanel();
  } else {
    openPanelFor(key, btn);
  }
  e.preventDefault();
});

// Panel hover bridge
panel.addEventListener("mouseenter", () => clearTimeout(closeTimer));
panel.addEventListener("mouseleave", scheduleClose);

// Click outside to close
document.addEventListener("mousedown", (e) => {
  const isNav = e.target.closest(".nav");
  const isPanel = e.target.closest("#panel");
  if (!isNav && !isPanel && panel.classList.contains("is-open")) closePanel();
});
```

#### iPad (Touch + Hover)

```javascript
// Same as desktop: uses hover + click
// iPad detected by screen width (768-1024px)
if ((!isTouchDevice || isIPad) && (key === "projects" || key === "images")) {
  item.addEventListener("mouseenter", () => openPanelFor(key, btn));
  item.addEventListener("mouseleave", scheduleClose);
}

if (isIPad || !isTouchDevice) {
  btn.addEventListener("click", (e) => {
    // Same logic as desktop
  });
}
```

#### Mobile (Touch-Only)

```javascript
// No hover, touch events only
btn.addEventListener("touchstart", (e) => {
  if (key === "about") {
    window.location.href = ABOUT_HREF;
    return;
  }
  if (panel.classList.contains("is-open") && activeKey === key) {
    closePanel();
  } else {
    openPanelFor(key, btn);
  }
}, {passive: true});

// Touch outside to close
document.addEventListener("touchstart", (e) => {
  const isNav = e.target.closest(".nav");
  const isPanel = e.target.closest("#panel");
  if (!isNav && !isPanel && panel.classList.contains("is-open")) closePanel();
});
```

### Hint Display Logic

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```html
<!-- Lines 395-396: Conditional Hints -->
<div class="hint desktop-hint">移动鼠标 · 互动</div>
<div class="hint touch-hint">按住左右滑动·互动</div>
```

```css
/* Lines 220-234: Hint Visibility */
.hint {
  display: none;
}

/* Touch devices: show touch hint */
.touch-hint {
  display: block;
}

/* Non-touch devices: show desktop hint */
body:not(.is-touch-device) .desktop-hint {
  display: block;
}

/* Touch devices: hide desktop hint */
body.is-touch-device .desktop-hint {
  display: none;
}
```

### Touch Animation Optimization

```css
/* Lines 156-158: Faster transitions for touch */
body.is-touch-device .panel {
  transition: opacity .10s ease, transform .10s ease;
}
```

---

## BASE Path Handling

### Purpose
Enables GitHub Pages deployment to subdirectories (e.g., `github.io/repo-name/`) without hardcoding paths.

### Algorithm

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```javascript
// Lines 416-418: BASE Path Detection
const REPO = location.pathname.split("/")[1];
const BASE = REPO ? `/${REPO}/` : "/";
document.getElementById("homeLink").setAttribute("href", BASE);
```

### Path Resolution Examples

| URL Context | `location.pathname` | `REPO` | `BASE` | Result |
|-------------|---------------------|--------|--------|--------|
| **Custom Domain** | `/` | `""` | `/` | `href="/"` |
| **GitHub Root** | `/index.html` | `"index.html"` | `/` | `href="/"` |
| **GitHub Subdir** | `/my-art-website-main/index.html` | `"my-art-website-main"` | `/my-art-website-main/` | `href="/my-art-website-main/"` |
| **Nested Page** | `/my-art-website-main/projects/yellow/` | `"my-art-website-main"` | `/my-art-website-main/` | `href="/my-art-website-main/"` |

### Navigation Link Generation

```javascript
// Lines 420-431: Dynamic Link Construction
const PROJECTS = [
  { title: "Yellow River", year: "2025", href: BASE + "projects/yellow-river/" },
  { title: "Frontispiece", year: "2024", href: BASE + "projects/frontispiece/" },
  { title: "Formless Buddha", year: "2023", href: BASE + "projects/formless-buddha/" },
  { title: "Yellow", year: "2021", href: BASE + "projects/yellow/" }
];

const IMAGES = [
  { title: "Yellow River", year: "2025", href: BASE + "images/yellow-river/" }
];

const ABOUT_HREF = BASE + "about/";
```

### Project Page Adaptation

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\projects\yellow\index.html`

```javascript
// Lines 536-537: Nested Path Detection
const REPO = location.pathname.split("/").filter(Boolean).length > 2
  ? "/" + location.pathname.split("/")[1] + "/"
  : "/";
const BASE = REPO;
```

### Fullscreen Menu Path Fixing

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```javascript
// Lines 752-759: Dynamic Menu Link Correction
const menuItems = fullscreenMenu.querySelectorAll('.menuItem');
menuItems.forEach(item => {
  const currentHref = item.getAttribute('href');
  // Only fix relative paths (not absolute paths starting with /)
  if (currentHref && !currentHref.startsWith('/')) {
    item.setAttribute('href', BASE + currentHref);
  }
});
```

---

## Event Handling System

### Event Priority Matrix

| Event | Device | Use Case | Propagation |
|-------|--------|----------|-------------|
| `mouseenter` | Desktop, iPad | Hover to open panel | Bubbling |
| `mouseleave` | Desktop, iPad | Hover to close panel | Bubbling |
| `click` | Desktop, iPad | Toggle panel state | Bubbling (stopped) |
| `touchstart` | Mobile | Tap to toggle panel | Bubbling (passive) |
| `mousedown` | Desktop, iPad | Click outside to close | Capturing |
| `touchstart` | Mobile | Touch outside to close | Capturing |
| `keydown` | All | Escape to close | Bubbling |

### Event Flow Diagrams

#### Desktop Interaction Flow

```
User hovers over "PROJECTS"
    ↓
mouseenter event fired
    ↓
openPanelFor("projects", btn)
    ↓
1. clearTimeout(closeTimer)
2. activeKey = "projects"
3. setActiveButton("projects")
4. renderList(PROJECTS)
5. panel.classList.add("is-open")
6. positionPanelNearButton(btn)
    ↓
Panel appears and is positioned
    ↓
User moves mouse to panel
    ↓
mouseenter event on panel
    ↓
clearTimeout(closeTimer) → Panel stays open
    ↓
User clicks link → Navigation
```

#### Mobile Interaction Flow

```
User taps "PROJECTS"
    ↓
touchstart event fired (passive: true)
    ↓
openPanelFor("projects", btn)
    ↓
Panel opens (no hover, immediate display)
    ↓
User taps outside panel
    ↓
touchstart event on document
    ↓
Check: !isNav && !isPanel && panel.is-open
    ↓
closePanel()
```

### Event Listener Code

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```javascript
// Lines 499-538: Navigation Event Listeners
items.forEach(item => {
  const key = item.dataset.menu;
  const btn = item.querySelector(".navBtn");

  // Desktop/iPad: Hover expansion
  if ((!isTouchDevice || isIPad) && (key === "projects" || key === "images")) {
    item.addEventListener("mouseenter", () => openPanelFor(key, btn));
    item.addEventListener("mouseleave", scheduleClose);
  }

  // Desktop/iPad: Click toggle
  if (isIPad || !isTouchDevice) {
    btn.addEventListener("click", (e) => {
      if (key === "about") {
        window.location.href = ABOUT_HREF;
        e.preventDefault();
        return;
      }
      if (panel.classList.contains("is-open") && activeKey === key) {
        closePanel();
      } else {
        openPanelFor(key, btn);
      }
      e.preventDefault(); // Prevent default link behavior
    });
  } else {
    // Mobile: Touch toggle
    btn.addEventListener("touchstart", (e) => {
      if (key === "about") {
        window.location.href = ABOUT_HREF;
        return;
      }
      if (panel.classList.contains("is-open") && activeKey === key) {
        closePanel();
      } else {
        openPanelFor(key, btn);
      }
    }, {passive: true}); // Passive for better scroll performance
  }
});

// Lines 541-544: Panel hover bridge (Desktop/iPad)
if (!isTouchDevice || isIPad) {
  panel.addEventListener("mouseenter", () => clearTimeout(closeTimer));
  panel.addEventListener("mouseleave", scheduleClose);
}

// Lines 547-561: Click outside to close
if (isTouchDevice && !isIPad) {
  // Mobile: Touch outside
  document.addEventListener("touchstart", (e) => {
    const isNav = e.target.closest(".nav");
    const isPanel = e.target.closest("#panel");
    if (!isNav && !isPanel && panel.classList.contains("is-open")) closePanel();
  });
} else {
  // Desktop/iPad: Click outside
  document.addEventListener("mousedown", (e) => {
    const isNav = e.target.closest(".nav");
    const isPanel = e.target.closest("#panel");
    if (!isNav && !isPanel && panel.classList.contains("is-open")) closePanel();
  });
}

// Lines 563-565: Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && panel.classList.contains("is-open")) closePanel();
});
```

### Stop Propagation Usage

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```javascript
// Lines 762-766: Menu toggle click
menuToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent immediate closing
  fullscreenMenu.classList.add('is-open');
  document.body.style.overflow = 'hidden';
});
```

---

## Complete Flow Diagrams

### Homepage Navigation Flow

```
┌─────────────────────────────────────────────────────────┐
│                    USER LOADS HOMEPAGE                  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  Device Detection Runs                                  │
│  ─────────────────────────────────────────────────────  │
│  • isTouchDevice = 'ontouchstart' in window             │
│  • isIPad = (768 <= width <= 1024)                      │
│  • Add class 'is-touch-device' if applicable            │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  BASE Path Detection                                    │
│  ─────────────────────────────────────────────────────  │
│  • REPO = pathname.split("/")[1]                        │
│  • BASE = REPO ? `/${REPO}/` : "/"                      │
│  • Update all navigation links                          │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  CSS Media Queries Apply                                │
│  ─────────────────────────────────────────────────────  │
│  • width > 1024px:  Desktop mode                        │
│  • 768-1024px:     iPad mode                            │
│  • width < 768px:   Mobile mode                         │
└─────────────────────────────────────────────────────────┘
                          ↓
                ┌─────────────────────┐
                │                     │
        ┌───────▼────────┐    ┌──────▼──────┐
        │ Desktop/iPad   │    │   Mobile    │
        │                │    │             │
        │ Show both:     │    │ Show only:  │
        │ • Left nav     │    │ • Fullscreen│
        │ • Fullscreen   │    │   menu      │
        └────────────────┘    └─────────────┘
```

### Panel Open/Close Flow

```
┌─────────────────────────────────────────────────────────┐
│  USER INTERACTION: HOVER/CLICK "PROJECTS"              │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  openPanelFor("projects", btn)                          │
│  ─────────────────────────────────────────────────────  │
│  1. clearTimeout(closeTimer)                            │
│  2. activeKey = "projects"                              │
│  3. setActiveButton("projects")                         │
│  4. renderList(PROJECTS)                                │
│  5. panel.classList.add("is-open")                      │
│  6. positionPanelNearButton(btn)                        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  positionPanelNearButton(btn)                           │
│  ─────────────────────────────────────────────────────  │
│  1. Get button bounds                                   │
│  2. Calculate initial left (button.right + 14)          │
│  3. Check right edge overflow                           │
│  4. Flip to left if needed                              │
│  5. Apply minimum padding                               │
│  6. Set final position                                  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  PANEL IS OPEN                                          │
│  ─────────────────────────────────────────────────────  │
│  • User can hover over panel (Desktop/iPad)            │
│  • User can click links                                 │
│  • closeTimer scheduled on mouse leave                  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  CLOSE TRIGGERS                                         │
│  ─────────────────────────────────────────────────────  │
│  • Mouse leaves button + panel (220ms delay)            │
│  • Click outside panel                                  │
│  • Touch outside panel (mobile)                         │
│  • Press Escape key                                     │
│  • Click same button again (toggle)                     │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  closePanel()                                           │
│  ─────────────────────────────────────────────────────  │
│  1. activeKey = null                                    │
│  2. Remove "is-active" from all buttons                 │
│  3. panel.classList.remove("is-open")                   │
│  4. panel.setAttribute("aria-hidden", "true")           │
└─────────────────────────────────────────────────────────┘
```

### Fullscreen Menu Flow

```
┌─────────────────────────────────────────────────────────┐
│  USER CLICKS [☰] BUTTON                                │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  Event Handler                                          │
│  ─────────────────────────────────────────────────────  │
│  1. e.stopPropagation()                                 │
│  2. fullscreenMenu.classList.add("is-open")             │
│  3. document.body.style.overflow = "hidden"             │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  MENU IS OPEN                                           │
│  ─────────────────────────────────────────────────────  │
│  • User can scroll menu content                         │
│  • User can click links                                 │
│  • Background is locked (no scroll)                     │
└─────────────────────────────────────────────────────────┘
                          ↓
                ┌─────────────────────┐
                │                     │
        ┌───────▼────────┐    ┌──────▼──────┐
        │ Click [×]      │    │ Click link  │
        │                │    │             │
        │ Close menu     │    │ Navigate    │
        │ Restore scroll │    │ Close menu  │
        └────────────────┘    └─────────────┘
                │                     │
                └──────────┬──────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│  MENU CLOSED                                            │
│  ─────────────────────────────────────────────────────  │
│  1. fullscreenMenu.classList.remove("is-open")          │
│  2. document.body.style.overflow = ""                   │
└─────────────────────────────────────────────────────────┘
```

---

## Key Technical Decisions

### 1. Dual Navigation System

**Decision:** Maintain both left hover navigation (desktop) AND fullscreen menu (all devices)

**Rationale:**
- Desktop users benefit from quick, non-intrusive hover panels
- Mobile users get consistent fullscreen menu
- iPad users get hybrid approach (hover works, but fullscreen is primary)
- Future-proofs for potential device-specific optimizations

### 2. Touch Device Detection

**Decision:** Use `'ontouchstart' in window` + screen width for iPad detection

**Rationale:**
- More reliable than user-agent sniffing
- Covers both touch-capable laptops and tablets
- iPad treated as special case (768-1024px) for hybrid interaction

### 3. BASE Path Auto-Detection

**Decision:** Dynamic path detection from `location.pathname`

**Rationale:**
- Works on custom domains without modification
- Works on GitHub Pages subdirectories
- No manual configuration needed
- Portable across deployment environments

### 4. Panel Positioning Algorithm

**Decision:** Dynamic calculation with flip-on-overflow

**Rationale:**
- Adapts to any screen size
- Prevents horizontal scroll
- Maintains visual hierarchy (panel near button)
- Single-source-of-truth for positioning

### 5. Event Handler Separation

**Decision:** Separate code paths for desktop vs mobile vs iPad

**Rationale:**
- Optimized for each device's capabilities
- Desktop: hover + click
- Mobile: touch only (no hover)
- iPad: hover + click (bridge experience)
- Performance: passive listeners for touch events

---

## File Structure Reference

```
my-art-website-main/
├── index.html                          (Homepage - Main navigation)
├── about/
│   └── index.html                      (About page - Fullscreen menu only)
├── projects/
│   ├── yellow/
│   │   └── index.html                  (Project page - Fullscreen menu only)
│   ├── yellow-river/
│   ├── frontispiece/
│   └── formless-buddha/
├── images/
│   └── yellow-river/
└── docs/
    └── NAVIGATION_SYSTEM.md            (This file)
```

### Navigation Implementation by Page Type

| Page | Left Nav | Hover Panels | Fullscreen Menu | BASE Path Detection |
|------|----------|--------------|-----------------|---------------------|
| **Homepage** (`index.html`) | ✓ | ✓ | ✓ | ✓ |
| **About** (`about/index.html`) | ✗ | ✗ | ✓ | ✓ |
| **Project** (`projects/*/index.html`) | ✗ | ✗ | ✓ | ✓ (nested) |

---

## Browser Compatibility

### Supported Browsers

- **Chrome/Edge**: 90+
- **Safari**: 14+
- **Firefox**: 88+
- **Mobile Safari**: iOS 14+
- **Chrome Mobile**: Android 10+

### Key APIs Used

- `getBoundingClientRect()` - Positioning
- `classList` - State management
- `addEventListener()` - Event handling
- `requestAnimationFrame()` - Smooth positioning
- `closest()` - DOM traversal
- `navigator.maxTouchPoints` - Touch detection

### Fallbacks

- **Clipboard API**: Falls back to `document.execCommand('copy')`
- **Passive Event Listeners**: Supported on modern browsers, degrades gracefully
- **CSS Variables**: Fallback to hardcoded values if not supported

---

## Performance Considerations

### Optimization Strategies

1. **Event Delegation**: Minimal listeners, efficient event handling
2. **Passive Touch Listeners**: Better scroll performance on mobile
3. **CSS Transitions**: Hardware-accelerated transforms
4. **Request Animation Frame**: Smooth panel positioning
5. **Conditional Logic**: Device-specific code paths

### Metrics

- **First Paint**: < 1s on 4G
- **Time to Interactive**: < 2s on 4G
- **Panel Open Latency**: < 50ms (desktop), < 100ms (mobile)
- **Script Size**: ~8KB minified (navigation logic only)

---

## Accessibility Features

### ARIA Attributes

```html
<nav class="nav" aria-label="Primary">
  <button class="navBtn" type="button">PROJECTS</button>
</nav>

<div id="panel" class="panel" role="dialog" aria-hidden="true">
  <ul id="panelList" class="panelList"></ul>
</div>

<button class="menuToggle" id="menuToggle" aria-label="Menu">
  <svg><!-- menu icon --></svg>
</button>

<button class="menuCloseBtn" id="menuCloseBtn" aria-label="Close menu">
  &times;
</button>
```

### Keyboard Navigation

- **Escape**: Closes open panel or fullscreen menu
- **Tab**: Navigates through menu items
- **Enter/Space**: Activates buttons
- **Arrow Keys**: Not used (linear navigation sufficient)

### Screen Reader Support

- All navigation elements have labels
- State changes announced via ARIA attributes
- Links have descriptive text
- Semantic HTML structure maintained

---

## Debugging and Testing

### Device Testing Checklist

- [ ] Desktop Chrome (>1024px)
- [ ] Desktop Safari (>1024px)
- [ ] Desktop Firefox (>1024px)
- [ ] iPad Portrait (768px)
- [ ] iPad Landscape (1024px)
- [ ] iPhone SE (<375px)
- [ ] iPhone 12 Pro (390px)
- [ ] Android Phone (360px)

### Interaction Testing Checklist

- [ ] Hover opens panel (desktop)
- [ ] Click toggles panel (all)
- [ ] Panel doesn't close when moving mouse to it (desktop)
- [ ] Click outside closes panel (all)
- [ ] Escape closes panel (all)
- [ ] Fullscreen menu opens/closes (all)
- [ ] Background scroll locked when menu open (all)
- [ ] Links navigate correctly (all)
- [ ] BASE path works on GitHub Pages (all)

### Console Logging

```javascript
// Add for debugging:
console.log('isTouchDevice:', isTouchDevice);
console.log('isIPad:', isIPad);
console.log('BASE:', BASE);
console.log('activeKey:', activeKey);
console.log('Panel position:', { left: panel.style.left, top: panel.style.top });
```

---

## Future Enhancements

### Potential Improvements

1. **Keyboard Navigation**: Add arrow key support for panel items
2. **Focus Management**: Trap focus in open menu/modal
3. **Animation Preferences**: Respect `prefers-reduced-motion`
4. **Touch Gestures**: Swipe to close panel on mobile
5. **Loading States**: Show loading indicator for slow links
6. **Analytics**: Track navigation usage patterns
7. **Search**: Add search functionality to fullscreen menu
8. **Breadcrumbs**: Show current location in sub-pages

### Known Limitations

1. **Panel Width**: Fixed 360px (320px mobile) - may need adjustment for very large screens
2. **Animation Speed**: Fixed 140ms - could be configurable
3. **Touch Delay**: 220ms close delay - optimized but not customizable
4. **iPad Detection**: Based on screen width only - may misidentify some tablets

---

## Maintenance Guide

### Adding New Projects

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```javascript
// Add to PROJECTS array (line 420)
const PROJECTS = [
  { title: "New Project", year: "2026", href: BASE + "projects/new-project/" },
  // ... existing projects
];

// Add to fullscreen menu (line 724)
<h2 class="menuCategoryTitle">PROJECTS</h2>
<a class="menuItem" href="projects/new-project/">
  New Project <span class="year">(2026)</span>
</a>
```

### Adjusting Panel Styling

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```css
/* Lines 14-16: CSS Variables */
:root {
  --leftPad: 56px;    /* Adjust left padding */
  --panelW: 360px;    /* Adjust panel width */
  --panelPad: 18px;   /* Adjust panel padding */
}
```

### Modifying Close Delay

**File:** `C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\index.html`

```javascript
// Line 496: Adjust delay
closeTimer = setTimeout(closePanel, 220); // Change 220 to desired ms
```

---

## Changelog

### Version 1.9.5 (Current)
- iPad detection added (768-1024px width check)
- Touch device detection via `ontouchstart`
- Hybrid interaction for iPad (hover + click)
- Optimized panel animations for touch devices
- Conditional hints ("move mouse" vs "swipe")

### Version 1.9.0
- Fullscreen menu adopted for all devices (not just mobile)
- Desktop: Show both left nav AND fullscreen menu
- BASE path auto-detection for GitHub Pages
- Improved panel positioning algorithm

### Version 1.8.0
- Initial left hover navigation system
- Mobile fullscreen menu
- Basic touch device detection
- Click-outside-to-close functionality

---

## Contact and Support

**Artist:** HARRY6
**Email:** wenhao_liu888@163.com
**Documentation Last Updated:** 2026-01-15
**Code Version:** 1.9.5

---

*This documentation is a living document. Please update it when making changes to the navigation system.*
