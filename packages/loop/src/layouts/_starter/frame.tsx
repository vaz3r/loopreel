import React from 'react';
import type { FrameProps } from '../shared/types';
import type { StarterBrandKit } from './brandkit';
import styles from './frame.module.css';

export default function StarterFrame({ slide, scheme, children, size, brandKit }: FrameProps) {
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
      } as React.CSSProperties}
    >
      <div className={styles.header}>
        <span className={styles.wordmark}>{wordmark}</span>
        <span className={styles.tag}>{tag}</span>
      </div>

      <div className={styles.content}>{children}</div>

      <div className={styles.footer}>
        <span className={styles.handle}>{handle}</span>
        <span className={styles.pageNumber}>
          {s.footerRight || `PAGE ${s.index ? String(s.index).padStart(2, '0') : '01'}`}
        </span>
      </div>
    </div>
  );
}
