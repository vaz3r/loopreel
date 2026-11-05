import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import { renderMarkedText, SlideWrapper } from '../primitives.js';

export default function Quote({ slide }: LayoutProps) {
  const s = slide as any;

  return (
    <SlideWrapper slide={s}>
      <div
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 160,
          fontWeight: 700,
          color: 'var(--accent-color, #B8432A)',
          lineHeight: 0.5,
          marginBottom: 16,
        }}
      >
        “
      </div>

      <blockquote
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 48,
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
          margin: 0,
          color: 'var(--ink-color, #2B2219)',
        }}
      >
        {renderMarkedText(s.quote || s.text || '')}
      </blockquote>

      {(s.author || s.by) && (
        <div style={{ marginTop: 44, display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <span
            style={{
              fontFamily: 'var(--font-hand, Caveat, cursive)',
              fontSize: 46,
              fontWeight: 700,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            — {s.author || s.by}
          </span>
          {s.role && (
            <span
              style={{
                fontFamily: 'var(--font-mono, "DM Mono", monospace)',
                fontSize: 18,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
              }}
            >
              {s.role}
            </span>
          )}
        </div>
      )}
    </SlideWrapper>
  );
}
export { Quote };
