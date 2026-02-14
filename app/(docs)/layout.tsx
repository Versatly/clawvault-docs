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
  
  // Get tabs from page tree (folders with root: true in meta.json)
  // If automatic detection doesn't find tabs, fall back to explicit configuration
  let tabs = getSidebarTabs(pageTree);
  
  if (tabs.length === 0) {
    // Fallback: manually configure tabs with URL sets for proper active state detection
    // CLI pages are at root level (getting-started, commands, concepts, etc.)
    // Obsidian Plugin pages are under /obsidian-plugin/
    const cliUrls = new Set<string>();
    const obsidianUrls = new Set<string>();
    
    // Collect all page URLs and categorize them
    for (const page of source.getPages()) {
      if (page.url.startsWith('/obsidian-plugin')) {
        obsidianUrls.add(page.url);
      } else if (page.url !== '/') {
        // All non-root, non-obsidian pages belong to CLI
        cliUrls.add(page.url);
      }
    }
    
    tabs = [
      {
        title: 'CLI',
        description: 'ClawVault CLI documentation',
        url: '/getting-started/introduction',
        urls: cliUrls,
      },
      {
        title: 'Obsidian Plugin',
        description: 'Visual memory management',
        url: '/obsidian-plugin',
        urls: obsidianUrls,
      },
    ];
  }

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
        tabs,
      }}
    >
      {children}
    </DocsLayout>
  );
}
