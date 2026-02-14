# Build ClawVault Docs with Fumadocs

Build a BEAUTIFUL documentation site using Fumadocs (Next.js). Dependencies are already installed in this directory.

## Reference

- **Fumadocs docs:** https://fumadocs.dev/docs — READ THESE for setup patterns
- **Brand guidelines:** Read `BRAND.md` in this directory for all colors, typography, visual style
- **Content source:** All 27 markdown docs are in `content-source/` — move them into the correct Fumadocs content structure
- **ClawVault source:** `/home/frame/Projects/clawvault/SKILL.md` for reference

## What You Must Build

### 1. Fumadocs Project Structure

Follow the official Fumadocs setup guide EXACTLY:
- `app/layout.tsx` — root layout with RootProvider
- `app/(docs)/layout.tsx` — docs layout with DocsLayout
- `app/(docs)/[[...slug]]/page.tsx` — docs page component
- `content/docs/` — MDX content directory
- `lib/source.ts` — source configuration
- `source.config.ts` — fumadocs-mdx config
- `next.config.mjs` — with fumadocs-mdx plugin (createMDX)
- `postcss.config.mjs` — with @tailwindcss/postcss
- `app/global.css` — import tailwindcss + fumadocs-ui preset
- `tsconfig.json` — proper Next.js + fumadocs config

### 2. Content Structure

Move content from `content-source/` to `content/docs/` in this structure:
```
content/docs/
├── index.mdx (landing/intro page)
├── getting-started/
│   ├── meta.json (sidebar ordering)
│   ├── introduction.mdx
│   ├── installation.mdx
│   └── quick-start.mdx
├── concepts/
│   ├── meta.json
│   ├── memory-types.mdx
│   ├── observational-memory.mdx
│   ├── memory-graph.mdx
│   ├── context-profiles.mdx
│   └── context-death-recovery.mdx
├── commands/
│   ├── meta.json
│   ├── wake-sleep.mdx
│   ├── remember-capture.mdx
│   ├── search-vsearch.mdx
│   ├── context.mdx
│   ├── graph.mdx
│   ├── compat.mdx
│   ├── doctor.mdx
│   ├── link.mdx
│   ├── repair-session.mdx
│   └── template.mdx
├── openclaw/
│   ├── meta.json
│   ├── hook-setup.mdx
│   ├── auto-checkpoint.mdx
│   ├── context-death-detection.mdx
│   └── session-start-context.mdx
├── advanced/
│   ├── meta.json
│   ├── vault-structure.mdx
│   ├── qmd-integration.mdx
│   ├── wiki-links-entity-routing.mdx
│   └── environment-variables.mdx
└── changelog.mdx
```

Each `meta.json` controls sidebar ordering:
```json
{
  "title": "Getting Started",
  "pages": ["introduction", "installation", "quick-start"]
}
```

### 3. Theme & Branding (CRITICAL — must look premium)

Read BRAND.md for full specs. Key points:
- **Dark mode default**
- **Colors:** Deep navy #0d1826 background, gold #d4af37 accents, cream #f5f0e8 text
- **Use Fumadocs CSS variables** to override the theme — see fumadocs.dev/docs/ui/theme
- **Custom font:** Use Inter for body, JetBrains Mono for code (from Google Fonts)
- **The site must look as polished as fumadocs.dev itself**

In `app/global.css`:
```css
@import 'tailwindcss';
@import 'fumadocs-ui/css/neutral.css';
@import 'fumadocs-ui/css/preset.css';

/* Override with ClawVault brand colors */
:root {
  /* Override fumadocs CSS variables with ClawVault colors */
}
```

### 4. Layout Configuration

In the docs layout, configure:
- Site title: "ClawVault™"
- Nav links: GitHub, npm, Website (clawvault.dev)
- Sidebar with all sections properly ordered
- Search enabled (Fumadocs built-in)
- Footer with links

### 5. Build & Verify

```bash
npm run build
```

Must pass with zero errors. All 27+ pages must render.

### 6. Vercel Config

Add `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

## DO NOT

- Do not use placeholder content — all pages have real content in content-source/
- Do not skip the brand theming — it must look premium
- Do not use default Fumadocs colors — override everything with ClawVault palette
- Do not forget meta.json files for sidebar ordering
