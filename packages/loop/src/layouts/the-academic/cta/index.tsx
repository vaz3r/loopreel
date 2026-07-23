import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Cta({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.topBar} />
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />
      <div className={styles.icon}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h2 className={styles.headline}>{s.headline}</h2>
      {s.subtext && <p className={styles.subtext}>{s.subtext}</p>}
      {s.actionLabel && <div className={styles.button}>{s.actionLabel}</div>}
      {s.socialHandle && <div className={styles.handle}>{s.socialHandle}</div>}
    </div>
  );
}
