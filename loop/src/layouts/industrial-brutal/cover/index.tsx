import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function BrutalCover({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.cover}>
      <div className={styles.headlineRow}>
        <div className={styles.accentBar} />
        <div>
          <div className={`${Engine.getHeadlineStyle(s.headline, scheme.id)} uppercase`}
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
            {s.headline}
          </div>
        </div>
      </div>
      <div className={styles.subheadline}>
        {s.subheadline}
      </div>
    </div>
  );
}
