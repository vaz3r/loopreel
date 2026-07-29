import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PaperOfRecordMythFact({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.mythFact}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.columns}>
        <div className={styles.divider} />
        <div className={styles.column}>
          <div className={styles.columnLabel}>MYTH</div>
          <h3 className={styles.columnTitle}>{s.myth}</h3>
        </div>
        <div className={`${styles.column} ${styles.columnRight}`}>
          <div className={`${styles.columnLabel} ${styles.columnLabelAccent}`}>FACT</div>
          <h3 className={styles.columnTitle}>{s.fact}</h3>
        </div>
      </div>
    </div>
  );
}
