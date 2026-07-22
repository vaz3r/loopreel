import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Quadrant({ slide }: LayoutProps) {
  const s = slide as any;
  const cells = [
    { key: 'topLeft', data: s.topLeft },
    { key: 'topRight', data: s.topRight, bg: true },
    { key: 'bottomLeft', data: s.bottomLeft },
    { key: 'bottomRight', data: s.bottomRight },
  ];
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.matrix}>
        <div className={styles.hLine} />
        <div className={styles.vLine} />
        {cells.map((c) => (
          <div key={c.key} className={`${styles.cell} ${c.bg ? styles.cellBg : ''}`}>
            {c.data.label && <div className={styles.cellLabel}>{c.data.label}</div>}
            <div className={c.key === 'topRight' || c.key === 'bottomRight' ? styles.cellContentRight : styles.cellContentLeft}>
              <h3 className={`${styles.cellTitle} ${c.data.highlighted ? styles.cellTitleHighlight : ''}`}>{c.data.title}</h3>
              <p className={styles.cellDesc}>{c.data.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
