---
title: Wiki-links and Entity Routing
description: Complete guide to [[entity]] syntax, intelligent file routing, entity-slug generation, and knowledge graph building in ClawVault.
---

# Wiki-links and Entity Routing

ClawVault uses wiki-links to build a knowledge graph and intelligently route content to appropriate folders. This system turns simple `[[entity]]` references into a structured, interconnected memory system.

## Wiki-link Syntax

### Basic Links
```markdown
# Simple entity reference
[[pedro]]

# Link with custom display text
[[pedro|Pedro Santos]]

# Link to specific section
[[database-decision#implementation]]

# Link with description
[[clawvault|ClawVault memory system]]
```

### Entity Types
```markdown
# People
[[pedro]], [[justin-dukes]], [[engineering-team]]

# Projects  
[[clawvault]], [[hale-pet-door]], [[api-redesign]]

# Decisions
[[database-choice]], [[architecture-patterns]], [[vendor-selection]]

# Concepts and lessons
[[context-death-recovery]], [[api-rate-limiting]], [[meeting-facilitation]]
```

## Entity-Slug Generation

ClawVault converts entity names to consistent file paths using slug generation:

### Conversion Rules
```
Original Name → Slug → File Path

"Pedro Santos" → pedro-santos → people/pedro-santos.md
"API Redesign Project" → api-redesign-project → projects/api-redesign-project.md  
"Database Choice Decision" → database-choice-decision → decisions/database-choice-decision.md
"Q1 2024 Goals" → q1-2024-goals → goals/q1-2024-goals.md
```

### Slug Algorithm
1. **Lowercase:** Convert to lowercase
2. **Replace spaces:** Spaces become hyphens
3. **Remove special chars:** Keep only letters, numbers, hyphens
4. **Collapse hyphens:** Multiple hyphens become single hyphen
5. **Trim:** Remove leading/trailing hyphens

### Examples
```
Input: "John Smith (Manager)" 
Output: john-smith-manager

Input: "API v2.0 Design"
Output: api-v2-0-design

Input: "Meeting: Q1 Planning & Review"
Output: meeting-q1-planning-review
```

## Smart Entity Routing

When you reference an entity that doesn't exist, ClawVault routes it to the appropriate folder based on context and type detection:

### Routing Logic

#### People Detection
```markdown
# These patterns route to people/
[[pedro]]           → people/pedro.md
[[Dr. Smith]]       → people/dr-smith.md  
[[Engineering Team]] → people/engineering-team.md

# Context clues
Met with [[jane]] about the project.
[[sarah|Sarah from marketing]] sent feedback.
```

#### Project Detection
```markdown
# These patterns route to projects/
[[clawvault]]       → projects/clawvault.md
[[Pet Door App]]    → projects/pet-door-app.md
[[Website Redesign]] → projects/website-redesign.md

# Context clues
Working on [[mobile-app]] this week.
The [[infrastructure upgrade]] is complete.
```

#### Decision Detection
```markdown
# These patterns route to decisions/
[[database-choice]]     → decisions/database-choice.md
[[vendor-selection]]    → decisions/vendor-selection.md
[[architecture-decision]] → decisions/architecture-decision.md

# Context clues  
We [[decided to use PostgreSQL]] for better performance.
The [[choice to migrate]] was based on scalability.
```

#### Lesson Detection
```markdown
# These patterns route to lessons/
[[context-death-recovery]] → lessons/context-death-recovery.md
[[meeting facilitation]]   → lessons/meeting-facilitation.md
[[code-review-process]]    → lessons/code-review-process.md

# Context clues
[[learned that]] checkpoints prevent context loss.
[[key insight]]: Always validate assumptions.
```

### Routing Ambiguity Resolution

When routing is ambiguous, ClawVault uses these signals:

1. **Existing files:** If `people/pedro.md` exists, `[[pedro]]` links there
2. **Context clues:** Surrounding text suggests entity type
3. **Capitalization:** Proper names suggest people
4. **Keywords:** "Project", "Team", "Decision" in the name
5. **Default routing:** Unknown entities go to `inbox/` for manual processing

## Entity Subfolders

For complex entities, ClawVault supports subfolder routing:

### People Subfolders
```markdown
# Simple person record
[[pedro]] → people/pedro.md

# Complex person with subfolder
[[pedro]] → people/pedro/index.md
           └─ people/pedro/meeting-history.md
           └─ people/pedro/project-collaboration.md
```

### Project Subfolders
```markdown
# Simple project
[[clawvault]] → projects/clawvault.md

# Complex project with subfolder  
[[clawvault]] → projects/clawvault/index.md
              └─ projects/clawvault/technical-decisions.md
              └─ projects/clawvault/roadmap.md
              └─ projects/clawvault/meeting-notes.md
```

### Subfolder Creation Strategy
ClawVault creates subfolders when:
- Entity has more than 3 related files
- Entity observations exceed size threshold
- Manual subfolder creation via `mkdir people/pedro/`

## Observation Routing

The observational memory system uses entity routing for auto-generated content:

### People Observations
```markdown
# Session contains: "Discussed API design with Pedro"
→ Routes to: people/pedro/2024-01-15.md

# Content
## Interaction with Pedro (2024-01-15)
- Discussed API design patterns
- Reviewed performance requirements  
- Next meeting scheduled for Friday
```

### Project Observations
```markdown
# Session contains: "Made progress on ClawVault documentation"
→ Routes to: projects/clawvault/2024-01-15.md

# Content
## ClawVault Progress (2024-01-15)
- Completed commands documentation
- Started OpenClaw integration guide
- Need to add more examples
```

### Decision Observations
```markdown
# Session contains: "Decided to use PostgreSQL over SQLite"
→ Routes to: decisions/database-choice.md

# Content (appended)
## Implementation Update (2024-01-15)
- Confirmed PostgreSQL choice
- Migration scripts in progress
- Performance testing scheduled
```

## Auto-linking

ClawVault can automatically convert entity mentions into wiki-links:

### Manual Linking
```bash
# Link all files in vault
clawvault link --all

# Link specific file  
clawvault link memory/2024-01-15.md
```

### Auto-linking Algorithm
1. **Scan text** for entity patterns
2. **Check existing entities** in the vault
3. **Apply context rules** to avoid false positives
4. **Convert mentions** to `[[entity]]` format
5. **Preserve context** - don't link mid-word or in code blocks

### Before Auto-linking
```markdown
Met with Pedro today about the ClawVault improvements.
We discussed the database decision and decided to use PostgreSQL.
Sarah from the engineering team will help with testing.
```

### After Auto-linking
```markdown
Met with [[pedro]] today about the [[clawvault]] improvements.
We discussed the [[database-decision]] and decided to use PostgreSQL.
[[sarah]] from the [[engineering-team]] will help with testing.
```

## Knowledge Graph Building

Wiki-links create edges in ClawVault's memory graph:

### Graph Relationships
```markdown
# File: people/pedro.md contains:
Works on [[clawvault]] and [[hale-pet-door]] projects.
Collaborated on [[database-decision]].

# Creates edges:
pedro → works_on → clawvault
pedro → works_on → hale-pet-door  
pedro → participated_in → database-decision
```

### Graph Statistics
```bash
clawvault graph
```

Output:
```
📊 Memory Graph Summary

Nodes: 347 entities
  └─ People: 23
  └─ Projects: 12
  └─ Decisions: 45
  └─ Lessons: 38
  └─ Other: 229

Edges: 1,204 relationships
  └─ mentions: 892
  └─ works_on: 156
  └─ decided_in: 89
  └─ learned_from: 67

Top connected entities:
  1. [[pedro]] (47 connections)
  2. [[clawvault]] (34 connections)
  3. [[engineering-team]] (28 connections)
```

## Link Management

### Finding Broken Links
```bash
clawvault link --orphans
```

Output:
```
🔗 Orphaned Wiki-Links Found:

memory/2024-01-10.md:
  Line 15: [[client-onboarding]] → people/client-onboarding.md (missing)
  Line 23: [[api-design]] → decisions/api-design.md (missing)

Total: 2 orphaned links in 1 file

💡 Suggestions:
  - Create people/client-onboarding.md for client process
  - Create decisions/api-design.md for API decisions
```

### Finding Backlinks
```bash
clawvault link --backlinks people/pedro.md
```

Output:
```
🔗 Backlinks to people/pedro.md:

decisions/database-choice.md:12    "discussed with [[pedro]]"
projects/clawvault.md:8           "[[pedro]] leads development"
memory/2024-01-15.md:23           "meeting with [[pedro]]"
handoffs/2024-01-14.md:15         "hand off to [[pedro]]"

Total: 4 files link to pedro
```

## Advanced Routing Configuration

### Custom Routing Rules
```bash
# Set routing patterns
clawvault config set entity_routing_rules '{
  "people": ["team", "manager", "client", "dr-", "mrs-"],
  "projects": ["app", "system", "platform", "website"], 
  "decisions": ["choice", "decision", "selected", "decided"],
  "lessons": ["learned", "insight", "pattern", "principle"]
}'
```

### Routing Override
```bash
# Force specific entity routing
clawvault route add "clawvault" projects/clawvault.md
clawvault route add "pedro" people/pedro/index.md
```

### Routing History
```bash
# View routing decisions
clawvault route log

# Fix misrouted entity
clawvault route move "api-design" decisions/ projects/
```

## Best Practices

### Naming Conventions
:::tip Entity Naming
1. **People:** Use real names or consistent nicknames - `pedro`, `dr-smith`
2. **Projects:** Use project/product names - `clawvault`, `hale-pet-door`
3. **Decisions:** Be specific - `database-choice-2024`, not just `database`
4. **Concepts:** Use descriptive names - `context-death-recovery`, not just `recovery`
:::

### Link Strategy
```markdown
# Good: specific, descriptive
[[pedro-santos|Pedro]], our [[lead-engineer]], decided on [[postgres-migration]].

# Avoid: vague, generic
[[person]] from [[team]] made a [[choice]].
```

### Folder Organization
```markdown
# Start simple
people/pedro.md
projects/clawvault.md

# Evolve to subfolders when needed
people/pedro/index.md
people/pedro/meeting-notes.md
projects/clawvault/index.md
projects/clawvault/technical-specs.md
```

## Troubleshooting

### Links Not Auto-creating
**Problem:** Mentions aren't converting to links

**Solutions:**
```bash
# Check auto-linking rules
clawvault config get auto_linking_enabled

# Run linking manually
clawvault link --all

# Check entity detection
clawvault entities list
```

### Wrong Routing Destination
**Problem:** Entities going to wrong folders

**Solutions:**
```bash
# Check routing rules
clawvault config get entity_routing_rules

# Move misrouted entities
clawvault route move "entity-name" correct-folder/

# Add explicit routing rule
clawvault route add "entity-name" path/to/file.md
```

### Broken Link Explosion
**Problem:** Too many orphaned links after reorganization

**Solutions:**
```bash
# Find and fix in bulk
clawvault link --orphans --fix

# Use link replacement
clawvault link --replace "old-entity" "new-entity"

# Regenerate graph after fixes
clawvault graph --refresh
```

The wiki-link and entity routing system creates a self-organizing knowledge base that grows more valuable as you add content. The key is consistent usage and periodic maintenance to keep links clean and routing accurate.