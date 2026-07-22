import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function AvantGardeEditorialCatalog({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.catalog}>
      <div className={styles.headlineArea}>
        {s.mainHeadline && (
          <h1 className={styles.headline}>{s.mainHeadline}</h1>
        )}
      </div>

      <div className={styles.mockupArea}>
        {s.productMockupUrl && (
          <div className={styles.mockupWrapper}>
            <div
              className={styles.mockupImage}
              style={{ backgroundImage: `url(${s.productMockupUrl})` }}
            />
          </div>
        )}

        {s.badgeText && (
          <div className={styles.sealBadge}>
            <svg viewBox="0 0 96 96" width="96" height="96">
              <circle cx="48" cy="48" r="46" fill="#000000" />
              <circle cx="48" cy="48" r="38" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
              <circle cx="48" cy="48" r="32" fill="none" stroke="#FFFFFF" strokeWidth="0.3" />
              <text x="48" y="46" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontFamily="Oswald" fontWeight="700" letterSpacing="0.12em">
                {s.badgeText?.slice(0, 14)}
              </text>
              <text x="48" y="56" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontFamily="Oswald" fontWeight="400" letterSpacing="0.08em">
                {s.badgeText?.slice(14, 28) || 'EDITION'}
              </text>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
