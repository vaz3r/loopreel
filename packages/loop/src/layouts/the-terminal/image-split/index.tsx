import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function ImageSplit({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.panel}>
        <div className={styles.imageArea}>
          {s.imageUrl && <img src={s.imageUrl} alt="" className={styles.img} />}
          <div className={styles.imgOverlay} />
          <div className={styles.imgLabel}>[ {s.credit || 'VISUAL_DATA'} ]</div>
        </div>
        <div className={styles.copy}>
          <h3 className={styles.title}>{s.headline}</h3>
          {s.bodyText && <p className={styles.body}>{s.bodyText}</p>}
        </div>
      </div>
    </div>
  );
}
