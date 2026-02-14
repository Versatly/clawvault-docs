import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

export default function RootDocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      nav={{
        title: 'ClawVault',
        url: '/',
      }}
      sidebar={{
        tabs: [
          {
            title: 'CLI',
            description: 'ClawVault CLI documentation',
            url: '/getting-started/introduction',
          },
          {
            title: 'Obsidian Plugin',
            description: 'Visual memory management for Obsidian',
            url: '/obsidian-plugin',
          },
        ],
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
