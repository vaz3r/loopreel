import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Telemetry({ slide }: LayoutProps) {
  const s = slide as any;
  const count = s.stats?.length ?? 0;
  const gridClass = count === 1 ? styles.oneStat : count === 2 ? styles.twoStats : count === 3 ? styles.threeStats : '';

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
        {s.tag && <span className={styles.tag}>{s.tag}</span>}
      </div>
      <div className={`${styles.grid} ${gridClass}`.trim()}>
        {s.stats?.map((stat: any, idx: number) => (
          <div key={idx} className={styles.stat}>
            <div className={styles.value}>
              {stat.value}
              {stat.unit && <span className={styles.unit}>{stat.unit}</span>}
            </div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
