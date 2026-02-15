---
title: OpenClaw Hook Setup
description: Install and verify the ClawVault OpenClaw hook pack for context resilience and session-start context injection.
---

# OpenClaw Hook Setup

This is the runtime hook setup for ClawVault. Use this when you want automatic lifecycle behavior in OpenClaw.

## Install + Enable

```bash
npm install -g clawvault
openclaw hooks install clawvault
openclaw hooks enable clawvault
```

Restart the OpenClaw gateway process after enabling.

## Verify (Required)

```bash
openclaw hooks list --verbose
openclaw hooks info clawvault
openclaw hooks check
clawvault compat
```

## Events Used

The ClawVault hook pack is built for:

- `gateway:startup`
- `gateway:heartbeat`
- `command:new`
- `session:start`
- `compaction:memoryFlush`
- `cron.weekly`

## What It Automates

- context death detection on startup
- checkpoint before `/new`
- task-aware context injection at session start (`--profile auto`)
- active observation flush during relevant lifecycle events

## Hook Discovery Clarification

OpenClaw discovers hooks in this order:
1. workspace hooks (`<workspace>/hooks/`)
2. managed hooks (`~/.openclaw/hooks/`)
3. bundled hooks

If a hook with the same name exists in workspace hooks, it can shadow the managed hook install.

## Troubleshooting

### Hook not found when enabling

```bash
openclaw hooks install clawvault
openclaw hooks list --verbose
```

Then enable again:

```bash
openclaw hooks enable clawvault
```

### Hook installed but not firing

```bash
openclaw hooks check
openclaw hooks info clawvault
```

Then restart gateway.

### Compatibility check

```bash
clawvault compat --strict
```

## Skill vs Hook

- `clawhub install clawvault` is skill/workspace guidance.
- `openclaw hooks install clawvault` is runtime hook installation.

Both can be useful; they are not the same mechanism.
