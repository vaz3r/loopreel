import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function MythFact({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
        <span className={styles.funcLabel}>FUNC: DEBUG</span>
      </div>
      <div className={styles.panel}>
        <div className={styles.mythSection}>
          <div className={styles.falseTag}>FALSE</div>
          <span className={styles.mythLabel}>INPUT_ERR // MYTH</span>
          <p className={styles.mythText}>{s.myth}</p>
        </div>
        <div className={styles.factSection}>
          <div className={styles.trueTag}>TRUE</div>
          <span className={styles.factLabel}>SYS_VALID // FACT</span>
          <p className={styles.factText}>{s.fact}</p>
        </div>
      </div>
    </div>
  );
}
