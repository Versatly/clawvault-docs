import type { Metadata } from 'next';
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { source } from '@/lib/source';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { CopyMarkdownButton } from '@/components/copy-markdown';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = (page.data as any).body;

  // Try to get processed markdown text for copy button
  let markdownText = '';
  try {
    markdownText = await (page.data as any).getText?.('processed') ?? '';
  } catch {
    // getText may not be available
  }

  // Fallback: construct basic markdown from title + description
  if (!markdownText) {
    markdownText = `# ${page.data.title}\n\n${page.data.description || ''}`;
  }

  return (
    <DocsPage
      toc={(page.data as any).toc}
      full={(page.data as any).full}
    >
      <div className="flex items-center justify-between gap-4">
        <DocsTitle>{page.data.title}</DocsTitle>
        <CopyMarkdownButton markdown={markdownText} />
      </div>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
