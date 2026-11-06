import React from 'react';
import type { LayoutProps } from '../../shared/types';
import { getStatItemStyle } from '../../shared/density-engine';
import styles from './styles.module.css';

export default function Telemetry({ slide, density }: LayoutProps) {
  const s = slide as any;
  const stats = s.stats || [];

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.grid}>
        {stats.map((stat: any, idx: number) => {
          const itemStyle = getStatItemStyle(idx, stats.length, density?.isLandscape);
          return (
            <div key={idx} className={styles.cell} style={itemStyle as React.CSSProperties}>
              <div className={styles.value}>{stat.value}<span className={styles.unit}>{stat.unit}</span></div>
              <div className={styles.label}>{stat.label}</div>
              {stat.note && <div className={styles.note}>{stat.note}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
