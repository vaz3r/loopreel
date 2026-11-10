import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PaperOfRecordTelemetry({ slide }: LayoutProps) {
  const s = slide as any;
  const stats: any[] = s.stats || [];
  const count = stats.length;
  const kicker = (s.kicker && s.kicker.toLowerCase() !== (s.tag || '').toLowerCase())
    ? s.kicker
    : 'FINANCIAL TELEMETRY';

  return (
    <div className={styles.telemetry}>
      <div className={styles.header}>
        <div className={styles.kicker}>{kicker}</div>
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
                  className={`${styles.statValue} ${isNegative ? styles.loss : isPositive ? styles.gain : ''}`}
                >
                  {stat.value}
                </span>
                {stat.unit && <span className={styles.statUnit}>{stat.unit}</span>}
              </div>
              <div className={styles.statBar} />
              <div className={styles.statLabel}>{stat.label}</div>
              {stat.note && <div className={styles.statNote}>{stat.note}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
