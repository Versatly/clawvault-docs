# ClawVault Brand Guidelines

> Premium documentation brand system for ClawVault — a celestial, scholarly aesthetic merging vintage astronomical charts with modern dev tooling.

---

## Brand Essence

**ClawVault** is persistent memory for AI agents. The brand evokes:
- **Memory & wisdom** — the elephant (never forgets)
- **Navigation & discovery** — celestial charts, star maps, constellations
- **Scholarly craft** — classical engraving, aged parchment, gilded details
- **Trust & permanence** — vaults, archives, enduring knowledge

**Tone**: Intellectual, premium, warm, trustworthy. Not cold or clinical — this is a *library*, not a laboratory.

---

## 1. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Vault Deep** | `#0d1826` | 13, 24, 38 | Deepest background, page bg |
| **Vault Surface** | `#121f2d` | 18, 31, 45 | Section backgrounds |
| **Vault Elevated** | `#1a2744` | 26, 39, 68 | Primary navy, cards, elevated surfaces |
| **Vault Card** | `#1e2e47` | 30, 46, 71 | Card backgrounds |

### Accent Colors (Gold/Memory)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Memory Gold** | `#c9a227` | 201, 162, 39 | Primary accent, links, CTAs |
| **Memory Amber** | `#b8912a` | 184, 145, 42 | Darker gold, gradients |
| **Memory Light** | `#d4b84a` | 212, 184, 74 | Lighter gold, highlights |
| **Memory Cream** | `#f5f0e8` | 245, 240, 232 | Primary text, parchment |

### Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Cream Warm** | `#e8e0d0` | 232, 224, 208 | Secondary text, lines |
| **Text Secondary** | `#c4bca8` | 196, 188, 168 | Muted body text |
| **Text Muted** | `#8a8272` | 138, 130, 114 | Disabled, hints |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Success** | `#28c840` | Success states, checkmarks |
| **Warning** | `#c9a227` | Warnings (use Memory Gold) |
| **Error** | `#ff5f57` | Errors, destructive |
| **Info** | `#5b9bd5` | Informational |

### Transparency Tokens

```css
--memory-glow: rgba(201, 162, 39, 0.3);      /* Gold glow effects */
--border-subtle: rgba(201, 162, 39, 0.12);   /* Subtle gold borders */
--border-gold: rgba(201, 162, 39, 0.35);     /* Visible gold borders */
--border-cream: rgba(245, 240, 232, 0.15);   /* Cream borders */
--cream-soft: rgba(245, 240, 232, 0.8);      /* Soft cream overlay */
```

---

## 2. Typography

### Font Families

| Purpose | Font | Fallbacks | Weight Range |
|---------|------|-----------|--------------|
| **Display/Headings** | Clash Display | Georgia, Times New Roman, serif | 500–700 |
| **Body** | Satoshi | -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif | 400–600 |
| **Code** | SF Mono | Fira Code, JetBrains Mono, Consolas, monospace | 400–500 |

### CSS Variables

```css
--font-display: 'Clash Display', Georgia, 'Times New Roman', serif;
--font-body: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;
```

### Type Scale

| Element | Size | Weight | Line Height | Font |
|---------|------|--------|-------------|------|
| **H1** | 3rem (48px) | 700 | 1.1 | Display |
| **H2** | 2.25rem (36px) | 600 | 1.2 | Display |
| **H3** | 1.5rem (24px) | 600 | 1.3 | Display |
| **H4** | 1.25rem (20px) | 600 | 1.4 | Display |
| **Body** | 1rem (16px) | 400 | 1.7 | Body |
| **Body Small** | 0.875rem (14px) | 400 | 1.6 | Body |
| **Code** | 0.9rem (14.4px) | 400 | 1.7 | Mono |
| **Code Small** | 0.8rem (12.8px) | 400 | 1.5 | Mono |

### Font Loading (Next.js)

```tsx
import localFont from 'next/font/local';

const clashDisplay = localFont({
  src: [
    { path: './fonts/ClashDisplay-Medium.woff2', weight: '500' },
    { path: './fonts/ClashDisplay-Semibold.woff2', weight: '600' },
    { path: './fonts/ClashDisplay-Bold.woff2', weight: '700' },
  ],
  variable: '--font-display',
});

const satoshi = localFont({
  src: [
    { path: './fonts/Satoshi-Regular.woff2', weight: '400' },
    { path: './fonts/Satoshi-Medium.woff2', weight: '500' },
    { path: './fonts/Satoshi-Bold.woff2', weight: '600' },
  ],
  variable: '--font-body',
});
```

---

## 3. Visual Style — Celestial Engraving Aesthetic

### Core Visual Language

ClawVault's visual identity draws from:

1. **Vintage Astronomical Charts** — Star maps, constellation diagrams, celestial atlases
2. **Classical Engraving** — Crosshatching, fine line work, woodcut illustrations
3. **Aged Parchment** — Cream/ivory paper textures, subtle grain
4. **Gilded Details** — Gold leaf accents, ornate borders, medallions

### Key Visual Elements

#### Constellation Lines
- Thin gold lines (`1px`) connecting points
- Dashed pattern: `stroke-dasharray: 4 4`
- Opacity: `0.3` for subtle, `0.6` for emphasis
- Used for: decorative backgrounds, connecting related concepts

#### Four-Pointed Stars (✦)
- Primary decorative motif
- Sizes: 4px (small), 8px (medium), 12px (large)
- Colors: Memory Gold or Memory Cream
- Scattered asymmetrically in negative space

#### The Elephant
- **Symbolism**: Memory (elephants never forget)
- **Style**: Classical engraving with crosshatching
- **Accent**: Four-pointed gold star near the eye
- **Usage**: Logo mark, hero illustrations, empty states

#### Ornate Borders
- Corner flourishes in gold line work
- Double-line frames for formal containers
- Compass rose motifs for navigation elements

### Illustration Style Guide

When creating illustrations:

```
✓ Deep navy background (#1a2744)
✓ Cream/gold engraving style line work
✓ Crosshatching for shading (not gradients)
✓ Gold constellation lines connecting elements
✓ Four-pointed stars scattered throughout
✓ Classical/vintage scientific instrument aesthetic
✓ No photorealism — always stylized engraving

✗ No bright colors outside the palette
✗ No modern flat illustration style
✗ No gradients in illustrations (fine in UI)
✗ No text in generated images
```

---

## 4. Logo Usage

### Primary Mark — Elephant Icon

| Variant | File | Usage |
|---------|------|-------|
| **Circular Badge** | `clawvault-icon-circular.png` | App icon, favicons, avatars |
| **Minimal Line** | `clawvault-favicon-minimal.png` | Small sizes, favicon |
| **Full Engraving** | `clawvault-og-image.png` | Hero, social, marketing |

### Logo Specifications

- **Minimum size**: 32px (circular badge)
- **Clear space**: 25% of logo width on all sides
- **Background**: Works on navy (#1a2744) or cream (#f5f0e8)

### Logo Construction

The elephant mark features:
- Navy blue outline stroke
- Cream/ivory fill or transparent
- Four-pointed gold star accent near the eye
- Classical engraving line work texture

### Don'ts

- Don't rotate the logo
- Don't change the star color
- Don't add drop shadows
- Don't place on busy backgrounds
- Don't stretch or distort proportions

---

## 5. UI Patterns

### Cards

```css
.card {
  background: linear-gradient(145deg, #1a2744 0%, #121f2d 100%);
  border: 1px solid rgba(245, 240, 232, 0.15);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(201, 162, 39, 0.35);
  box-shadow: 
    0 12px 40px rgba(201, 162, 39, 0.1),
    0 4px 16px rgba(0, 0, 0, 0.3);
}

/* Gold top-line reveal on hover */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a227, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover::before {
  opacity: 1;
}
```

### Buttons

#### Primary (Gold)
```css
.btn-primary {
  background: linear-gradient(135deg, #c9a227 0%, #b8912a 100%);
  color: #0d1826;
  font-family: var(--font-display);
  font-weight: 600;
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(201, 162, 39, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(201, 162, 39, 0.4);
}
```

#### Secondary (Outline)
```css
.btn-secondary {
  background: rgba(26, 39, 68, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(245, 240, 232, 0.15);
  color: #f5f0e8;
  font-family: var(--font-display);
  font-weight: 600;
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
}

.btn-secondary:hover {
  transform: translateY(-2px);
  border-color: #c9a227;
  background: rgba(201, 162, 39, 0.1);
}
```

#### Ghost (Text only)
```css
.btn-ghost {
  background: transparent;
  color: #c9a227;
  font-weight: 500;
  padding: 0.5rem 1rem;
}

.btn-ghost:hover {
  background: rgba(201, 162, 39, 0.1);
}
```

### Form Inputs

```css
.input {
  background: #121f2d;
  border: 1px solid rgba(245, 240, 232, 0.15);
  border-radius: 8px;
  color: #f5f0e8;
  padding: 0.75rem 1rem;
  font-family: var(--font-body);
}

.input:focus {
  outline: none;
  border-color: #c9a227;
  box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.2);
}

.input::placeholder {
  color: #8a8272;
}
```

### Code Blocks

```css
.code-block {
  background: #1a2744;
  border: 1px solid rgba(245, 240, 232, 0.15);
  border-radius: 10px;
  overflow: hidden;
}

/* Mac-style header */
.code-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(245, 240, 232, 0.15);
}

.code-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.code-dot:nth-child(1) { background: #ff5f57; }
.code-dot:nth-child(2) { background: #c9a227; } /* Gold instead of yellow */
.code-dot:nth-child(3) { background: #28c840; }

/* Syntax highlighting tokens */
.token-comment { color: #8a8272; font-style: italic; }
.token-keyword { color: #c9a227; }
.token-string { color: #d4b84a; }
.token-function { color: #f5f0e8; }
.token-variable { color: #c4bca8; }
.token-operator { color: #c9a227; }
```

### Links

```css
a {
  color: #c9a227;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s ease;
}

a:hover {
  color: #d4b84a;
}

/* Sidebar nav links */
.nav-link {
  color: #c4bca8;
  text-decoration: none;
}

.nav-link:hover {
  color: #f5f0e8;
}

.nav-link.active {
  color: #c9a227;
  font-weight: 500;
}
```

### Badges / Tags

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
}

.badge-gold {
  background: rgba(201, 162, 39, 0.15);
  color: #c9a227;
  border: 1px solid rgba(201, 162, 39, 0.3);
}

.badge-cream {
  background: rgba(245, 240, 232, 0.1);
  color: #f5f0e8;
  border: 1px solid rgba(245, 240, 232, 0.2);
}
```

### Tooltips

```css
.tooltip {
  background: #1e2e47;
  color: #f5f0e8;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  border: 1px solid rgba(201, 162, 39, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
```

### Tables

```css
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  text-align: left;
  padding: 0.75rem 1rem;
  font-family: var(--font-display);
  font-weight: 600;
  color: #c9a227;
  border-bottom: 1px solid rgba(201, 162, 39, 0.3);
}

.table td {
  padding: 0.75rem 1rem;
  color: #c4bca8;
  border-bottom: 1px solid rgba(245, 240, 232, 0.1);
}

.table tr:hover td {
  background: rgba(201, 162, 39, 0.05);
}
```

---

## 6. Dark Mode Specifics

ClawVault is **dark-first**. The entire brand is designed around the navy/gold/cream dark palette.

### Background Layers

```css
/* Page background */
body {
  background: #0d1826;
}

/* Celestial glow overlay */
.bg-celestial {
  background: 
    radial-gradient(ellipse 100% 80% at 50% 0%, rgba(201, 162, 39, 0.06), transparent 50%),
    radial-gradient(ellipse 80% 60% at 80% 50%, rgba(245, 240, 232, 0.04), transparent 40%),
    radial-gradient(ellipse 70% 70% at 20% 80%, rgba(201, 162, 39, 0.05), transparent 40%);
}
```

### Surface Elevation

| Level | Color | Usage |
|-------|-------|-------|
| 0 | `#0d1826` | Page background |
| 1 | `#121f2d` | Sections, sidebar |
| 2 | `#1a2744` | Cards, modals |
| 3 | `#1e2e47` | Elevated cards, dropdowns |
| 4 | `#243654` | Hover states |

### Light Mode (Future)

If implementing light mode:

| Dark Token | Light Equivalent |
|------------|------------------|
| `#0d1826` | `#f5f0e8` (cream) |
| `#f5f0e8` | `#1a2744` (navy) |
| `#c9a227` | `#9a7b1c` (darker gold) |

---

## 7. Motion & Animation

### Timing Functions

```css
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Standard Durations

| Type | Duration | Usage |
|------|----------|-------|
| Fast | 150ms | Hovers, micro-interactions |
| Normal | 300ms | Cards, buttons, reveals |
| Slow | 500ms | Page transitions, modals |

### Signature Animations

#### Twinkle (Stars)
```css
@keyframes twinkle {
  0%, 100% { 
    opacity: 0.2;
    transform: scale(1);
  }
  50% { 
    opacity: 0.6;
    transform: scale(1.2);
  }
}

.star {
  animation: twinkle 4s ease-in-out infinite;
}
```

#### Float (Hero elements)
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.float {
  animation: float 5s ease-in-out infinite;
}
```

#### Fade In Up
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.7s var(--ease-out);
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Spacing & Layout

### Spacing Scale

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

### Content Width

```css
--max-width-prose: 65ch;     /* Reading content */
--max-width-content: 1200px; /* Main content */
--max-width-wide: 1400px;    /* Full-width sections */
```

---

## 9. Fumadocs Integration

### Recommended Fumadocs Theme Overrides

```tsx
// fumadocs.config.ts
import { createPreset } from 'fumadocs-ui/tailwind-plugin';

export default {
  theme: {
    extend: {
      colors: {
        // Map to ClawVault palette
        background: '#0d1826',
        foreground: '#f5f0e8',
        muted: {
          DEFAULT: '#121f2d',
          foreground: '#c4bca8',
        },
        popover: {
          DEFAULT: '#1a2744',
          foreground: '#f5f0e8',
        },
        card: {
          DEFAULT: '#1e2e47',
          foreground: '#f5f0e8',
        },
        border: 'rgba(245, 240, 232, 0.15)',
        primary: {
          DEFAULT: '#c9a227',
          foreground: '#0d1826',
        },
        secondary: {
          DEFAULT: '#1a2744',
          foreground: '#f5f0e8',
        },
        accent: {
          DEFAULT: 'rgba(201, 162, 39, 0.15)',
          foreground: '#c9a227',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
        heading: ['var(--font-display)'],
      },
    },
  },
};
```

### Custom Components for Fumadocs

#### Callout Styling
```css
/* Info callout */
.callout-info {
  background: rgba(201, 162, 39, 0.1);
  border-left: 3px solid #c9a227;
}

/* Warning callout */
.callout-warning {
  background: rgba(201, 162, 39, 0.15);
  border-left: 3px solid #d4b84a;
}

/* Error callout */
.callout-error {
  background: rgba(255, 95, 87, 0.1);
  border-left: 3px solid #ff5f57;
}
```

#### TOC (Table of Contents)
```css
.toc-link {
  color: #8a8272;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.toc-link:hover {
  color: #c4bca8;
}

.toc-link.active {
  color: #c9a227;
  font-weight: 500;
}

.toc-indicator {
  background: #c9a227;
  width: 2px;
}
```

---

## 10. Asset Inventory

### Brand Assets Location

```
/public/brand/
├── clawvault-icon-circular.png          # Logo mark (circle)
├── clawvault-favicon-minimal.png        # Minimal favicon
├── clawvault-og-image.png               # Open Graph image
├── clawvault-card-*.png                 # Feature card illustrations
└── clawvault-icon-*.png                 # Feature icons
```

### Recommended New Assets for Docs

- [ ] Wordmark (ClawVault text logo)
- [ ] Docs-specific OG image (1200x630)
- [ ] Empty state illustrations
- [ ] Icon set (24x24) for navigation
- [ ] Code snippet decorations

---

## Quick Reference

### CSS Variables (Copy-Paste)

```css
:root {
  /* Backgrounds */
  --vault-deep: #0d1826;
  --vault-surface: #121f2d;
  --vault-elevated: #1a2744;
  --vault-card: #1e2e47;

  /* Gold */
  --memory-gold: #c9a227;
  --memory-amber: #b8912a;
  --memory-light: #d4b84a;
  --memory-cream: #f5f0e8;
  --memory-glow: rgba(201, 162, 39, 0.3);

  /* Text */
  --text-primary: #f5f0e8;
  --text-secondary: #c4bca8;
  --text-muted: #8a8272;

  /* Borders */
  --border-subtle: rgba(201, 162, 39, 0.12);
  --border-gold: rgba(201, 162, 39, 0.35);
  --border-cream: rgba(245, 240, 232, 0.15);

  /* Fonts */
  --font-display: 'Clash Display', Georgia, serif;
  --font-body: 'Satoshi', system-ui, sans-serif;
  --font-mono: 'SF Mono', 'Fira Code', monospace;
}
```

### Tailwind Config Snippet

```js
colors: {
  vault: {
    deep: '#0d1826',
    surface: '#121f2d',
    elevated: '#1a2744',
    card: '#1e2e47',
  },
  memory: {
    gold: '#c9a227',
    amber: '#b8912a',
    light: '#d4b84a',
    cream: '#f5f0e8',
  },
}
```

---

*Last updated: 2026-02-13*
*Version: 1.0*
