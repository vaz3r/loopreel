import React from 'react';
import type { FrameProps } from '../shared/types';
import styles from './frame.module.css';

export default function PaperOfRecordFrame({ slide, scheme, children, size, brandKit }: FrameProps) {
  const s = slide as any;
  const tag = s.tag || 'TECHNOLOGY';

  const colors = brandKit ? {
    '--paper': brandKit.bg || '#f7f7f5',
    '--ink': brandKit.text || '#121212',
    '--charcoal': brandKit.text || '#333333',
    '--steel': `${brandKit.text}33` || '#dfdfdf',
    '--crimson': brandKit.accent || '#cc0000',
  } : {
    '--paper': '#f7f7f5',
    '--ink': '#121212',
    '--charcoal': '#333333',
    '--steel': '#dfdfdf',
    '--crimson': '#cc0000',
  };

  const fonts = brandKit ? {
    '--font-headline': `'${brandKit.fontSerif || 'Playfair Display'}', serif`,
    '--font-body': `'Source Serif 4', serif`,
    '--font-sans': `'${brandKit.fontSans || 'Inter'}', sans-serif`,
  } : {
    '--font-headline': "'Playfair Display', serif",
    '--font-body': "'Source Serif 4', serif",
    '--font-sans': "'Inter', sans-serif",
  };

  return (
    <div className={styles.frame}
      style={{
        width: size?.width ?? 1080, height: size?.height ?? 1350,
        ...colors,
        ...fonts,
      } as React.CSSProperties}>

      <div className={styles.masthead}>
        <div className={styles.mastheadTop}>
          <span className={styles.mastheadTag}>{tag}</span>
          <span className={styles.mastheadName}>The Daily Investigation</span>
        </div>
        <div className={styles.mastheadSub}>
          <span className={styles.mastheadVolume}>Vol. CLXXII .... No. 59,842</span>
          <span className={styles.mastheadDate}>Wednesday, July 22, 2026</span>
        </div>
      </div>

      <div className={styles.content}>{children}</div>

      <div className={styles.footer}>
        <span className={styles.footerHandle}>@editorialdesk</span>
        <div className={styles.footerDots}>
          <span className={styles.dot} />
          <span className={styles.dotInactive} />
          <span className={styles.dotInactive} />
        </div>
        <span className={styles.footerReadTime}>Read Time: 4 Min</span>
      </div>
    </div>
  );
}
