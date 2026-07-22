import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PaperOfRecordCta({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.cta}>
      <div className={styles.icon}>
        <svg className={styles.iconSvg} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <h2 className={styles.headline}>{s.headline}</h2>
      {s.subtext && <p className={styles.subtext}>{s.subtext}</p>}
      {s.actionLabel && <div className={styles.button}>{s.actionLabel}</div>}
      {s.socialHandle && (
        <div className={styles.footer}>
          <span className={styles.footerText}>{s.socialHandle}</span>
        </div>
      )}
    </div>
  );
}
