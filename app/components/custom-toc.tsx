'use client';

import { useRef, useEffect, useState } from 'react';
import * as Primitive from 'fumadocs-core/toc';
import type { TOCItemType } from 'fumadocs-core/toc';
function TOCItem({ item }: { item: TOCItemType }) {
  const depthClass = item.depth >= 4 ? 'ps-8' : item.depth === 3 ? 'ps-6' : 'ps-3';

  return (
    <Primitive.TOCItem
      href={item.url}
      className={`relative block py-1.5 text-sm transition-all duration-300 text-fd-muted-foreground [overflow-wrap:anywhere] data-[active=true]:text-fd-primary data-[active=true]:font-medium hover:text-fd-foreground/80 ${depthClass}`}
    >
      {item.title}
    </Primitive.TOCItem>
  );
}

function GlowIndicator({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const [style, setStyle] = useState({ top: 0, height: 0, opacity: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const active = container.querySelector('[data-active="true"]');
      if (!active) {
        setStyle((s) => ({ ...s, opacity: 0 }));
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const activeRect = (active as HTMLElement).getBoundingClientRect();

      setStyle({
        top: activeRect.top - containerRect.top,
        height: activeRect.height,
        opacity: 1,
      });
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(container, {
      subtree: true,
      attributes: true,
      attributeFilter: ['data-active'],
    });

    window.addEventListener('scroll', update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
    };
  }, [containerRef]);

  return (
    <>
      {/* Primary glow line */}
      <div
        className="absolute left-0 w-[2px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          top: style.top,
          height: style.height,
          opacity: style.opacity,
          background: 'var(--color-fd-primary)',
          boxShadow: `0 0 8px var(--color-fd-primary), 0 0 24px color-mix(in srgb, var(--color-fd-primary) 35%, transparent)`,
        }}
      />
      {/* Soft ambient glow */}
      <div
        className="absolute left-0 w-[8px] rounded-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none"
        style={{
          top: style.top - 2,
          height: style.height + 4,
          opacity: style.opacity * 0.2,
          background: `radial-gradient(ellipse at left, color-mix(in srgb, var(--color-fd-primary) 40%, transparent), transparent)`,
        }}
      />
    </>
  );
}

export function CustomTOC({
  toc,
  header,
  footer,
}: {
  toc: TOCItemType[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (toc.length === 0) return null;

  return (
    <div className="flex w-[220px] min-w-[220px] flex-col gap-3 max-lg:hidden xl:w-[260px]">
      <div className="sticky top-16 flex max-h-[calc(100vh-4rem)] flex-col gap-3 pe-2 pt-12">
        {header}
        <h3 className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="14" y2="12" />
            <line x1="4" y1="18" x2="10" y2="18" />
          </svg>
          On this page
        </h3>
        <Primitive.AnchorProvider toc={toc}>
          <div className="relative overflow-y-auto" ref={containerRef}>
            <GlowIndicator containerRef={containerRef} />
            <div className="flex flex-col border-s border-fd-border">
              {toc.map((item) => (
                <TOCItem key={item.url} item={item} />
              ))}
            </div>
          </div>
        </Primitive.AnchorProvider>
        {footer}
      </div>
    </div>
  );
}
