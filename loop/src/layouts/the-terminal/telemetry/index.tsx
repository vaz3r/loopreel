import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

const COLOR_MAP: Record<string, { bar: string; arrow: string }> = {
  green: { bar: '#00FF41', arrow: '#00FF41' },
  red: { bar: '#FF003C', arrow: '#FF003C' },
  amber: { bar: '#FFB000', arrow: '#FFB000' },
  blue: { bar: '#00E5FF', arrow: '#00E5FF' },
};

export default function Telemetry({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
        <span className={styles.label}>DATA_SET: ALPHA</span>
      </div>
      <div className={styles.grid}>
        {s.stats?.map((stat: any, idx: number) => {
          const c = COLOR_MAP[stat.color || 'amber'];
          const isNeg = stat.value.startsWith('-');
          return (
            <div key={idx} className={styles.card}>
              <div className={styles.cardBar} style={{ background: c.bar }} />
              <div className={styles.cardLabel}>{stat.label}</div>
              <div className={styles.cardValue}>
                {stat.value}<span className={styles.cardUnit} style={{ color: c.arrow }}>{isNeg ? '\u25BC' : stat.unit || '\u25B2'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
