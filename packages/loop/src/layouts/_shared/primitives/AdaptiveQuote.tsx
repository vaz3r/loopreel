import React from 'react';
import type { DensityProfile } from '../density-engine.js';
import styles from '../density.module.css';

export interface AdaptiveQuoteProps {
  quote: string;
  author: string;
  role?: string;
  density?: DensityProfile;
  className?: string;
  topBarClassName?: string;
  markClassName?: string;
  quoteTextClassName?: string;
  attributionClassName?: string;
  authorClassName?: string;
  roleClassName?: string;
}

export function AdaptiveQuote({
  quote,
  author,
  role,
  className,
  topBarClassName,
  markClassName,
  quoteTextClassName,
  attributionClassName,
  authorClassName,
  roleClassName,
}: AdaptiveQuoteProps) {
  return (
    <div className={`${styles.container} ${className || ''}`} style={{ justifyContent: 'center', textAlign: 'center' }}>
      {topBarClassName && <div className={topBarClassName} />}
      <div className={markClassName} style={{ fontSize: 'var(--density-quote-mark-size, 240px)' }}>
        &ldquo;
      </div>
      <h2
        className={quoteTextClassName}
        style={{
          fontSize: 'var(--density-quote-font-size, 64px)',
          lineHeight: 1.15,
        }}
      >
        {quote}
      </h2>
      <div className={attributionClassName}>
        <span className={authorClassName}>{author}</span>
        {role && <span className={roleClassName}>{role}</span>}
      </div>
    </div>
  );
}

export default AdaptiveQuote;
