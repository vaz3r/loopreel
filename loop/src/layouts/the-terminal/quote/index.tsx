import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Quote({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.quoteMark}>{'\u201C'}</div>
      <h2 className={styles.quoteText}>{s.quote}</h2>
      <div className={styles.attribution}>
        <span className={styles.author}>&gt; {s.author}</span>
        {s.role && <span className={styles.role}>{s.role}</span>}
      </div>
    </div>
  );
}
