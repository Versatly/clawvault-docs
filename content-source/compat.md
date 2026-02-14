---
title: "compat"
description: "OpenClaw compatibility diagnostics and CI validation"
---

The `compat` command validates ClawVault's integration with OpenClaw, checking hook installation, event routing, and SKILL.md metadata. Essential for CI/CD pipelines and troubleshooting integration issues.

## clawvault compat

**Check OpenClaw integration health.**

```bash
clawvault compat [options]
```

### Basic Usage

```bash
# General compatibility check
clawvault compat

# Strict mode for CI (exits non-zero on warnings)
clawvault compat --strict
```

### Example Output

```bash
$ clawvault compat

🔧 OpenClaw Compatibility Check

## ✅ OpenClaw CLI Readiness
- **OpenClaw CLI:** Found at /usr/local/bin/openclaw (v2026.2.13)
- **Version compatibility:** ✅ Supported
- **Basic functionality:** ✅ Working

## ✅ Hook Installation & Events
- **Hook installed:** ✅ /path/to/hooks/clawvault/
- **Hook enabled:** ✅ Active in OpenClaw  
- **Required events:** ✅ All supported
  - gateway:startup ✅
  - command:new ✅  
  - session:start ✅
- **Event routing:** ✅ Configured correctly

## ✅ SKILL.md Metadata Compliance  
- **Skill file:** ✅ Found and valid
- **Required fields:** ✅ Complete
  - name: clawvault ✅
  - version: 2.0.0 ✅
  - description: Present ✅
  - metadata.openclaw: Complete ✅
- **Hook metadata:** ✅ Matches hook directory

## ✅ Handler Safety & Profile Delegation
- **Safe execution:** ✅ No unsafe patterns detected
- **Profile delegation:** ✅ Supports --profile auto
- **Error handling:** ✅ Graceful degradation
- **Security compliance:** ✅ No shell injection risks

## 📊 Summary
**Status:** ✅ **Fully Compatible**
**Checks:** 15 passed, 0 warnings, 0 errors
**OpenClaw integration:** Ready for production use

All systems green! 🚀
```

### With Warnings

```bash
$ clawvault compat

🔧 OpenClaw Compatibility Check

## ⚠️ OpenClaw CLI Readiness  
- **OpenClaw CLI:** Found at /usr/local/bin/openclaw (v2026.1.5)
- **Version compatibility:** ⚠️ Older version detected
- **Basic functionality:** ✅ Working

## ✅ Hook Installation & Events
- **Hook installed:** ✅ /path/to/hooks/clawvault/
- **Hook enabled:** ⚠️ Not enabled in OpenClaw
- **Required events:** ✅ All supported

## 🔧 Recommended Actions
1. **Update OpenClaw:** Upgrade to v2026.2.0+ for latest features
2. **Enable hook:** Run `openclaw hooks enable clawvault`

**Status:** ⚠️ **Compatible with warnings**
**Checks:** 12 passed, 3 warnings, 0 errors
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--strict` | Exit non-zero on warnings (CI mode) | false |
| `--format <fmt>` | Output format (text/json) | text |
| `--base-dir <path>` | Custom project root for testing | Current directory |

## Strict Mode for CI

Use `--strict` in CI pipelines to fail on integration issues:

```bash
#!/bin/bash
# CI script
npm install -g clawvault
clawvault compat --strict

if [ $? -ne 0 ]; then
  echo "❌ OpenClaw integration not ready"
  exit 1
fi

echo "✅ ClawVault integration validated"
```

**Strict mode behavior:**
- **Exits 0** - All checks pass, no warnings
- **Exits 1** - Warnings or errors detected
- **Exits 2** - Critical errors (hook missing, invalid SKILL.md)

## Check Categories

### OpenClaw CLI Readiness

Validates OpenClaw installation and basic functionality:

```bash
# Checks performed:
openclaw --version  # CLI accessibility
openclaw help       # Basic command execution
```

**Possible issues:**
- OpenClaw not installed (`command not found`)
- Version incompatibility (too old)
- CLI execution failures

### Hook Installation & Events

Verifies hook integration:

```bash
# Hook directory structure
hooks/clawvault/
├── handler.js     # Event handler
├── package.json   # Hook metadata  
└── README.md      # Documentation

# Event support verification
# Checks that OpenClaw supports required events:
# - gateway:startup  
# - command:new
# - session:start
```

**Common issues:**
- Hook not installed (`openclaw hooks install clawvault`)
- Hook disabled (`openclaw hooks enable clawvault`)
- Missing required events in older OpenClaw versions

### SKILL.md Metadata Compliance

Validates skill metadata against OpenClaw requirements:

```yaml
# Required SKILL.md fields checked:
metadata:
  openclaw:
    emoji: "🐘"
    kind: "cli"
    requires:
      bins: ["clawvault"] 
    hooks:
      clawvault:
        events: ["gateway:startup", "command:new", "session:start"]
```

**Validation includes:**
- All required fields present
- Hook metadata matches actual hook directory
- Binary requirements satisfied
- OpenClaw-specific metadata complete

### Handler Safety & Profile Delegation

Reviews hook handler code for safety and best practices:

```javascript
// Unsafe patterns detected:
execSync('command', { shell: true })  // Shell injection risk
process.exit(1)                       // Ungraceful termination

// Safe patterns:
execFileSync('clawvault', args)       // No shell, arg array
process.exitCode = 1                  // Graceful exit
```

**Profile delegation check:**
```bash
# Verifies handler supports --profile auto for context queries
clawvault context "query" --profile auto
```

## JSON Output

Get machine-readable compatibility data:

```bash
clawvault compat --format json
```

```json
{
  "timestamp": "2026-02-13T14:30:00Z",
  "clawvaultVersion": "2.0.0",
  "openclawVersion": "2026.2.13",
  "status": "compatible",
  "checks": [
    {
      "category": "openclaw-cli",
      "name": "CLI Accessibility",
      "status": "pass",
      "details": "Found at /usr/local/bin/openclaw"
    },
    {
      "category": "hooks",  
      "name": "Hook Installation",
      "status": "pass",
      "details": "Hook installed and enabled"
    },
    {
      "category": "skill-metadata",
      "name": "SKILL.md Compliance", 
      "status": "pass",
      "details": "All required fields present"
    },
    {
      "category": "handler-safety",
      "name": "Safe Execution Patterns",
      "status": "warning",
      "details": "Minor: Consider using execFileSync over execSync",
      "hint": "Replace shell execution with direct binary calls"
    }
  ],
  "summary": {
    "totalChecks": 15,
    "passed": 14,
    "warnings": 1, 
    "errors": 0
  },
  "recommendations": [
    "Consider updating hook handler to use execFileSync"
  ]
}
```

## CI Integration Examples

### GitHub Actions

```yaml
name: ClawVault Compatibility

on: [push, pull_request]

jobs:
  compat:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install OpenClaw
        run: npm install -g openclaw
        
      - name: Install ClawVault  
        run: npm install -g clawvault
        
      - name: Validate Compatibility
        run: clawvault compat --strict --format json > compat-report.json
        
      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: compatibility-report
          path: compat-report.json
```

### GitLab CI

```yaml
compatibility-check:
  stage: test
  image: node:18
  script:
    - npm install -g openclaw clawvault
    - clawvault compat --strict
  artifacts:
    when: always
    reports:
      junit: compat-report.xml
  only:
    - merge_requests
    - main
```

### Local Development

```bash
# Pre-commit hook
#!/bin/bash
clawvault compat --strict
if [ $? -ne 0 ]; then
  echo "Fix OpenClaw compatibility issues before committing"
  exit 1
fi
```

## Troubleshooting Common Issues

### Hook Not Found

```bash
$ clawvault compat
# ❌ Hook installation: Hook directory not found

# Fix:
openclaw hooks install clawvault
openclaw hooks enable clawvault
```

### Version Mismatch

```bash
$ clawvault compat  
# ⚠️ OpenClaw version: v2026.1.0 detected, v2026.2.0+ recommended

# Fix:
npm update -g openclaw
```

### Event Support Missing

```bash
$ clawvault compat
# ❌ Required events: session:start not supported

# Fix: Update OpenClaw to newer version with event support
```

### SKILL.md Validation Errors

```bash
$ clawvault compat
# ❌ SKILL metadata: Missing required field 'openclaw.hooks'

# Fix: Update SKILL.md with complete metadata
```

## Compatibility Matrix

| ClawVault | OpenClaw | Status | Notes |
|-----------|----------|--------|-------|
| 2.0+ | 2026.2.0+ | ✅ Full | All features supported |
| 2.0+ | 2026.1.5+ | ⚠️ Limited | Missing session:start events |
| 2.0+ | <2026.1.0 | ❌ Incompatible | Hook system too old |
| 1.x | Any | ⚠️ Deprecated | Upgrade to 2.0+ recommended |

## Continuous Monitoring

### Automated Checks

```bash
# Daily compatibility monitoring
0 9 * * * /usr/local/bin/clawvault compat --strict --format json > /var/log/clawvault-compat.json

# Alert on failures  
if ! clawvault compat --strict; then
  echo "ClawVault compatibility issue detected" | mail -s "Alert" admin@company.com
fi
```

### Integration Health Dashboard

```bash
# Generate health report
clawvault compat --format json | jq '.summary'

{
  "totalChecks": 15,
  "passed": 15,
  "warnings": 0,
  "errors": 0,
  "status": "healthy"
}
```

:::caution
Always run `clawvault compat --strict` in CI pipelines to catch integration drift before deployment.
:::

The compat command ensures reliable OpenClaw integration and helps maintain compatibility across ClawVault updates and OpenClaw ecosystem changes.