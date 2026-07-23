import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Quadrant({ slide }: LayoutProps) {
  const s = slide as any;
  const highlight = s.highlight || 'topRight';
  const cells = [
    { key: 'topLeft', data: s.topLeft },
    { key: 'topRight', data: s.topRight },
    { key: 'bottomLeft', data: s.bottomLeft },
    { key: 'bottomRight', data: s.bottomRight },
  ];
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.matrix}>
        <div className={styles.axisH} />
        <div className={styles.axisV} />
        {s.topLabel && <div className={styles.labelTop}>{s.topLabel}</div>}
        {s.bottomLabel && <div className={styles.labelBottom}>{s.bottomLabel}</div>}
        {s.leftLabel && <div className={styles.labelLeft}>{s.leftLabel}</div>}
        {s.rightLabel && <div className={styles.labelRight}>{s.rightLabel}</div>}
        {cells.map(({ key, data }) => {
          const isHighlighted = key === highlight;
          return (
            <div key={key} className={`${styles.cell} ${isHighlighted ? styles.cellHighlight : styles.cellBg}`}>
              {isHighlighted && <div className={styles.highlightBar} />}
              <h3 className={styles.cellTitle}>{data.title}</h3>
              <p className={`${styles.cellDesc} ${isHighlighted ? styles.descMuted : styles.descNormal}`}>{data.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
