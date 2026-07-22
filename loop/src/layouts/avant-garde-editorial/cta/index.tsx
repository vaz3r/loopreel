import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function AvantGardeCta({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.cta}>
      <div className={styles.divider} />
      {s.mainHeadline && (
        <h1 className={styles.headline}>{s.mainHeadline}</h1>
      )}
      {!s.mainHeadline && s.headline && (
        <h1 className={styles.headline}>{s.headline}</h1>
      )}
      {s.bodyColumn && (
        <div className={styles.body}>{s.bodyColumn}</div>
      )}
      {!s.bodyColumn && s.subtext && (
        <div className={styles.body}>{s.subtext}</div>
      )}
      {(s.ctaButtonText || s.actionLabel) && (
        <div className={styles.button}>{s.ctaButtonText || s.actionLabel}</div>
      )}
      <div className={styles.divider} />
    </div>
  );
}
