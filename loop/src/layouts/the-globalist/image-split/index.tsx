import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function ImageSplit({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.imageWrap}>
          <img src={s.imageUrl} alt="" className={styles.image} />
          {s.credit && <div className={styles.credit}>{s.credit}</div>}
        </div>
        <div className={styles.copy}>
          <h3 className={styles.headline}>{s.headline}</h3>
          {s.bodyText && <p className={styles.body}>{s.bodyText}</p>}
        </div>
      </div>
    </div>
  );
}
