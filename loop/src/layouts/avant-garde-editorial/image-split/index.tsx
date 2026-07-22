import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function AvantGardeImageSplit({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.row}>
      <div className={styles.imageCol}>
        {s.imageUrl && (
          <div className={styles.imageBg} style={{ backgroundImage: `url(${s.imageUrl})` }} />
        )}
      </div>
      <div className={styles.textCol}>
        {s.tag && <div className={styles.tag}>{s.tag}</div>}
        <div className={styles.divider} />
        {s.headline && <div className={styles.headline}>{s.headline}</div>}
        {s.bodyText && <div className={styles.bodyText}>{s.bodyText}</div>}
      </div>
    </div>
  );
}
