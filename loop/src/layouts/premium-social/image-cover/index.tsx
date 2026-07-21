import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PremiumSocialImageCover({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrapper}>
      {s.imageUrl && <div className={styles.imageBg} style={{ backgroundImage: `url(${s.imageUrl})` }} />}
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={`${styles.headline} ${Engine.getHeadlineStyle(s.headline)}`}
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
