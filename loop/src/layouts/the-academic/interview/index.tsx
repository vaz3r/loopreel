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
      <div className={styles.container}>
        <div className={styles.questionRow}>
          <div className={styles.qaLabel} style={{ color: '#A31F34' }}>Q.</div>
          <div className={styles.questionCol}>
            <p className={styles.questionText}>{s.question}</p>
          </div>
        </div>
        <div className={styles.answerRow}>
          <div className={styles.qaLabel} style={{ color: '#475569' }}>A.</div>
          <div className={styles.answerCol}>
            <p className={styles.answerText}>{s.answer}</p>
            {s.respondentName && (
              <div className={styles.respondent}>
                <span className={styles.respondentName}>{s.respondentName}</span>
                {s.respondentRole && <span className={styles.respondentRole}>{s.respondentRole}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
