import React from 'react';
import type { DensityProfile } from '../density-engine.js';
import styles from '../density.module.css';

export interface AdaptiveCoverProps {
  headline: string;
  subheadline?: string;
  authorName?: string;
  authorRole?: string;
  density?: DensityProfile;
  className?: string;
  headlineClassName?: string;
  subheadlineClassName?: string;
  bylineClassName?: string;
  authorNameClassName?: string;
  authorAccentClassName?: string;
  authorRoleClassName?: string;
}

export function AdaptiveCover({
  headline,
  subheadline,
  authorName,
  authorRole,
  className,
  headlineClassName,
  subheadlineClassName,
  bylineClassName,
  authorNameClassName,
  authorAccentClassName,
  authorRoleClassName,
}: AdaptiveCoverProps) {
  return (
    <div className={`${styles.container} ${className || ''}`} style={{ justifyContent: 'space-between' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1
          className={headlineClassName}
          style={{
            fontSize: 'var(--density-cover-headline-size, 105px)',
            margin: '0 0 32px 0',
            lineHeight: 0.95,
          }}
        >
          {headline}
        </h1>
        {subheadline && (
          <h2
            className={subheadlineClassName}
            style={{
              fontSize: 'var(--density-cover-subheadline-size, 36px)',
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {subheadline}
          </h2>
        )}
      </div>

      {(authorName || authorRole) && (
        <div className={bylineClassName} style={{ marginTop: 'auto', flexShrink: 0 }}>
          {authorName && (
            <div className={authorNameClassName}>
              By <span className={authorAccentClassName}>{authorName}</span>
            </div>
          )}
          {authorRole && <div className={authorRoleClassName}>{authorRole}</div>}
        </div>
      )}
    </div>
  );
}

export default AdaptiveCover;
