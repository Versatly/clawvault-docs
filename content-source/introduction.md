---
title: "Introduction"
---

# Introduction

ClawVault is a structured memory system designed specifically for AI agents. Built with the philosophy that **an elephant never forgets**, ClawVault ensures your agent's memories persist across sessions, providing continuity and context that traditional systems lack.

## Why ClawVault Exists

AI agents face a fundamental challenge: **memory loss**. Context windows overflow, sessions end, and important details vanish. This creates several problems:

- **Context death** - Agent forgets what it was working on
- **Repeated mistakes** - No memory of lessons learned
- **Lost relationships** - Forgets people and their preferences
- **Scattered notes** - Information stored in random places
- **No continuity** - Each session starts from scratch

ClawVault solves these problems by providing a **structured, searchable, persistent memory system** that agents can use to maintain continuity across sessions.

## What Is ClawVault?

ClawVault is both a CLI tool and a memory philosophy. It provides:

### Structured Storage
Store information by **type** (decisions, lessons, people, projects) rather than random notes. This makes retrieval more predictable and context more relevant.

### Semantic Search
Built-in integration with [qmd](https://github.com/Versatly/qmd) provides both keyword (BM25) and semantic search using **local embeddings** - no API calls required.

### Knowledge Graph
Wiki-links (`[[entity]]`) automatically build a typed knowledge graph, showing relationships between people, projects, decisions, and concepts.

### Session Continuity
**Wake/sleep commands** with checkpoint/recover functionality ensure agents can survive context death and resume work seamlessly.

### Observational Memory
Automatically compress session transcripts into prioritized observations:
- <span class="priority-critical"> Critical</span> - decisions, errors, blockers, deadlines
- <span class="priority-notable"> Notable</span> - preferences, architecture, people interactions
- <span class="priority-info"> Info</span> - routine updates, deployments, progress

## Core Philosophy

ClawVault follows several key principles:

### Memory Types Matter
Not all information is equal. A **decision** about architecture is more important than a random fact. ClawVault enforces this through typed storage categories.

### Local First
All data stays on your machine. No cloud sync, no external APIs (except optional LLM calls for observation compression). Your memories are **yours**.

### Graph Thinking
Information doesn't exist in isolation. People work on projects, decisions affect outcomes, lessons come from experience. ClawVault captures these relationships.

### Token Efficiency
Don't load entire memory files into context. Use **search** to find relevant information and inject only what's needed for the current task.

## Who Should Use ClawVault?

ClawVault is perfect for:

- **OpenClaw agents** - Built-in hook system provides automatic session continuity
- **Long-running AI projects** - Maintain context across weeks or months of work
- **Knowledge workers** - Agents that need to remember decisions, lessons, and relationships
- **Research agents** - Build knowledge graphs of discoveries and connections
- **Personal assistants** - Remember preferences, commitments, and ongoing projects

## Next Steps

Ready to get started? Head to the [Installation Guide](./installation) to set up ClawVault, or jump to the [Quick Start](./quick-start) for a hands-on walkthrough.

For OpenClaw users, ClawVault integrates seamlessly with your existing workflow - just install the skill and enable the hook system for automatic memory management.