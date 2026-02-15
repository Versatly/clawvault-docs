---
title: "compat"
description: "OpenClaw compatibility diagnostics for ClawVault packaging, hook metadata, and handler safety."
---

# clawvault compat

`clawvault compat` validates ClawVault's OpenClaw integration contract from the current project root (or an override base directory).

## Usage

```bash
clawvault compat [options]
```

## Options

| Flag | Description |
|------|-------------|
| `--strict` | Exit non-zero when warnings exist |
| `--base-dir <path>` | Validate against an alternate project root |
| `--json` | Output machine-readable JSON |

## Runtime Checks (Current)

The command checks:

1. OpenClaw CLI availability (`openclaw --version`)
2. `package.json` hook registration (`openclaw.hooks` includes `./hooks/clawvault`)
3. `hooks/clawvault/HOOK.md` required events (minimum: `gateway:startup`, `command:new`, `session:start`)
4. Hook manifest requirements (`metadata.openclaw.requires.bins` contains `clawvault`)
5. Hook handler safety conventions (execFileSync/no shell, profile delegation)
6. `SKILL.md` OpenClaw metadata presence

## Exit Behavior

- `0`: no errors (and no warnings in strict mode)
- `1`: errors, or warnings when `--strict` is enabled

## Examples

```bash
# Human-readable report
clawvault compat

# CI-safe gate
clawvault compat --strict

# JSON for automation
clawvault compat --json

# Validate from alternate fixture/project root
clawvault compat --base-dir ./fixtures/healthy --json
```

## Sample JSON Shape

```json
{
  "generatedAt": "2026-02-15T16:00:00.000Z",
  "checks": [
    { "label": "openclaw CLI available", "status": "ok" },
    { "label": "package hook registration", "status": "ok", "detail": "./hooks/clawvault" },
    { "label": "hook manifest events", "status": "ok" },
    { "label": "hook manifest requirements", "status": "ok" },
    { "label": "hook handler safety", "status": "ok" },
    { "label": "skill metadata", "status": "ok" }
  ],
  "warnings": 0,
  "errors": 0
}
```

## Troubleshooting

### openclaw CLI warning

Install or fix OpenClaw on `PATH`, then re-run:

```bash
openclaw --version
clawvault compat --strict
```

### package hook registration error

Ensure `package.json` includes:

```json
"openclaw": {
  "hooks": ["./hooks/clawvault"]
}
```

### hook metadata or handler safety warning/error

Check:

- `hooks/clawvault/HOOK.md`
- `hooks/clawvault/handler.js`
- `SKILL.md`

Then re-run `clawvault compat --strict`.
