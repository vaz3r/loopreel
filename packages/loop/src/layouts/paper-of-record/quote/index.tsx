import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PaperOfRecordQuote({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.quote}>
      <div className={styles.topBar} />
      <div className={styles.mark}>&ldquo;</div>
      <h2 className={styles.quoteText}>{s.quote}</h2>
      <div className={styles.attribution}>
        <span className={styles.author}>{s.author}</span>
        {s.role && <span className={styles.role}>{s.role}</span>}
      </div>
    </div>
  );
}
