import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

export default function RootDocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pageTree = source.getPageTree();

  // RULE: sidebar.tabs must NOT be set to false or an empty array.
  // Fumadocs auto-detects tabs from folders with root: true in meta.json.
  // Both (cli)/meta.json and obsidian-plugin/meta.json have root: true.
  // See: .cursor/rules/sidebar-tabs.md — broken and fixed 3+ times.

  return (
    <DocsLayout
      tree={pageTree}
      nav={{
        title: 'ClawVault',
        url: '/',
      }}
      links={[
        {
          text: 'GitHub',
          url: 'https://github.com/Versatly/clawvault',
          active: 'nested-url',
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
