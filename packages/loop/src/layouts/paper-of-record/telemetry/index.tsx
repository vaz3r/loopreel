import React from 'react';
import type { LayoutProps } from '../../shared/types';
import { getStatItemStyle } from '../../shared/density-engine';
import styles from './styles.module.css';

export default function PaperOfRecordTelemetry({ slide, scheme, density }: LayoutProps) {
  const s = slide as any;
  const stats = s.stats || [];

  return (
    <div className={styles.telemetry}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.grid}>
        {stats.map((stat: any, idx: number) => {
          const itemStyle = getStatItemStyle(idx, stats.length, density?.isLandscape);
          return (
            <div key={idx} className={styles.stat} style={itemStyle as React.CSSProperties}>
              <div className={styles.statValue}>
                {stat.value}{stat.unit && <span className={styles.statUnit}>{stat.unit}</span>}
              </div>
              <div className={styles.statBar} />
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
