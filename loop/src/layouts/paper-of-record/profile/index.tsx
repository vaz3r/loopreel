import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PaperOfRecordProfile({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        {s.tag && <span className={styles.headerLabel}>{s.tag}</span>}
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.portrait}>
          <img className={styles.portraitImage} src={s.portraitUrl} alt={s.personName || ''} />
        </div>
        <div className={styles.details}>
          <h3 className={styles.personName}>{s.personName}</h3>
          <div className={styles.personRole}>{s.personRole}</div>
          <p className={styles.quote}>&ldquo;{s.quote}&rdquo;</p>
        </div>
      </div>
    </div>
  );
}
