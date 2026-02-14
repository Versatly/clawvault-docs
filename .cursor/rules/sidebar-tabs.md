# CRITICAL: Sidebar Tabs — DO NOT BREAK

## The Rule

**NEVER modify or remove the `getSidebarTabs` import or call in `app/(docs)/layout.tsx`.**

The sidebar tab switcher (CLI / Obsidian Plugin dropdown) requires explicit `getSidebarTabs()` because the `(cli)` route group breaks Fumadocs' automatic tab detection.

## What breaks it

1. Removing the `getSidebarTabs` import from `fumadocs-ui/utils/get-sidebar-tabs`
2. Removing the `sidebar: { tabs }` prop from `DocsLayout`
3. Changing `root: true` in `content/docs/(cli)/meta.json` or `content/docs/obsidian-plugin/meta.json`
4. Changing the `baseUrl` in `app/lib/source.ts`
5. Moving files out of the `(cli)` route group without updating tab detection

## What the dropdown should look like

- Two tabs: **CLI** (with Terminal icon) and **Obsidian Plugin** (with Palette icon)
- Clicking a tab shows that section's sidebar pages
- Both tabs should have proper icons and descriptions

## Homepage Redirect

The homepage `/` sits OUTSIDE both tab groups, so the sidebar shows collapsed tabs with no tree.
A redirect in `next.config.mjs` sends `/` → `/getting-started/introduction` to always land inside the CLI tab.

**NEVER remove this redirect** or visitors will see an empty sidebar on first load.

## History

This has been broken and fixed **4+ times**:
1. Initial build — `(cli)` route group broke auto-detection
2. Agent commit removed sidebar config during docs update
3. Wrong import path caused silent failure
4. Homepage showed empty sidebar because `/` isn't inside either tab group

**If you're editing layout.tsx or next.config.mjs, verify the dropdown works after your change.**
