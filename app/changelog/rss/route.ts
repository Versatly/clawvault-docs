const baseUrl = 'https://docs.clawvault.dev';

const releases = [
  { version: '2.3.1', date: '2026-02-14', summary: 'WebDAV server on clawvault serve — enables Obsidian mobile sync via Remotely Save plugin over Tailscale.' },
  { version: '2.3.0', date: '2026-02-14', summary: 'Task tracking primitives (task/backlog/blocked), Canvas dashboard generator, vault activity stats, Tailscale networking (serve/peers/net-search), 16 default categories, ledger structure in init.' },
  { version: '2.2.1', date: '2026-02-14', summary: 'Init experience upgrade — 16 categories, ledger structure pre-created, welcome note, improved CLI output.' },
  { version: '2.2.0', date: '2026-02-14', summary: 'Ledger-first observer, scored importance model replacing emoji priorities, reflection engine, replay from ChatGPT/Claude/OpenCode exports, archive, rebuild, migrate-observations, graph guardrails with --max-hops.' },
  { version: '2.1.2', date: '2026-02-13', summary: 'Observation compressor now captures business milestones — client demos, pricing decisions, strategy pivots, contracts, and proposals treated as first-class project events.' },
  { version: '2.1.1', date: '2026-02-13', summary: 'Compressor priority rules improved — version releases, PR merges, and shipped features enforced as critical observations.' },
  { version: '2.1.0', date: '2026-02-13', summary: 'Active Session Observer — incremental observation of long-running OpenClaw sessions with smart threshold triggers.' },
  { version: '2.0.2', date: '2026-02-13', summary: 'Wiki-link corruption fix in observe compressor.' },
  { version: '2.0.1', date: '2026-02-13', summary: 'ClawHub metadata audit compliance fix.' },
  { version: '2.0.0', date: '2026-02-13', summary: 'Major release: Memory Graph Index, Context Profiles, CLI modularization, 367+ tests.' },
  { version: '1.11.2', date: '2026-02-12', summary: 'Entity-slug routing, root-level file prevention, dedup improvements.' },
  { version: '1.11.1', date: '2026-02-11', summary: 'Compressor priority enforcement, temporal decay, dedup normalization.' },
  { version: '1.11.0', date: '2026-02-11', summary: 'Cloud sync removed. ClawVault is now fully local-first.' },
  { version: '1.9.0', date: '2026-02-10', summary: 'Observational memory system with auto-classification and vault routing.' },
  { version: '1.8.2', date: '2026-02-09', summary: 'Path validation and error handling fixes.' },
  { version: '1.5.0', date: '2026-02-06', summary: 'repair-session command, shell injection fix, prompt injection fix.' },
  { version: '1.4.2', date: '2026-02-06', summary: 'OpenClaw hook integration, wake and sleep commands.' },
  { version: '1.4.0', date: '2026-02-04', summary: 'qmd integration, templates, backlinks, orphan detection.' },
  { version: '1.1.0', date: '2026-02-01', summary: 'Initial release with core CLI, checkpoint/recover, wiki-links.' },
];

export function GET() {
  const items = releases
    .map(
      (r) => `    <item>
      <title>ClawVault v${r.version}</title>
      <link>${baseUrl}/changelog#v${r.version.replace(/\./g, '')}</link>
      <guid isPermaLink="false">clawvault-v${r.version}</guid>
      <pubDate>${new Date(r.date + 'T12:00:00Z').toUTCString()}</pubDate>
      <description>${r.summary}</description>
    </item>`,
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ClawVault Changelog</title>
    <link>${baseUrl}/changelog</link>
    <description>Release history for ClawVault — persistent memory for AI agents.</description>
    <language>en</language>
    <atom:link href="${baseUrl}/changelog/rss" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
