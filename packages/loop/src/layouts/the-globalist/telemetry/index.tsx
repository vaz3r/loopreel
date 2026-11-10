import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Telemetry({ slide }: LayoutProps) {
  const s = slide as any;
  const count = s.stats?.length ?? 0;
  const gridClass = count === 1 ? styles.oneStat : count === 2 ? styles.twoStats : count === 3 ? styles.threeStats : styles.fourStats;

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <span className={styles.kicker}>GLOBAL MARKETS TELEMETRY</span>
        </div>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>

      <div className={`${styles.grid} ${gridClass}`.trim()}>
        {s.stats?.map((stat: any, idx: number) => {
          const valStr = String(stat.value ?? '');
          const isNegative = valStr.startsWith('-');
          const isPositive = valStr.startsWith('+');

          return (
            <div key={idx} className={`${styles.stat} ${isNegative ? styles.loss : isPositive ? styles.gain : ''}`}>
              <div className={styles.statTopBar} />
              <div className={styles.value}>
                {stat.value}
                {stat.unit && <span className={styles.unit}>{stat.unit}</span>}
              </div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
