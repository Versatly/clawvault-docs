---
title: "wake & sleep"
description: "Session lifecycle commands for starting and ending work with context continuity"
---

The `wake` and `sleep` commands are ClawVault's primary session lifecycle tools. They provide comprehensive context restoration at session start and rich handoff capture at session end.

## clawvault wake

**Start your session with full context recovery.**

```bash
clawvault wake [options]
```

### What Wake Does

1. **Checks for context death** and clears dirty flag
2. **Generates session recap** from recent handoffs
3. **Includes recent observations** (🔴 critical, 🟡 notable)  
4. **Creates executive summary** (LLM-generated when available)

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `--handoff-limit <n>` | Max recent handoffs to include | 3 |
| `--brief` | Compact format for token efficiency | true |
| `--no-summary` | Skip LLM executive summary generation | false |

### Example Output

```markdown
## 📋 Executive Summary

Continue auth refactor focusing on token validation. Critical blocker: API docs still missing from vendor. Sarah Chen needs update by EOD for client demo Friday.

## 🔄 Recovery Status
**Context Death:** Detected at 14:32 (2 hours ago)
**Last Checkpoint:** fixing auth bug, token validation logic

## Recent Handoffs

### 2026-02-13 12:45
**Working on:** authentication system refactor  
**Next:** write integration tests, deploy staging
**Blocked:** waiting for OAuth provider documentation
**Feeling:** productive, code architecture is solid

## Recent Observations

### 2026-02-13
- 🔴 14:30 Auth token validation failing in edge cases
- 🔴 13:15 Client demo moved to Friday - need working auth by Thursday  
- 🟡 12:20 Sarah prefers Slack updates over email for urgent items

### 2026-02-12  
- 🔴 16:45 OAuth provider changed API, need new documentation
- 🟡 15:30 Redis session store performs 3x better than file-based
```

## clawvault sleep

**End your session with structured handoff.**

```bash
clawvault sleep <summary> [options]
```

### Required

- `<summary>` - What you were working on (comma-separated for multiple items)

### Options

| Flag | Description | Interactive Prompt |
|------|-------------|--------------------|
| `--next <items>` | Next steps to take | "Next steps (comma-separated):" |
| `--blocked <items>` | Current blockers | "Blocked items (comma-separated):" |
| `--decisions <items>` | Key decisions made | No prompt |
| `--questions <items>` | Open questions | No prompt |
| `--feeling <text>` | How the session felt | No prompt |
| `--no-git` | Skip git commit prompt | N/A |
| `--session-transcript <path>` | Process session for observations | Auto-detected |

### Interactive Mode

When you don't provide `--next` or `--blocked`, sleep prompts interactively:

```bash
clawvault sleep "built user authentication"

# Prompts:
# Next steps (comma-separated, empty to skip): write tests, deploy staging
# Blocked items (comma-separated, empty to skip): waiting for API docs
# Git repo dirty (3 changes). Commit before sleep? (y/N): y  
# Commit message: Add JWT token validation
```

### Git Integration

Sleep can automatically commit dirty repositories:

```bash
clawvault sleep "feature complete" 
# → Detects git changes, prompts for commit
# → Commits with provided message
# → Continues with handoff creation

# Skip git prompt
clawvault sleep "quick checkpoint" --no-git
```

### Observational Memory Integration

Sleep can auto-process session transcripts into observations:

```bash
# Explicit transcript path
clawvault sleep "debugging session" --session-transcript ./session.md

# Auto-detected from environment
export OPENCLAW_SESSION_TRANSCRIPT="./current-session.md"
clawvault sleep "completed feature"
```

**Environment variables checked:**
- `CLAWVAULT_SESSION_TRANSCRIPT`  
- `OPENCLAW_SESSION_FILE`
- `OPENCLAW_SESSION_TRANSCRIPT`

## Usage Patterns

### Morning Session Start
```bash
clawvault wake
# → Full context: what died, what's pending, executive summary
```

### Quick Work Session  
```bash
clawvault sleep "fixed auth bug" --next "write tests" --blocked "need staging deploy"
```

### Detailed End-of-Day Handoff
```bash
clawvault sleep "authentication refactor, user dashboard mockups" \
  --next "integration testing, client review meeting" \
  --blocked "waiting for design approval, API documentation" \
  --decisions "JWT over sessions for scalability, Material UI for components" \
  --questions "should we support social auth, what's the mobile strategy" \
  --feeling "productive day, good progress on core features"
```

### Emergency Context Save
```bash
# Quick checkpoint before crash/reset
clawvault sleep "mid-debugging auth issue" --blocked "system unstable" --no-git
```

## OpenClaw Integration

The ClawVault hook automatically handles wake/sleep:

### Automatic Checkpointing
```bash
# Before `/new` command
openclaw hook: auto-checkpoints current context
user: /new
# → Session resets but context is saved

# Next session
clawvault wake
# → Restores pre-reset context
```

### Session Start Context
```bash
# Hook injects wake summary into new sessions
clawvault context "current priorities" --profile auto
# → Automatically uses handoff profile for session starts
```

## Advanced Usage

### Non-Interactive Mode
```bash
# Fully specified (no prompts)
clawvault sleep "task complete" \
  --next "deploy, notify team" \
  --blocked "waiting for approval" \
  --no-git

# Minimal (skips optional prompts)
clawvault sleep "checkpoint" --next "" --blocked ""
```

### Custom Session Keys
```bash
# Track specific session types
clawvault sleep "incident response" --session-key "incident-20260213"

# Later recovery
clawvault recover --session-key "incident-20260213"
```

### Observation Processing
```bash
# Process rich conversation logs
clawvault sleep "planning session" \
  --session-transcript ./team-planning-2026-02-13.md
# → Extracts decisions, people interactions, commitments
```

## Error Handling

### Missing Vault
```bash
clawvault wake
# Error: No ClawVault found. Run 'clawvault init' or set CLAWVAULT_PATH
```

### Empty Summary
```bash
clawvault sleep ""
# Error: Working-on summary is required.
```

### Git Failures
```bash
clawvault sleep "task" 
# Git repo dirty (5 changes). Commit before sleep? y
# Commit message: [empty]
# Error: Git commit failed: no message provided
```

## Best Practices

1. **Start every session with wake** - establishes context baseline
2. **Sleep provides next steps** - helps future-you restart quickly  
3. **Use interactive mode** - prompts catch important details
4. **Include decisions** - captures reasoning for later reference
5. **Process session logs** - turns conversations into structured observations

:::tip
Make wake/sleep a ritual: `clawvault wake` when you sit down, `clawvault sleep` when you step away. This creates consistent handoff patterns that survive any interruption.
:::

The wake/sleep cycle transforms context death from a productivity killer into a natural rhythm of reflection and planning.