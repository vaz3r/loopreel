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
          <span className={styles.label}>Null Hypothesis (H0)</span>
          <p className={styles.mythText}>{s.myth}</p>
        </div>
        <div className={styles.factSection}>
          <div className={styles.factTopBar} />
          <span className={styles.labelFact}>Validated Finding (H1)</span>
          <p className={styles.factText}>{s.fact}</p>
        </div>
      </div>
    </div>
  );
}
