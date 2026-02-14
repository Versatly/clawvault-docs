---
title: "search & vsearch"
description: "Keyword and semantic search across your vault using qmd"
---

ClawVault provides two search modes: **keyword search** (`search`) for fast exact matching, and **semantic search** (`vsearch`) for meaning-based retrieval using local embeddings.

## clawvault search

**Fast keyword search using BM25 ranking.**

```bash
clawvault search <query> [options]
```

### Basic Usage

```bash
# Find documents mentioning "database"
clawvault search "database"

# Multi-word queries
clawvault search "API rate limiting"

# Quoted phrases for exact match
clawvault search "PostgreSQL connection"
```

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `-c, --category <name>` | Restrict to specific category | All categories |
| `-l, --limit <number>` | Max results to return | 10 |
| `--snippet-length <chars>` | Length of content snippets | 200 |

### Category Filtering

```bash
# Search only in decisions
clawvault search "database" -c decisions

# Search in people files  
clawvault search "frontend" -c people

# Search lessons learned
clawvault search "testing" -c lessons
```

### Example Output

```bash
$ clawvault search "authentication" -c decisions

🔍 Found 3 results for "authentication" in decisions/

┌─────────────────────────────────────────────┐
│ Use JWT over Sessions                       │
│ decisions/jwt-choice.md                     │
│ Modified: 2026-02-13                        │
│                                             │
│ Decided on JWT tokens for **authentication** │
│ system. Better for mobile apps and API     │
│ access. Sessions don't scale across...     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ OAuth Provider Selection                    │  
│ decisions/oauth-provider.md                 │
│ Modified: 2026-02-12                        │
│                                             │
│ Selected Auth0 for OAuth **authentication**. │
│ Good documentation, handles edge cases...   │
└─────────────────────────────────────────────┘
```

## clawvault vsearch

**Semantic search using local embeddings.**

```bash
clawvault vsearch <query> [options]
```

### Basic Usage

```bash
# Find content about user login (matches authentication, signin, etc.)
clawvault vsearch "user login"

# Conceptual queries work well
clawvault vsearch "team communication problems"

# Technical concepts
clawvault vsearch "database performance issues"
```

### Semantic Understanding

Semantic search understands related concepts:

```bash
# Query: "database performance"
# Matches: "PostgreSQL slow queries", "connection pooling", "query optimization"

# Query: "team collaboration"  
# Matches: "communication issues", "meeting effectiveness", "async workflows"

# Query: "deployment problems"
# Matches: "production bugs", "rollback procedures", "CI/CD failures"
```

### Options

Same as `search`:

| Flag | Description | Default |
|------|-------------|---------|
| `-c, --category <name>` | Restrict to specific category | All categories |
| `-l, --limit <number>` | Max results to return | 10 |
| `--snippet-length <chars>` | Length of content snippets | 200 |

### Example Output

```bash
$ clawvault vsearch "how to handle production issues"

🧠 Found 4 semantic matches for "how to handle production issues"

┌─────────────────────────────────────────────┐
│ Incident Response Checklist                │
│ lessons/incident-response.md                │
│ Similarity: 0.89                           │
│                                             │
│ When production breaks: 1) Check status    │
│ page 2) Roll back if possible 3) Gather    │
│ logs 4) Communicate to stakeholders...     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Database Rollback Procedure                │
│ facts/rollback-steps.md                     │
│ Similarity: 0.76                           │
│                                             │
│ Emergency database recovery: pg_dump from  │
│ backup, restore to staging, verify data    │
│ integrity, coordinate with team lead...    │
└─────────────────────────────────────────────┘
```

## Search vs OpenClaw memory_search

ClawVault search vs OpenClaw's built-in `memory_search`:

### ClawVault Search (Recommended)
```bash
clawvault search "database decisions"
# Searches: entire vault (decisions/, people/, lessons/, etc.)
# Powered by: qmd with BM25 + semantic embeddings
# Performance: Fast, local embeddings
```

### OpenClaw memory_search
```bash
memory_search "database decisions"  
# Searches: only MEMORY.md + memory/**/*.md
# Powered by: basic text search
# Scope: Limited to OpenClaw memory structure
```

:::note
If your ClawVault is inside OpenClaw's `memory/` folder, both will work. If your vault is elsewhere (recommended), use ClawVault search for full coverage.
:::

## qmd Integration

Both search commands require [qmd](https://github.com/Versatly/qmd) for indexing:

### Installation
```bash
# Install qmd
bun install -g qmd
# or: npm install -g qmd

# Verify installation
qmd --version
```

### Index Management

```bash
# Check index status
clawvault status

# Update index after changes
qmd update && qmd embed

# Rebuild index from scratch  
qmd update --force && qmd embed --force
```

### Collection Setup

ClawVault automatically configures qmd collections during `init`:

```bash
clawvault init ~/memory --qmd-collection my-memory
# Creates: qmd collection for the vault
# Configures: file masks, embedding models, search settings
```

## Advanced Search Patterns

### Boolean Operators
```bash
# AND search (both terms)
clawvault search "database AND performance"

# OR search (either term)  
clawvault search "Redis OR Memcached"

# NOT search (exclude term)
clawvault search "authentication NOT OAuth"
```

### Wildcard Patterns
```bash
# Prefix matching
clawvault search "auth*"  # matches: auth, authentication, authorize

# Suffix matching
clawvault search "*SQL"  # matches: PostgreSQL, MySQL, NoSQL
```

### Field-Specific Search
```bash
# Search in titles only
clawvault search "title:database"

# Search in specific file paths
clawvault search "path:decisions/*"

# Search by tags
clawvault search "tag:performance"
```

## Performance Comparison

| Feature | search (BM25) | vsearch (Semantic) |
|---------|---------------|-------------------|
| Speed | ~50ms | ~200ms |
| Exact matches | Excellent | Good |
| Concept matching | Limited | Excellent |
| Typo tolerance | None | Some |
| Multi-language | Basic | Good |
| Setup time | Instant | Embedding build time |

## Common Search Patterns

### Development Workflow
```bash
# Find implementation details
clawvault search "API endpoint" -c facts

# Review past decisions
clawvault vsearch "why we chose this architecture"

# Find relevant people
clawvault search "frontend" -c people

# Check lessons learned
clawvault vsearch "deployment problems" -c lessons
```

### Meeting Preparation
```bash
# Research client background
clawvault search "Acme Corp" -c people

# Review related decisions  
clawvault vsearch "user authentication strategy"

# Find project status
clawvault search "dashboard redesign" -c projects
```

### Debugging Assistance
```bash
# Find similar issues
clawvault vsearch "database connection timeout"

# Check configuration
clawvault search "Redis config" -c facts

# Review incident history
clawvault vsearch "production outage response" -c lessons
```

## Error Handling

```bash
# qmd not installed
clawvault search "query"
# Error: qmd not found. Install with: bun install -g qmd

# No index
clawvault vsearch "query"  
# Error: No embeddings found. Run: qmd embed

# Empty collection
clawvault search "query" -c nonexistent
# Warning: Category 'nonexistent' not found, searching all categories
```

## Best Practices

### Use the Right Search Type

**Use `search` for:**
- Exact term matching ("PostgreSQL", "React", "API key")
- Fast lookups during coding
- Finding specific people/projects by name
- Configuration and fact retrieval

**Use `vsearch` for:**
- Conceptual queries ("database problems", "team issues")
- Cross-cutting concerns ("security", "performance")  
- Learning from past experiences
- Research and exploration

### Optimize Your Content for Search

```bash
# Good: Include searchable keywords
clawvault remember lesson "PostgreSQL Connection Pooling with PgBouncer" \
  --content "Database performance issue solved with connection pooling" \
  --tags "postgresql,performance,database,pgbouncer"

# Less searchable: Vague titles
clawvault remember lesson "Thing we learned" \
  --content "It was better"
```

### Combine with Context

```bash
# Search first, then get context
clawvault vsearch "authentication decisions" -c decisions
# → Find relevant decision IDs

clawvault context "implement OAuth" --profile planning  
# → Get broader context including graph neighbors
```

:::tip
Start with semantic search (`vsearch`) for exploration, then use keyword search (`search`) to find specific details once you know what you're looking for.
:::