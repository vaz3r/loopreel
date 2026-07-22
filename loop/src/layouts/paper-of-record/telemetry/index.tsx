import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PaperOfRecordTelemetry({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.telemetry}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.grid}>
        {(s.stats || []).map((stat: any, idx: number) => (
          <div key={idx} className={styles.stat}>
            <div className={styles.statValue}>
              {stat.value}{stat.unit && <span className={styles.statUnit}>{stat.unit}</span>}
            </div>
            <div className={styles.statBar} />
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
