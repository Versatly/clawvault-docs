---
title: "Environment Variables"
description: "All environment variables used by ClawVault and when they apply."
---

ClawVault uses environment variables for configuration. None are required — all have sensible defaults or auto-discovery.

## Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `CLAWVAULT_PATH` | No | Vault directory path. Skips auto-discovery if set. |
| `GEMINI_API_KEY` | No | Gemini Flash API key for `observe --compress`. Without it, uses rule-based fallback. |
| `OPENCLAW_HOME` | No | OpenClaw home directory. Used by `repair-session` to find session transcripts. |
| `OPENCLAW_STATE_DIR` | No | OpenClaw state directory override. Used by `repair-session`. |

## CLAWVAULT_PATH

The most common variable. Set this to skip vault auto-discovery:

```bash
export CLAWVAULT_PATH=/path/to/my/vault
```

Without it, ClawVault walks up from the current directory looking for a `.clawvault.json` file.

:::tip
Run `clawvault shell-init >> ~/.bashrc` to automatically set `CLAWVAULT_PATH` and add useful aliases.
:::

## GEMINI_API_KEY

Only used by `clawvault observe --compress` for LLM-powered session compression. This is the **only feature** that makes network calls.

```bash
export GEMINI_API_KEY=your-key-here
clawvault observe --compress session.jsonl
```

Without the key, `observe` falls back to rule-based extraction (no network calls).

:::note
ClawVault makes **zero network calls** by default. The Gemini API is opt-in and only activated when you explicitly use `observe --compress` with a key set.
:::

## OPENCLAW_HOME & OPENCLAW_STATE_DIR

Used by `repair-session` to locate OpenClaw session transcripts:

```bash
# Default locations (auto-discovered):
# ~/.openclaw/agents/<agent>/sessions/

# Override if OpenClaw is installed elsewhere:
export OPENCLAW_HOME=/custom/openclaw/path
export OPENCLAW_STATE_DIR=/custom/state/path
```

Both must be absolute paths if set. ClawVault validates them on use.

## Setting Variables

### Shell RC (recommended)

```bash
# Add to ~/.bashrc or ~/.zshrc
export CLAWVAULT_PATH="$HOME/.openclaw/workspace/memory"

# Or use shell-init to auto-configure:
clawvault shell-init >> ~/.bashrc
source ~/.bashrc
```

### Per-command

```bash
CLAWVAULT_PATH=/tmp/test-vault clawvault status
```

### In OpenClaw

If running as an OpenClaw agent, set variables in your gateway config or the agent's environment. The hook handler reads `CLAWVAULT_PATH` to locate the vault.
