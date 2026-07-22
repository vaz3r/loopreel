import React from 'react';
import type { FrameProps } from '../shared/types';
import styles from './frame.module.css';

export default function PremiumSocialFrame({ slide, scheme, children }: FrameProps) {
  const s = slide as any;
  const stepLabel = s.tag ? s.tag.slice(0, 16) : '';
  const pageNum = s.footerRight || '';

  return (
    <div className={styles.frame}
      style={{
        backgroundColor: '#1A1A1A', color: '#FFFFFF',
        fontFamily: `'Inter', sans-serif`,
        '--accent': '#22C55E', '--text': '#FFFFFF', '--bg': '#1A1A1A',
        '--border': 'rgba(255,255,255,0.08)', '--fontSans': 'Inter',
        '--fontMono': 'Space Mono', '--fontSerif': 'Inter',
        '--purple': '#A855F7', '--amber': '#F59E0B', '--green': '#22C55E',
        '--muted': '#A1A1AA', '--cardBg': '#222222',
      } as React.CSSProperties}>
      <div className={styles.header}>
        <span className={styles.stepCounter}>{stepLabel}</span>
        <span className={styles.pageNum}>{pageNum}</span>
      </div>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}>
        <div className={styles.profileBadge}>
          <div className={styles.avatarDot} />
          <div className={styles.profileInfo}>
            <span className={styles.username}>Dmitriy Bunin</span>
            <span className={styles.userRole}>Designer, buninux.com</span>
          </div>
        </div>
        <div className={styles.ctaPill}>
          <span>Swipe</span>
          <span className={styles.arrow}>&rarr;</span>
        </div>
      </div>
    </div>
  );
}
