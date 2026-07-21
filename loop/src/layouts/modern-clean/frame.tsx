import React from 'react';
import type { FrameProps } from '../shared/types';
import styles from './frame.module.css';

export default function ModernCleanFrame({ slide, scheme, children }: FrameProps) {
  return (
    <div className={styles.frame}
      style={{
        fontFamily: `'${scheme.fontSans}', sans-serif`,
        '--accent': scheme.accent, '--text': scheme.text, '--bg': scheme.bg,
        '--border': scheme.border, '--fontSans': scheme.fontSans,
        '--fontMono': scheme.fontMono, '--fontSerif': scheme.fontSerif,
      } as React.CSSProperties}>
      <header className={styles.header}>
        <span className={styles.tag}>{slide.tag || ''}</span>
        <span className={styles.brand}>LOOP</span>
      </header>
      <div className={styles.content}>
        {children}
      </div>
      <footer className={styles.footer}>
        <span className={styles.footerLeft}>{slide.footerLeft || ''}</span>
        <span className={styles.footerRight}>{slide.footerRight || ''}</span>
      </footer>
    </div>
  );
}
