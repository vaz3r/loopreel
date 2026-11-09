import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function MythFact({ slide }: LayoutProps) {
  const s = slide as any;

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.kicker}>FACT CHECK & INTELLIGENCE</div>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>

      <div className={styles.container}>
        <div className={styles.mythHalf}>
          <div className={styles.badgeRow}>
            <span className={styles.mythBadge}>THE ILLUSION</span>
            <span className={styles.debunkedLabel}>REFUTED</span>
          </div>
          <p className={styles.mythText}>{s.myth}</p>
        </div>

        <div className={styles.factHalf}>
          <div className={styles.factBar} />
          <div className={styles.badgeRow}>
            <span className={styles.factBadge}>THE REALITY</span>
            <span className={styles.verifiedLabel}>CONFIRMED</span>
          </div>
          <p className={styles.factText}>{s.fact}</p>
        </div>
      </div>
    </div>
  );
}
