---
title: "Quick Start"
---

# Quick Start

This guide walks you through the essential ClawVault workflow: **wake**, **work**, **capture**, **sleep**. You'll learn how to survive context death and maintain memory across sessions.

:::tip[Prerequisites]
Make sure you've completed the [Installation](./installation) and have a vault initialized.
:::

## The ClawVault Workflow

ClawVault follows a natural session lifecycle that mirrors how humans work:

1. **Wake up** - Recover context, check what happened
2. **Work** - Store memories as you go, checkpoint frequently  
3. **Capture** - Quick notes without interrupting flow
4. **Sleep** - Handoff to future self with clear next steps

Let's walk through each step.

## 1. Wake Up (Session Start)

Start every session with `wake` to restore context:

```bash
clawvault wake
```

**Example output:**
```
🐘 ClawVault Wake - Session Recovery

📅 Last session: 2024-01-15 14:30 (2 hours ago)
✅ Clean shutdown - no context death detected

Recent Context:
🔴 Decision: Choose database technology (2024-01-15)
   → Decided on PostgreSQL over SQLite for concurrent writes

🟡 Lesson: Context death is survivable (2024-01-14)  
   → Always checkpoint before heavy work

📋 Last Handoff:
   Working on: ClawVault documentation site
   Next: Deploy to production, add authentication
   Blocked: waiting for API keys from DevOps

Current Projects:
• clawvault-docs - documentation site (active)
• user-auth - authentication system (blocked)

Pending Commitments:
• Demo ClawVault to team (due: 2024-01-16)
```

The wake command:
- ✅ Checks for context death (session crashed unexpectedly)
- 📚 Shows recent critical/notable observations
- 🎯 Displays your last handoff context
- 📋 Lists active projects and commitments

## 2. Work & Store Memories

As you work, store important information by **type**:

### Store Decisions
```bash
clawvault remember decision "Use PostgreSQL over SQLite" \
  --content "Need concurrent writes for multi-agent setup. SQLite locks entire DB on writes."
```

### Capture Lessons Learned
```bash
clawvault remember lesson "Always checkpoint before risky operations" \
  --content "Lost 2 hours of context when session crashed during database migration"
```

### Track People & Relationships
```bash
clawvault remember relationship "Pedro Franceschi" \
  --content "CTO at Versatly, prefers async communication, available 9-5 PT"
```

### Document Projects
```bash
clawvault remember project "ClawVault Documentation" \
  --content "Starlight-based docs site. Deploy to Vercel. Theme: navy/gold."
```

### Quick Inbox Capture
For quick thoughts without interrupting flow:
```bash
clawvault capture "TODO: Add rate limiting to API endpoints"
clawvault capture "Bug: search not working with special characters"
clawvault capture "Idea: auto-generate templates from usage patterns"
```

## 3. Checkpoint Frequently

During heavy work sessions, checkpoint your state every 10-15 minutes:

```bash
clawvault checkpoint \
  --working-on "Building documentation site with Starlight" \
  --focus "Setting up sidebar navigation and content structure" \
  --blocked "Need to decide on deployment strategy"
```

This protects against context death and helps with recovery.

## 4. Search Your Memories

Find information quickly using keyword or semantic search:

```bash
# Keyword search (fast)
clawvault search "PostgreSQL decision"

# Semantic search (slower, more accurate)  
clawvault vsearch "what did we decide about the database"

# Filter by category
clawvault search "Pedro" -c people
```

**Example search output:**
```
🔍 Found 3 results for "PostgreSQL decision"

📁 decisions/database-technology.md
   Use PostgreSQL over SQLite
   → Need concurrent writes for multi-agent setup...
   
📁 lessons/checkpoint-before-migration.md  
   Always checkpoint before risky operations
   → Lost context during PostgreSQL migration...

📁 people/pedro-franceschi.md
   Pedro Franceschi - CTO
   → Recommended PostgreSQL for scaling...
```

## 5. Sleep (Session End)

End your session with a handoff to your future self:

```bash
clawvault sleep "Built documentation site structure and content" \
  --next "Deploy to Vercel, add authentication" \
  --blocked "Waiting for API keys from DevOps team" \
  --decisions "Chose Starlight over Docusaurus for better Astro integration" \
  --feeling "Productive, good progress on docs"
```

The sleep command:
- 📝 Creates a handoff record for next session
- 🏷️ Tags important decisions made this session  
- 🚧 Documents blockers clearly
- 💭 Captures your mental state and momentum
- ✅ Clears any death detection flags

## Advanced Workflows

### Context Profiles

Get context tailored for specific situations:

```bash
# Planning mode - strategic context
clawvault context --profile planning "Q1 roadmap review"

# Incident mode - recent issues, blockers  
clawvault context --profile incident "API outage investigation"

# Handoff mode - session transition context
clawvault context --profile handoff "passing project to teammate"

# Auto mode - infers profile from prompt
clawvault context --profile auto "production deployment failed"
```

### Wiki-Links & Knowledge Graph

Connect entities with wiki-links:

```bash
clawvault remember decision "Deploy ClawVault to [[vercel]]" \
  --content "[[pedro-franceschi]] recommended Vercel for [[clawvault-docs]] deployment"
```

View your knowledge graph:
```bash
clawvault graph
```

### Observational Memory

Automatically compress session transcripts:

```bash
# One-shot compression
clawvault observe --compress session-transcript.md

# Watch mode (advanced)
clawvault observe --watch ./sessions/
```

## Example Session

Here's a complete example session:

```bash
# Start session
clawvault wake

# Work and capture  
clawvault remember decision "Use Vercel for deployment" --content "Zero config, great DX"
clawvault capture "TODO: Add custom domain setup docs"
clawvault checkpoint --working-on "deployment setup" --focus "Vercel integration"

# Search when needed
clawvault vsearch "deployment decisions"

# End session
clawvault sleep "Completed Vercel deployment setup" \
  --next "Add custom domain configuration" \
  --decisions "Use Vercel for zero-config deployment"
```

## Best Practices

1. **🌅 Always wake** - Start every session with `clawvault wake`
2. **💾 Store by type** - Use `remember <type>` for structured storage  
3. **🔄 Checkpoint often** - Every 10-15 minutes during heavy work
4. **🔍 Search first** - Don't reload entire files, search for what you need
5. **🌙 Sleep clean** - End with clear handoffs using `clawvault sleep`
6. **🕸️ Link everything** - Use `[[wiki-links]]` to connect concepts
7. **📝 Capture fast** - Use `capture` for quick thoughts without interruption

## What's Next?

You've learned the core workflow! Now explore:

- **[Memory Types](../concepts/memory-types)** - Deep dive into structured storage
- **[Commands Reference](../commands/wake-sleep)** - Complete command documentation  
- **[OpenClaw Integration](../openclaw/hook-setup)** - Automatic session management
- **[Advanced Features](../advanced/vault-structure)** - Power user techniques