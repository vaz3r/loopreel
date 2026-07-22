import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PremiumSocialCover({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.cover}>
      {s.tag && <div className={styles.tag}>{s.tag}</div>}
      <h1 className={styles.headline}>{s.headline}</h1>
      {s.subheadline && <p className={styles.subheadline}>{s.subheadline}</p>}
    </div>
  );
}
