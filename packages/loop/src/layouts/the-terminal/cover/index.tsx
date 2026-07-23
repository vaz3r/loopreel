import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Cover({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.reportId}>[ REPORT_ID: {s.reportId || '000-X'} ]</div>
      <h1 className={styles.headline}>{s.headline}</h1>
      {s.subheadline && <p className={styles.sub}>{s.subheadline}</p>}
      <div className={styles.meta}>
        {s.authorName && (
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>AUTHOR:</span>
            <span>{s.authorName}</span>
          </div>
        )}
        {s.authorRole && (
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>DESK:</span>
            <span>{s.authorRole}</span>
          </div>
        )}
      </div>
    </div>
  );
}
