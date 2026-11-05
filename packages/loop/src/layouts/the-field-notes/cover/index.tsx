import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import { Squiggle, renderMarkedText, SlideWrapper } from '../primitives.js';

export default function Cover({ slide }: LayoutProps) {
  const s = slide as any;
  const meta: string[] = s.meta || (s.authorName ? [s.authorName, s.authorRole || 'Field Notes'] : []);

  return (
    <SlideWrapper slide={s}>
      {s.kicker && (
        <div
          style={{
            fontFamily: 'var(--font-mono, "DM Mono", monospace)',
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent-color, #B8432A)',
            marginBottom: 20,
          }}
        >
          {renderMarkedText(s.kicker)}
        </div>
      )}

      <h1
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 84,
          fontWeight: 700,
          lineHeight: 1.02,
          letterSpacing: '-0.035em',
          margin: 0,
          color: 'var(--ink-color, #2B2219)',
        }}
      >
        {renderMarkedText(s.headline || s.title || '')}
      </h1>

      <Squiggle />

      {(s.subheadline || s.subtitle) && (
        <p
          style={{
            fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
            fontSize: 34,
            fontStyle: 'italic',
            lineHeight: 1.4,
            margin: 0,
            color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
          }}
        >
          {renderMarkedText(s.subheadline || s.subtitle || '')}
        </p>
      )}

      {meta.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0,
            marginTop: 48,
            borderTop: '1.5px solid var(--border-color, rgba(43, 34, 25, 0.42))',
          }}
        >
          {meta.map((m, idx) => (
            <span
              key={idx}
              style={{
                padding: '18px 24px 0 0',
                marginRight: 24,
                borderRight: idx < meta.length - 1 ? '1.5px solid rgba(43, 34, 25, 0.15)' : 'none',
                fontFamily: 'var(--font-mono, "DM Mono", monospace)',
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
              }}
            >
              {m}
            </span>
          ))}
        </div>
      )}
    </SlideWrapper>
  );
}
export { Cover };
