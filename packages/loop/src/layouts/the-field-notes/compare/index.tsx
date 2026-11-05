import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import styles from '../frame.module.css';
import { Squiggle, renderMarkedText, SlideWrapper } from '../primitives.js';

export default function Compare({ slide }: LayoutProps) {
  const s = slide as any;
  const left = s.left || { label: 'Before', items: [] };
  const right = s.right || { label: 'After', items: [] };

  return (
    <SlideWrapper slide={s}>
      {(s.title || s.headline) && (
        <div style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
              fontSize: 'var(--density-headline-size, 54px)',
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

      <div className={styles.compareGrid}>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-hand, Caveat, cursive)',
              fontWeight: 700,
              fontSize: 42,
              lineHeight: 1,
              color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
            }}
          >
            {left.label}
          </div>
          <ul className={styles.compareList}>
            {(left.items || []).slice(0, 5).map((x: string, idx: number) => (
              <li key={idx} className={`${styles.compareItem} ${styles.compareItemLeft}`}>
                {renderMarkedText(x)}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ width: 18, alignSelf: 'stretch' }}>
          <svg viewBox="0 0 18 600" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
            <path
              d="M9 2 C 3 120, 15 240, 8 360 S 12 520, 9 598"
              fill="none"
              stroke="var(--border-color, rgba(43, 34, 25, 0.42))"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-hand, Caveat, cursive)',
              fontWeight: 700,
              fontSize: 42,
              lineHeight: 1,
              color: 'var(--accent-color, #B8432A)',
            }}
          >
            {right.label}
          </div>
          <ul className={styles.compareList}>
            {(right.items || []).slice(0, 5).map((x: string, idx: number) => (
              <li key={idx} className={`${styles.compareItem} ${styles.compareItemRight}`}>
                {renderMarkedText(x)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideWrapper>
  );
}
export { Compare };
