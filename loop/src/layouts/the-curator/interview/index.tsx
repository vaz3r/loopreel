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
      <div className={styles.content}>
        <div className={styles.question}>
          <div className={styles.qMark}>Q.</div>
          <p className={styles.qText}>{s.question}</p>
        </div>
        <div className={styles.answerBlock}>
          <div className={styles.aMark}>A.</div>
          <div className={styles.answerInner}>
            <p className={styles.aText}>{s.answer}</p>
            {s.respondentName && (
              <div className={styles.respondent}>
                {s.respondentName} — {s.respondentRole}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
