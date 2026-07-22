import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PremiumSocialTelemetry({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const grid = s.stats?.slice(0, 4) || [];
  const pad = (arr: any[], n: number) => { while (arr.length < n) arr.push({ value: '', label: '' }); return arr; };
  const cells = pad([...grid], 4);
  return (
    <div className={styles.telemetry}>
      {s.tag && <div className={styles.tag}>{s.tag}</div>}
      <div className={styles.headline}>{s.headline}</div>
      <div className={styles.grid}>
        {cells.map((stat: any, i: number) => (
          <div key={i} className={styles.card}>
            <div className={styles.value}>{stat.value}</div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
