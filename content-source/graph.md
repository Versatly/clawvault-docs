---
title: "graph"
description: "Memory graph summary and index refresh"
---

# clawvault graph

Shows typed memory graph status and optionally rebuilds the graph index.

## Usage

```bash
clawvault graph [options]
```

## Options (Current)

| Flag | Description |
|------|-------------|
| `--refresh` | Rebuild the graph index before output |
| `--json` | Output machine-readable JSON |
| `-v, --vault <path>` | Vault path override |

## Examples

```bash
# Human-readable summary
clawvault graph

# Force refresh and print JSON
clawvault graph --refresh --json
```

## Notes

- Use `--json` (not `--format json`) for structured output.
- Graph index is stored under `.clawvault/graph-index.json`.
- Run `clawvault graph --refresh` after major vault migrations or when graph output seems stale.
