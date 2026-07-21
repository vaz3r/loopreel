import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function ModernCleanImageSplit({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.row}>
      <div className={styles.imageCol}>
        <div className={styles.imageBg} style={{ backgroundImage: `url(${s.imageUrl})` }} />
        <div className={styles.overlay} />
      </div>
      <div className={styles.textCol}>
        <div className={styles.accentBar} />
        <div className={`${Engine.getHeadlineStyle(s.headline, scheme.id)} ${styles.headline}`}
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
          {s.headline}
        </div>
        {s.bodyText && (
          <div className={styles.bodyText}
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
            {s.bodyText}
          </div>
        )}
      </div>
    </div>
  );
}
