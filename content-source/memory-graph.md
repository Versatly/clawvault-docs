---
title: "Memory Graph"
description: "Typed knowledge graph connecting your memories through wiki-links, tags, and frontmatter"
---

ClawVault builds a **typed knowledge graph** from your vault content, enabling graph-aware context retrieval and rich relationship discovery. The graph connects memories through wiki-links, tags, and frontmatter metadata.

## Graph Index Storage

The memory graph is stored at `.clawvault/graph-index.json`:

```json
{
  "schemaVersion": 2,
  "lastUpdated": "2026-02-13T10:30:00Z",
  "nodes": {
    "decisions/database-choice": {
      "id": "decisions/database-choice",
      "type": "decision",
      "title": "Use PostgreSQL over SQLite",
      "category": "decisions",
      "path": "decisions/database-choice.md",
      "lastModified": "2026-02-13T09:15:00Z"
    }
  },
  "edges": [
    {
      "from": "decisions/database-choice",
      "to": "people/pedro",
      "type": "wiki-link",
      "context": "Pedro recommended PostgreSQL"
    }
  ],
  "stats": {
    "nodeCount": 156,
    "edgeCount": 298,
    "nodeTypes": { "decision": 23, "person": 45, "project": 12 }
  }
}
```

## Node Types

The graph recognizes these node types from memory categories:

| Type | Category | Description |
|------|----------|-------------|
| `decision` | decisions/ | Choices made with reasoning |
| `lesson` | lessons/ | Learning and insights |
| `person` | people/ | Relationships and contacts |
| `project` | projects/ | Active work and initiatives |
| `commitment` | commitments/ | Deadlines and promises |
| `preference` | preferences/ | Subjective choices |
| `fact` | facts/ | Static information |
| `feeling` | feelings/ | Emotional context |
| `template` | templates/ | Document templates |
| `observation` | observations/ | Auto-generated insights |

## Edge Types

Connections between nodes are typed based on how they're created:

### wiki-link
Created from `[[entity]]` syntax in markdown files.

```markdown
# In decisions/database-choice.md
We discussed this with [[pedro]] and decided on PostgreSQL.
The [[user-auth-project]] needs concurrent access.
```

Creates edges:
- `decisions/database-choice` → `people/pedro` (wiki-link)
- `decisions/database-choice` → `projects/user-auth` (wiki-link)

### tag  
Created from `#hashtag` syntax.

```markdown
# In lessons/auth-patterns.md  
#security #authentication patterns work best with JWT tokens.
```

Creates edges:
- `lessons/auth-patterns` → `tag:security` (tag)
- `lessons/auth-patterns` → `tag:authentication` (tag)

### frontmatter
Created from YAML metadata relationships.

```markdown
---
title: "Database Migration"
related: ["database-choice", "performance-testing"] 
author: "pedro"
project: "user-dashboard"
---
```

Creates edges:
- `projects/database-migration` → `decisions/database-choice` (frontmatter)
- `projects/database-migration` → `people/pedro` (frontmatter) 
- `projects/database-migration` → `projects/user-dashboard` (frontmatter)

## Incremental Rebuild

The graph index rebuilds incrementally for performance:

```bash
# View graph summary
clawvault graph

# Force full rebuild
clawvault graph --refresh
```

**Incremental logic:**
1. Check file modification times against last index update
2. Only reprocess changed files  
3. Update affected nodes and edges
4. Preserve unchanged portions of graph

This makes graph updates fast even with large vaults.

## Graph-Aware Context

The graph enables intelligent context retrieval:

```bash
# Get context with graph neighbors
clawvault context "database performance"
```

**Context algorithm:**
1. **Semantic search** finds relevant documents
2. **Graph traversal** includes connected nodes
3. **Type weighting** prioritizes certain relationships  
4. **Temporal decay** favors recent connections

Example: Querying "database" returns:
- Direct matches (semantic)
- Connected people who worked on database decisions (graph)
- Related projects mentioning database choices (graph)
- Recent observations about database performance (temporal + graph)

## Entity-Slug Routing

Wiki-links use entity-slug routing for clean URLs:

```markdown
[[pedro]] → people/pedro/
[[user-auth-project]] → projects/user-auth-project/
[[database-choice]] → decisions/database-choice
```

**Routing rules:**
- People: `people/{slug}/` (subfolder for relationship history)
- Projects: `projects/{slug}/` (subfolder for project updates)  
- Other types: `{category}/{slug}` (single file)

## Auto-Linking

ClawVault can automatically create wiki-links for entity mentions:

```bash
# Link all files in vault
clawvault link --all

# Link specific file
clawvault link decisions/database-choice.md

# Find broken links
clawvault link --orphans

# See what links to a file
clawvault link --backlinks people/pedro.md
```

**Entity detection:**
- Proper nouns (capitalized words)
- Known file names in vault
- Common entity patterns (names, projects)

## Graph Statistics

View graph health and growth:

```bash
clawvault graph
```

Output includes:
- **Node count** by type
- **Edge density** (connections per node)
- **Orphan nodes** (unconnected)
- **Popular nodes** (highly connected)
- **Growth trends** (new nodes/edges)

## Obsidian Integration

The graph works seamlessly with Obsidian:

1. **Wiki-links** render as clickable connections
2. **Graph view** visualizes relationships
3. **Backlinks** panel shows incoming references
4. **Entity files** can have rich metadata

:::tip
Use Obsidian's graph view to visually explore your knowledge network and discover unexpected connections.
:::

## CLI Usage

```bash
# View current graph summary
clawvault graph

# Rebuild graph index from scratch  
clawvault graph --refresh

# Check for broken wiki-links
clawvault link --orphans

# Auto-link entity mentions
clawvault link --all

# See what connects to a specific memory
clawvault link --backlinks decisions/database-choice.md
```

The memory graph transforms your vault from isolated documents into a connected knowledge network, enabling much richer context retrieval and relationship discovery.