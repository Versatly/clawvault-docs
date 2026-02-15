---
title: QMD Integration
description: qmd setup and operational usage for ClawVault search and context workflows.
---

# QMD Integration

ClawVault uses `qmd` for search and semantic retrieval.

## Install qmd

```bash
# npm
npm install -g qmd

# or bun
bun install -g qmd

qmd --version
```

## Register Vault Collection

```bash
qmd collection add /path/to/vault --name clawvault-memory --mask "**/*.md"
qmd update
qmd embed
```

## Use with ClawVault

```bash
# BM25 keyword search
clawvault search "database decision"

# Semantic search
clawvault vsearch "what did we decide about storage"

# Graph-aware retrieval
clawvault context "auth migration plan" --profile planning
```

## Keep Index Fresh

```bash
qmd update
qmd embed
```

Run these after major vault edits/imports.

## Troubleshooting

### qmd not found

```bash
qmd --version
```

If missing, reinstall qmd and ensure global bin path is on `PATH`.

### collection not found

```bash
qmd collection list
qmd collection add /path/to/vault --name clawvault-memory --mask "**/*.md"
qmd update
qmd embed
```

### slow semantic search

- Re-run `qmd embed` to refresh embeddings.
- Reduce indexed scope with a tighter mask/exclude strategy in qmd collection config.

## Important

Avoid relying on undocumented ClawVault config keys for qmd behavior; prefer direct qmd commands shown above.
