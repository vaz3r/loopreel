import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Breakdown({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.diagram}>
        <div className={styles.hLine} />
        <div className={styles.vLine} />
        <div className={styles.center}>{s.centerLabel}</div>
        {s.items?.map((item: any, idx: number) => {
          const positions = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
          const pos = positions[idx] || 'topLeft';
          return (
            <div key={idx} className={`${styles.card} ${styles[pos]}`}>
              <h3 className={styles.cardTitle}>{item.num}. {item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
