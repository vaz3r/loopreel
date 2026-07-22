import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function AvantGardeCover({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.cover}>
      {s.badgeLabel && (
        <div className={styles.sealBadge}>
          <div className={styles.sealInner}>
            <svg viewBox="0 0 80 80" width="80" height="80">
              <circle cx="40" cy="40" r="38" fill="#000000" stroke="none" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
              <text x="40" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontFamily="Oswald" fontWeight="700" letterSpacing="0.12em">
                {s.badgeLabel.split('•')[0]?.trim()?.slice(0, 12)}
              </text>
              <text x="40" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontFamily="Oswald" fontWeight="400" letterSpacing="0.1em">
                {s.badgeLabel.split('•')[1]?.trim() || '2026'}
              </text>
            </svg>
          </div>
        </div>
      )}

      <div className={styles.leftMargin}>
        <div className={styles.verticalText}>{s.websiteUrl || ''}</div>
      </div>

      <div className={styles.mainArea}>
        <div className={styles.headlineBlock}>
          {s.headlineMain && (
            <h1 className={styles.headline}>{s.headlineMain}</h1>
          )}
          {s.headlineHighlight && (
            <h1 className={styles.headlineAccent}>{s.headlineHighlight}</h1>
          )}
        </div>

        {s.subheadline && (
          <div className={styles.subheadline}>{s.subheadline}</div>
        )}

        <div className={styles.divider} />

        <div className={styles.bottomRow}>
          {s.bodyColumn && (
            <div className={styles.bodyColumn}>{s.bodyColumn}</div>
          )}
          {s.mockupImage && (
            <div className={styles.mockupWrapper}>
              <div
                className={styles.mockupImage}
                style={{ backgroundImage: `url(${s.mockupImage})` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
