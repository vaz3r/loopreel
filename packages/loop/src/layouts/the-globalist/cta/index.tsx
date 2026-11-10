import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function CTA({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.placard}>
        <div className={styles.kicker}>FINAL INTELLIGENCE BRIEF</div>
        <h2 className={styles.headline}>{s.headline}</h2>
        <p className={styles.subtext}>{s.subtext}</p>
        <div className={styles.button}>{s.buttonText || 'Take Action'}</div>
        <div className={styles.handle}>@THEGLOBALIST</div>
      </div>
    </div>
  );
}
