import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import styles from '../frame.module.css';
import { renderMarkedText, SlideWrapper } from '../primitives.js';

export default function Entry({ slide }: LayoutProps) {
  const s = slide as any;

  return (
    <SlideWrapper slide={s}>
      <h2
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          margin: 0,
          color: 'var(--ink-color, #2B2219)',
        }}
      >
        {renderMarkedText(s.title || s.headline || 'Reflection.')}
      </h2>

      {s.date && (
        <div
          style={{
            fontFamily: 'var(--font-hand, Caveat, cursive)',
            fontSize: 34,
            fontWeight: 600,
            color: 'var(--accent-color, #B8432A)',
            transform: 'rotate(-1.5deg)',
            display: 'inline-block',
            marginTop: 10,
          }}
        >
          {s.date}
        </div>
      )}

      <p
        className={styles.entryDropCap}
        style={{
          fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
          fontSize: 28,
          lineHeight: 1.6,
          marginTop: 28,
          color: 'var(--ink-color, #2B2219)',
          textAlign: 'justify',
        }}
      >
        {s.text}
      </p>
    </SlideWrapper>
  );
}
export { Entry };
