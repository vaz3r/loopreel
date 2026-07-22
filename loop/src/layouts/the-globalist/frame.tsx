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

  return (
    <div style={{
      width: size?.width ?? 1080, height: size?.height ?? 1350,
      background: paper, color: ink, position: 'relative', overflow: 'hidden',
      fontFamily: `'${fontSerif}', serif`,
    }}>
      {/* Red top rule */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: accent }} />

      {/* Header */}
      <div style={{ position: 'absolute', top: 8, left: 0, right: 0, zIndex: 50, padding: '24px 80px 12px', borderBottom: `1px solid ${hairline}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <span style={{ fontFamily: `'${fontCondensed}', sans-serif`, fontSize: 42, fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'uppercase' as const }}>The Globalist</span>
        <div style={{ textAlign: 'right', fontFamily: "'Inter', sans-serif", fontSize: 12, textTransform: 'uppercase' as const, letterSpacing: '0.15em', color: slate, fontWeight: 600 }}>
          <div>Vol. 42 — No. 8</div>
          <div style={{ color: accent }}>{tag}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'absolute', bottom: 60, left: 80, right: 80, zIndex: 40, borderTop: `1px solid ${hairline}`, paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontFamily: `'${fontCondensed}', sans-serif`, fontSize: 16, textTransform: 'uppercase' as const, letterSpacing: '0.15em', fontWeight: 700 }}>@theglobalist</span>
        <span style={{ fontFamily: `'${fontCondensed}', sans-serif`, fontSize: 16, textTransform: 'uppercase' as const, letterSpacing: '0.15em', color: slate, fontWeight: 500 }}>Page {s.footerRight?.replace('PAGE ', '') || '01'}</span>
      </div>

      {/* Content area */}
      <div style={{ position: 'absolute', top: 160, bottom: 140, left: 80, right: 80, zIndex: 30, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}
