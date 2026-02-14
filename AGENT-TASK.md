# Docs Update: v2.3.x Command Documentation

## Overview

Add documentation pages for all ClawVault commands missing from the docs site. The site uses Fumadocs (Next.js) with MDX content in `content/docs/(cli)/commands/`. Each command gets its own `.mdx` file.

## Missing Command Pages to Create

### 1. `task.mdx` — Task Management
```
clawvault task add <title> [--priority high] [--project name] [--owner name] [--due date] [--tags t1,t2]
clawvault task list [--status open|in-progress|blocked|done] [--project name] [--priority level] [--owner name] [--json]
clawvault task update <id> [--status value] [--priority value] [--owner value] [--blocked-by text] [--due date]
clawvault task done <id>
clawvault task show <id> [--json]
```
Tasks are markdown files in `tasks/` with frontmatter: status, priority, project, owner, blocked_by, due, source, tags, created, completed.

### 2. `backlog.mdx` — Backlog Management
```
clawvault backlog add <title> [--project name] [--source name]
clawvault backlog list [--project name] [--json]
clawvault backlog promote <id> [--priority high]
```
Backlog items live in `backlog/` folder. Promote moves them to `tasks/`.

### 3. `blocked.mdx` — View Blocked Tasks
```
clawvault blocked [--json]
```
Quick view of all tasks with status=blocked. Shows title, blocked_by reason, project.

### 4. `canvas.mdx` — Dashboard Canvas Generation
```
clawvault canvas [--output path]
```
Generates an Obsidian JSON Canvas file (`dashboard.canvas`) with:
- Knowledge graph stats (nodes, edges, top entities)
- Active tasks, blocked items, backlog
- Recent decisions and observations
- Vault activity stats (documents, sessions, ledger)
- Observation pipeline flow diagram

### 5. `tailscale.mdx` — Tailscale Networking
```
clawvault serve [--port 7283] [--funnel] [--background] [--stop]
clawvault peers [add <ip> --trust read|read-write|full] [list] 
clawvault net-search <query>
```
Multi-vault networking over Tailscale. Serve exposes vault API, peers manages connections, net-search queries across connected vaults.

## Pages That Need Splitting (currently combined)

### 6. Split `wake-sleep.mdx` into `wake.mdx` + `sleep.mdx`
- `wake.mdx`: `clawvault wake` — session start, context death detection, recovery, recap
- `sleep.mdx`: `clawvault sleep <summary> [--next text] [--blocked text] [--decisions text] [--feeling text]`

### 7. Split `checkpoint-recover.mdx` into `checkpoint.mdx` + `recover.mdx`
- `checkpoint.mdx`: `clawvault checkpoint [--working-on text] [--focus text] [--blocked text]`
- `recover.mdx`: `clawvault recover [--clear]`

### 8. Add `setup.mdx` (alias for `init-setup.mdx` content, or redirect)
`clawvault init <path>` — same as init-setup but the command is `setup` internally.

## Update meta.json

Update `content/docs/(cli)/commands/meta.json` to include new pages in the right sections:
- Add `task`, `backlog`, `blocked` to a new `---Task Management---` separator section
- Add `canvas` to the Graph section
- Add `tailscale` section: `---Networking---`, `tailscale`
- Replace `wake-sleep` with `wake` and `sleep` in Sessions section
- Replace `checkpoint-recover` with `checkpoint` and `recover` in Sessions section

## Update Changelog

Add v2.3.0 and v2.3.1 entries to `content/docs/(cli)/changelog.mdx`:

### v2.3.1
- WebDAV server for Obsidian mobile sync via Remotely Save

### v2.3.0
- Task management: `task add/list/update/done/show`
- Backlog: `backlog add/list/promote`
- Blocked view: `blocked`
- Canvas dashboard: `canvas` generates Obsidian JSON Canvas
- Vault activity stats in canvas
- Tailscale networking: `serve`, `peers`, `net-search`

## MDX Page Format

Follow existing pages. Example structure:
```mdx
---
title: "command-name"
description: "One-line description of the command"
---

## Usage

\`\`\`bash
clawvault command [options]
\`\`\`

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--flag` | What it does | value |

## Examples

\`\`\`bash
# Example with explanation
clawvault command --flag value
\`\`\`

## Details

Longer explanation of behavior, edge cases, related commands.
```

## Reference

Read the actual command source files in the ClawVault repo to get accurate option names and descriptions:
- Task: https://raw.githubusercontent.com/Versatly/clawvault/master/src/commands/task.ts
- Backlog: https://raw.githubusercontent.com/Versatly/clawvault/master/src/commands/backlog.ts
- Blocked: https://raw.githubusercontent.com/Versatly/clawvault/master/src/commands/blocked.ts
- Canvas: https://raw.githubusercontent.com/Versatly/clawvault/master/src/commands/canvas.ts
- Tailscale: https://raw.githubusercontent.com/Versatly/clawvault/master/src/commands/tailscale.ts

## Build & Test

```bash
npm run build    # Must build with zero errors, all 70+ pages
```

## Constraints

- MDX files, not plain markdown
- Follow existing page style exactly
- Don't modify existing pages except wake-sleep.mdx and checkpoint-recover.mdx (split them)
- Accurate command flags — read the source files
- No placeholder content
