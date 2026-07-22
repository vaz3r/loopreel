import React from 'react';
import type { FrameProps } from '../shared/types';

export default function TheCuratorFrame({ slide, scheme, children, size, brandKit }: FrameProps) {
  const s = slide as any;
  const tag = s.tag || 'EXHIBITION 01';

  const bg = brandKit?.bg || '#FFFFFF';
  const ink = brandKit?.text || '#000000';
  const graphite = '#4A4A4A';
  const hairline = '#E5E5E5';

  return (
    <div style={{
      width: size?.width ?? 1080, height: size?.height ?? 1350,
      background: bg, color: ink, position: 'relative', overflow: 'hidden',
      fontFamily: "'Cormorant Garamond', serif",
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute', top: 50, left: 60, right: 60, zIndex: 50,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        fontFamily: "'Inter', sans-serif", fontSize: 16, textTransform: 'uppercase' as const,
        letterSpacing: '0.3em', fontWeight: 500,
      }}>
        <div>
          <span>{tag}</span>
          <div style={{ width: 24, height: 1, background: ink, marginTop: 12 }} />
        </div>
        <div style={{ textAlign: 'right' }}>
          <span>2026.07.22</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute', bottom: 50, left: 60, right: 60, zIndex: 50,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        fontFamily: "'Inter', sans-serif", fontSize: 16, textTransform: 'uppercase' as const,
        letterSpacing: '0.3em', fontWeight: 500,
      }}>
        <div>
          <span>ARCHIVE REF: </span>
          <span style={{ fontWeight: 300, color: graphite }}>CURATOR.STUDIO</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ color: graphite }}>FOLIO</span>
          <span style={{ fontSize: 20, fontWeight: 500 }}>{s.footerRight?.replace('PAGE ', '').padStart(2, '0') || '01'}</span>
        </div>
      </div>

      {/* Content area */}
      <div style={{
        position: 'absolute', top: 140, bottom: 140, left: 80, right: 80,
        zIndex: 30, display: 'flex', flexDirection: 'column',
      }}>
        {children}
      </div>
    </div>
  );
}
