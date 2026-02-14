---
title: Context Death Detection
description: Automatic detection and alert injection when OpenClaw sessions die unexpectedly, using the gateway:startup event and dirty-death flag.
---

# Context Death Detection

The ClawVault hook automatically detects when OpenClaw sessions die unexpectedly and alerts the agent on restart, preventing silent context loss.

## How Context Death Happens

Context death occurs when an OpenClaw session ends abruptly without proper cleanup:

### Common Causes
- **System crashes** or forced shutdowns
- **Network disconnections** during API calls
- **Process termination** (Ctrl+C, kill commands)
- **Memory exhaustion** causing crashes
- **API errors** that crash the session
- **Hardware failures** (power loss, etc.)

### The Problem
When sessions die unexpectedly:
- No cleanup or state saving occurs
- Work context is completely lost
- The agent restarts with no awareness of the interruption
- Continues from old context as if nothing happened

## Dirty Death Flag System

ClawVault uses a "dirty death" flag to track session state:

### Flag Creation
- **When:** Session starts and begins meaningful work
- **Location:** `.clawvault/dirty-death.flag` in your vault
- **Contents:** Session metadata and timestamp

### Flag Cleanup
- **Normal shutdown:** Flag is cleared automatically
- **Unexpected death:** Flag remains, indicating incomplete session

### Detection Logic
```
1. OpenClaw starts (gateway:startup event)
   ↓
2. ClawVault hook checks for dirty-death.flag
   ↓  
3. If flag exists:
   - Context death detected
   - Alert prepared for injection
   - Recovery information gathered
   ↓
4. Alert injected into first agent turn
```

## Alert Injection

When context death is detected, the hook injects an alert into the agent's context:

### Alert Format
```
⚠️ CONTEXT DEATH DETECTED ⚠️

Previous session died unexpectedly on 2024-01-15 at 14:23:17.
Session duration: 45 minutes

Last checkpoint: 12 minutes before death
Working on: clawvault documentation improvements

Run 'clawvault recover' to see full details and restore context.
```

### Injection Method
- **Timing:** First agent turn after startup
- **Placement:** Injected as system message or context
- **Visibility:** Agent sees alert and can act on it
- **One-time:** Alert only shows once per context death

## Example Detection Flow

### Normal Session End
```
1. User ends session properly
   ↓
2. Session cleanup runs
   ↓
3. Dirty death flag cleared
   ↓
4. Next startup: No alert (clean restart)
```

### Unexpected Death
```
1. Session working normally
   ↓
2. System crash/force quit
   ↓  
3. Dirty death flag remains
   ↓
4. Next startup: Alert injected
   ↓
5. Agent sees context death warning
   ↓
6. Agent can run recovery commands
```

## Recovery Information

The context death alert provides key recovery details:

### Death Timestamp
- Exact time when session died
- Duration of lost session
- Time gap between death and restart

### Last Known State
- Final checkpoint content
- What the agent was working on
- Recent significant activities

### Recovery Actions
- Suggested `clawvault recover` command
- Available recovery options
- Context restoration steps

## Gateway Startup Event

The detection system uses OpenClaw's `gateway:startup` event:

### Event Characteristics
- **Timing:** First event fired when OpenClaw starts
- **Frequency:** Once per OpenClaw launch
- **Reliability:** Always fires, even after crashes
- **Performance:** Very early in startup process

### Hook Processing
```javascript
// Simplified hook logic
export async function handle(event) {
  if (event.type === 'gateway:startup') {
    const vault = await findVault();
    const deathFlag = await checkDeathFlag(vault);
    
    if (deathFlag.exists) {
      const alert = await buildDeathAlert(deathFlag);
      await injectAlert(alert);
      await clearDeathFlag(vault);
    }
  }
}
```

## Configuration Options

### Detection Sensitivity
```bash
# Enable/disable context death detection
clawvault config set death_detection_enabled true

# Minimum session duration before tracking (default: 5 minutes)
clawvault config set death_tracking_threshold 300
```

### Alert Behavior  
```bash
# Alert verbosity (minimal, standard, detailed)
clawvault config set death_alert_level standard

# Auto-clear flag without agent interaction
clawvault config set auto_clear_death_flag false
```

### Recovery Integration
```bash
# Auto-run recovery on death detection
clawvault config set auto_recovery_on_death false
```

## Manual Death Detection

You can also check for context death manually:

### Check for Death Flag
```bash
clawvault recover --check
```

Output:
```
🔍 Context Death Check

Status: ✅ Clean shutdown
Last session ended: 2024-01-15 14:45:30 (normal)
No context death detected.
```

Or:
```
🔍 Context Death Check  

Status: ⚠️ Context death detected
Session died: 2024-01-15 14:23:17 (unexpected)
Duration lost: 45 minutes
Last checkpoint: 12 minutes before death

Run 'clawvault recover' for full details.
```

### Manual Recovery
```bash
# Full recovery with details
clawvault recover

# Clear death flag manually
clawvault recover --clear
```

## Troubleshooting

### Death Detection Not Working

**Symptoms:**
- Context death happens but no alert appears
- Sessions die but agent doesn't know
- Dirty death flag never clears

**Diagnosis:**
```bash
# Check hook status
openclaw hooks list | grep clawvault

# Check death detection config
clawvault config get death_detection_enabled

# Look for recent death flags
ls -la .clawvault/dirty-death.flag
```

**Solutions:**
```bash
# Enable hook if disabled
openclaw hooks enable clawvault

# Enable detection if disabled
clawvault config set death_detection_enabled true

# Reinstall hook if broken  
openclaw hooks install clawvault
```

### False Death Detection

**Symptoms:**
- Death alerts appear after normal shutdowns
- Dirty death flag never clears automatically

**Causes:**
- Hook not running during normal shutdown
- Session cleanup failing
- Permission issues with flag file

**Solutions:**
```bash
# Manual flag clear
clawvault recover --clear

# Check vault permissions
clawvault doctor

# Adjust detection threshold
clawvault config set death_tracking_threshold 600  # 10 minutes
```

### Alert Not Appearing

**Symptoms:**
- Death flag exists but agent doesn't see alert
- Recovery works manually but no automatic alert

**Diagnosis:**
```bash
# Check gateway startup event handling
clawvault compat --strict

# Look for injection errors
clawvault doctor
```

## Integration with Other Features

### Auto-checkpoint Coordination
- Auto-checkpoint creates recovery state before `/new`
- Death detection provides gap analysis between checkpoints
- Combined: comprehensive context loss protection

### Manual Checkpoints
- Death detection shows time since last manual checkpoint
- Recovery includes manual checkpoint content
- Strategy: frequent manual checkpoints + automatic death detection

### Session Repair
- Death detection works with `repair-session` for corrupted transcripts
- Recovery can suggest session repair if needed
- Combined: handles both unexpected death and corruption

## Best Practices

:::tip Maximizing Death Detection Value
1. **Let it run automatically** - don't disable unless necessary
2. **Combine with checkpoints** for comprehensive protection
3. **Check recovery after crashes** to validate detection worked
4. **Adjust thresholds** if you get false positives from short sessions
:::

:::warning When Detection Fails
Context death detection requires:
- ClawVault hook properly installed and enabled
- Vault directory accessible and writable
- OpenClaw firing gateway:startup events correctly

If any component fails, manual recovery is still available via `clawvault recover`.
:::

## Performance Impact

Death detection adds minimal overhead:
- **Flag creation:** ~10ms when session starts
- **Startup check:** ~50ms during OpenClaw start
- **Alert injection:** ~100ms when death detected
- **Flag cleanup:** ~10ms during normal shutdown

Total impact: Less than 200ms even when death is detected.

## File System Details

### Dirty Death Flag Structure
```json
{
  "session_id": "main/2024-01-15-143052",
  "start_time": "2024-01-15T14:23:17Z",
  "last_activity": "2024-01-15T15:08:45Z", 
  "working_on": "clawvault documentation",
  "checkpoint_count": 3,
  "pid": 12345
}
```

### Flag Locations
- **Primary:** `{vault}/.clawvault/dirty-death.flag`
- **Backup:** `{vault}/.clawvault/death-flags/{session-id}.json`
- **Logs:** Session death events logged to vault logs

This redundancy ensures death detection works even if the primary flag is corrupted or missing.