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
