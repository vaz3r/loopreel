import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import { Squiggle, CircNumber, renderMarkedText, SlideWrapper } from '../primitives.js';

export default function List({ slide }: LayoutProps) {
  const s = slide as any;
  const items = s.items || s.steps || [];

  return (
    <SlideWrapper slide={s}>
      {(s.title || s.headline) && (
        <div style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            {renderMarkedText(s.title || s.headline)}
          </h2>
          <Squiggle />
        </div>
      )}

      <div>
        {items.slice(0, 5).map((it: any, idx: number) => {
          const itemCount = Math.min(items.length, 5);
          const itemPadding = itemCount >= 5 ? '14px 0' : itemCount === 4 ? '18px 0' : '22px 0';
          const itemGap = itemCount >= 5 ? 18 : 24;

          return (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '48px 1fr',
                gap: itemGap,
                padding: itemPadding,
                borderTop: '1.5px dashed var(--border-color, rgba(43, 34, 25, 0.42))',
                borderBottom: idx === items.length - 1 ? '1.5px dashed var(--border-color, rgba(43, 34, 25, 0.42))' : 'none',
              }}
            >
              <CircNumber n={it.num || idx + 1} />
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
                    fontSize: 32,
                    fontWeight: 600,
                    lineHeight: 1.15,
                    letterSpacing: '-0.015em',
                    margin: 0,
                    color: 'var(--ink-color, #2B2219)',
                  }}
                >
                  {renderMarkedText(it.title || '')}
                </h3>
                {(it.desc || it.text) && (
                  <p
                    style={{
                      fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
                      fontSize: 24,
                      lineHeight: 1.45,
                      margin: '8px 0 0 0',
                      color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
                    }}
                  >
                    {renderMarkedText(it.desc || it.text || '')}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {items.length === 0 && (s.text || s.subheadline || s.desc || s.bodyText) && (
          <p
            style={{
              fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
              fontSize: 32,
              lineHeight: 1.5,
              color: 'var(--ink-color, #2B2219)',
              margin: '20px 0 0 0',
              padding: '24px',
              borderLeft: '3px solid var(--accent-color, #B8432A)',
              background: 'rgba(43, 34, 25, 0.03)',
            }}
          >
            {renderMarkedText(s.text || s.subheadline || s.desc || s.bodyText)}
          </p>
        )}
      </div>
    </SlideWrapper>
  );
}
export { List, List as Sequence };
