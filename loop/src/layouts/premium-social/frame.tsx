import React from 'react';
import type { FrameProps } from '../shared/types';
import styles from './frame.module.css';

export default function PremiumSocialFrame({ slide, scheme, children }: FrameProps) {
  const pg = slide.tag ? slide.tag.slice(0, 2).toUpperCase() : '—';
  return (
    <div className={styles.frame}
      style={{
        backgroundColor: scheme.bg, color: scheme.text,
        fontFamily: `'${scheme.fontSans}', sans-serif`,
        '--accent': scheme.accent, '--text': scheme.text, '--bg': scheme.bg,
        '--border': scheme.border, '--fontSans': scheme.fontSans,
        '--fontMono': scheme.fontMono, '--fontSerif': scheme.fontSerif,
      } as React.CSSProperties}>
      <div className={styles.topRule} />
      <span className={styles.pageIndicator}>{pg}</span>
      <div className={styles.content}>{children}</div>
      <div className={styles.bottomRule} />
      <span className={styles.footerText}>{slide.footerRight || ''}</span>
    </div>
  );
}
