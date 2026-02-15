---
title: Context Death Detection
description: Startup detection and alerting for interrupted sessions.
---

# Context Death Detection

ClawVault detects interrupted sessions and helps restore continuity on the next start.

## Detection Flow

1. Session ends uncleanly (reset/crash/interruption)
2. Recovery marker remains in vault state
3. On next startup, ClawVault recovery logic surfaces that state
4. Agent/operator can continue from latest checkpoint/handoff context

## Commands

```bash
# Check if unclean exit was detected
clawvault recover --check

# Clear marker and print recovery details
clawvault recover --clear

# Start session with stitched recap
clawvault wake
```

## OpenClaw Hook Integration

Use hooks for automatic lifecycle detection:

```bash
openclaw hooks install clawvault
openclaw hooks enable clawvault
openclaw hooks list --verbose
openclaw hooks check
```

Restart gateway after install/enable.

## Troubleshooting

### detection seems inactive

```bash
clawvault doctor
clawvault compat --strict
openclaw hooks list --verbose
```

### hook enable fails

```bash
openclaw hooks install clawvault
openclaw hooks enable clawvault
```

If discovery still fails, check for same-name workspace hook shadowing managed hook location.
