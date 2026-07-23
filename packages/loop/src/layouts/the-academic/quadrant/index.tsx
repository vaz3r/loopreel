import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Quadrant({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.diagram}>
        <div className={styles.hLine} />
        <div className={styles.vLine} />
        {s.topLabel && <div className={`${styles.axisLabel} ${styles.topAxis}`}>{s.topLabel}</div>}
        {s.bottomLabel && <div className={`${styles.axisLabel} ${styles.bottomAxis}`}>{s.bottomLabel}</div>}
        {s.leftLabel && <div className={`${styles.axisLabel} ${styles.leftAxis}`}>{s.leftLabel}</div>}
        {s.rightLabel && <div className={`${styles.axisLabel} ${styles.rightAxis}`}>{s.rightLabel}</div>}
        <div className={styles.quadrant}>
          <h3 className={styles.qTitle}>{s.topLeft.title}</h3>
          <p className={styles.qDesc}>{s.topLeft.desc}</p>
        </div>
        <div className={`${styles.quadrant} ${s.topRight.highlighted ? styles.quadrantHighlight : ''}`}>
          <h3 className={`${styles.qTitle} ${s.topRight.highlighted ? styles.qTitleLight : ''}`}>{s.topRight.title}</h3>
          <p className={`${styles.qDesc} ${s.topRight.highlighted ? styles.qDescLight : ''}`}>{s.topRight.desc}</p>
        </div>
        <div className={styles.quadrant}>
          <h3 className={styles.qTitle}>{s.bottomLeft.title}</h3>
          <p className={styles.qDesc}>{s.bottomLeft.desc}</p>
        </div>
        <div className={styles.quadrant}>
          <h3 className={styles.qTitle}>{s.bottomRight.title}</h3>
          <p className={styles.qDesc}>{s.bottomRight.desc}</p>
        </div>
      </div>
    </div>
  );
}
