import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Telemetry({ slide }: LayoutProps) {
  const s = slide as any;
  const stats: any[] = s.stats || [];
  const count = stats.length;

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.kicker}>KEY METRICS</div>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>

      <div className={`${styles.statsContainer} ${styles[`count_${Math.min(count, 4)}`]}`}>
        {stats.map((stat: any, idx: number) => {
          const valStr = String(stat.value ?? '');
          const isNegative = valStr.startsWith('-');
          const isPositive = valStr.startsWith('+');

          return (
            <div key={idx} className={styles.statCard}>
              <div className={styles.metricRow}>
                <span
                  className={`${styles.value} ${isNegative ? styles.negative : isPositive ? styles.positive : ''}`}
                >
                  {stat.value}
                </span>
                {stat.unit && <span className={styles.unit}>{stat.unit}</span>}
              </div>
              <div className={styles.label}>{stat.label}</div>
              {stat.note && <div className={styles.note}>{stat.note}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
