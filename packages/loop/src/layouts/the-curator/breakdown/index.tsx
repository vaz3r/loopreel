import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Breakdown({ slide }: LayoutProps) {
  const s = slide as any;
  const items = s.items || [];

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <span className={styles.kicker}>ANATOMY</span>
          {s.centerLabel && <span className={styles.centerBadge}>{s.centerLabel}</span>}
        </div>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>

      <div className={styles.grid}>
        {items.map((item: any, idx: number) => {
          const numStr = item.num ? String(item.num).padStart(2, '0') : String(idx + 1).padStart(2, '0');
          return (
            <div key={idx} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIndex}>{numStr}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
