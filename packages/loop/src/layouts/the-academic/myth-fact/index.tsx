import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function MythFact({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.mythSection}>
          <div className={styles.badgeRow}>
            <span className={styles.badgeLabel}>HYPOTHESIS H₀</span>
            <span className={styles.badgeStatus}>REJECTED</span>
          </div>
          <p className={styles.mythText}>{s.myth}</p>
        </div>

        <div className={styles.factSection}>
          <div className={styles.badgeRow}>
            <span className={styles.badgeLabelFact}>EMPIRICAL FINDING H₁</span>
            <span className={styles.badgeStatusFact}>DOCUMENTED</span>
          </div>
          <p className={styles.factText}>{s.fact}</p>
        </div>
      </div>
    </div>
  );
}
