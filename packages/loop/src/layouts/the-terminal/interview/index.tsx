import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Interview({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
        <span className={styles.subject}>SUBJECT: CEO_04</span>
      </div>
      <div className={styles.content}>
        <div className={styles.question}>
          <div className={styles.qPrefix}>Q&gt;</div>
          <p className={styles.qText}>{s.question}</p>
        </div>
        <div className={styles.answerBlock}>
          <div className={styles.answerConnector} />
          <div className={styles.answer}>
            <div className={styles.aPrefix}>A&gt;</div>
            <div>
              <p className={styles.aText}>{s.answer}</p>
              {s.respondentName && (
                <div className={styles.respondent}>
                  <span className={styles.respId}>ID:</span> {s.respondentName}, {s.respondentRole}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
