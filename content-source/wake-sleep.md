---
title: "wake & sleep"
description: "Session lifecycle commands for context continuity"
---

# wake & sleep

`wake` and `sleep` are the primary session continuity primitives in ClawVault.

## clawvault wake

Starts a session with recovery + recap.

```bash
clawvault wake [options]
```

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `-n, --handoff-limit <n>` | Number of recent handoffs to include | `3` |
| `--full` | Use full recap output (default is brief) | `false` |
| `-v, --vault <path>` | Vault path override | nearest |

### Example

```bash
clawvault wake
clawvault wake --full --handoff-limit 5
```

## clawvault sleep

Ends a session with structured handoff.

```bash
clawvault sleep <summary> [options]
```

### Options

| Flag | Description |
|------|-------------|
| `-n, --next <items>` | Next steps (comma-separated) |
| `-b, --blocked <items>` | Blockers (comma-separated) |
| `-d, --decisions <items>` | Decisions made (comma-separated) |
| `-q, --questions <items>` | Open questions (comma-separated) |
| `-f, --feeling <state>` | Session feeling/energy note |
| `-s, --session <key>` | Session key override |
| `--session-transcript <path>` | Transcript file for observe processing |
| `--reflect` | Run reflection pass after handoff |
| `--index` | Update qmd index after handoff |
| `--no-git` | Skip git commit prompt flow |
| `-v, --vault <path>` | Vault path override |

### Examples

```bash
clawvault sleep "implemented auth middleware" \
  --next "write integration tests, deploy staging" \
  --blocked "waiting on API key rotation"

clawvault sleep "incident triage" --session "incident-2026-02-15"
```

## Related Commands

```bash
clawvault checkpoint --working-on "..." --focus "..."
clawvault recover --check
clawvault recap --brief
```

## Notes

- Use `--session` (not `--session-key`) when setting custom session key in `sleep`.
- `recover` does not support a `--session-key` flag.
- Typical rhythm: `wake` at start, periodic `checkpoint`, `sleep` at end.
