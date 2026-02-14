# ClawVault Documentation Audit Report

**Date:** 2026-02-14  
**CLI Version:** 2.4.4  
**Auditor:** Clawdious (automated)

---

## Command Pages

### ✅ Accurate Pages
- `archive.mdx` — flags match source
- `backlog.mdx` — flags match source  
- `blocked.mdx` — flags match source
- `canvas.mdx` — flags match source
- `checkpoint.mdx` — flags match source
- `compat.mdx` — session:start correctly noted as forward-compatible
- `context.mdx` — flags match source
- `dashboard.mdx` — flags match source
- `doctor.mdx` — flags match source
- `entities.mdx` — flags match source
- `graph.mdx` — flags match source
- `handoff.mdx` — flags match source
- `init-setup.mdx` — flags match source for both init and setup
- `link.mdx` — flags match source
- `list-get.mdx` — flags match source
- `migrate-observations.mdx` — flags match source
- `observe.mdx` — flags match source
- `rebuild.mdx` — flags match source
- `recover.mdx` — flags match source
- `reflect.mdx` — flags match source
- `reindex.mdx` — flags match source
- `remember-capture.mdx` — flags match source
- `repair-session.mdx` — flags match source
- `replay.mdx` — flags match source
- `search-vsearch.mdx` — flags match source
- `session-recap.mdx` — flags match source
- `setup.mdx` — flags match source (redirects to init-setup)
- `shell-init.mdx` — flags match source
- `sleep.mdx` — flags match source
- `stats.mdx` — flags match source
- `status.mdx` — flags match source
- `store.mdx` — flags match source
- `sync.mdx` — flags match source
- `sync-bd.mdx` — flags match source
- `task.mdx` — flags match source (add/list/update/done/show subcommands)
- `task-transitions.mdx` — flags match source
- `wake.mdx` — flags match source
- `checkpoint-recover.mdx` — redirect page, fine
- `wake-sleep.mdx` — redirect page, fine

### ❌ Major Issues

#### `tailscale.mdx` — COMPLETELY WRONG
The entire page documents fake commands that don't exist:
- `clawvault serve` → actual command is `clawvault tailscale-serve` (alias: `ts-serve`)
- `clawvault peers` → DOES NOT EXIST at all
- `clawvault net-search` → DOES NOT EXIST at all
- Wrong default port (7283 vs actual 8384)
- Missing real commands: `tailscale-status` (`ts-status`), `tailscale-sync` (`ts-sync`), `tailscale-discover` (`ts-discover`)
- **FIXED** ✅

#### `template.mdx` — Wrong command signatures
- `template create <template-name> <filename>` → actual: `template create <name>` with `--title` option
- `template add <template-name> <source-file>` → actual: `template add <file>` with `--name <name>` (required)
- **FIXED** ✅

### ⚠️ Minor Issues

#### `auto-checkpoint.mdx` — Fake flags referenced
- `clawvault recover --manual` — `--manual` flag doesn't exist
- `clawvault recover --list` — `--list` flag doesn't exist
- **FIXED** ✅

#### `context-death-detection.mdx` — Fake flag referenced
- `clawvault recover --check` — `--check` flag doesn't exist
- **FIXED** ✅

---

## Fake Commands/Config (Section 5)

### ❌ `clawvault config set/get` — DOES NOT EXIST

Found in:
1. `integrations/qmd-integration.mdx` (lines 151-180) — 5 fake `clawvault config set` commands
2. `advanced/wiki-links-entity-routing.mdx` (lines 337-416) — `clawvault config set/get` for entity routing + fake `clawvault route` commands
- **FIXED** ✅

### ✅ `session:start` — Correctly documented as forward-compatible
- `hook-setup.mdx` — properly warns it's not yet implemented
- `session-start-context.mdx` — has forward-compatible warning
- `compat.mdx` — correctly references it

### ✅ `cron.weekly` — Not found anywhere

---

## OpenClaw Integration Pages (Section 6)

### ✅ `hook-setup.mdx`
- Correctly says 2 active events (gateway:startup, command:new)
- session:start marked as forward-compatible with Callout warning

### ⚠️ `auto-checkpoint.mdx`
- No fake `clawvault config` commands (good!)
- BUT references `clawvault recover --manual` and `clawvault recover --list` which don't exist
- **FIXED** ✅

### ⚠️ `context-death-detection.mdx`
- No fake `clawvault config` commands (good!)
- References `clawvault recover --check` which doesn't exist
- **FIXED** ✅

### ✅ `session-start-context.mdx`
- Has forward-compatible warning in both frontmatter and body

---

## Version References (Section 2)

### ✅ No Issues
- Version references in command pages use relative version markers (e.g., "Added in v2.2.0") which are changelog-style and appropriate
- No outdated "v1.x" references outside changelog
- package.json version is 2.4.4 ✓

---

## Internal Links (Section 3)

### ✅ No `/docs/` prefix links found
- All internal links use relative paths correctly

---

## Missing Content (Section 7)

### 📝 Missing Command Pages
1. **`clean-exit`** — Command exists in `register-resilience-commands.js` but has no docs page. Clears the dirty death flag.
2. **`recap`** — Command exists in `register-session-lifecycle-commands.js` but has no dedicated docs page. Only mentioned in passing.

### 📝 Missing from Tailscale Page (now fixed)
- `tailscale-status` / `ts-status`
- `tailscale-sync` / `ts-sync`  
- `tailscale-serve` / `ts-serve`
- `tailscale-discover` / `ts-discover`

---

## Summary

| Status | Count |
|--------|-------|
| ✅ Accurate | 39 pages |
| ⚠️ Minor issues (fixed) | 4 pages |
| ❌ Major issues (fixed) | 4 pages |
| 📝 Missing content | 2 command pages |

### All fixes committed in this audit.
