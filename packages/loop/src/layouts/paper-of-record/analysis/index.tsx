import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PaperOfRecordAnalysis({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.analysis}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.body}>
        <p className={`${styles.bodyText} ${styles.dropCap}`}>{s.bodyText}</p>
      </div>
    </div>
  );
}
