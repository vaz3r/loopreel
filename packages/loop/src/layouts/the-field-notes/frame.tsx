import React, { useEffect } from 'react';
import type { FrameProps } from '../shared/types.js';
import { TypographicWordmark } from '../shared/TypographicWordmark.js';
import { defaultBrandKit, googleFontsUrl } from './brandkit.js';
import styles from './frame.module.css';

export function Frame({ slide, children, brandKit, size = { width: 1080, height: 1350 } }: FrameProps) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const linkId = 'field-notes-fonts';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = googleFontsUrl;
      document.head.appendChild(link);
    }
  }, []);

  const s = slide as Record<string, unknown>;
  const wordmark = brandKit?.wordmark || defaultBrandKit.wordmark || 'FIELD NOTES';
  const handle = brandKit?.handle || defaultBrandKit.handle || '@fieldnotes';
  const wordmarkStyle = brandKit?.wordmarkStyle || defaultBrandKit.wordmarkStyle || 'mono';

  // Parse slide number/index if provided (e.g. from footerRight "01/05" or index)
  const footerRight = (s['footerRight'] as string) || '';
  const match = footerRight.match(/(\d+)\s*\/\s*(\d+)/);
  const curPage = match ? parseInt(match[1], 10) : (typeof s['index'] === 'number' ? (s['index'] as number) + 1 : 1);
  const totalPages = match ? parseInt(match[2], 10) : 5;

  const bg = brandKit?.bg || defaultBrandKit.bg;
  const bg2 = defaultBrandKit.bg2;
  const ink = brandKit?.text || defaultBrandKit.text;
  const accent = brandKit?.accent || defaultBrandKit.accent;
  const surface = brandKit?.surface || defaultBrandKit.surface;

  const scribble = (s['scribble'] as string) || (s['tag'] as string) || 'field notes';

  return (
    <div
      className={styles.canvas}
      style={{
        width: size.width,
        height: size.height,
        backgroundColor: bg,
        backgroundImage: `radial-gradient(120% 90% at 50% 40%, transparent 55%, ${bg2} 100%), radial-gradient(circle, rgba(43, 34, 25, 0.2) 1.6px, transparent 2.2px)`,
        backgroundSize: '100% 100%, 40px 40px',
        backgroundPosition: '0 0, 20px 20px',
        color: ink,
        ['--bg-color' as any]: bg,
        ['--bg2-color' as any]: bg2,
        ['--ink-color' as any]: ink,
        ['--accent-color' as any]: accent,
        ['--surface-color' as any]: surface,
        ['--margin-color' as any]: defaultBrandKit.margin,
        ['--highlighter-color' as any]: defaultBrandKit.highlighter,
        ['--muted-color' as any]: defaultBrandKit.muted,
        ['--font-headline' as any]: defaultBrandKit.fontHeadline,
        ['--font-body' as any]: defaultBrandKit.fontBody,
        ['--font-mono' as any]: defaultBrandKit.fontMono,
        ['--font-hand' as any]: defaultBrandKit.fontHand,
      }}
    >
      {/* Notebook margin rule */}
      <div className={styles.marginLine} />

      {/* Spiral binding punch holes */}
      <div className={styles.holes}>
        {Array.from({ length: 7 }).map((_, i) => (
          <i key={i} className={styles.hole} />
        ))}
      </div>

      {/* Top Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.entryNo}>No. {String(curPage).padStart(2, '0')}</span>
          <TypographicWordmark
            wordmark={wordmark}
            style={wordmarkStyle}
            color="var(--muted-color)"
            size={18}
          />
        </div>
        <div className={styles.headerRight}>
          ~ {scribble}
        </div>
      </header>

      {/* Slide Content */}
      <main className={styles.body}>
        <div className={styles.content}>
          {children}
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className={styles.footer}>
        <div>{handle}</div>
        <div className={styles.dots}>
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isCur = pageNum === curPage;
            const isPassed = pageNum < curPage;
            return (
              <i
                key={i}
                className={`${styles.dot} ${isCur ? styles.dotCur : isPassed ? styles.dotOn : ''}`}
              />
            );
          })}
        </div>
      </footer>
    </div>
  );
}

export default Frame;

