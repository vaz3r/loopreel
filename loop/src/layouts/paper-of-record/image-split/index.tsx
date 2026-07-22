import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PaperOfRecordImageSplit({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.imageSplit}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={s.imageUrl} alt={s.headline || ''} />
      </div>
      <div className={styles.caption}>
        <h3 className={styles.captionTitle}>{s.headline}</h3>
        {s.bodyText && <p className={styles.captionBody}>{s.bodyText}</p>}
        {s.credit && <p className={styles.captionCredit}>{s.credit}</p>}
      </div>
    </div>
  );
}
