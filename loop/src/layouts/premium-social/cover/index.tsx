import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PremiumSocialCover({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className={styles.cover}>
        {s.tag && <div className={styles.tag}>{s.tag}</div>}
        <h1 className={`${styles.headline} ${Engine.getHeadlineStyle(s.headline)}`}
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
          {s.headline}
        </h1>
        <div className={styles.accentBar} />
        {s.subheadline && (
          <p className={styles.subheadline}>{s.subheadline}</p>
        )}
      </div>
    </div>
  );
}
