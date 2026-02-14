# Fix Sidebar Dropdown on Mobile

## Problem

The docs site at docs.clawvault.dev has two sidebar tabs (CLI and Obsidian Plugin) configured via `root: true` in their respective `meta.json` files. On mobile, the sidebar dropdown/mode-switcher for switching between these tabs is broken — it doesn't render or function correctly.

## Current Architecture

- **Framework:** Fumadocs (fumadocs-ui v16.6.0, fumadocs-core v16.6.0, fumadocs-mdx v14.2.7)
- **Next.js 16** with Tailwind CSS v4
- **Two root tabs:**
  - `content/docs/(cli)/meta.json` — `"root": true, "title": "CLI"`
  - `content/docs/obsidian-plugin/meta.json` — `"root": true, "title": "Obsidian Plugin"`
- **Root meta.json:** `content/docs/meta.json` — `{"pages": ["(cli)", "obsidian-plugin"]}`

## Key Files

- `app/(docs)/layout.tsx` — DocsLayout configuration
- `app/lib/source.ts` — Source loader with fumadocs-mdx
- `source.config.ts` — defineDocs config
- `app/global.css` — Theme overrides (dark mode, gold accent)
- `content/docs/meta.json` — Root page listing
- `content/docs/(cli)/meta.json` — CLI tab (root: true)
- `content/docs/obsidian-plugin/meta.json` — Obsidian Plugin tab (root: true)

## What to Fix

1. **Mobile sidebar:** The sidebar tab switcher/dropdown must work on mobile viewports. When you open the mobile sidebar (hamburger menu), you should see a dropdown at the top to switch between "CLI" and "Obsidian Plugin" tabs.

2. **Desktop sidebar:** The tab switcher should also work properly on desktop — showing tabs at the top of the sidebar.

3. **Match Fumadocs default behavior:** The `root: true` convention in meta.json should automatically create sidebar tabs. Check if there's a configuration issue in `DocsLayout` or `source` that prevents proper tab rendering.

## Fumadocs Sidebar Tabs Documentation

From fumadocs.dev: Sidebar Tabs are folders with `root: true` in meta.json. By default, the tab trigger is displayed as a Dropdown component. You can also explicitly configure them:

```tsx
<DocsLayout
  sidebar={{
    tabs: [
      {
        title: 'CLI',
        description: 'ClawVault CLI documentation',
        url: '/getting-started/introduction',
      },
      {
        title: 'Obsidian Plugin',
        description: 'Visual memory management',
        url: '/obsidian-plugin',
      },
    ],
  }}
/>
```

If the automatic approach via `root: true` doesn't work, try the explicit `sidebar.tabs` approach.

## Testing

```bash
npm run build   # Must pass with zero errors
npm run dev     # Check mobile and desktop sidebar behavior
```

## Constraints

- Do NOT change the content structure or page content
- Do NOT change the color theme (gold accent #e8a430)
- Keep the existing nav links (GitHub)
- Zero new dependencies unless absolutely required
- Must work on both mobile AND desktop viewports
