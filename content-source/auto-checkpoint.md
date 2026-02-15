---
title: Auto-checkpoint on command:new
description: Hook-driven checkpointing before OpenClaw session resets.
---

# Auto-checkpoint on command:new

When the ClawVault hook is enabled, `/new` lifecycle events trigger automatic checkpoint behavior before reset.

## Hook Setup

```bash
npm install -g clawvault
openclaw hooks install clawvault
openclaw hooks enable clawvault
openclaw hooks list --verbose
openclaw hooks check
```

Restart gateway after enable/install.

## Why It Matters

Without checkpoint-before-reset, `/new` can drop in-flight context.  
With hook automation:

- state is captured pre-reset
- next `wake`/`recover` has continuity data
- operator burden is lower during long sessions

## Recommended Operator Pattern

```bash
# start
clawvault wake

# while working
clawvault checkpoint --working-on "..." --focus "..."

# end
clawvault sleep "..." --next "..."
```

Auto-checkpoint is a safety net; periodic manual checkpoints still provide richer state capture.

## Troubleshooting

### no checkpoint observed around `/new`

```bash
openclaw hooks list --verbose
openclaw hooks info clawvault
clawvault compat --strict
```

### reinstall path

```bash
openclaw hooks install clawvault
openclaw hooks enable clawvault
```
