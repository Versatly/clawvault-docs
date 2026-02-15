---
title: "Context Profiles"
description: "Profile presets for task-shaped context retrieval"
---

# Context Profiles

Use `clawvault context --profile <name>` to bias retrieval for your current workflow.

## Supported Profiles

### default
Balanced retrieval for everyday work.

```bash
clawvault context "auth implementation details" --profile default
```

### planning
Biases toward strategic memory (decisions, projects, commitments).

```bash
clawvault context "Q1 roadmap priorities" --profile planning
```

### incident
Biases toward recent blockers, failures, and urgent context.

```bash
clawvault context "production API failures" --profile incident
```

### handoff
Biases toward transition continuity (recent handoffs, next steps, blockers).

```bash
clawvault context "what was I working on" --profile handoff
```

### auto
Lets ClawVault infer the profile from prompt intent.

```bash
clawvault context "urgent outage in payments" --profile auto
```

## Pairing with Other Options

```bash
clawvault context "database migration" --profile planning --max-hops 3 --budget 2500
clawvault context "incident summary" --profile incident --format json
```

## Important

- Profile tuning is currently done with supported `context` flags (`--profile`, `--max-hops`, `--budget`, etc.).
- Avoid using undocumented flags such as `--types`, `--recent-days`, or `--graph-depth`; they are not part of the current CLI surface.
