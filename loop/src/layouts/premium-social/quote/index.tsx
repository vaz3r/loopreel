import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PremiumSocialQuote({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className={styles.wrapper}>
        <div className={styles.quote}
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
          {s.quote}
        </div>
        <div className={styles.authorRow}>
          <div className={styles.author}
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
            {s.author}
          </div>
          {s.role && <div className={styles.role}>{s.role}</div>}
        </div>
      </div>
    </div>
  );
}
