import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PremiumSocialImageSplit({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.row}>
      <div className={styles.imageCol}>
        {s.imageUrl && <div className={styles.imageBg} style={{ backgroundImage: `url(${s.imageUrl})` }} />}
        <div className={styles.overlay} />
      </div>
      <div className={styles.textCol}>
        <div className={styles.accentBar} />
        <div className={styles.textInner}>
          <div className={styles.headline}>{s.headline}</div>
          {s.bodyText && <div className={styles.bodyText}>{s.bodyText}</div>}
        </div>
      </div>
    </div>
  );
}
