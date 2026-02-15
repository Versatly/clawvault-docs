---
title: "context"
description: "Graph-aware context retrieval for prompt injection"
---

# clawvault context

Retrieve task-relevant context by combining search + graph signals.

## Usage

```bash
clawvault context <task> [options]
```

## Options (Current)

| Flag | Description | Default |
|------|-------------|---------|
| `-n, --limit <n>` | Max result entries | `5` |
| `--format <format>` | `markdown` or `json` | `markdown` |
| `--recent` | Boost recency (enabled by default) | `true` |
| `--include-observations` | Include observation memories | `true` |
| `--budget <number>` | Token budget hint (positive integer) | unset |
| `--profile <profile>` | `default`, `planning`, `incident`, `handoff`, `auto` | `default` |
| `--max-hops <n>` | Graph expansion depth | `2` |
| `-v, --vault <path>` | Vault path override | nearest |

## Examples

```bash
# Default markdown output
clawvault context "database migration strategy"

# Incident-focused JSON output
clawvault context "production timeout issue" --profile incident --format json

# Larger context window with deeper graph traversal
clawvault context "Q1 planning priorities" --profile planning --budget 3000 --max-hops 3

# Session/handoff framing
clawvault context "current work status" --profile handoff
```

## Notes

- `--budget` must be a positive integer.
- Use `--max-hops` (not `--graph-depth`) to control graph traversal.
- There is no dedicated verbose explain flag on this command surface.

## Common Errors

### Invalid budget

```bash
clawvault context "task" --budget auto
# Error: Invalid --budget value: auto
```

Use a number:

```bash
clawvault context "task" --budget 2000
```

### Invalid profile

```bash
clawvault context "task" --profile unknown
```

Valid profiles are:

- `default`
- `planning`
- `incident`
- `handoff`
- `auto`
