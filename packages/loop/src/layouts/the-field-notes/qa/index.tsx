import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import { renderMarkedText, SlideWrapper } from '../primitives.js';

export default function Qa({ slide }: LayoutProps) {
  const s = slide as any;

  return (
    <SlideWrapper slide={s}>
      <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 20 }}>
        <div
          style={{
            fontFamily: 'var(--font-hand, Caveat, cursive)',
            fontSize: 76,
            fontWeight: 700,
            color: 'var(--accent-color, #B8432A)',
            lineHeight: 0.8,
          }}
        >
          Q.
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
            fontSize: 48,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            margin: 0,
            color: 'var(--ink-color, #2B2219)',
          }}
        >
          {renderMarkedText(s.question || s.title || '')}
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '70px 1fr',
          gap: 20,
          marginTop: 40,
          paddingTop: 40,
          borderTop: '1.5px dashed var(--border-color, rgba(43, 34, 25, 0.42))',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-hand, Caveat, cursive)',
            fontSize: 76,
            fontWeight: 700,
            color: 'var(--accent-color, #B8432A)',
            lineHeight: 0.8,
          }}
        >
          A.
        </div>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
              fontSize: 32,
              lineHeight: 1.45,
              margin: 0,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            {renderMarkedText(s.answer || s.text || '')}
          </p>
          {s.by && (
            <p
              style={{
                fontFamily: 'var(--font-hand, Caveat, cursive)',
                fontSize: 38,
                fontWeight: 700,
                color: 'var(--ink-color, #2B2219)',
                marginTop: 24,
              }}
            >
              — {s.by}
            </p>
          )}
        </div>
      </div>
    </SlideWrapper>
  );
}
export { Qa };
