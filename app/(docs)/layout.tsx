import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { getSidebarTabs } from 'fumadocs-ui/utils/get-sidebar-tabs';

export default function RootDocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pageTree = source.getPageTree();
  
  // getSidebarTabs reads folders with root: true in meta.json
  // Both (cli)/meta.json and obsidian-plugin/meta.json have root: true
  const tabs = getSidebarTabs(pageTree);
  
  // RULE: Never remove or modify this getSidebarTabs call.
  // The (cli) route group breaks Fumadocs auto-detection without it.
  // See: commit 2183c5c3, fixed 3 times already. Do NOT touch.

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
      sidebar={{
        tabs: tabs.length > 0 ? tabs : undefined,
      }}
    >
      {children}
    </DocsLayout>
  );
}
