import React from 'react';
import type { FrameProps } from '../shared/types';
import { AutoFit } from '../shared/AutoFit';
import type { AlloyReviewBrandKit } from './brandkit';
import styles from './frame.module.css';

export default function AlloyReviewFrame({ slide, children, brandKit, density }: FrameProps) {
  const s = slide as any;
  const tag = s.tag || 'Apple Silicon / Consumer Hardware Criticism';
  const bk = brandKit as AlloyReviewBrandKit | undefined;

  const bg = bk?.bg || '#F5F5F7';
  const text = bk?.text || '#1D1D1F';
  const accent = bk?.accent || '#C74416';
  const surface = bk?.surface || '#E9EAED';
  const border = bk?.border || '#C5C7CD';
  const fontHeadline = bk?.fontHeadline || 'Syne';
  const fontSans = bk?.fontSans || 'Manrope';
  const wordmark = bk?.wordmark || 'THE ALLOY REVIEW';
  const handle = bk?.handle || '@alloyreview';

  return (
    <div
      className={styles.frame}
      style={{
        background: bg,
        color: text,
        '--font-headline': `'${fontHeadline}', serif`,
        '--font-sans': `'${fontSans}', sans-serif`,
        '--accent-color': accent,
        '--surface-color': surface,
        '--border-color': border,
        '--k': density?.k ?? 1.0,
        ...(density?.cssVariables || {}),
      } as React.CSSProperties}
    >
      <div className={styles.header}>
        <span className={styles.wordmark}>{wordmark}</span>
        <span className={styles.tag}>{tag}</span>
      </div>

      <div className={styles.content}>
        <AutoFit verticalAlign={density?.mode === 'compact' ? 'flex-start' : 'center'}>
          {children}
        </AutoFit>
      </div>

      <div className={styles.footer}>
        <span style={{ color: accent, fontWeight: 700 }}>{s.index !== undefined ? String(s.index + 1).padStart(2, '0') : '01'}</span>
        <span style={{ opacity: 0.65 }}>{handle}</span>
      </div>
    </div>
  );
}
