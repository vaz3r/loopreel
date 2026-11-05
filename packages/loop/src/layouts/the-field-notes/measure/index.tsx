import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import styles from '../frame.module.css';
import { renderMarkedText, SlideWrapper } from '../primitives.js';

export default function Measure({ slide }: LayoutProps) {
  const s = slide as any;

  return (
    <SlideWrapper slide={s}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18 }}>
        <span
          style={{
            fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
            fontWeight: 700,
            fontSize: 180,
            lineHeight: 0.85,
            letterSpacing: '-0.06em',
            color: 'var(--ink-color, #2B2219)',
          }}
        >
          {s.value}
        </span>
        {s.unit && (
          <span
            style={{
              fontFamily: 'var(--font-hand, Caveat, cursive)',
              fontWeight: 700,
              fontSize: 56,
              color: 'var(--accent-color, #B8432A)',
              paddingBottom: 14,
              transform: 'rotate(-4deg)',
              lineHeight: 1,
            }}
          >
            {s.unit}
          </span>
        )}
      </div>

      <div className={styles.ruler}>
        {s.label && <span className={styles.rulerLabel}>{s.label}</span>}
      </div>

      {(s.title || s.headline) && (
        <h2
          style={{
            fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
            fontSize: 48,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            margin: '20px 0 0 0',
            color: 'var(--ink-color, #2B2219)',
          }}
        >
          {renderMarkedText(s.title || s.headline)}
        </h2>
      )}

      {(s.text || s.desc) && (
        <p
          style={{
            fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
            fontSize: 26,
            lineHeight: 1.45,
            margin: '14px 0 0 0',
            color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
          }}
        >
          {renderMarkedText(s.text || s.desc)}
        </p>
      )}
    </SlideWrapper>
  );
}
export { Measure };
