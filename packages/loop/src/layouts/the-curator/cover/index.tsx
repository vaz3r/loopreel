import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Cover({ slide }: LayoutProps) {
  const s = slide as any;
  const headline = s.headline || '';
  const hasPullQuote = Boolean(s.pullQuote && s.pullQuote.trim());

  // Proportional dynamic typography: never blow up to 140px on long titles
  const headlineLen = headline.length;
  const headlineStyle: React.CSSProperties = {
    fontSize: headlineLen > 55 ? '68px' : headlineLen > 35 ? '80px' : '94px',
    lineHeight: headlineLen > 55 ? 1.08 : 1.02,
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <div className={styles.kicker}>{s.tag || 'EXHIBITION'}</div>
        <h1 className={styles.headline} style={headlineStyle}>
          {headline}
        </h1>
      </div>

      <div className={styles.bottom}>
        {hasPullQuote ? (
          <div className={styles.splitRow}>
            <div className={styles.descCol}>
              <div className={styles.line} />
              <p className={styles.descSentence}>{s.subheadline}</p>
            </div>
            <div className={styles.quoteCol}>
              <p className={styles.pullQuote}>{s.pullQuote}</p>
            </div>
          </div>
        ) : (
          <div className={styles.fullMeasureRow}>
            <div className={styles.accentRule} />
            {s.subheadline && (
              <p className={styles.leadSubheadline}>
                {s.subheadline}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
