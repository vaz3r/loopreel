import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function ModernCleanImageCover({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageBg} style={{ backgroundImage: `url(${s.imageUrl})` }} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={`${Engine.getHeadlineStyle(s.headline, scheme.id)} ${styles.headline}`}
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
          {s.headline}
        </div>
        {s.subtext && (
          <div className={styles.subtext}
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
            {s.subtext}
          </div>
        )}
      </div>
    </div>
  );
}
