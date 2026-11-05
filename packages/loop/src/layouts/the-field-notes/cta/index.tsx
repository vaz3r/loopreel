import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import { Squiggle, renderMarkedText, SlideWrapper } from '../primitives.js';

export default function Cta({ slide }: LayoutProps) {
  const s = slide as any;
  const actionText = s.action || s.actionLabel || s.button || 'Save this entry';
  const signText = s.sign || s.author || '';
  const handleText = s.socialHandle || s.handle;

  return (
    <SlideWrapper slide={s}>
      <h1
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 76,
          fontWeight: 700,
          lineHeight: 1.02,
          letterSpacing: '-0.035em',
          margin: 0,
          color: 'var(--ink-color, #2B2219)',
        }}
      >
        {renderMarkedText(s.headline || s.title || 'Close of Entry')}
      </h1>

      <Squiggle />

      {(s.subtext || s.text) && (
        <p
          style={{
            fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
            fontSize: 32,
            fontStyle: 'italic',
            lineHeight: 1.4,
            margin: '0 0 40px 0',
            color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
            maxWidth: 720,
          }}
        >
          {renderMarkedText(s.subtext || s.text || '')}
        </p>
      )}

      {/* Styled bookmark button */}
      <div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            fontFamily: 'var(--font-mono, "DM Mono", monospace)',
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '20px 38px',
            borderRadius: 4,
            background: 'var(--ink-color, #2B2219)',
            color: 'var(--bg-color, #EEE5D0)',
            boxShadow: '0 8px 24px rgba(43, 34, 25, 0.25)',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 22, height: 22 }}>
            <path d="M6 3h12v18l-6-5-6 5z" />
          </svg>
          {actionText}
        </div>
      </div>

      <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {signText && (
          <span
            style={{
              fontFamily: 'var(--font-hand, Caveat, cursive)',
              fontSize: 44,
              fontWeight: 700,
              color: 'var(--ink-color, #2B2219)',
              transform: 'rotate(-3deg)',
            }}
          >
            ~ {signText}
          </span>
        )}
      </div>
    </SlideWrapper>
  );
}
export { Cta };
