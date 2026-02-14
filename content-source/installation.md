---
title: "Installation"
---

# Installation

ClawVault requires **Node.js 18+** and **qmd** for search functionality. This guide covers installation for both OpenClaw users and standalone usage.

## Prerequisites

### Node.js 18+
ClawVault is built with modern Node.js. Check your version:

```bash
node --version
# Should show v18.0.0 or higher
```

If you need to install or upgrade Node.js:
- **macOS/Linux**: Use [nvm](https://github.com/nvm-sh/nvm)
- **Windows**: Download from [nodejs.org](https://nodejs.org/)

### qmd (Required)
ClawVault uses [qmd](https://github.com/Versatly/qmd) for local semantic search. Install it globally:

```bash
# Using bun (recommended)
bun install -g qmd

# Using npm
npm install -g qmd
```

Verify qmd installation:
```bash
qmd --version
```

## Installation Methods

### For OpenClaw Users (Recommended)

If you're using [OpenClaw](https://openclaw.ai), install ClawVault as a skill:

```bash
# Install the skill
clawhub install clawvault

# Enable the hook system for automatic session continuity
openclaw hooks enable clawvault
```

This gives you:
- ✅ ClawVault CLI available globally
- ✅ Automatic checkpoint before `/new` commands  
- ✅ Context death detection on startup
- ✅ Session start context injection

### Standalone Installation

Install ClawVault globally via npm:

```bash
npm install -g clawvault
```

Verify installation:
```bash
clawvault --version
```

## Initial Setup

### 1. Initialize Your Vault

Create your first vault with qmd integration:

```bash
# Initialize with qmd collection
clawvault init ~/memory --qmd-collection my-memory

# Or specify a custom path  
clawvault init /path/to/vault --qmd-collection vault-name
```

This creates:
```
~/memory/
├── .clawvault.json         # Config file
├── .clawvault/             # Internal state
│   └── graph-index.json    # Memory graph index
├── decisions/              # Key choices
├── lessons/                # Things learned
├── people/                 # Relationships
├── projects/               # Active work
├── commitments/            # Promises & deadlines
├── inbox/                  # Quick captures
└── handoffs/               # Session continuity
```

### 2. Environment Setup (Optional)

Set your vault path to avoid auto-discovery overhead:

```bash
export CLAWVAULT_PATH="$HOME/memory"
```

Or use shell integration for aliases and environment setup:

```bash
# Add to your shell profile (~/.bashrc, ~/.zshrc)
eval "$(clawvault shell-init)"
```

This adds helpful aliases:
- `cv` → `clawvault`
- `wake` → `clawvault wake`  
- `sleep` → `clawvault sleep`
- `capture` → `clawvault capture`

### 3. Verify Setup

Run a health check to ensure everything is configured correctly:

```bash
clawvault doctor
```

You should see:
```
✅ ClawVault found: ~/memory
✅ qmd available: v1.2.3
✅ Collection registered: my-memory
✅ Graph index: healthy
✅ OpenClaw hooks: enabled (if using OpenClaw)
```

## Configuration

### Vault Config (`.clawvault.json`)
```json
{
  "version": "2.0.0",
  "qmdCollection": "my-memory",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `CLAWVAULT_PATH` | Vault location | Auto-discovery |
| `GEMINI_API_KEY` | For observation compression | None (optional) |
| `OPENCLAW_HOME` | OpenClaw directory | `~/.openclaw` |

## Troubleshooting

### Common Issues

**"qmd not found"**
```bash
# Install qmd globally
npm install -g qmd
# or
bun install -g qmd
```

**"No vault found"**  
```bash
# Set explicit path
export CLAWVAULT_PATH="/path/to/vault"

# Or initialize a new vault
clawvault init ~/memory
```

**"Collection not registered"**
```bash
# Register your vault with qmd
qmd collection add ~/memory --name my-memory --mask "**/*.md"
qmd update && qmd embed
```

### Get Help

- **Check status**: `clawvault doctor`
- **OpenClaw compatibility**: `clawvault compat`
- **GitHub Issues**: [clawvault/issues](https://github.com/Versatly/clawvault/issues)
- **Discord**: [OpenClaw Community](https://discord.gg/openclaw)

## Next Steps

Now that ClawVault is installed, head to the [Quick Start Guide](./quick-start) to learn the essential commands and workflows.