import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Interview({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.qRow}>
          <div className={styles.qLabel}>Q.</div>
          <div className={styles.qText}>
            <p>{s.question}</p>
          </div>
        </div>
        <div className={styles.qRow}>
          <div className={styles.aLabel}>A.</div>
          <div className={styles.aBody}>
            <p>{s.answer}</p>
            <div className={styles.respondent}>
              {s.respondentName} <span className={styles.pipe}>|</span> {s.respondentRole}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
