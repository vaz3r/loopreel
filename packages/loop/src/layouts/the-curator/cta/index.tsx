import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Cta({ slide }: LayoutProps) {
  const s = slide as any;
  const actionText = s.actionLabel || s.action || 'CONTINUE READING';

  return (
    <div className={styles.wrap}>
      <div className={styles.topSection}>
        <span className={styles.kicker}>FINAL DIRECTIVE</span>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>

      {s.subtext && (
        <div className={styles.middleSection}>
          <p className={styles.subtext}>{s.subtext}</p>
        </div>
      )}

      <div className={styles.bottomSection}>
        <div className={styles.ctaBtn}>{actionText}</div>
        <div className={styles.handleBadge}>{s.socialHandle || '@CURATOR.STUDIO'}</div>
      </div>
    </div>
  );
}
