import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import styles from '../frame.module.css';
import { renderMarkedText, SlideWrapper } from '../primitives.js';

export default function Specimen({ slide }: LayoutProps) {
  const s = slide as any;
  const specimenNo = s.specimenNo ?? (typeof s.index === 'number' ? s.index + 1 : 1);

  return (
    <SlideWrapper slide={s}>
      <div className={styles.specimenCard}>
        <span
          className={styles.tape}
          style={{ top: -26, left: '50%', marginLeft: -125, transform: 'rotate(2deg)' }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingBottom: 16,
            borderBottom: '1.5px solid var(--border-color, rgba(43, 34, 25, 0.42))',
            fontFamily: 'var(--font-mono, "DM Mono", monospace)',
            fontSize: 18,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: 'var(--ink-color, #2B2219)' }}>Specimen no. {String(specimenNo).padStart(2, '0')}</span>
          <span style={{ color: 'var(--muted-color, rgba(43, 34, 25, 0.68))' }}>{s.pos || 'definition'}</span>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 76,
            letterSpacing: '-0.03em',
            marginTop: 28,
            color: 'var(--ink-color, #2B2219)',
            lineHeight: 1,
          }}
        >
          {renderMarkedText(s.term || s.title || '')}
        </div>

        {s.pron && (
          <div
            style={{
              fontFamily: 'var(--font-mono, "DM Mono", monospace)',
              fontSize: 22,
              color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
              marginTop: 12,
            }}
          >
            {s.pron}
          </div>
        )}

        <p
          style={{
            fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
            fontSize: 32,
            lineHeight: 1.4,
            marginTop: 26,
            paddingTop: 26,
            borderTop: '1.5px dashed var(--border-color, rgba(43, 34, 25, 0.42))',
            color: 'var(--ink-color, #2B2219)',
          }}
        >
          {renderMarkedText(s.text || s.definition || '')}
        </p>

        {s.found && (
          <div style={{ display: 'flex', gap: 14, alignItems: 'baseline', marginTop: 28 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono, "DM Mono", monospace)',
                fontSize: 18,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
              }}
            >
              Found in
            </span>
            <span
              style={{
                fontFamily: 'var(--font-hand, Caveat, cursive)',
                fontSize: 34,
                fontWeight: 700,
                color: 'var(--ink-color, #2B2219)',
              }}
            >
              {s.found}
            </span>
          </div>
        )}
      </div>
    </SlideWrapper>
  );
}
export { Specimen };
