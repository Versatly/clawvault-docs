---
title: "Memory Types"
description: "Eight structured memory types for organizing your agent's knowledge"
---

ClawVault organizes memories into **8 structured types**, each designed for specific kinds of information. This classification helps with retrieval, context injection, and maintaining clean mental models.

## The 8 Memory Types

### fact
**Static information that doesn't change over time.**

Examples:
- API endpoints and their parameters
- System configurations 
- Technical specifications
- Contact information
- Process documentation

```bash
clawvault remember fact "Stripe API Rate Limit" --content "100 requests per second per API key"
```

### feeling
**Emotional context, sentiment, and subjective experiences.**

Examples:
- How a meeting felt
- Confidence levels in decisions
- Team morale observations
- User feedback sentiment

```bash
clawvault remember feeling "Client Demo Went Well" --content "Team felt confident, client asked good questions, positive energy"
```

### decision
**Choices made with context and reasoning.**

:::tip
Decisions automatically get 🔴 **critical** priority in observational memory.
:::

Examples:
- Architecture choices
- Tool selections
- Process changes
- Strategic directions

```bash
clawvault remember decision "Use PostgreSQL over SQLite" --content "Need concurrent writes for multi-agent setup. SQLite locks cause bottlenecks."
```

### lesson
**Things learned from experience, mistakes, or insights.**

Examples:
- What worked/didn't work
- Process improvements discovered
- Debugging insights
- Best practices learned

```bash
clawvault remember lesson "Always backup before schema changes" --content "Lost 2 hours of data during migration testing. Automated backups now required."
```

### commitment
**Promises, deadlines, and obligations.**

Examples:
- Project deadlines
- Meeting promises
- Feature deliverables
- Personal commitments

```bash
clawvault remember commitment "Demo ready by Friday" --content "Promised client working prototype with user auth and basic dashboard"
```

### preference
**Subjective choices and preferred ways of working.**

Examples:
- Code style preferences
- Tool preferences
- Communication styles
- Work patterns

```bash
clawvault remember preference "Async standups work better" --content "Team prefers written updates over video calls. More thoughtful, less interruption."
```

### relationship
**People, their roles, and how to work with them.**

Examples:
- Team members and their strengths
- Client contacts and preferences
- Stakeholder relationships
- Communication patterns

```bash
clawvault remember relationship "Sarah Chen - Product Manager" --content "Detail-oriented, prefers data-driven decisions. Responds best to Slack, not email."
```

### project
**Active work, goals, and project context.**

Examples:
- Current initiatives
- Project status updates
- Goals and objectives
- Work streams

```bash
clawvault remember project "User Dashboard Redesign" --content "Q1 initiative. Focus on mobile-first, reduce clicks by 30%, A/B testing framework ready."
```

## Why Types Matter

### Better Retrieval
```bash
# Find all decisions about databases
clawvault search "database" -c decisions

# See all active commitments
clawvault list commitments
```

### Context-Aware Injection
Different memory types surface at different times:
- **Decisions** → Critical for planning sessions
- **Commitments** → Important for deadline tracking  
- **Relationships** → Key for meeting preparation

### Graph Connections
Types create meaningful graph relationships:
```markdown
# In people/sarah-chen.md
Related decisions: [[database-choice]], [[framework-selection]]
Active projects: [[dashboard-redesign]]
```

## Quick Capture vs Structured Storage

For quick notes that you'll process later:
```bash
clawvault capture "TODO: Review PR tomorrow"
```

When you know the type:
```bash
clawvault remember decision "Use TypeScript" --content "Team voted, better DX"
```

:::note
Quick captures go to the `inbox/` category for later processing into proper types.
:::

## Auto-Classification

The [observational memory system](/concepts/observational-memory) can automatically classify session content:

- **Decisions** → detected from choice language ("decided to", "going with")
- **Lessons** → detected from learning patterns ("learned that", "mistake was")
- **Relationships** → detected from people mentions

This helps maintain structure even in conversational sessions.