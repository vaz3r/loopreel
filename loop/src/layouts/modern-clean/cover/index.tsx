import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function ModernCleanCover({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className={styles.inner}>
        <div className={styles.rule} />
        <h1 className={`${Engine.getHeadlineStyle(s.headline, scheme.id)} ${styles.headline}`}
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
          {s.headline}
        </h1>
        {s.subheadline && (
          <p className={styles.subheadline}>{s.subheadline}</p>
        )}
        {s.metadata && (
          <p className={styles.metadata}>{s.metadata}</p>
        )}
      </div>
    </div>
  );
}
