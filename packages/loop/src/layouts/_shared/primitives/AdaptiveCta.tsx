import React from 'react';
import type { DensityProfile } from '../density-engine.js';
import styles from '../density.module.css';

export interface AdaptiveCtaProps {
  headline: string;
  subtext?: string;
  actionLabel?: string;
  socialHandle?: string;
  density?: DensityProfile;
  className?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  headlineClassName?: string;
  subtextClassName?: string;
  buttonClassName?: string;
  footerClassName?: string;
  footerTextClassName?: string;
}

export function AdaptiveCta({
  headline,
  subtext,
  actionLabel,
  socialHandle,
  icon,
  className,
  iconClassName,
  headlineClassName,
  subtextClassName,
  buttonClassName,
  footerClassName,
  footerTextClassName,
}: AdaptiveCtaProps) {
  return (
    <div
      className={`${styles.container} ${className || ''}`}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 40px',
      }}
    >
      {icon && <div className={iconClassName}>{icon}</div>}
      <h2
        className={headlineClassName}
        style={{
          fontSize: 'var(--density-headline-size, 85px)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          marginBottom: '24px',
        }}
      >
        {headline}
      </h2>
      {subtext && (
        <p
          className={subtextClassName}
          style={{
            fontSize: 'var(--density-body-size, 32px)',
            lineHeight: 'var(--density-line-height, 1.4)',
            marginBottom: '48px',
          }}
        >
          {subtext}
        </p>
      )}
      {actionLabel && <div className={buttonClassName}>{actionLabel}</div>}
      {socialHandle && (
        <div className={footerClassName} style={{ marginTop: 'auto', paddingTop: '32px' }}>
          <span className={footerTextClassName}>{socialHandle}</span>
        </div>
      )}
    </div>
  );
}

export default AdaptiveCta;
