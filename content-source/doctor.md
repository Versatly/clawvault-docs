---
title: clawvault doctor
description: Comprehensive vault health check and diagnostics tool for detecting and reporting ClawVault issues.
---

# clawvault doctor

The `doctor` command performs a comprehensive health check on your ClawVault installation and vault state. It's your first line of defense when something feels wrong.

## Usage

```bash
clawvault doctor
```

## What It Inspects

The doctor command analyzes multiple aspects of your ClawVault setup:

### Vault Structure
-  Vault directory exists and is accessible
-  Required folders (`decisions/`, `lessons/`, `people/`, etc.) are present
-  `.clawvault/` internal directory structure is intact
-  Missing category folders (auto-created if needed)

### Configuration Health
-  `CLAWVAULT_PATH` environment variable validity
-  Vault configuration file (`.clawvault/config.json`)
-  Graph index integrity (`.clawvault/graph-index.json`)
-  Outdated configuration schema

### OpenClaw Integration
-  Hook installation status (`openclaw hooks list`)
-  Event routing compatibility
-  Session transcript access permissions
-  Hook handler safety checks
-  Missing OpenClaw home directory

### Dependencies
-  `qmd` availability for semantic search
-  Node.js version compatibility
-  Optional dependencies missing

### Data Integrity
-  Checkpoint file validity
-  Session continuity markers
-  Graph index consistency with vault files
-  Corrupted or orphaned files

## Example Output

```bash
$ clawvault doctor

 ClawVault Health Check

Vault Structure           HEALTHY
  └─ /home/user/memory    exists, writable
  └─ Category folders     all present
  └─ Templates            7 built-in templates

Configuration             HEALTHY
  └─ CLAWVAULT_PATH      set, valid
  └─ Vault config        v2.0 schema
  └─ Graph index         847 nodes, current

OpenClaw Integration       NEEDS ATTENTION
  └─ Hook installed      clawvault hook found
  └─ Hook enabled        run: openclaw hooks install clawvault && openclaw hooks enable clawvault
  └─ Session access      ~/.openclaw/agents accessible

Dependencies              HEALTHY
  └─ qmd                 installed, indexed
  └─ Node.js             v18.17.0

Data Integrity           HEALTHY
  └─ Last checkpoint     23 minutes ago
  └─ Death flag          clean shutdown
  └─ Orphan files        none found

Overall Status: MOSTLY HEALTHY (1 issue)
Next: Run 'openclaw hooks install clawvault && openclaw hooks enable clawvault' to fix integration
```

## Common Issues & Fixes

### Hook Not Enabled
```
 Hook enabled: run: openclaw hooks install clawvault && openclaw hooks enable clawvault
```
**Fix:** Run the suggested command to enable the ClawVault hook.

### Missing qmd
```
 qmd: not found (semantic search disabled)
```
**Fix:** Install qmd: `npm install -g qmd`

### Outdated Graph Index
```
 Graph index: 3 days old, recommend refresh
```
**Fix:** Run `clawvault graph --refresh`

### Vault Path Issues
```
 CLAWVAULT_PATH: /invalid/path does not exist
```
**Fix:** Set valid path or run `clawvault init` to create a new vault.

## When to Use Doctor

:::tip When to Run Doctor
- After installing or updating ClawVault
- When search results seem incomplete or wrong
- Before important sessions or presentations
- When you suspect context death isn't being detected
- After system updates or environment changes
:::

:::note Integration with compat
The `doctor` command includes a summary of `clawvault compat` results. For detailed OpenClaw compatibility diagnostics, run `clawvault compat --strict`.
:::

## Exit Codes

- `0` - All checks passed (healthy)
- `1` - Some issues found (needs attention)
- `2` - Critical issues found (broken)

The doctor command is safe to run repeatedly and never modifies your vault data.