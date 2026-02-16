---
title: ClawVault Structure
description: Complete guide to ClawVault folder organization, internal state files, and template system architecture.
---

# ClawVault Structure

Understanding ClawVault's folder structure helps you organize memories effectively and troubleshoot issues when they arise.

## High-Level Organization

```
vault/
├── .clawvault/           # Internal state and configuration
├── decisions/            # Key choices with reasoning
├── lessons/              # Insights and patterns
├── people/               # Person records and relationships
├── projects/             # Active work tracking
├── goals/                # Objectives and progress
├── handoffs/             # Session continuity records
├── memory/               # Daily notes and logs
├── inbox/                # Quick captures to process
└── templates/            # Document templates
```

## Content Categories

### decisions/
**Purpose:** Document important choices with full context

**Structure:**
```
decisions/
├── database-choice.md           # Technical architecture decisions
├── hiring-strategy-2024.md      # Strategic business decisions
├── api-design-patterns.md       # Design and methodology choices
└── vendor-selection/            # Complex decisions with research
    ├── index.md                 # Summary and final choice
    ├── evaluation-matrix.xlsx   # Supporting analysis
    └── vendor-demos/            # Demo notes and recordings
```

**Content Pattern:**
- Context and problem statement
- Options considered with pros/cons
- Decision with reasoning
- Implementation plan
- Success metrics

### lessons/
**Purpose:** Capture insights, patterns, and learning for future reference

**Structure:**
```
lessons/
├── technical/
│   ├── context-death-recovery.md   # System-specific learnings
│   └── api-rate-limiting.md        # Technical problem patterns
├── process/
│   ├── meeting-facilitation.md     # Workflow improvements
│   └── code-review-feedback.md     # Team process insights
└── business/
    ├── client-communication.md     # Relationship patterns
    └── project-estimation.md       # Business learnings
```

### people/
**Purpose:** Relationship management and interaction history

**Structure:**
```
people/
├── pedro.md                     # Simple contact record
├── justin-dukes/                # Complex relationship with subfolder
│   ├── index.md                 # Main contact info
│   ├── meeting-history.md       # Interaction log
│   └── project-hale.md          # Project-specific context
└── teams/
    ├── engineering-team.md      # Group relationships
    └── client-stakeholders.md   # Stakeholder groups
```

### projects/
**Purpose:** Track active work, goals, and project context

**Structure:**
```
projects/
├── active/
│   ├── clawvault-improvements.md
│   ├── client-onboarding.md
│   └── api-redesign.md
├── completed/
│   ├── 2024-q1-goals.md
│   └── legacy-migration.md
└── on-hold/
    └── advanced-analytics.md
```

### goals/
**Purpose:** Track objectives, milestones, and progress

**Structure:**
```
goals/
├── 2024/
│   ├── q1-objectives.md         # Quarterly goals
│   ├── q2-objectives.md
│   └── annual-themes.md         # Yearly direction
├── personal/
│   ├── skill-development.md     # Learning goals
│   └── work-life-balance.md     # Life goals
└── completed/
    └── 2023-retrospective.md    # Historical achievements
```

### memory/
**Purpose:** Daily logs, raw notes, and chronological records

**Structure:**
```
memory/
├── 2024-01-15.md               # Daily notes
├── 2024-01-14.md
├── weekly/
│   ├── 2024-w03-review.md      # Weekly retrospectives
│   └── 2024-w02-planning.md    # Weekly planning
└── observations/               # Auto-generated from sessions
    ├── 2024-01-15/
    │   ├── decisions.md        # Decision observations
    │   ├── people.md           # People interactions
    │   └── lessons.md          # Learning observations
    └── routing-log.json        # Observation routing history
```

### handoffs/
**Purpose:** Session continuity and context transfer

**Structure:**
```
handoffs/
├── 2024-01-15-153042.md        # Session handoff records
├── 2024-01-14-091234.md
└── recovery/
    ├── context-death-alerts.md # Death detection records
    └── checkpoint-log.md       # Checkpoint history
```

### inbox/
**Purpose:** Quick captures that need processing and categorization

**Structure:**
```
inbox/
├── 2024-01-15-random-ideas.md  # Quick thoughts
├── meeting-notes-unsorted.md   # Meeting records to file
├── links-to-review.md          # URLs and resources
└── todo-items.md               # Task captures
```

## Internal State (.clawvault/)

The `.clawvault/` directory contains ClawVault's internal state and configuration:

```
.clawvault/
├── config.json                 # Vault configuration
├── graph-index.json            # Memory graph cache
├── dirty-death.flag            # Context death detection
├── last-checkpoint.json        # Latest checkpoint reference
├── checkpoints/                # Checkpoint storage
│   ├── 2024-01-15T14:30:52.json
│   ├── 2024-01-15T14:45:12.json
│   └── manual/                 # Manual checkpoints
├── templates/                  # Built-in template cache
│   ├── person.md
│   ├── project.md
│   └── decision.md
├── observations/               # Observation metadata
│   ├── routing-config.json     # Routing rules
│   ├── compression-state.json  # LLM processing state
│   └── dedup-cache.json        # Duplicate detection
├── graph/                      # Graph system state
│   ├── schema-version.txt      # Graph schema version
│   ├── node-types.json         # Entity type definitions
│   └── edge-types.json         # Relationship definitions
└── logs/                       # System logs
    ├── vault-operations.log    # File operations
    ├── graph-updates.log       # Graph changes
    └── hook-events.log         # OpenClaw hook activity
```

### Key Internal Files

#### config.json
```json
{
  "version": "2.0.0",
  "vault_path": "/path/to/vault",
  "created": "2024-01-15T10:00:00Z",
  "settings": {
    "auto_checkpoint_enabled": true,
    "death_detection_enabled": true,
    "context_injection_enabled": true,
    "observation_routing_enabled": true
  },
  "integrations": {
    "qmd": {
      "enabled": true,
      "collection_name": "clawvault-memory"
    },
    "openclaw": {
      "hook_installed": true,
      "events": ["gateway:startup", "command:new", "session:start"]
    }
  }
}
```

#### graph-index.json
```json
{
  "schema_version": "2.0",
  "last_updated": "2024-01-15T15:30:42Z",
  "stats": {
    "total_nodes": 847,
    "total_edges": 1204,
    "node_types": {
      "person": 23,
      "project": 12,
      "decision": 45,
      "lesson": 38
    }
  },
  "nodes": {
    "pedro": {
      "type": "person",
      "file": "people/pedro.md",
      "title": "Pedro Santos",
      "created": "2024-01-10T09:00:00Z",
      "edges": ["clawvault", "versatly", "engineering-team"]
    }
  },
  "edges": {
    "pedro->clawvault": {
      "type": "works_on",
      "source": "people/pedro.md:15",
      "created": "2024-01-10T09:15:00Z"
    }
  }
}
```

## Templates System

### Built-in Templates Location
```
vault/
├── .clawvault/templates/        # Cached built-in templates
│   ├── person.md
│   ├── project.md
│   ├── decision.md
│   ├── lesson.md
│   ├── meeting.md
│   ├── goal.md
│   └── daily.md
└── templates/                   # User custom templates
    ├── weekly-review.md
    ├── client-brief.md
    └── technical-spike.md
```

### Template Processing
1. **Command:** `clawvault template create person john-smith`
2. **Lookup:** Check `templates/person.md`, fallback to built-in
3. **Variables:** Replace `{{title}}`, `{{date}}`, etc.
4. **Routing:** Place in appropriate category folder
5. **Result:** `people/john-smith.md` with filled template

### Custom Template Example
**File:** `templates/weekly-review.md`
```markdown
---
title: "Week {{week_number}} Review - {{date}}"
tags: [weekly, review]
date: {{date}}
---

# Week {{week_number}} Review

## Accomplishments
- [ ] Major win this week
- [ ] Secondary achievement
- [ ] Small victory

## Challenges
- Challenge faced and how handled
- Learning from difficulty

## Next Week Focus
1. Priority one
2. Priority two
3. If time permits

## Insights
Key learnings or patterns noticed this week.

## Metrics
- Goals progress: %
- Energy level: /10
- Satisfaction: /10
```

## Folder Creation Rules

### Automatic Creation
ClawVault automatically creates missing folders:
```bash
clawvault init  # Creates all standard folders
```

### Manual Organization
```bash
# Add custom subcategories
mkdir -p decisions/technical
mkdir -p decisions/business
mkdir -p people/clients
mkdir -p people/team
mkdir -p projects/{active,completed,on-hold}
```

### Entity Routing
When creating files via commands, ClawVault routes to appropriate subfolders:

- `[[person-name]]` → `people/person-name.md` or `people/person-name/index.md`
- `[[project-name]]` → `projects/project-name.md` or `projects/active/project-name.md`
- `[[decision-title]]` → `decisions/decision-title.md`

## File Naming Conventions

### Standard Patterns
```
# People (kebab-case)
people/pedro-santos.md
people/justin-dukes.md

# Projects (kebab-case)
projects/clawvault-improvements.md
projects/hale-pet-door.md

# Decisions (kebab-case)
decisions/database-choice.md
decisions/api-design-patterns.md

# Daily notes (ISO date)
memory/2024-01-15.md
memory/2024-01-16.md

# Handoffs (timestamp)
handoffs/2024-01-15-153042.md
```

### Special Cases
```
# Complex entities (subfolder approach)
people/
├── pedro/
│   ├── index.md              # Main record
│   ├── 2024-01-15.md         # Daily interaction log
│   └── projects.md           # Project collaborations

projects/
├── clawvault/
│   ├── index.md              # Project overview
│   ├── technical-decisions.md # Technical choices
│   └── roadmap.md            # Planning docs
```

## Best Practices

### Organization Strategy
:::tip Folder Organization
1. **Start simple** - use flat structure initially
2. **Add subfolders** when categories exceed 20-30 files
3. **Use consistent naming** - kebab-case for entities, ISO dates for time-based
4. **Leverage templates** - maintain structure consistency
5. **Regular cleanup** - process inbox items weekly
:::

### File Relationships
```markdown
# Use wiki-links to connect related content
[[pedro]] worked on [[clawvault]] per [[decision-architecture]].
```

### Maintenance
```bash
# Regular health checks
clawvault doctor

# Clean up broken links
clawvault link --orphans

# Refresh graph index after major reorganization
clawvault graph --refresh
```

## Migration and Scaling

### Small Vault (< 100 files)
- Flat structure works well
- Single-level categories sufficient
- Manual organization feasible

### Medium Vault (100-500 files)
- Introduce subcategories
- Automated linking important
- Templates become valuable

### Large Vault (500+ files)
- Subcategory organization essential
- Entity routing critical
- Regular maintenance required
- Graph-aware search becomes primary discovery method

### Migration Tools
```bash
# Reorganize existing content
clawvault reorganize --dry-run  # Preview changes
clawvault reorganize            # Apply structure

# Fix links after reorganization
clawvault link --all --fix-moved
```

This structure provides both flexibility for growth and consistency for tooling. The key is starting simple and adding complexity only when needed.