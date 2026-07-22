import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PaperOfRecordDichotomy({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.dichotomy}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.columns}>
        <div className={styles.divider} />
        <div className={styles.column}>
          {s.leftLabel && <div className={styles.columnLabel}>{s.leftLabel}</div>}
          <h3 className={styles.columnTitle}>{s.left?.title}</h3>
          <p className={styles.columnDesc}>{s.left?.desc}</p>
        </div>
        <div className={`${styles.column} ${styles.columnRight}`}>
          {s.rightLabel && <div className={`${styles.columnLabel} ${styles.columnLabelAccent}`}>{s.rightLabel}</div>}
          <h3 className={styles.columnTitle}>{s.right?.title}</h3>
          <p className={styles.columnDesc}>{s.right?.desc}</p>
        </div>
      </div>
    </div>
  );
}
