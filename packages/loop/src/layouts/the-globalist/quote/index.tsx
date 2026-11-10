import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Quote({ slide }: LayoutProps) {
  const s = slide as any;
  const rawQuote = (s.quote || '').trim();
  // Sanitize punctuation: replace trailing comma/semicolon with period
  const cleanQuote = rawQuote.replace(/[,;]\s*$/, '.');

  return (
    <div className={styles.wrap}>
      <div className={styles.quoteMark}>{'\u201C'}</div>
      <h2 className={styles.quoteText}>{cleanQuote}</h2>
      <div className={styles.attribution}>
        <span className={styles.author}>{s.author}</span>
        {s.role && <span className={styles.role}>{s.role}</span>}
      </div>
    </div>
  );
}
