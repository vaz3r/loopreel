import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PremiumSocialCta({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.cta}>
      <div className={styles.headline}>{s.headline}</div>
      {s.subtext && <div className={styles.subtext}>{s.subtext}</div>}
      {s.actionLabel && (
        <div className={styles.button}>{s.actionLabel}</div>
      )}
      {s.socialHandle && <div className={styles.social}>{s.socialHandle}</div>}
    </div>
  );
}
