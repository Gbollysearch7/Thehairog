# TheHairOg — Design System

**Premium Wig Academy Visual Identity System**
Extracted from the TheHairOg website · March 2026

---

## 01. Color Tokens

### Primary — Gold Palette
| Token | Hex | Usage |
|---|---|---|
| `--gold` | `#C5A44E` | Primary brand accent, CTAs, headings, icons |
| `--gold-light` | `#D4B86A` | Hover states, secondary accents |
| `--gold-dark` | `#A8873A` | Active states, deeper emphasis |
| `--gold-muted` | `rgba(197,164,78,0.15)` | Tinted backgrounds, pill borders |
| `--gold-glow` | `rgba(197,164,78,0.35)` | Glow effects, box-shadows |

### Neutrals — Dark
| Token | Hex | Usage |
|---|---|---|
| `--black` | `#0D0D0D` | True black (hero backgrounds) |
| `--charcoal` | `#1A1A1A` | Dark sections, foote r, navbar |
| `--charcoal-2` | `#242424` | Elevated dark surfaces |
| `--charcoal-3` | `#2E2E2E` | Borders on dark backgrounds |

### Neutrals — Light
| Token | Hex | Usage |
|---|---|---|
| `--cream` | `#FAF7F2` | Page background, light sections |
| `--cream-2` | `#F3EDE3` | Slightly darker cream for depth |
| `--cream-3` | `#EDE4D6` | Borders, dividers on light backgrounds |

### Accent
| Token | Hex | Usage |
|---|---|---|
| `--sienna` | `#B5582C` | Warning/important text, pricing notes |
| `--sienna-light` | `#C8724A` | Hover state for sienna |

### Text Colors
| Token | Hex | Usage |
|---|---|---|
| `--text-dark` | `#1A1A1A` | Primary text on light backgrounds |
| `--text-muted` | `#6B6157` | Secondary/body text |
| `--text-light` | `#FAF7F2` | Text on dark backgrounds |
| `--text-gold` | `#C5A44E` | Accent text, labels, eyebrows |

### Section Rhythm
Alternate between **dark** (`--charcoal`) and **light** (`--cream`) sections to create visual breathing room. Dark sections use light text; light sections use dark text with gold accents.

---

## 02. Typography

### Font Stack
| Role | Font | Fallback |
|---|---|---|
| **Serif (headings)** | Playfair Display | Georgia, serif |
| **Sans (body/UI)** | DM Sans | system-ui, sans-serif |

**Google Fonts import:**
```
Playfair Display: 400, 500, 600, 700, 800 + italic 400, 600
DM Sans: 300, 400, 500, 600
```

### Type Scale (fluid with `clamp()`)

| Class | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|
| `.t-display` | `clamp(2.8rem, 7vw, 6rem)` | 700 | 1.05 | -0.02em | Hero headlines |
| `.t-heading-1` | `clamp(2rem, 4.5vw, 3.5rem)` | 700 | 1.1 | -0.015em | Section headings |
| `.t-heading-2` | `clamp(1.5rem, 3vw, 2.25rem)` | 600 | 1.2 | — | Sub-section headings |
| `.t-heading-3` | `clamp(1.15rem, 2vw, 1.5rem)` | 600 | 1.3 | — | Card/feature headings |
| `.t-body` | `1rem` | 400 | 1.75 | — | Body text |
| `.t-body-lg` | `clamp(1rem, 1.5vw, 1.15rem)` | 400 | 1.8 | — | Lead paragraphs |
| `.t-label` | `0.7rem` | 600 | — | 0.18em | Uppercase labels, eyebrows |

### Eyebrow Pattern
Used above section headings. Gold text, uppercase, tracked wide, with flanking horizontal lines:
```css
.eyebrow {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  display: flex;
  align-items: center;
  gap: 1rem;
}
.eyebrow::before, .eyebrow::after {
  content: '';
  width: 40px;
  height: 1px;
  background: var(--gold);
}
```

---

## 03. Spacing & Layout

### Grid System
- **Container:** `max-width: 1200px`, centered with `auto` margins, `padding: 0 1.5rem`
- **Section padding:** `padding: 6rem 0` (desktop), `4rem 0` (mobile)
- **Grid base:** 8pt grid — all spacing values are multiples of `0.25rem`

### Border Radius
| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `6px` | Small elements, pills |
| `--radius-md` | `12px` | Cards, inputs |
| `--radius-lg` | `20px` | Large cards, modals |
| `--radius-xl` | `32px` | Full-round buttons |

---

## 04. Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-gold` | `0 0 40px rgba(197,164,78,0.2), 0 8px 32px rgba(0,0,0,0.4)` | Gold-accented elements, featured cards |
| `--shadow-card` | `0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)` | Standard card elevation |

---

## 05. Motion & Animation

### Easing Curves
| Token | Value | Character |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Snappy deceleration — primary easing |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Smooth symmetrical — looping animations |

### Default Transition
```css
--transition: 0.4s var(--ease-out);
```

### Scroll Reveal Animations
Three utility classes that start hidden and animate in when `.visible` is added:

```css
.reveal       { opacity: 0; transform: translateY(40px); }
.reveal-left  { opacity: 0; transform: translateX(-60px); }
.reveal-right { opacity: 0; transform: translateX(60px); }

.reveal.visible,
.reveal-left.visible,
.reveal-right.visible {
  opacity: 1;
  transform: translate(0);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}
```

**Stagger delays** (for groups like pricing cards):
```css
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }
.reveal-delay-5 { transition-delay: 0.5s; }
```

**JavaScript trigger** (Intersection Observer):
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
  .forEach(el => observer.observe(el));
```

### Gold Shimmer Effect
Animated gradient for premium text:
```css
.shimmer-text {
  background: linear-gradient(135deg,
    #9B7D35 0%, #C5A44E 20%, #E8CC7A 40%,
    #D4B86A 55%, #E8CC7A 68%, #C5A44E 82%, #9B7D35 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: goldShimmer 4s linear infinite;
}

@keyframes goldShimmer {
  0%   { background-position: 0% center; }
  100% { background-position: 200% center; }
}
```

### 3D Card Tilt (on hover)
```js
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;  // ±7deg
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
  card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
});
card.addEventListener('mouseleave', () => {
  card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
  card.style.transition = 'transform 0.5s ease-out';
});
```

### Hero Canvas Particles
Gold shimmer particles drifting upward:
- 80 particles, radius 0.5–2.2px
- Alpha: 0.1–0.6, randomized sine-wave oscillation
- Color: `rgba(197, 164, 78, alpha)`
- Paused via IntersectionObserver when hero is off-screen

---

## 06. Component Patterns

### Buttons
```css
/* Primary — Gold filled */
.btn-gold {
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
  color: var(--charcoal);
  padding: 0.9rem 2.2rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;
  transition: var(--transition);
  box-shadow: 0 4px 20px rgba(197,164,78,0.3);
}
.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(197,164,78,0.45);
}

/* Secondary — Ghost/outline */
.btn-ghost {
  border: 1px solid rgba(255,255,255,0.3);
  color: var(--text-light);
  /* Same padding/radius as btn-gold */
}
.btn-ghost:hover {
  border-color: var(--gold);
  color: var(--gold);
}

/* Outline on light backgrounds */
.btn-outline {
  border: 1.5px solid var(--charcoal);
  color: var(--charcoal);
}
.btn-outline:hover {
  background: var(--charcoal);
  color: var(--cream);
}
```

### Pricing Cards
- 3-column grid, center card scaled up with `transform: scale(1.03)`
- Featured card gets gold border + "Most Popular" badge
- Check marks in gold, dashes in muted for excluded features
- 3D tilt on hover (see Motion section)

### FAQ Accordion
- `max-height` transition from `0` to `scrollHeight`
- Only one item open at a time
- `aria-expanded` for accessibility
- Chevron rotates 180deg on open

### Testimonial Carousel
- Auto-advances every 4.5s
- Touch swipe with 40px threshold
- Dot indicators + prev/next arrows
- 3-up on desktop, 1-up on mobile

### Navbar
- Starts transparent, adds `.scrolled` class after 60px scroll
- Scrolled state: `background: rgba(26,26,26,0.95)`, `backdrop-filter: blur(12px)`
- Padding collapses from 1.4rem to 0.85rem
- Hamburger icon animates bars into X via CSS transforms

---

## 07. Accessibility

- All interactive elements have minimum 44px touch targets
- Focus outlines preserved everywhere
- `prefers-reduced-motion`: canvas animation stopped, all reveal transitions bypassed with `opacity: 1; transform: none`
- Semantic HTML: proper heading hierarchy, landmark regions
- `aria-expanded` on accordion buttons
- `aria-label` on icon-only buttons

---

## 08. Responsive Breakpoints

| Breakpoint | Usage |
|---|---|
| `max-width: 900px` | Tablet — grids collapse to single column, pricing cards stack |
| `max-width: 600px` | Mobile — hamburger menu, reduced padding, smaller type |

All font sizes use `clamp()` for fluid scaling — no breakpoint-dependent font overrides needed.

---

*TheHairOg Design System · Extracted March 2026*
