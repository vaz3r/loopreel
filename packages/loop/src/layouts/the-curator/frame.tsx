import React from 'react';
import type { FrameProps } from '../shared/types';
import type { TheCuratorBrandKit } from './brandkit';

export default function TheCuratorFrame({ slide, scheme, children, size, brandKit }: FrameProps) {
  const s = slide as any;
  const tag = s.tag || 'EXHIBITION 01';
  const bk = brandKit as TheCuratorBrandKit | undefined;

  const bg = bk?.bg || '#FFFFFF';
  const ink = bk?.text || '#000000';
  const graphite = '#4A4A4A';
  const hairline = '#E5E5E5';

  const w = size?.width ?? 1080;
  const h = size?.height ?? 1350;
  const ratio = w / h;
  const isWide = ratio > 1;
  const isUltraWide = ratio > 2;
  const side = isUltraWide ? 30 : isWide ? 50 : 60;
  const headerTop = isUltraWide ? 20 : isWide ? 30 : 50;
  const footerBottom = isUltraWide ? 20 : isWide ? 30 : 50;
  const contentTop = isUltraWide ? 60 : isWide ? 90 : 140;
  const contentBottom = isUltraWide ? 50 : isWide ? 70 : 140;
  const headerFontSize = isWide ? 12 : 16;
  const footerFontSize = isWide ? 12 : 16;

  return (
    <div style={{
      width: w, height: h,
      background: bg, color: ink, position: 'relative', overflow: 'hidden',
      fontFamily: "'Cormorant Garamond', serif",
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute', top: headerTop, left: side, right: side, zIndex: 50,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        fontFamily: "'Inter', sans-serif", fontSize: headerFontSize, textTransform: 'uppercase' as const,
        letterSpacing: '0.3em', fontWeight: 500,
      }}>
        <div>
          <span>{tag}</span>
          <div style={{ width: 24, height: 1, background: ink, marginTop: isWide ? 8 : 12 }} />
        </div>
        <div style={{ textAlign: 'right' }}>
          <span>2026.07.22</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute', bottom: footerBottom, left: side, right: side, zIndex: 50,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        fontFamily: "'Inter', sans-serif", fontSize: footerFontSize, textTransform: 'uppercase' as const,
        letterSpacing: '0.3em', fontWeight: 500,
      }}>
        <div>
          <span>ARCHIVE REF: </span>
          <span style={{ fontWeight: 300, color: graphite }}>CURATOR.STUDIO</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: isWide ? 16 : 24 }}>
          <span style={{ color: graphite }}>FOLIO</span>
          <span style={{ fontSize: isWide ? 16 : 20, fontWeight: 500 }}>{s.footerRight?.replace('PAGE ', '').padStart(2, '0') || '01'}</span>
        </div>
      </div>

      {/* Content area */}
      <div style={{
        position: 'absolute', top: contentTop, bottom: contentBottom, left: side, right: side,
        zIndex: 30, display: 'flex', flexDirection: 'column',
      }}>
        {children}
      </div>
    </div>
  );
}
