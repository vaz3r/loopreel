import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Cover({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <h1 className={styles.headline}>{s.headline}</h1>
        <div className={styles.academicBorder} />
        <div className={styles.abstract}>
          <span className={styles.abstractLabel}>Abstract</span>
          <p className={styles.abstractText}>{s.subheadline}</p>
        </div>
      </div>
      <div className={styles.byline}>
        <div className={styles.authorCol}>
          {s.authorName && <span className={styles.authorName}>{s.authorName}</span>}
          {s.authorRole && <span className={styles.authorRole}>{s.authorRole}</span>}
        </div>
        <span className={styles.peerReviewed}>PEER REVIEWED</span>
      </div>
    </div>
  );
}
