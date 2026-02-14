---
title: OpenClaw Hook Setup
description: Install and configure the ClawVault OpenClaw hook for automatic context death detection and checkpoint management.
---

# OpenClaw Hook Setup

The ClawVault OpenClaw hook provides automatic context death resilience by integrating directly into OpenClaw's event system. Once installed, it runs seamlessly in the background to protect your sessions.

## Installation

### Prerequisites
- OpenClaw v2026.2.9 or later
- ClawVault installed globally via npm

### Step 1: Install ClawVault Globally

```bash
npm install -g clawvault
```

This ensures the `clawvault` command is available system-wide for the hook to use.

### Step 2: Install the Hook

```bash
openclaw hooks install clawvault
```

This copies the hook handler into OpenClaw's hooks directory and registers it for the required events.

### Step 3: Enable the Hook

```bash
openclaw hooks enable clawvault
```

Activates the hook so it will respond to OpenClaw events.

## Complete Setup Verification

After installation, verify everything is working:

```bash
# Check hook status
openclaw hooks list

# Verify ClawVault compatibility  
clawvault compat

# Test the integration
clawvault doctor
```

Expected output from `openclaw hooks list`:
```
✅ clawvault (enabled)
   Events: gateway:startup, command:new, session:start
   File: ~/.openclaw/hooks/clawvault/handler.js
```

## What the Hook Does

### Automatic Context Death Detection
- **Event:** `gateway:startup`
- **Action:** Checks for dirty death flag from previous session
- **Result:** Injects alert into first agent turn if context death detected

### Auto-checkpoint Before Reset
- **Event:** `command:new`  
- **Action:** Creates checkpoint before session reset
- **Result:** Preserves session state for recovery

### Session Start Context Injection
- **Event:** `session:start`
- **Action:** Injects relevant context using `--profile auto`
- **Result:** Agent starts with appropriate background knowledge

## Hook Configuration

The hook is configured through ClawVault's standard configuration. No additional OpenClaw configuration is needed.

### Environment Variables
The hook respects these environment variables:
- `CLAWVAULT_PATH` - Vault location
- `OPENCLAW_HOME` - Custom OpenClaw installation path
- `OPENCLAW_STATE_DIR` - Custom state directory

## Event Flow Examples

### Session Start with Context Death Detection

```
1. User starts OpenClaw
   ↓
2. gateway:startup event fired
   ↓  
3. ClawVault hook checks for dirty-death.flag
   ↓
4. If found: injects context death alert
   ↓
5. Agent sees: "⚠️ Previous session died unexpectedly. Run 'clawvault recover' for details."
```

### New Command with Auto-checkpoint

```
1. User runs '/new' command
   ↓
2. command:new event fired  
   ↓
3. ClawVault hook creates checkpoint
   ↓
4. Session state saved to vault
   ↓  
5. OpenClaw proceeds with session reset
```

### Session Start Context Injection

```
1. New session starts
   ↓
2. session:start event fired
   ↓
3. ClawVault determines appropriate context profile
   ↓
4. Relevant memories injected into session start
   ↓
5. Agent begins with contextual awareness
```

## Troubleshooting

### Hook Not Running

**Symptoms:**
- No auto-checkpoint before `/new`
- Context death not detected
- No context injection at session start

**Diagnosis:**
```bash
openclaw hooks list
```

**Solutions:**
```bash
# If not installed
openclaw hooks install clawvault

# If installed but disabled  
openclaw hooks enable clawvault

# If permissions issue
sudo openclaw hooks install clawvault
```

### Permission Errors

**Error:** `EACCES: permission denied`

**Solution:**
```bash
# Fix npm global permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH

# Or use sudo (not recommended)
sudo npm install -g clawvault
sudo openclaw hooks install clawvault
```

### Vault Not Found

**Error:** Hook can't locate ClawVault

**Solution:**
Set explicit vault path:
```bash
export CLAWVAULT_PATH=/path/to/your/vault
```

Add to your shell profile (`.bashrc`, `.zshrc`):
```bash
echo 'export CLAWVAULT_PATH=/path/to/vault' >> ~/.bashrc
```

### Hook Handler Crashes

**Symptoms:**
- Hook events stop working
- OpenClaw logs show hook errors

**Diagnosis:**
```bash
clawvault compat --strict
```

**Solution:**
```bash
# Reinstall hook
openclaw hooks uninstall clawvault
openclaw hooks install clawvault  
openclaw hooks enable clawvault
```

## Manual Alternative

If you prefer not to use the automatic hook, you can achieve similar results manually:

### Manual Context Death Detection
```bash
# At session start
clawvault recover --clear
```

### Manual Checkpoint Before Reset  
```bash
# Before running /new
clawvault checkpoint --working-on "current task"
```

### Manual Context Injection
```bash  
# At session start
clawvault wake
```

## Security Considerations

The hook runs with the same privileges as OpenClaw and only:
- Reads ClawVault configuration files
- Writes to your vault directory
- Executes `clawvault` commands
- Accesses OpenClaw session state

**The hook does NOT:**
- Make network calls
- Access external APIs
- Modify system settings
- Read files outside vault and OpenClaw directories

## Performance Impact

The hook adds minimal overhead:
- **gateway:startup**: ~50ms for death detection check
- **command:new**: ~200ms for checkpoint creation  
- **session:start**: ~100-500ms for context injection (depends on vault size)

Total impact: Less than 1 second across typical session lifecycle.

## Version Compatibility

| ClawVault Version | OpenClaw Version | Hook Compatible |
|-------------------|------------------|-----------------|
| v2.0.0+          | v2026.2.9+      | ✅ Full support |
| v1.4.2+          | v2026.2.9+      | ✅ Basic support |
| v1.4.1 and older | Any             | ❌ No hook      |

:::tip Upgrade Path
If you're using an older version without hook support, upgrade to ClawVault v2.0.0+ for the best experience:

```bash
npm update -g clawvault
openclaw hooks install clawvault
openclaw hooks enable clawvault
```
:::

:::note OpenClaw Updates
When OpenClaw updates, re-run the hook installation to ensure compatibility:

```bash
openclaw hooks install clawvault
```

The hook is designed to be forward-compatible with OpenClaw updates.
:::