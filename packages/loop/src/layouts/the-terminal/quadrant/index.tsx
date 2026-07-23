import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Quadrant({ slide }: LayoutProps) {
  const s = slide as any;
  const cells = [
    { key: 'topLeft', data: s.topLeft, highlight: s.highlight === 'topLeft' },
    { key: 'topRight', data: s.topRight, highlight: s.highlight === 'topRight' },
    { key: 'bottomLeft', data: s.bottomLeft, highlight: s.highlight === 'bottomLeft' },
    { key: 'bottomRight', data: s.bottomRight, highlight: s.highlight === 'bottomRight' },
  ];
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
        <span className={styles.plotLabel}>PLOT: ASSET_CLASS</span>
      </div>
      <div className={styles.matrixWrap}>
        {s.topLabel && <div className={styles.axisTop}>{s.topLabel}</div>}
        {s.bottomLabel && <div className={styles.axisBottom}>{s.bottomLabel}</div>}
        {s.leftLabel && <div className={styles.axisLeft}>{s.leftLabel}</div>}
        {s.rightLabel && <div className={styles.axisRight}>{s.rightLabel}</div>}
        <div className={styles.matrix}>
          <div className={styles.hLine} />
          <div className={styles.vLine} />
          {cells.map((c) => (
            <div key={c.key} className={`${styles.cell} ${c.highlight ? styles.cellHighlight : ''}`}>
              {c.highlight && <div className={styles.pulse} />}
              <h3 className={`${styles.cellTitle} ${c.highlight ? styles.cellTitleAccent : ''}`}>{c.data.title}</h3>
              <p className={styles.cellDesc}>{c.data.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
