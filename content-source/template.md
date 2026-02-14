---
title: clawvault template
description: Manage document templates for consistent memory structure with 7 built-in templates and custom template creation.
---

# clawvault template

The `template` command helps you create consistent, structured memory documents using pre-built templates or your own custom templates.

## Usage

```bash
# List all available templates
clawvault template list

# Create a new document from a template
clawvault template create <template-name> <filename>

# Add a new template from an existing file
clawvault template add <template-name> <source-file>
```

## Built-in Templates

ClawVault ships with 7 carefully designed templates for common memory types:

### 1. Person Template
**Template:** `person`  
**Path:** `people/`

Creates structured person records with contact info, relationship context, and interaction history.

```markdown
---
title: Person Name
tags: [people]
created: 2024-01-15
---

# Person Name

## Contact
- Email: 
- Phone: 
- Role/Company: 

## Context
- How we met: 
- Relationship: 
- Important notes: 

## Recent Interactions
- **2024-01-15**: First meeting about...

## Projects Together
- [[project-name]] - Role and involvement

## Preferences & Notes
- Communication style: 
- Availability: 
- Interests:
```

### 2. Project Template
**Template:** `project`  
**Path:** `projects/`

Tracks project status, goals, blockers, and key decisions.

```markdown
---
title: Project Name
tags: [projects, active]
status: planning
created: 2024-01-15
---

# Project Name

## Overview
Brief description of what this project accomplishes.

## Goals
- [ ] Primary goal
- [ ] Secondary goal
- [ ] Success metrics

## Current Status
**Status:** Planning | Active | On Hold | Complete
**Last Updated:** 2024-01-15
**Next Steps:** 

## Key People
- **Lead:** [[person-name]]
- **Stakeholders:** [[person-1]], [[person-2]]

## Decisions
- [[decision-name]] - Brief description

## Blockers & Challenges
- Current blocker description
- Dependencies waiting on

## Resources & Links
- Repository: 
- Documentation: 
- External resources:
```

### 3. Decision Template  
**Template:** `decision`  
**Path:** `decisions/`

Documents important choices with reasoning, alternatives, and outcomes.

```markdown
---
title: Decision Title
tags: [decisions]
status: decided
date: 2024-01-15
---

# Decision Title

## Context
Why this decision was needed and the circumstances.

## Options Considered
1. **Option A** - Pros: ... Cons: ...
2. **Option B** - Pros: ... Cons: ...
3. **Option C** - Pros: ... Cons: ...

## Decision
**Chosen:** Option A
**Reasoning:** Detailed explanation of why this was chosen.

## Implementation
- [ ] Step 1
- [ ] Step 2  
- [ ] Step 3

## Success Metrics
How we'll know if this was the right choice:
- Metric 1: Expected outcome
- Metric 2: Timeline goal

## Stakeholders
- **Decision Maker:** [[person-name]]
- **Affected:** [[person-1]], [[person-2]]
- **Informed:** [[person-3]]

## Follow-up Date
Review this decision on: 2024-03-15
```

### 4. Lesson Template
**Template:** `lesson`  
**Path:** `lessons/`

Captures insights, patterns, and learnings for future reference.

```markdown
---
title: Lesson Title
tags: [lessons]
category: technical
date: 2024-01-15
---

# Lesson Title

## Situation
What happened and the context that led to this lesson.

## What I Learned
The key insight or pattern discovered.

## Why It Matters
The importance and broader implications.

## How to Apply
Concrete steps for using this knowledge in the future:
1. When to recognize this pattern
2. What actions to take
3. What to avoid

## Related
- [[similar-lesson]]
- [[relevant-project]]
- [[person-who-taught-me]]

## Evidence
Examples, data, or references that support this lesson:
- Link to specific example
- Data that validates the insight
```

### 5. Meeting Template
**Template:** `meeting`  
**Path:** `inbox/` (process to appropriate category)

Structured meeting notes with decisions and action items.

```markdown
---
title: Meeting - Topic
date: 2024-01-15
attendees: [person-1, person-2]
tags: [meetings]
---

# Meeting - Topic

**Date:** 2024-01-15  
**Attendees:** [[person-1]], [[person-2]], [[person-3]]  
**Duration:** 1 hour

## Agenda
1. Topic 1
2. Topic 2
3. Next steps

## Discussion

### Topic 1
Key points discussed and any conclusions reached.

### Topic 2  
Important insights or concerns raised.

## Decisions Made
- [[decision-title]] - Brief description
- Another decision with reasoning

## Action Items
- [ ] **[[person-1]]** - Task description (Due: 2024-01-20)
- [ ] **[[person-2]]** - Another task (Due: 2024-01-18)
- [ ] **Me** - Follow up on X (Due: 2024-01-16)

## Follow-up
Next meeting scheduled for: 2024-01-22
```

### 6. Goal Template
**Template:** `goal`  
**Path:** `goals/`

Tracks objectives with milestones and progress indicators.

```markdown
---
title: Goal Name
tags: [goals]
timeframe: Q1 2024
status: active
created: 2024-01-15
---

# Goal Name

## Objective
Clear, specific description of what success looks like.

## Why This Matters
The motivation and larger purpose behind this goal.

## Success Metrics
- Quantifiable measure 1
- Quantifiable measure 2
- Qualitative indicator

## Milestones
- [ ] **Week 1:** First milestone
- [ ] **Week 4:** Major checkpoint  
- [ ] **Week 8:** Final milestone

## Progress Log
**2024-01-15:** Started goal, completed initial planning
**2024-01-18:** Made progress on X, blocked by Y

## Related Projects
- [[project-name]] - How it connects

## Resources Needed
- Time commitment: X hours/week
- Tools or materials required
- Support from [[person-name]]

## Review Schedule
- Weekly check-in: Fridays
- Major review: End of month
```

### 7. Daily Template
**Template:** `daily`  
**Path:** `memory/`

Structured daily notes with consistent format.

```markdown
---
title: 2024-01-15
tags: [daily]
date: 2024-01-15
---

# Monday, January 15, 2024

## Priority Today
1. Most important task
2. Secondary priority
3. If time permits

## Completed
- [x] Task that was accomplished
- [x] Another completed item

## Notes & Observations
Random thoughts, insights, or things to remember.

## People Interactions
- **[[person-name]]** - Brief summary of interaction
- **[[person-2]]** - What we discussed

## Decisions Made
- [[decision-name]] - Quick note about choice made

## Tomorrow's Focus
Key items to prioritize tomorrow.

## Mood & Energy
Brief reflection on how the day went.
```

## Template Commands

### List Templates
```bash
clawvault template list
```

Shows all available templates with descriptions:
```
📋 Available Templates:

Built-in:
  person     - Structured person records (→ people/)
  project    - Project tracking (→ projects/)  
  decision   - Decision documentation (→ decisions/)
  lesson     - Learning capture (→ lessons/)
  meeting    - Meeting notes (→ inbox/)
  goal       - Goal tracking (→ goals/)
  daily      - Daily notes (→ memory/)

Custom:
  weekly-review  - Weekly reflection template
  client-brief   - Client project brief format

Total: 9 templates (7 built-in, 2 custom)
```

### Create from Template
```bash
# Create a new person file
clawvault template create person john-smith

# Create project documentation  
clawvault template create project pet-door-app

# Create decision record
clawvault template create decision database-choice
```

The command automatically:
- Places files in the appropriate category folder
- Sets the correct filename and path
- Fills in template variables (dates, titles, etc.)
- Creates missing directories if needed

### Add Custom Template
```bash
# Create template from existing file
clawvault template add my-template path/to/source.md

# Create template from stdin
clawvault template add brief-template << EOF
---
title: {{title}}
tags: [briefs]
date: {{date}}
---

# {{title}}

## Summary
Brief overview of the topic.
EOF
```

## Template Variables

Templates support variable substitution:

- `{{title}}` - File title (derived from filename)
- `{{date}}` - Current date (YYYY-MM-DD)
- `{{time}}` - Current time (HH:MM)
- `{{filename}}` - Target filename
- `{{category}}` - Target category/folder

## Examples

### Creating a New Person Record
```bash
$ clawvault template create person pedro-santos

✅ Created people/pedro-santos.md from person template

Next steps:
  1. Fill in contact information
  2. Add context about how you met
  3. Link to any related projects
```

### Daily Note Creation
```bash
$ clawvault template create daily $(date +%Y-%m-%d)

✅ Created memory/2024-01-15.md from daily template

Template filled with:
  - Today's date: Monday, January 15, 2024
  - Priority section ready for planning
  - Consistent structure for daily tracking
```

## Best Practices

:::tip Template Strategy
1. **Use built-in templates** as starting points - they're battle-tested
2. **Customize gradually** - modify templates based on your actual usage patterns
3. **Keep it simple** - overly complex templates slow down capture
4. **Review regularly** - update templates as your needs evolve
:::

:::note Template Storage
Custom templates are stored in `templates/` within your vault. They're regular markdown files that you can edit directly or version control with git.
:::

## Integration with Memory Types

Templates align with ClawVault's [memory type system](/concepts/memory-types/):
- Each template targets a specific memory category
- Consistent frontmatter supports semantic search
- Cross-references build your [memory graph](/concepts/memory-graph/)