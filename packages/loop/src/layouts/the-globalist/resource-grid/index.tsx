import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function ResourceGrid({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.grid}>
        {s.items?.map((item: any, idx: number) => (
          <div key={idx} className={styles.card}>
            <div className={styles.cardTitle}>{item.title}</div>
            <p className={styles.cardDesc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
