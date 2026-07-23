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

  return (
    <div style={{
      width: size?.width ?? 1080, height: size?.height ?? 1350,
      background: bg, color: ink, position: 'relative', overflow: 'hidden',
      fontFamily: "'Source Sans 3', sans-serif",
      backgroundImage: `linear-gradient(${panel} 1px, transparent 1px), linear-gradient(90deg, ${panel} 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute', top: 60, left: 80, right: 80, zIndex: 50,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          borderBottom: `2px solid ${ink}`, paddingBottom: 16,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: "'Merriweather', serif", fontWeight: 900, fontSize: 28, letterSpacing: '-0.02em', textTransform: 'uppercase' as const, color: ink, lineHeight: 1 }}>Management Review</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, color: graphite, marginTop: 4, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Working Paper Series</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: crimson }}>{tag}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute', bottom: 60, left: 80, right: 80, zIndex: 50,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, textTransform: 'uppercase' as const,
        letterSpacing: '0.1em', color: graphite,
        borderTop: `1px solid ${hairline}`, paddingTop: 16,
      }}>
        <div style={{ display: 'flex', gap: 32 }}>
          <span>DOI: 10.1016/J.BUSRES.2026</span>
          <span>VOL. 42, NO. 8</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontWeight: 700, color: ink }}>PAGE {pageNum}</span>
        </div>
      </div>

      {/* Content area */}
      <div style={{
        position: 'absolute', top: 160, bottom: 120, left: 80, right: 80,
        zIndex: 30, display: 'flex', flexDirection: 'column',
      }}>
        {children}
      </div>
    </div>
  );
}
