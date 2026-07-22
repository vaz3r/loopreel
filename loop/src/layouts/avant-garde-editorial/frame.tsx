import React from 'react';
import type { FrameProps } from '../shared/types';
import styles from './frame.module.css';

export default function AvantGardeFrame({ slide, scheme, children, size }: FrameProps) {
  const s = slide as any;
  const metaIndex = s.metaIndex || s.footerRight || '01';

  return (
    <div className={styles.frame}
      style={{
        width: size?.width ?? 1080, height: size?.height ?? 1350,
        backgroundColor: '#F5F4F0', color: '#111111',
        fontFamily: "'Playfair Display', serif",
        '--accent': '#C8102E', '--text': '#111111', '--bg': '#F5F4F0',
        '--border': '#D1CFCA', '--fontSans': 'Oswald',
        '--fontMono': 'Oswald', '--fontSerif': 'Playfair Display',
      } as React.CSSProperties}>
      <div className={styles.header}>
        <span className={styles.metaIndex}>{metaIndex}</span>
        <span className={styles.metaCategory}>{s.footerLeft || ''}</span>
      </div>
      <div className={styles.content}>{children}</div>
      <div className={styles.footerUrl}>{s.websiteUrl || 'www.yourbrand.com'}</div>
      <div className={styles.footerCta}>{s.subheadline || ''}</div>
    </div>
  );
}
