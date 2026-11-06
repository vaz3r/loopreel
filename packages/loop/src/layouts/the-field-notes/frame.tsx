import React, { useEffect } from 'react';
import type { FrameProps } from '../shared/types.js';
import { AutoFit } from '../shared/AutoFit.js';
import { defaultBrandKit, googleFontsUrl } from './brandkit.js';
import styles from './frame.module.css';

const DEFAULT_LABELS: Record<string, string> = {
  cover: 'Field notes',
  statement: 'Observation',
  list: 'Observations',
  specimen: 'Specimen',
  measure: 'Measurement',
  tally: 'Tally',
  route: 'Route',
  log: 'Log',
  compare: 'Comparison',
  table: 'Survey',
  chart: 'Readings',
  map: 'Map',
  quote: 'Overheard',
  entry: 'Journal',
  qa: 'Question',
  kit: 'Kit list',
  cta: 'End of entry',
};

export function Frame({ slide, children, brandKit, size = { width: 1080, height: 1350 }, density }: FrameProps) {
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

  // Slide indexing & totals
  const footerRight = (s['footerRight'] as string) || '';
  const pageSlashMatch = footerRight.match(/(\d+)\s*\/\s*(\d+)/);
  const pageNumMatch = footerRight.match(/(?:PAGE\s*|№\s*|p\.\s*)?(\d+)/i);
  const slideIdMatch = typeof s['id'] === 'string' ? (s['id'] as string).match(/slide-(\d+)/i) : null;

  let curPage = 1;
  if (typeof s['index'] === 'number') {
    curPage = (s['index'] as number) + 1;
  } else if (pageSlashMatch) {
    curPage = parseInt(pageSlashMatch[1], 10);
  } else if (pageNumMatch && pageNumMatch[1]) {
    curPage = parseInt(pageNumMatch[1], 10);
  } else if (slideIdMatch && slideIdMatch[1]) {
    curPage = parseInt(slideIdMatch[1], 10);
  }

  let totalPages = 7;
  if (pageSlashMatch) {
    totalPages = parseInt(pageSlashMatch[2], 10);
  } else if (typeof s['totalSlides'] === 'number') {
    totalPages = s['totalSlides'] as number;
  } else if (curPage > 7) {
    totalPages = curPage;
  }

  const bg = brandKit?.bg || defaultBrandKit.bg;
  const bg2 = defaultBrandKit.bg2;
  const ink = brandKit?.text || defaultBrandKit.text;
  const accent = brandKit?.accent || defaultBrandKit.accent;
  const surface = brandKit?.surface || defaultBrandKit.surface;

  const slideType = (s['type'] as string) || 'cover';
  const labelText = (s['label'] as string) || (s['tag'] as string) || DEFAULT_LABELS[slideType] || '';
  const isCover = slideType === 'cover';

  // Dynamic header right: prefer explicit headerRight, then brandKit wordmark, then authorRole on cover
  const headerRightText = (s['headerRight'] as string) || brandKit?.wordmark || (isCover ? (s['authorRole'] as string || '') : '');

  // Dynamic footer handle: prefer brandKit handle, then slide socialHandle, then defaultBrandKit handle
  const footerHandle = brandKit?.handle || (s['socialHandle'] as string) || defaultBrandKit.handle || '';

  const showTape = s['tape'] !== false && isCover;

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
        ['--border-color' as any]: 'rgba(43, 34, 25, 0.42)',
        ['--font-headline' as any]: defaultBrandKit.fontHeadline,
        ['--font-body' as any]: defaultBrandKit.fontBody,
        ['--font-mono' as any]: defaultBrandKit.fontMono,
        ['--font-hand' as any]: defaultBrandKit.fontHand,
        ['--k' as any]: density?.k ?? 1.0,
      }}
    >
      {/* Notebook margin rule */}
      <div className={styles.marginLine} />

      {/* Bound-edge spiral punch holes (9 holes) */}
      <div className={styles.holes}>
        {Array.from({ length: 9 }).map((_, i) => (
          <i key={i} className={styles.hole} />
        ))}
      </div>

      {/* Optional top washi-tape banner */}
      {showTape && (
        <span
          className={styles.tape}
          style={{ top: -16, left: '50%', marginLeft: -125, transform: 'rotate(-3deg)' }}
        />
      )}

      {/* Top Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.entryNo}>№ {String(curPage).padStart(2, '0')}</span>
          <span className={styles.headerTitle}>{labelText}</span>
        </div>
        <div className={styles.headerRight}>
          {headerRightText ? `~ ${headerRightText}` : ''}
        </div>
      </header>

      {/* Slide Content Body */}
      <main className={styles.body}>
        <AutoFit verticalAlign={density?.mode === 'compact' ? 'flex-start' : 'center'}>
          <div className={styles.content}>{children}</div>
        </AutoFit>
      </main>

      {/* Bottom Footer */}
      <footer className={styles.footer}>
        <span style={{ color: 'var(--ink-color, #2B2219)' }}>{footerHandle}</span>
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
        <span>p. {String(curPage).padStart(2, '0')}/{String(totalPages).padStart(2, '0')}</span>
      </footer>
    </div>
  );
}

export default Frame;
