import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function ModernCleanQuote({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className={styles.block}>
        <div className={styles.quoteMark}>&ldquo;</div>
        <div className={styles.quote}
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
          {s.quote}
        </div>
      </div>
      <div className={styles.authorRow}>
        <div className={styles.bar} />
        <div>
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
