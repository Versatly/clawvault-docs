---
title: "Context Death & Recovery"
description: "Checkpoint, recover, wake, and hook-assisted continuity"
---

# Context Death & Recovery

Context death is session memory loss from resets, crashes, or transcript issues. ClawVault is built to make this recoverable.

## Core Recovery Cycle

1. Save state while working:

```bash
clawvault checkpoint --working-on "auth rollout" --focus "token edge cases"
```

2. Check/clear recovery state:

```bash
clawvault recover --check
clawvault recover --clear
```

3. Start with stitched context:

```bash
clawvault wake
```

4. End with explicit handoff:

```bash
clawvault sleep "implemented auth middleware" --next "write tests"
```

## Useful Commands

```bash
clawvault recap --brief
clawvault recover --list
clawvault repair-session --dry-run
clawvault repair-session
```

## Hook-Assisted Recovery (OpenClaw)

```bash
openclaw hooks install clawvault
openclaw hooks enable clawvault
openclaw hooks list --verbose
openclaw hooks info clawvault
openclaw hooks check
```

Then restart gateway and validate with:

```bash
clawvault compat --strict
```

## Why This Works

- `checkpoint` captures in-flight state
- `recover` identifies unclean exits and latest recoverable context
- `wake` combines recovery + recap for a fresh session start
- OpenClaw hooks automate key lifecycle points (`gateway:startup`, `command:new`, `session:start`)

## Troubleshooting

### no useful recovery context

- ensure periodic `checkpoint` usage
- confirm hook install/enable if using OpenClaw automation
- run `clawvault doctor` and `clawvault compat --strict`

### transcript corruption

```bash
clawvault repair-session --dry-run
clawvault repair-session
```
