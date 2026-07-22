import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PremiumSocialQuote({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.quote}>
      <div className={styles.quoteText}>{s.quote}</div>
      <div className={styles.authorRow}>
        <div className={styles.dash}>&mdash;</div>
        <div>
          <div className={styles.author}>{s.author}</div>
          {s.role && <div className={styles.role}>{s.role}</div>}
        </div>
      </div>
    </div>
  );
}
