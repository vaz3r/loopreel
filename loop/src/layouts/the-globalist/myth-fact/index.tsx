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
        <div className={`${styles.half} ${styles.mythHalf}`}>
          <span className={`${styles.halfLabel} ${styles.labelMyth}`}>{s.mythLabel || 'The Prevailing Myth'}</span>
          <p className={styles.mythText}>{s.myth}</p>
        </div>
        <div className={`${styles.half} ${styles.factHalf}`}>
          <div className={styles.factBar} />
          <span className={`${styles.halfLabel} ${styles.labelFact}`}>{s.factLabel || 'The Economic Reality'}</span>
          <p className={styles.factText}>{s.fact}</p>
        </div>
      </div>
    </div>
  );
}
