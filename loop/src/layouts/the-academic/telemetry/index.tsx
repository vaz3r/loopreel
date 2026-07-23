import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Telemetry({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
        <span className={styles.subtitle}>Dataset Alpha</span>
      </div>
      <div className={styles.grid}>
        {s.stats?.map((stat: any, idx: number) => {
          const barColor = stat.color === 'crimson' ? '#A31F34' : stat.color === 'graphite' ? '#475569' : '#0F172A';
          return (
            <div key={idx} className={styles.card}>
              <div className={styles.topBar} style={{ background: barColor }} />
              <div className={styles.varLabel}>Variable {String.fromCharCode(65 + idx)}</div>
              <div className={styles.statValue}>{stat.value}<span className={styles.statUnit} style={{ color: barColor }}>{stat.unit || ''}</span></div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
