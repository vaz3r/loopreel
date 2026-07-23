import React from 'react';
import type { FrameProps } from '../shared/types';

export default function TheAcademicFrame({ slide, scheme, children, size, brandKit }: FrameProps) {
  const s = slide as any;
  const tag = s.tag || 'STRATEGY';
  const pageNum = s.footerRight?.replace('PAGE ', '').padStart(2, '0') || '01';

  const bg = brandKit?.bg || '#FFFFFF';
  const ink = brandKit?.text || '#0F172A';
  const crimson = '#A31F34';
  const graphite = '#475569';
  const hairline = '#CBD5E1';
  const panel = '#F8FAFC';

  const w = size?.width ?? 1080;
  const h = size?.height ?? 1350;
  const ratio = w / h;
  const isWide = ratio > 1;
  const isUltraWide = ratio > 2;
  const side = isUltraWide ? 40 : isWide ? 60 : 80;
  const headerTop = isUltraWide ? 24 : isWide ? 40 : 60;
  const footerBottom = isUltraWide ? 24 : isWide ? 40 : 60;
  const contentTop = isUltraWide ? 70 : isWide ? 100 : 160;
  const contentBottom = isUltraWide ? 50 : isWide ? 70 : 120;
  const headerTitleSize = isWide ? 20 : 28;
  const headerSubtitleSize = isWide ? 10 : 14;
  const footerFontSize = isWide ? 10 : 14;

  return (
    <div style={{
      width: w, height: h,
      background: bg, color: ink, position: 'relative', overflow: 'hidden',
      fontFamily: "'Source Sans 3', sans-serif",
      backgroundImage: `linear-gradient(${panel} 1px, transparent 1px), linear-gradient(90deg, ${panel} 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute', top: headerTop, left: side, right: side, zIndex: 50,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          borderBottom: `2px solid ${ink}`, paddingBottom: isWide ? 10 : 16,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: "'Merriweather', serif", fontWeight: 900, fontSize: headerTitleSize, letterSpacing: '-0.02em', textTransform: 'uppercase' as const, color: ink, lineHeight: 1 }}>Management Review</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: headerSubtitleSize, color: graphite, marginTop: isWide ? 2 : 4, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Working Paper Series</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontWeight: 700, fontSize: isWide ? 12 : 16, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: crimson }}>{tag}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute', bottom: footerBottom, left: side, right: side, zIndex: 50,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        fontFamily: "'IBM Plex Mono', monospace", fontSize: footerFontSize, textTransform: 'uppercase' as const,
        letterSpacing: '0.1em', color: graphite,
        borderTop: `1px solid ${hairline}`, paddingTop: isWide ? 10 : 16,
      }}>
        <div style={{ display: 'flex', gap: isWide ? 20 : 32 }}>
          <span>DOI: 10.1016/J.BUSRES.2026</span>
          {!isWide && <span>VOL. 42, NO. 8</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: isWide ? 16 : 24 }}>
          <span style={{ fontWeight: 700, color: ink }}>PAGE {pageNum}</span>
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
