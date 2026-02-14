---
title: Auto-checkpoint on Command:new
description: Automatic session state preservation when OpenClaw resets sessions, preventing context loss during /new commands.
---

# Auto-checkpoint on Command:new

The ClawVault hook automatically creates checkpoints before OpenClaw resets sessions, ensuring no context is lost when users run the `/new` command.

## How It Works

When a user runs `/new` in OpenClaw to reset their session:

1. **Event Trigger:** OpenClaw fires a `command:new` event
2. **Hook Activation:** ClawVault hook intercepts the event  
3. **State Capture:** Current session state is saved to vault
4. **Session Reset:** OpenClaw proceeds with normal session reset
5. **Recovery Ready:** State is available for future recovery

## What Gets Checkpointed

The auto-checkpoint captures essential session state:

### Current Work Context
- What the agent was actively working on
- Key focus areas and priorities
- Current train of thought

### Session Metadata
- Session ID and timestamp
- Agent identity and model
- Session duration and message count

### Recovery Markers
- Checkpoint creation time
- Last significant activity
- Session health indicators

## Example Flow

### Before `/new` Command
```
User: /new

OpenClaw: [About to reset session...]
         ↓ fires command:new event
         
ClawVault Hook: 
  ✅ Detected session reset
  ✅ Creating auto-checkpoint
  ✅ Saved: "Working on clawvault docs, finishing commands section"
  ✅ Ready for reset
  
OpenClaw: [Session reset complete]
```

### After Session Reset
The agent can recover using:
```bash
clawvault wake
```

Which shows:
```
🌅 Wake Up Summary

Last Session:
  Ended: 2 minutes ago (auto-checkpoint)
  Working on: clawvault docs, finishing commands section  
  Duration: 45 minutes
  
Recent Context:
  - Completed repair-session.md documentation
  - In progress: template.md with examples
  - Next: OpenClaw integration docs

No context death detected ✅
```

## Configuration

Auto-checkpoint behavior is controlled by ClawVault settings:

### Enable/Disable Auto-checkpoint
```bash
# Check current status
clawvault config get auto_checkpoint_enabled

# Enable (default)
clawvault config set auto_checkpoint_enabled true

# Disable
clawvault config set auto_checkpoint_enabled false
```

### Checkpoint Detail Level
```bash
# Minimal checkpoints (faster)
clawvault config set checkpoint_detail minimal

# Full checkpoints (more context, slower)  
clawvault config set checkpoint_detail full
```

### Timeout Settings
```bash
# Max time to spend on auto-checkpoint (default: 5 seconds)
clawvault config set auto_checkpoint_timeout 5000
```

## Performance Characteristics

Auto-checkpoint is designed to be fast and non-intrusive:

- **Typical Duration:** 100-300ms
- **Timeout Protection:** 5 second max
- **Failure Handling:** Session reset continues even if checkpoint fails
- **Background Processing:** Non-blocking for user experience

### Performance by Vault Size

| Vault Size | Checkpoint Time | Impact |
|------------|-----------------|---------|
| Small (<100 files) | 50-100ms | Negligible |
| Medium (100-500 files) | 100-200ms | Barely noticeable |
| Large (500-1000 files) | 200-400ms | Very minor delay |
| Very Large (1000+ files) | 300-500ms | Small delay |

## Integration with Manual Checkpoints

Auto-checkpoint complements manual checkpoint usage:

### Manual Checkpoints (During Work)
```bash
# Detailed checkpoints during heavy work
clawvault checkpoint --working-on "database refactor" \
  --focus "migration scripts" \
  --blocked "waiting for schema review"
```

### Auto-checkpoints (Session Boundaries)  
- Triggered automatically before `/new`
- Captures high-level session state
- Ensures nothing is completely lost

### Recovery Strategy
1. **Recent auto-checkpoint** provides session boundary context
2. **Manual checkpoints** provide detailed work state  
3. **Combined recovery** gives complete picture

## Error Handling

The hook is designed to fail gracefully:

### Checkpoint Creation Failures
- **Timeout:** Checkpoint abandoned after 5 seconds, session reset continues
- **Vault Error:** Error logged, session reset continues normally
- **Permission Issue:** Error logged, user notified on next wake

### Recovery from Failures
```bash
# Check for checkpoint issues
clawvault doctor

# Manual recovery if auto-checkpoint failed
clawvault recover --manual
```

## Checkpoint Storage

Auto-checkpoints are stored in your vault's checkpoint system:

```
vault/
├── .clawvault/
│   ├── checkpoints/
│   │   ├── 2024-01-15T14:30:52.json (auto)
│   │   ├── 2024-01-15T14:45:12.json (manual)
│   │   └── 2024-01-15T15:02:33.json (auto)
│   └── last-checkpoint.json (latest)
```

### Checkpoint Metadata
Each checkpoint includes:
```json
{
  "type": "auto",
  "event": "command:new", 
  "timestamp": "2024-01-15T15:02:33Z",
  "session_id": "main/2024-01-15-143052",
  "duration_ms": 150,
  "context": {
    "working_on": "clawvault documentation",
    "focus": "OpenClaw integration guides",
    "last_activity": "2024-01-15T15:02:18Z"
  }
}
```

## Troubleshooting

### Auto-checkpoint Not Running

**Symptoms:**
- `/new` command doesn't create checkpoints  
- No recovery context after session reset
- `clawvault wake` shows no recent checkpoints

**Diagnosis:**
```bash
# Check hook status
openclaw hooks list | grep clawvault

# Check configuration
clawvault config get auto_checkpoint_enabled
```

**Solutions:**
```bash
# Enable hook if disabled
openclaw hooks enable clawvault

# Enable auto-checkpoint if disabled
clawvault config set auto_checkpoint_enabled true

# Reinstall hook if broken
openclaw hooks install clawvault
```

### Checkpoint Creation Too Slow

**Symptoms:**
- Noticeable delay before session reset
- Timeout warnings in logs

**Solutions:**
```bash
# Reduce checkpoint detail level
clawvault config set checkpoint_detail minimal

# Reduce timeout (faster but might fail more)
clawvault config set auto_checkpoint_timeout 2000

# Check vault health
clawvault doctor
```

### Missing Context After Reset

**Symptoms:**
- `clawvault wake` shows no recent activity
- Recovery context is incomplete

**Diagnosis:**
```bash
# Check recent checkpoints
clawvault recover --list

# Check for checkpoint errors  
clawvault doctor
```

**Solutions:**
```bash
# Manual checkpoint before important work
clawvault checkpoint --working-on "important task"

# Adjust checkpoint detail level
clawvault config set checkpoint_detail full
```

## Best Practices

:::tip Maximizing Auto-checkpoint Value
1. **Don't rely solely on auto-checkpoint** - use manual checkpoints for detailed state
2. **Monitor checkpoint performance** - run `clawvault doctor` if resets feel slow  
3. **Combine with manual checkpoints** during critical work sessions
4. **Test recovery flow** periodically with `clawvault wake`
:::

:::note When Auto-checkpoint Helps Most
- **Experimental sessions** where you might reset frequently
- **Long debugging sessions** with multiple reset cycles
- **Collaborative work** where others might reset the session
- **Demo/presentation prep** with frequent resets to clean slate
:::

## Disable Auto-checkpoint

If you prefer full manual control:

```bash
# Disable auto-checkpoint but keep other hook features
clawvault config set auto_checkpoint_enabled false

# Or disable entire hook
openclaw hooks disable clawvault
```

You can still use manual checkpoints:
```bash
# Before running /new manually
clawvault checkpoint --working-on "current task"
```

## Comparison with Manual Workflow

| Approach | Pros | Cons |
|----------|------|------|
| **Auto-checkpoint** | Zero effort, never forgotten, consistent | Less detailed, generic context |
| **Manual only** | Rich context, precise timing, full control | Easy to forget, inconsistent |
| **Hybrid (recommended)** | Best of both, comprehensive coverage | Slightly more storage |

The hybrid approach uses auto-checkpoint as a safety net while manual checkpoints provide detailed context for important work.