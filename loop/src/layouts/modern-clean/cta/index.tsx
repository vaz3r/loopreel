import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function ModernCleanCta({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className={styles.wrapper}>
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
        {s.actionLabel && (
          <div className={styles.button}
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
            {s.actionLabel}
          </div>
        )}
        {s.socialHandle && (
          <div className={styles.social}
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
            {s.socialHandle}
          </div>
        )}
      </div>
    </div>
  );
}
