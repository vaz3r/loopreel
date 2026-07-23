import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function ImageSplit({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.imageCol}>
          <img src={s.imageUrl} alt="" className={styles.image} />
          <div className={styles.figLabel}>{s.credit || 'FIG. 01'}</div>
        </div>
        <div className={styles.copyCol}>
          <h3 className={styles.headline}>{s.headline}</h3>
          <div className={styles.academicBorder} />
          <p className={styles.bodyText}>{s.bodyText}</p>
        </div>
      </div>
    </div>
  );
}
