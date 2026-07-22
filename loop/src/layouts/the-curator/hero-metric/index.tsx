import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function HeroMetric({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />
      <div className={styles.value}>{s.value}<span className={styles.unit}>{s.unit}</span></div>
      <div className={styles.divider} />
      <h3 className={styles.headline}>{s.headline}</h3>
      {s.bodyText && <p className={styles.body}>{s.bodyText}</p>}
    </div>
  );
}
