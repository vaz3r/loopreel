import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Telemetry({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.grid}>
        {s.stats?.map((stat: any, idx: number) => (
          <div key={idx} className={styles.cell}>
            <div className={styles.value}>{stat.value}<span className={styles.unit}>{stat.unit}</span></div>
            <div className={styles.label}>{stat.label}</div>
            {stat.note && <div className={styles.note}>{stat.note}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
