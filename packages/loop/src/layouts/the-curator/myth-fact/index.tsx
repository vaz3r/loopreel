import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function MythFact({ slide }: LayoutProps) {
  const s = slide as any;

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.kicker}>DEBUNK & REALITY</div>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>

      <div className={styles.panel}>
        <div className={styles.mythSection}>
          <div className={styles.badgeRow}>
            <span className={styles.mythBadge}>THE ILLUSION</span>
            <span className={styles.debunkedLabel}>DEBUNKED</span>
          </div>
          <p className={styles.mythText}>{s.myth}</p>
        </div>

        <div className={styles.factSection}>
          <div className={styles.badgeRow}>
            <span className={styles.factBadge}>THE REALITY</span>
            <span className={styles.verifiedLabel}>DOCUMENTED</span>
          </div>
          <p className={styles.factText}>{s.fact}</p>
        </div>
      </div>
    </div>
  );
}
