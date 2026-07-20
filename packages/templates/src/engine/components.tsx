import React from 'react';
import { REGMARKS, SAFE_AREAS, HEADER_ZONE, FOOTER_ZONE } from './layout.js';

/* ─── RegMarks ─────────────────────────────────────────────── */

export interface RegMarksProps {
  inset?: number;
  size?: number;
  color?: string;
  opacity?: number;
  variant?: 'corner' | 'full';
}

export function RegMarks({
  inset = REGMARKS.inset,
  size = REGMARKS.bracketSize,
  color = 'rgba(255,255,255,0.25)',
  opacity = 1,
  variant = 'corner',
}: RegMarksProps) {
  const corner = (border: React.CSSProperties): React.CSSProperties => ({
    position: 'absolute',
    width: size,
    height: size,
    ...border,
  });

  const borderStyle = `2px solid ${color}`;
  if (variant === 'full') {
    const mark = (
      <div
        style={{
          position: 'absolute',
          width: size,
          height: size,
          border: borderStyle,
        }}
      />
    );
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10,
          opacity,
        }}
      >
        <div style={{ position: 'absolute', top: inset, left: inset }}>{mark}</div>
        <div style={{ position: 'absolute', top: inset, right: inset, transform: 'scaleX(-1)' }}>{mark}</div>
        <div style={{ position: 'absolute', bottom: inset, left: inset, transform: 'scaleY(-1)' }}>{mark}</div>
        <div style={{ position: 'absolute', bottom: inset, right: inset, transform: 'scale(-1,-1)' }}>{mark}</div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        opacity,
      }}
    >
      <div style={corner({ top: inset, left: inset, borderTop: borderStyle, borderLeft: borderStyle })} />
      <div style={corner({ top: inset, right: inset, borderTop: borderStyle, borderRight: borderStyle })} />
      <div style={corner({ bottom: inset, left: inset, borderBottom: borderStyle, borderLeft: borderStyle })} />
      <div style={corner({ bottom: inset, right: inset, borderBottom: borderStyle, borderRight: borderStyle })} />
    </div>
  );
}

/* ─── MicroHeader ──────────────────────────────────────────── */

export interface MicroHeaderProps {
  tag: string;
  top?: number;
  left?: number;
  right?: number;
  color?: string;
  accentColor?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: string;
  gap?: number;
  zIndex?: number;
}

export function MicroHeader({
  tag,
  top = HEADER_ZONE.top!,
  left = 80,
  right = 80,
  color = 'rgba(244,244,240,0.5)',
  accentColor = '#e53935',
  fontFamily = 'Inter, sans-serif',
  fontSize = 20,
  fontWeight = 600,
  letterSpacing = '0.18em',
  gap = 12,
  zIndex = 10,
}: MicroHeaderProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        right,
        display: 'flex',
        alignItems: 'center',
        gap,
        zIndex,
      }}
    >
      <div
        style={{
          width: 28,
          height: 2,
          background: accentColor,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily,
          fontSize,
          fontWeight,
          letterSpacing,
          textTransform: 'uppercase' as const,
          color,
        }}
      >
        {tag}
      </span>
    </div>
  );
}

/* ─── MicroFooter ──────────────────────────────────────────── */

export interface MicroFooterProps {
  footerLeft: string;
  footerRight: string;
  bottom?: number;
  left?: number;
  right?: number;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: string;
  opacity?: number;
  zIndex?: number;
}

export function MicroFooter({
  footerLeft,
  footerRight,
  bottom = FOOTER_ZONE.bottom!,
  left = 80,
  right = 80,
  color = 'rgba(244,244,240,0.4)',
  fontFamily = 'JetBrains Mono, monospace',
  fontSize = 20,
  fontWeight = 500,
  letterSpacing = '0.1em',
  opacity = 1,
  zIndex = 10,
}: MicroFooterProps) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom,
        left,
        right,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        zIndex,
      }}
    >
      <span
        style={{
          fontFamily,
          fontSize,
          fontWeight,
          letterSpacing,
          textTransform: 'uppercase' as const,
          color,
          opacity,
        }}
      >
        {footerLeft}
      </span>
      <span
        style={{
          fontFamily,
          fontSize,
          fontWeight,
          letterSpacing,
          textTransform: 'uppercase' as const,
          color,
          opacity,
        }}
      >
        {footerRight}
      </span>
    </div>
  );
}

/* ─── SafeArea ─────────────────────────────────────────────── */

export interface SafeAreaProps {
  compact?: boolean;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  zIndex?: number;
  overflow?: boolean;
  display?: 'flex' | 'block';
  flexDirection?: 'column' | 'row';
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export function SafeArea({
  compact,
  top,
  bottom,
  left,
  right,
  zIndex = 5,
  overflow = true,
  display = 'flex',
  flexDirection = 'column',
  style,
  children,
}: SafeAreaProps) {
  const base = compact ? SAFE_AREAS.compact : SAFE_AREAS.default;
  if (!base) return null;
  return (
    <div
      style={{
        position: 'absolute',
        top: top ?? base.top,
        bottom: bottom ?? base.bottom,
        left: left ?? base.left,
        right: right ?? base.right,
        display,
        flexDirection,
        zIndex,
        overflow: overflow ? 'hidden' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
