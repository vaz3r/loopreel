import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PremiumSocialDichotomy({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.dichotomy}>
      {s.tag && <div className={styles.tag}>{s.tag}</div>}
      <div className={styles.headline}>{s.headline}</div>
      <div className={styles.columns}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>{s.left?.title}</div>
          <div className={styles.cardDesc}>{s.left?.desc}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>{s.right?.title}</div>
          <div className={styles.cardDesc}>{s.right?.desc}</div>
        </div>
      </div>
    </div>
  );
}
