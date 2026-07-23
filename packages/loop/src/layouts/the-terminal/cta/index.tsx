import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Cta({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.gridBg} />
      <div className={styles.content}>
        <div className={styles.icon}>
          <div className={styles.iconInner} />
        </div>
        <h2 className={styles.headline}>{s.headline}</h2>
        {s.subtext && <p className={styles.subtext}>{s.subtext}</p>}
        {s.actionLabel && <div className={styles.ctaBtn}>{s.actionLabel}</div>}
        {s.socialHandle && <div className={styles.handle}>{s.socialHandle}</div>}
      </div>
    </div>
  );
}
