import React from 'react';
import type { FrameProps } from '../shared/types';

export default function TheGlobalistFrame({ slide, scheme, children, size, brandKit }: FrameProps) {
  const s = slide as any;
  const tag = s.tag || 'MACRO-ECONOMICS';

  const paper = brandKit?.bg || '#F5F5F1';
  const ink = brandKit?.text || '#111111';
  const accent = brandKit?.accent || '#E3120B';
  const slate = '#3A4249';
  const hairline = '#D1D1CD';
  const fontSerif = brandKit?.fontSerif || 'Crimson Pro';
  const fontCondensed = brandKit?.fontSans || 'Oswald';

  const w = size?.width ?? 1080;
  const h = size?.height ?? 1350;
  const ratio = w / h;
  const isWide = ratio > 1;
  const isUltraWide = ratio > 2;
  const side = isUltraWide ? 40 : isWide ? 60 : 80;
  const headerTop = isUltraWide ? 4 : isWide ? 6 : 8;
  const headerPadV = isUltraWide ? 12 : isWide ? 16 : 24;
  const headerPadH = side;
  const contentTop = isUltraWide ? 60 : isWide ? 90 : 160;
  const contentBottom = isUltraWide ? 50 : isWide ? 70 : 140;
  const footerBottom = isUltraWide ? 16 : isWide ? 30 : 60;

  return (
    <div style={{
      width: w, height: h,
      background: paper, color: ink, position: 'relative', overflow: 'hidden',
      fontFamily: `'${fontSerif}', serif`,
    }}>
      {/* Red top rule */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: isWide ? 4 : 8, background: accent }} />

      {/* Header */}
      <div style={{ position: 'absolute', top: headerTop, left: 0, right: 0, zIndex: 50, padding: `${headerPadV}px ${headerPadH}px ${isWide ? 8 : 12}px`, borderBottom: `1px solid ${hairline}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <span style={{ fontFamily: `'${fontCondensed}', sans-serif`, fontSize: isWide ? 28 : 42, fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'uppercase' as const }}>The Globalist</span>
        <div style={{ textAlign: 'right', fontFamily: "'Inter', sans-serif", fontSize: isWide ? 10 : 12, textTransform: 'uppercase' as const, letterSpacing: '0.15em', color: slate, fontWeight: 600 }}>
          <div>Vol. 42 — No. 8</div>
          <div style={{ color: accent }}>{tag}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'absolute', bottom: footerBottom, left: side, right: side, zIndex: 40, borderTop: `1px solid ${hairline}`, paddingTop: isWide ? 10 : 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontFamily: `'${fontCondensed}', sans-serif`, fontSize: isWide ? 12 : 16, textTransform: 'uppercase' as const, letterSpacing: '0.15em', fontWeight: 700 }}>@theglobalist</span>
        <span style={{ fontFamily: `'${fontCondensed}', sans-serif`, fontSize: isWide ? 12 : 16, textTransform: 'uppercase' as const, letterSpacing: '0.15em', color: slate, fontWeight: 500 }}>Page {s.footerRight?.replace('PAGE ', '') || '01'}</span>
      </div>

      {/* Content area */}
      <div style={{ position: 'absolute', top: contentTop, bottom: contentBottom, left: side, right: side, zIndex: 30, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}
