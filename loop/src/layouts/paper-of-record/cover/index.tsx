import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PaperOfRecordCover({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.cover}>
      <h1 className={styles.headline}>{s.headline}</h1>
      {s.subheadline && <h2 className={styles.subheadline}>{s.subheadline}</h2>}
      {(s.authorName || s.authorRole) && (
        <div className={styles.byline}>
          {s.authorName && (
            <div className={styles.authorName}>
              By <span className={styles.authorAccent}>{s.authorName}</span>
            </div>
          )}
          {s.authorRole && <div className={styles.authorRole}>{s.authorRole}</div>}
        </div>
      )}
    </div>
  );
}
