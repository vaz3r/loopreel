import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Cover({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.kickerRule} />
      <span className={styles.kicker}>{s.tag || 'Special Report'}</span>
      <h1 className={styles.headline}>{s.headline}</h1>
      {s.subheadline && <h2 className={styles.subheadline}>{s.subheadline}</h2>}
      {(s.authorName || s.authorRole) && (
        <div className={styles.byline}>
          <div>
            {s.authorName && <div className={styles.authorName}>By {s.authorName}</div>}
            {s.authorRole && <div className={styles.authorRole}>{s.authorRole}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
