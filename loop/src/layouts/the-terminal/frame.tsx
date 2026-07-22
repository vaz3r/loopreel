import React from 'react';
import type { FrameProps } from '../shared/types';

export default function TheTerminalFrame({ slide, scheme, children, size, brandKit }: FrameProps) {
  const s = slide as any;
  const tag = s.tag || 'MARKET_DATA';
  const footerLeft = s.footerLeft || 'SOURCE';

  const bg = brandKit?.bg || '#080808';
  const panel = '#121212';
  const text = brandKit?.text || '#E2E8F0';
  const muted = '#64748B';
  const border = '#2A2A2A';
  const amber = brandKit?.accent || '#FFB000';

  return (
    <div style={{
      width: size?.width ?? 1080, height: size?.height ?? 1350,
      background: bg, color: text, position: 'relative', overflow: 'hidden',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(${border}33 1px, transparent 1px), linear-gradient(90deg, ${border}33 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }} />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50, background: bg,
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '24px 80px', borderBottom: `1px solid ${border}`,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 12, height: 12, background: amber }} />
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>SYS.OP / V4.2</span>
          </div>
          <div style={{ display: 'flex', gap: 32, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: muted }}>
            <span>2026-07-22 14:11:39 UTC</span>
            <span style={{ color: amber }}>{tag}</span>
          </div>
        </div>
      </div>

      {/* Footer ticker */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50,
        borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`,
        background: panel,
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 80px',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: '0.15em',
          textTransform: 'uppercase' as const, color: muted,
        }}>
          <div style={{ display: 'flex', gap: 32 }}>
            <span>SOURCE: <span style={{ color: text }}>@THETERMINAL_HQ</span></span>
            <span>HOST: <span style={{ color: text }}>TERMINAL.APP</span></span>
          </div>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00FF41' }} />
              SYS_ONLINE
            </span>
            <span>PG: <span style={{ color: text, fontWeight: 700 }}>{s.footerRight?.replace('PAGE ', '').padStart(2, '0') || '01'}</span>/12</span>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div style={{
        position: 'absolute', top: 100, bottom: 70, left: 80, right: 80,
        zIndex: 30, display: 'flex', flexDirection: 'column',
      }}>
        {children}
      </div>
    </div>
  );
}
