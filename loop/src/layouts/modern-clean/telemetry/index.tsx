import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function ModernCleanTelemetry({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const grid = s.stats.slice(0, 4);
  const pad = (arr: any[], n: number) => { while (arr.length < n) arr.push({ value: '', label: '' }); return arr; };
  const cells = pad([...grid], 4);
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className={`${Engine.getHeadlineStyle(s.headline, scheme.id)} ${styles.headline}`}
        style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
        {s.headline}
      </div>
      <div className={styles.grid}>
        {cells.map((stat: any, i: number) => (
          <div key={i} className={styles.card}>
            <div className={styles.value}
              style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
              {stat.value}
            </div>
            <div className={styles.label}
              style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
