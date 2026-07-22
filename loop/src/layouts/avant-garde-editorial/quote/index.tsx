import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function AvantGardeQuote({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.quote}>
      {s.badgeLabel && (
        <div className={styles.stickerBadge}>
          <svg viewBox="0 0 100 100" width="64" height="64">
            <circle cx="50" cy="50" r="46" fill="#C8102E" />
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 15) * (Math.PI / 180);
              const x = 50 + 46 * Math.cos(angle);
              const y = 50 + 46 * Math.sin(angle);
              return <circle key={i} cx={x} cy={y} r="4" fill="#C8102E" />;
            })}
            <circle cx="50" cy="50" r="36" fill="#C8102E" />
            <text x="50" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontFamily="Oswald" fontWeight="700" letterSpacing="0.1em">
              {s.badgeLabel?.split(' ')[0] || 'SPECIAL'}
            </text>
            <text x="50" y="56" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontFamily="Oswald" fontWeight="400" letterSpacing="0.08em">
              {s.badgeLabel?.split(' ').slice(1).join(' ') || 'FEATURE'}
            </text>
          </svg>
        </div>
      )}

      <div className={styles.headlineBlock}>
        {s.headlineMain && (
          <h1 className={styles.headline}>{s.headlineMain}</h1>
        )}
        {s.headlineHighlight && (
          <h1 className={styles.headlineAccent}>{s.headlineHighlight}</h1>
        )}
      </div>

      {!s.headlineMain && s.quote && (
        <div className={styles.quoteText}>{s.quote}</div>
      )}

      {(s.author || s.role) && (
        <div className={styles.attribution}>
          {s.author && <span className={styles.author}>{s.author}</span>}
          {s.role && <span className={styles.role}>{s.role}</span>}
        </div>
      )}
    </div>
  );
}
