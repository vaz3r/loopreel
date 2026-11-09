import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Breakdown({ slide }: LayoutProps) {
  const s = slide as any;
  const items = s.items || [];
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
        {s.centerLabel && (
          <div className={styles.centerBadge}>
            <span className={styles.centerLabel}>{s.centerLabel}</span>
          </div>
        )}
      </div>

      <div className={styles.grid}>
        {items.map((item: any, idx: number) => (
          <div key={idx} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardNum}>{item.num || `0${idx + 1}`}</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
            </div>
            <p className={styles.cardDesc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
