import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function ModernCleanDichotomy({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className={`${Engine.getHeadlineStyle(s.headline, scheme.id)} ${styles.headline}`}
        style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
        {s.headline}
      </div>
      <div className={styles.columns}>
        <div className={styles.column}>
          <div className={styles.title}
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
            {s.left.title}
          </div>
          <div className={styles.desc}
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
            {s.left.desc}
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.title}
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
            {s.right.title}
          </div>
          <div className={styles.desc}
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
            {s.right.desc}
          </div>
        </div>
      </div>
    </div>
  );
}
