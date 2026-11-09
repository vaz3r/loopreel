import React from 'react';
import type { FrameProps } from '../shared/types';
import { AutoFit } from '../shared/AutoFit';
import type { StarterBrandKit } from './brandkit';
import styles from './frame.module.css';

export default function StarterFrame({ slide, scheme, children, size, brandKit, density }: FrameProps) {
  const s = slide as any;
  const tag = s.tag || 'BRIEFING';
  const bk = brandKit as StarterBrandKit | undefined;

  const bg = bk?.bg || '#0F172A';
  const text = bk?.text || '#F8FAFC';
  const accent = bk?.accent || '#38BDF8';
  const surface = bk?.surface || '#1E293B';
  const fontHeadline = bk?.fontHeadline || 'Geist';
  const fontSans = bk?.fontSans || 'Inter';
  const wordmark = bk?.wordmark || 'THE SIGNAL';
  const handle = bk?.handle || '@thesignal';

  const w = size?.width ?? 1080;
  const h = size?.height ?? 1350;

  return (
    <div
      className={styles.frame}
      style={{
        width: w,
        height: h,
        background: bg,
        color: text,
        '--font-headline': `'${fontHeadline}', sans-serif`,
        '--font-sans': `'${fontSans}', sans-serif`,
        '--accent-color': accent,
        '--surface-color': surface,
        '--brand-bg': bg,
        '--brand-text': text,
        '--brand-accent': accent,
        '--brand-secondary': '#94A3B8',
        '--brand-surface': surface,
        '--brand-font-headline': `'${fontHeadline}', sans-serif`,
        '--brand-font-sans': `'${fontSans}', sans-serif`,
        '--brand-font-serif': `'${fontHeadline}', sans-serif`,
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
        <span className={styles.handle}>{handle}</span>
        <span className={styles.pageNumber}>
          {s.footerRight || `PAGE ${s.index ? String(s.index).padStart(2, '0') : '01'}`}
        </span>
      </div>
    </div>
  );
}
